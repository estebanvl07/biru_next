import { Prisma, PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { endOfMonth, startOfMonth } from "date-fns";

export async function getBooksByUserId(db: PrismaClient, userId: string) {
  const books = await db.book.findMany({
    where: {
      userId,
    },
  });
  return books;
}

export async function getBookById(
  db: PrismaClient,
  bookId: string,
  userId: string,
) {
  const books = await db.book.findFirst({
    where: {
      userId,
      id: bookId,
    },
  });
  return books;
}

export async function createBook(
  db: PrismaClient,
  data: Prisma.BookUncheckedCreateInput,
) {
  try {
    const book = await db.book.create({
      data: {
        ...data,
        accounts: {
          create: {
            name: "Cuenta Principal",
            type: 2,
            balance: 0,
            isMain: true,
            userId: data.userId,
          },
        },
      },
    });

    return book;
  } catch (error) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Ha ocurrido un error, Intente de nuevo",
    });
  }
}

export async function updateBook(
  db: PrismaClient,
  data: Prisma.BookUncheckedUpdateInput,
) {
  return await db.book.update({
    data,
    where: {
      id: String(data.id),
      userId: String(data.userId),
    },
  });
}

export async function deleteBook(
  db: PrismaClient,
  bookId: string,
  userId: string,
) {
  return await db.book.delete({
    where: {
      userId,
      id: bookId,
    },
  });
}

export async function setLastAccess(
  db: PrismaClient,
  bookId: string,
  userId: string,
) {
  return await db.book.update({
    where: {
      id: bookId,
      userId,
    },
    data: {
      lastAccess: new Date(),
    },
  });
}

export async function getBookBalance(
  db: PrismaClient,
  userId: string,
  bookId: string,
) {
  return db.$transaction(async (db) => {
    const result = await db.transaction.groupBy({
      by: ["type", "transferType"],
      where: { state: 1, userId, bookId },
      _sum: { amount: true },
    });

    const incomes =
      result.find((r) => r.type === 1 && r.transferType === 1)?._sum.amount ||
      0;
    const egress =
      result.find((r) => r.type === 2 && r.transferType === 1)?._sum.amount ||
      0;
    const savings =
      result.find((r) => r.type === 2 && r.transferType === 2)?._sum.amount ||
      0;
    const transactionTotal = incomes - egress - savings;

    return {
      incomes,
      egress,
      savings,
      transactionTotal,
    };
  });
}
