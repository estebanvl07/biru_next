import type { Prisma, PrismaClient } from "@prisma/client";

export function setSeed(db: PrismaClient, userId: string) {
  const data: Prisma.UserAccountUncheckedCreateInput = {
    name: "Ahorro",
    type: 1,
    balance: 0,
    reference: "",
    state: 1,
    userId,
  };

  return db.userAccount.create({
    data,
  });
}

export async function createAccount(
  db: PrismaClient,
  data: Prisma.UserAccountUncheckedCreateInput,
) {
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
        userId: data.userId,
      },
    });
  }

  return accountCreated;
}

async function createDefaultAccounts(db: PrismaClient, userId: string) {
  await db.userAccount.createMany({
    data: [
      {
        name: "Efectivo",
        type: 2,
        userId,
      },
      {
        name: "Ahorro",
        type: 1,
        userId,
      },
    ],
  });

  return db.userAccount.findMany({
    where: {
      userId,
      state: 1,
    },
  });
}

export async function getAllAccounts(db: PrismaClient, userId: string) {
  const activeAccounts = await db.userAccount.findMany({
    where: {
      userId,
      state: 1,
    },
    orderBy: {
      lastAccess: "desc",
    },
  });

  if (activeAccounts.length === 0) {
    return createDefaultAccounts(db, userId);
  }

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

export function setLastAccess(db: PrismaClient, id: number) {
  return db.userAccount.update({
    where: {
      id,
    },
    data: {
      lastAccess: new Date(),
    },
  });
}
