import { Prisma, PrismaClient } from "@prisma/client";

type savingByIdType = {
  userId: string;
  id: number;
};

export async function createSaving(
  db: PrismaClient,
  data: Prisma.SavingsUncheckedCreateInput,
) {
  const result = await db.savings.create({ data });
  return result;
}

export async function getSavings(db: PrismaClient, userId: string) {
  return await db.savings.findMany({ where: { userId } });
}

export async function getSavingById(
  db: PrismaClient,
  { userId, id }: savingByIdType,
) {
  return await db.savings.findMany({ where: { userId, id } });
}
