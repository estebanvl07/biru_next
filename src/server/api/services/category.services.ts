import type { Prisma, PrismaClient } from "@prisma/client";
import { SystemCategories } from "~/lib/resource/system-catetories";
import { Category } from "~/modules/Loaders/ski.components";
import { CreateCategory } from "~/modules/category/schema";

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

export async function updateCategory(
  db: PrismaClient,
  data: Prisma.CategoryUncheckedUpdateInput,
) {
  const { id, ...category } = data;

  const result = await db.category.update({
    where: { id: Number(id) },
    data: category,
  });
  return result;
}

export function createDefaults(
  db: PrismaClient,
  data: {
    categories: CreateCategory[];
    userId: string;
  },
) {
  const dataSave = data.categories.map((cat) => {
    return { ...cat, state: 1, userId: data.userId };
  });

  return db.category.createMany({
    data: dataSave as Prisma.CategoryCreateManyInput[],
  });
}

export function getAllCategories(db: PrismaClient, userId: string) {
  return db.category.findMany({
    where: {
      userId,
    },
  });
}

export async function getCategoryById(
  db: PrismaClient,
  id: number,
  userId: string,
) {
  return db.category.findMany({
    where: {
      id,
      userId,
    },
    include: {
      transactions: {
        include: {
          category: true,
          entity: true,
          goal: true,
          userAccount: true
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
}
