import { Prisma, PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";

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
      data,
    });
    return book;
  } catch (error) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message:
        "Ha ocurrido un error, prueba con otro correo o intenta más tarde",
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
