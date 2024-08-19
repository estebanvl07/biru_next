import { PrismaClient, Prisma } from "@prisma/client";

export async function createMovement(
  db: PrismaClient,
  data: Prisma.FixedMovementsUncheckedCreateInput,
) {
  const result = await db.fixedMovements.create({
    data: { ...data, status: true, reminder_sent: true },
  });
  return result;
}

export async function getMovementById(db: PrismaClient, id: number) {
  const result = await db.fixedMovements.findFirst({
    where: { id },
  });
  return result;
}

export async function getMovements(db: PrismaClient, userId: string) {
  return db.fixedMovements.findMany({
    where: { userId },
    include: {
      category: true,
      transactions: {
        include: {
          category: true,
          entity: true,
          goal: true,
          user: true,
          userAccount: true,
        },
      },
      entity: true,
    },
  });
}
