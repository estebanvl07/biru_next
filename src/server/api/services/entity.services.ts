import { Prisma, PrismaClient } from "@prisma/client";

type entityByIdType = {
  userId: string;
  id: number;
};

export async function createEntity(
  db: PrismaClient,
  data: Prisma.EntitiesUncheckedCreateInput,
) {
  const result = await db.entities.create({ data });
  return result;
}

export async function getEntities(db: PrismaClient, userId: string) {
  return await db.entities.findMany({
    where: { userId },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getEntityById(
  db: PrismaClient,
  { userId, id }: entityByIdType,
) {
  return await db.entities.findMany({
    where: { userId, id },
    include: { transactions: true },
  });
}
