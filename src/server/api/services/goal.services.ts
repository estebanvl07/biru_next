import { Prisma, PrismaClient } from "@prisma/client";

type savingByIdType = {
  userId: string;
  id: number;
};

export async function createGoal(
  db: PrismaClient,
  data: Prisma.GoalsUncheckedCreateInput,
) {
  const result = await db.goals.create({ data: { ...data, saved: 0 } });
  return result;
}

export async function goalsUpdateType(db: PrismaClient) {
  return await db.goals.updateMany({ data: { type: 1 } });
}

export async function updateGoal(
  db: PrismaClient,
  data: Prisma.GoalsUncheckedUpdateInput,
) {
  const { id, ...goal } = data;

  const result = await db.goals.update({
    where: { id: Number(id) },
    data: goal,
  });

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
    include: {
      entity: true,
      transactions: {
        include: {
          category: true,
          entity: true,
          userAccount: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      _count: true,
    },
  });
}
