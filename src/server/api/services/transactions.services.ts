import type { Prisma, PrismaClient } from "@prisma/client";

export async function createTransaction(
  db: PrismaClient,
  data: Prisma.TransactionUncheckedCreateInput,
) {
  const result = await db.$transaction(async (db) => {
    const transaction = await db.transaction.create({ data });
    await db.userAccount.update({
      where: { id: data.accountId },
      data: {
        balance: {
          increment: data.amount * (data.type === 1 ? 1 : -1),
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

    if (typeof data.amount !== "undefined") {
      const oldTransaction = await db.transaction.findUnique({
        where: { id },
        select: { amount: true, type: true },
      });
      const amountDiff =
        (data.amount as number) * (data.type === 1 ? 1 : -1) -
        oldTransaction!.amount * (oldTransaction!.type === 1 ? 1 : -1);

      await db.userAccount.update({
        where: { id: transaction.accountId },
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
    include: { userAccount: true, category: true, entity: true },
  });
}
