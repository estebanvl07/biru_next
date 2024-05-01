import { Prisma, PrismaClient } from "@prisma/client";

export function createTransaction(
  db: PrismaClient,
  data: Prisma.TransactionUncheckedCreateInput,
) {
  return db.transaction.create({
    data: { ...data, state: 1 },
  });
}

export function getTransactionsByAccount(db: PrismaClient, accountId: number) {
  return db.transaction.findMany({ where: { accountId } });
}
