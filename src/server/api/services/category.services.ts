import type { Prisma, PrismaClient } from "@prisma/client";

export function createCategory(
  db: PrismaClient,
  data: Omit<Prisma.CategoryCreateManyInput, "state">,
) {
  return db.category.create({
    data: {
      ...data,
      state: 1,
    },
  });
}

export function getAllCategories(db: PrismaClient, userId: string) {
  return db.category.findMany({
    where: {
      userId,
    },
  });
}
