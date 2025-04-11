import type { Prisma, PrismaClient } from "@prisma/client";

export async function getMainAccount(
  db: PrismaClient,
  userId: string,
  bookId: string,
) {
  return await db.userAccount.findFirst({
    where: {
      bookId,
      userId,
      isMain: true,
    },
  });
}

export async function getAccountsByBook(
  db: PrismaClient,
  userId: string,
  bookId: string,
) {
  return await db.userAccount.findMany({
    where: {
      bookId,
      userId,
    },
  });
}

export async function createAccount(
  db: PrismaClient,
  data: Prisma.UserAccountUncheckedCreateInput,
) {
  try {
    if (data.isMain) {
      const mainAccountFound = await getMainAccount(
        db,
        data.userId,
        data.bookId,
      );
      if (mainAccountFound) {
        db.userAccount.update({
          data: {
            isMain: false,
          },
          where: {
            userId: data.userId,
            id: mainAccountFound.id,
            isMain: true,
          },
        });
      }
    }

    const accountCreated = await db.userAccount.create({
      data: {
        ...data,
        state: 1,
      },
    });

    if (data.balance) {
      await db.transaction.create({
        data: {
          amount: data.balance,
          description: "Balance incial",
          date: new Date(),
          type: 1,
          state: 1,
          accountId: accountCreated.id,
          bookId: accountCreated.bookId,
          userId: data.userId,
        },
      });
    }

    return accountCreated;
  } catch (error) {
    throw error;
  }
}

export async function getAllAccounts(db: PrismaClient, userId: string) {
  const activeAccounts = await db.userAccount.findMany({
    where: {
      userId,
      state: 1,
    },
  });

  return activeAccounts;
}

export function getAccountById(
  db: PrismaClient,
  { userId, id }: { userId: string; id: number },
) {
  return db.userAccount.findUnique({
    where: {
      userId,
      id,
    },
  });
}
