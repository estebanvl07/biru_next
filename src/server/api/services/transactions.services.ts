import type { Prisma, PrismaClient } from "@prisma/client";
import { FILTERS, FilterOptions } from "~/types/transactions";
import { filtersHander } from "../filterHandler";

export async function createTransaction(
  db: PrismaClient,
  data: Prisma.TransactionUncheckedCreateInput,
) {
  const result = await db.$transaction(async (db) => {
    const transaction = await db.transaction.create({
      data,
    });

    let validate;
    if (data.transferType === 1) {
      validate = data.type === 1 ? 1 : -1;
    } else {
      validate = data.type === 1 ? -1 : 1;
    }

    if (data.transferType === 2) {
      await db.goals.update({
        where: { id: Number(data.goalId) },
        data: {
          saved: {
            increment: data.amount * (data.type === 1 ? 1 : -1),
          },
        },
      });
    }

    await db.userAccount.update({
      where: { id: data.accountId },
      data: {
        balance: {
          increment: data.amount * validate,
        },
      },
    });

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
    const transaction = await db.transaction.update({
      where: { id },
      data,
    });

    if (
      typeof data.amount !== "undefined" ||
      typeof data.type !== "undefined"
    ) {
      const oldTransaction = await db.transaction.findUnique({
        where: { id },
        select: {
          amount: true,
          type: true,
          accountId: true,
          transferType: true,
        },
      });

      const transferType = oldTransaction!.transferType;
      const typeMultiplier = transferType === 1 ? 1 : -1;

      let amountDiff = 0;
      if (transferType === 1) {
        amountDiff =
          (data.amount as number) *
            (data.type === 1 ? typeMultiplier : -typeMultiplier) -
          oldTransaction!.amount *
            (oldTransaction!.type === 1 ? typeMultiplier : -typeMultiplier);
      } else if (transferType === 2) {
        amountDiff = (data.amount as number) * typeMultiplier;
      }

      await db.userAccount.update({
        where: { id: oldTransaction!.accountId },
        data: {
          balance: {
            increment: amountDiff,
          },
        },
      });
    }

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
      where: { id: transaction!.accountId },
      data: {
        balance: {
          increment: -transaction!.amount * (transaction!.type === 1 ? 1 : -1),
        },
      },
    });

    return transaction;
  });
}

export function getTransactionsByAccount(db: PrismaClient, accountId: number) {
  return db.transaction.findMany({
    where: { accountId },
    include: { userAccount: true, category: true, entity: true, goal: true },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getTransactionsByFilter(
  db: PrismaClient,
  options: FilterOptions,
) {
  const { accountId } = options;
  const { filterEndDate, filterStartDate } = filtersHander(options);

  return db.transaction.findMany({
    where: {
      accountId,
      date: {
        gte: filterStartDate,
        lt: filterEndDate,
      },
    },
    include: { userAccount: true, category: true, entity: true, goal: true },
    orderBy: {
      createdAt: "desc",
    },
  });
}
