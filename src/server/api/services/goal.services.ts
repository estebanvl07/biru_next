import { Prisma, PrismaClient } from "@prisma/client";

type savingByIdType = {
  userId: string;
  id: number;
};

export async function createGoal(
  db: PrismaClient,
  data: Prisma.GoalsUncheckedCreateInput,
) {
  const result = await db.goals.create({ data });
  return result;
}

export async function getGoals(db: PrismaClient, userId: string) {
  return await db.goals.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

export async function getGoalById(
  db: PrismaClient,
  { userId, id }: savingByIdType,
) {
  return await db.goals.findMany({
    where: { userId, id },
    include: { transactions: true, _count: true },
  });
}
