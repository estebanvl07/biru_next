import { PrismaClient } from "@prisma/client";

export async function getIncomes(db: PrismaClient, userId: string) {
  const fixedIncomes = await db.fixedMovements.findMany({
    where: { type: 1, userId, status: true },
  });

  const fixedGoalsIncome = await db.goals.findMany({
    where: { type: 1, userId, state: 1 },
  });

  return {
    fixedIncomes,
  };
}

export async function getEgress(db: PrismaClient, userId: string) {
  const fixedEgress = await db.fixedMovements.findMany({
    where: { type: 2, userId, status: true },
  });

  return {
    fixedEgress,
  };
}

export async function getMovementPlanneds(db: PrismaClient, userId: string) {
  return db.fixedMovements.findMany({
    where: { userId, status: true },
  });
}
