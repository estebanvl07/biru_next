import { PrismaClient } from "@prisma/client";
import { getBookBalance } from "./books.services";
import { endOfMonth, startOfMonth } from "date-fns";
import _ from "lodash";

export async function getCurrentMovementsMonth(
  db: PrismaClient,
  userId: string,
) {
  try {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const movements = await db.fixedMovements.findMany({
      where: {
        userId,
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
      },
      orderBy: {
        next_ocurrence: "asc",
      },
    });

    return movements;
  } catch (error) {}
}

// export async function getCurrentExpensesMonth(
//   db: PrismaClient,
//   userId: string,
// ) {
//   try {
//     const now = new Date();
//     const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
//     const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

//     const movements = await db.fixedMovements.findMany({
//       where: {
//         userId,
//         status: true,
//         OR: [
//           {
//             next_ocurrence: {
//               gte: firstDayOfMonth,
//               lte: lastDayOfMonth,
//             },
//           },
//           {
//             last_ocurrence: {
//               gte: firstDayOfMonth,
//               lte: lastDayOfMonth,
//             },
//           },
//         ],
//       },
//       include: {
//         category: true,
//       },
//       orderBy: {
//         next_ocurrence: "asc",
//       }
//     });

//     return movements;
//   } catch (error) {}
// }

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

    // Obtener transacciones programadas del mes actual
    // const scheduleTransactions = await db.transaction.groupBy({
    //   by: ["type", "transferType", "categoryId"],
    //   where: {
    //     state: 3, // Programado
    //     userId,
    //     bookId,
    //     date: { gte: monthStart, lte: monthEnd },
    //   },
    //   _sum: { amount: true },
    // });

    // Obtener movimientos fijos programados del mes actual
    const scheduleMovements = await db.fixedMovements.findMany({
      where: {
        status: true,
        userId,
        bookId,
        next_ocurrence: { gte: monthStart, lte: monthEnd },
      },
    });
    // const scheduleMovements = await db.fixedMovements.groupBy({
    //   by: ["type", "categoryId"],
    //   where: {
    //     status: true,
    //     userId,
    //     bookId,
    //     next_ocurrence: { gte: monthStart, lte: monthEnd },
    //   },
    //   _sum: { amount: true },
    // });

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

    // Calcular ingresos planificados (programados)
    // const plannedIncomes =
    //   scheduleTransactions
    //     .filter((t) => t.type === 1)
    //     .reduce((acc, t) => acc + (t._sum.amount || 0), 0) +
    //   scheduleMovements
    //     .filter((m) => m.type === 1)
    //     .reduce((acc, m) => acc + (m._sum.amount || 0), 0);

    // Calcular gastos planificados (programados)
    // const plannedExpenses =
    //   scheduleTransactions
    //     .filter((t) => t.type === 2)
    //     .reduce((acc, t) => acc + (t._sum.amount || 0), 0) +
    //   scheduleMovements
    //     .filter((m) => m.type === 2)
    //     .reduce((acc, m) => acc + (m._sum.amount || 0), 0);

    // Calcular presupuesto total y balance proyectado
    const budgetTotal = transactionTotal + plannedIncomes;
    const proyectedBalanceSheet = budgetTotal - plannedExpenses;

    // Agrupar ingresos y gastos programados
    const upcomingPayments = {
      movements: [...scheduleMovements],
      transactions: [...scheduleTransactions],
    };

    // const transactionGroupedByCategory = _.groupBy(
    //   scheduleTransactions,
    //   (t) => t.categoryId,
    // );

    // const movementsGroupedByCategory = _.groupBy(
    //   scheduleMovements,
    //   (m) => m.categoryId,
    // );

    // console.log(movementsGroupedByCategory);

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

    const progress = categories.map((category) => {
      const transactions = scheduleTransactions.filter(
        (t) => t.categoryId === category.id,
      );
      const movements = scheduleMovements.filter(
        (m) => m.categoryId === category.id,
      );
      const transactionsAmount = transactions.reduce(
        (acc, t) => t.amount + acc,
        0,
      );
      const movementsAmount = movements.reduce((acc, t) => t.amount + acc, 0);

      const amount = transactionsAmount + movementsAmount;

      return {
        amount,
        progress: Math.min((amount / budgetTotal) * 100, 100) || 0,
        category,
      };
    });

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
