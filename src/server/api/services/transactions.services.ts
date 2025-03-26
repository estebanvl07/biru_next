import type { Prisma, PrismaClient } from "@prisma/client";
import { FilterOptions } from "~/types/transactions";
import { filtersHandler } from "../filterHandler";

export async function createTransaction(
  db: PrismaClient,
  data: Prisma.TransactionUncheckedCreateInput,
) {
  const result = await db.$transaction(async (db) => {
    const transaction = await db.transaction.create({
      data,
    });

    if (data.transferType === 2) {
      const goal = await db.goals.findFirst({
        where: { id: Number(data.goalId) },
      });

      let validate;
      if (goal?.type === 1) {
        validate = data.type === 1 ? 1 : -1;
      } else {
        validate = data.type === 1 ? -1 : 1;
      }

      await db.goals.update({
        where: { id: Number(data.goalId) },
        data: {
          saved: {
            increment: data.amount,
          },
        },
      });

      await db.userAccount.update({
        where: { id: data.accountId! },
        data: {
          balance: {
            increment: data.amount * validate,
          },
        },
      });
    } else {
      let validate;
      if (data.transferType === 1) {
        validate = data.type === 1 ? 1 : -1;
      } else {
        validate = data.type === 1 ? -1 : 1;
      }
      await db.userAccount.update({
        where: { id: data.accountId! },
        data: {
          balance: {
            increment: data.amount * validate,
          },
        },
      });
    }

    return transaction;
  });

  return result;
}

export async function updateTransaction(
  db: PrismaClient,
  id: number,
  data: Prisma.TransactionUncheckedUpdateInput,
) {
  return db.$transaction(async (db) => {
    const oldTransaction = await db.transaction.findUnique({
      where: { id },
      select: {
        amount: true,
        type: true,
        accountId: true,
        transferType: true,
      },
    });

    if (!oldTransaction) {
      throw new Error("Transaction not found");
    }

    const transferType = oldTransaction.transferType;

    // Obtain the new amount and type if provided, otherwise use old values
    const newAmount =
      data.amount !== undefined
        ? (data.amount as number)
        : oldTransaction.amount;
    const newType =
      data.type !== undefined ? (data.type as number) : oldTransaction.type;

    let amountDiff = 0;

    if (transferType === 1) {
      // Transfer type
      amountDiff =
        newAmount * (newType === 1 ? 1 : -1) -
        oldTransaction.amount * (oldTransaction.type === 1 ? 1 : -1);
    } else if (transferType === 2) {
      // Savings type
      amountDiff =
        newAmount * (newType === 1 ? -1 : 1) -
        oldTransaction.amount * (oldTransaction.type === 1 ? -1 : 1);
    }

    await db.userAccount.update({
      where: { id: oldTransaction.accountId! },
      data: {
        balance: {
          increment: amountDiff,
        },
      },
    });

    const transaction = await db.transaction.update({
      where: { id },
      data,
    });

    return transaction;
  });
}

export async function deleteTransaction(db: PrismaClient, id: number) {
  return db.$transaction(async (db) => {
    const transaction = await db.transaction.findUnique({
      where: { id },
      select: { amount: true, type: true, accountId: true },
    });

    await db.transaction.delete({ where: { id } });

    await db.userAccount.update({
      where: { id: transaction!.accountId! },
      data: {
        balance: {
          increment: -transaction!.amount * (transaction!.type === 1 ? 1 : -1),
        },
      },
    });

    return transaction;
  });
}

export async function getTransactionsByFilter(
  db: PrismaClient,
  options: FilterOptions,
) {
  const { bookId } = options;
  const { filterEndDate, filterStartDate } = filtersHandler(options);

  const transactionsFound = await db.transaction.findMany({
    where: {
      bookId,
      date: {
        gte: filterStartDate,
        lt: filterEndDate,
      },
    },
    include: { userAccount: true, category: true, entity: true, goal: true },
    orderBy: {
      date: "desc",
    },
  });

  console.log(transactionsFound);

  return transactionsFound;
}

export async function getTransactionById(
  db: PrismaClient,
  id: number,
  bookId: string,
  userId: string,
) {
  return await db.transaction.findFirst({
    where: { id, bookId, userId },
    include: { userAccount: true, category: true, entity: true, goal: true },
  });
}

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;
export type TransactionIncludes = ThenArg<
  ReturnType<typeof getTransactionById>
>;
