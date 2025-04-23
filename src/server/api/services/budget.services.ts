import { PrismaClient } from "@prisma/client";
import { getBookBalance } from "./books.services";
import { endOfMonth, isSameMonth, startOfMonth } from "date-fns";
import _ from "lodash";
import { getPercent } from "~/lib/helpers";
import { MovementsIncludes } from "~/types/movements";
import { cU } from "node_modules/@fullcalendar/core/internal-common";

export async function getCurrentMovementsMonth(
  db: PrismaClient,
  userId: string,
  bookId: string,
) {
  try {
    const now = new Date();
    const firstDayOfMonth = startOfMonth(now);
    const lastDayOfMonth = endOfMonth(now);

    const movements = await db.fixedMovements.findMany({
      where: {
        userId,
        bookId,
        status: true,
        OR: [
          {
            next_ocurrence: {
              gte: firstDayOfMonth,
              lte: lastDayOfMonth,
            },
          },
          {
            last_ocurrence: {
              gte: firstDayOfMonth,
              lte: lastDayOfMonth,
            },
          },
        ],
      },
      include: {
        category: true,
        entity: true,
      },
      orderBy: {
        next_ocurrence: "asc",
      },
    });
    const transactions = await db.transaction.findMany({
      where: {
        userId,
        bookId,
        isProgramed: true,
        OR: [
          {
            state: 3,
          },
          {
            state: 1,
          },
        ],
      },
      include: {
        category: true,
        entity: true,
      },
    });

    const movemntsFormatted: MovementsIncludes[] = movements.map((m) => {
      const isPaid =
        m.last_ocurrence && isSameMonth(new Date(m.last_ocurrence), new Date());
      return { ...m, transferType: "movement", isPaid } as MovementsIncludes;
    });

    const formattedTransactions: MovementsIncludes[] = transactions.map(
      ({
        id,
        accountId,
        userId,
        amount,
        type,
        bookId,
        description,
        createdAt,
        updatedAt,
        goalId,
        categoryId,
        isConfirmed,
        entityId,
        entity,
        category,
        date,
      }) => {
        return {
          id,
          accountId,
          userId,
          amount,
          type,
          goalId,
          bookId,
          description,
          name: description
            ? description
            : type === 2
              ? "Egreso Activo"
              : "Ingreso Activo",
          status: true,
          reminder_date: new Date(),
          reminder_sent: true,
          frecuency: 0,
          next_ocurrence: date as Date,
          last_ocurrence: date as Date,
          isPaid: isConfirmed || false,
          createdAt,
          updatedAt,
          transferType: "transaction",
          categoryId,
          entityId,
          entity: entity || undefined,
          category: category || undefined,
        };
      },
    );

    const currentMovements = [
      ...movemntsFormatted,
      ...formattedTransactions,
    ].sort(
      ({ next_ocurrence: a }, { next_ocurrence: b }) =>
        b.getDate() - a.getDate(),
    );

    return currentMovements;
  } catch (error) {}
}
export async function getBudgetSummary(
  db: PrismaClient,
  userId: string,
  bookId: string,
) {
  const { transactionTotal } = await getBookBalance(db, userId, bookId);

  return db.$transaction(async (db) => {
    const now = new Date();
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);

    // Obtener transacciones programadas del mes actual
    const scheduleTransactions = await db.transaction.findMany({
      where: {
        state: 3, // Programado
        userId,
        bookId,
        date: { gte: monthStart, lte: monthEnd },
      },
    });

    // Obtener movimientos fijos programados del mes actual
    const scheduleMovements = await db.fixedMovements.findMany({
      where: {
        status: true,
        userId,
        bookId,
        OR: [
          {
            next_ocurrence: { gte: monthStart, lte: monthEnd },
          },
          {
            last_ocurrence: { gte: monthStart, lte: monthEnd },
          },
        ],
      },
    });

    // Calcular gastos actuales
    const currentExpenses = await db.transaction.aggregate({
      _sum: { amount: true },
      where: {
        userId,
        bookId,
        type: 2, // Gasto
        state: 1, // Confirmado
        createdAt: { gte: monthStart, lte: monthEnd },
      },
    });

    const plannedIncomes =
      scheduleTransactions
        .filter((t) => t.type === 1) // Tipo 1: ingresos
        .reduce((sum, t) => sum + t.amount, 0) +
      scheduleMovements
        .filter((m) => m.type === 1)
        .reduce((sum, m) => sum + m.amount, 0);

    const plannedExpenses =
      scheduleTransactions
        .filter((t) => t.type === 2) // Tipo 2: gastos
        .reduce((sum, t) => sum + t.amount, 0) +
      scheduleMovements
        .filter((m) => m.type === 2)
        .reduce((sum, m) => sum + m.amount, 0);

    // Calcular presupuesto total y balance proyectado
    const budgetTotal = transactionTotal + plannedIncomes;
    const proyectedBalanceSheet = budgetTotal - plannedExpenses;

    if (
      currentExpenses._sum.amount &&
      currentExpenses._sum.amount > proyectedBalanceSheet
    ) {
      // se han excedido los gastos del presupuesto calculado

      // TODO: emit budget 
    }

    // Agrupar ingresos y gastos programados
    const upcomingPayments = {
      movements: [...scheduleMovements],
      transactions: [...scheduleTransactions],
    };

    // Progreso por categoría
    const categories = await db.category.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        type: true,
        icon: true,
        description: true,
      },
    });

    // get progress the all categories
    const getProgress = (
      category: {
        id: number;
        type: number;
        description: string | null;
        name: string;
        icon: string | null;
      } | null,
    ) => {
      // filter transactions by categories or null
      const transactions = scheduleTransactions.filter((t) =>
        category ? t.categoryId === category.id : t.categoryId === null,
      );
      const movements = scheduleMovements.filter((m) =>
        category ? m.categoryId === category.id : m.categoryId === null,
      );

      // get totals amount
      const transactionsAmount = transactions.reduce(
        (acc, t) => t.amount + acc,
        0,
      );
      const movementsAmount = movements.reduce((acc, t) => t.amount + acc, 0);

      // get movements paids
      const movementsPaid = movements.filter((mov) => {
        const isPay =
          mov.last_ocurrence &&
          isSameMonth(new Date(mov.last_ocurrence), new Date());
        return isPay;
      });
      const transactionsPaid = transactions.filter((tr) => {
        const isPay = tr.state === 1;
        return isPay;
      });

      // get totals amount paids
      const amountAllocated = movementsPaid.reduce(
        (acc, mov) => mov.amount + acc,
        0,
      );
      const amountSpent = transactionsPaid.reduce(
        (acc, t) => t.amount + acc,
        0,
      );

      const allocated = transactionsAmount + movementsAmount;
      const spent = amountAllocated + amountSpent;

      return {
        allocated,
        spent,
        category: category || null,
      };
    };

    // get progress the movements without categories
    const progressNonCat = getProgress(null);

    const progress = [
      ...categories.map((category) => {
        return getProgress(category);
      }),
      progressNonCat,
    ].filter((pg) => pg.allocated > 0);

    return {
      budgetTotal,
      currentExpenses: currentExpenses._sum.amount || 0,
      plannedExpenses,
      proyectedBalanceSheet,
      upcomingPayments,
      progress,
    };
  });
}

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;
export type BudgetSummary = ThenArg<ReturnType<typeof getBudgetSummary>>;
