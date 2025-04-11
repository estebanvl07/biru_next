import type { Prisma, PrismaClient } from "@prisma/client";
import { FilterOptions } from "~/types/transactions";
import { filtersHandler } from "../filterHandler";
import { advanceSchema } from "~/modules/Transactions/advanceSchema";

interface PaginationOptions {
  limit: number;
  page: number;
}

export async function createTransaction(
  mainDb: PrismaClient,
  data: Prisma.TransactionUncheckedCreateInput,
) {
  const result = await mainDb.$transaction(async (db) => {
    const transaction = await db.transaction.create({
      data,
    });

    if (data.state !== 3) {
      makeTransaction(mainDb, transaction.bookId, transaction.id, data.userId);
    }

    return transaction;
  });

  return result;
}

export async function searchTransactions(
  db: PrismaClient,
  data: advanceSchema,
  userId: string,
) {
  const {
    bookId,
    categoryId,
    entityId,
    type,
    state,
    max,
    min,
    start_date,
    end_date,
  } = data;

  const transactionsFound = await db.transaction.findMany({
    where: {
      bookId,
      categoryId,
      entityId,
      amount: {
        gte: min,
        lte: max,
      },
      type,
      state,
      date: {
        gte: start_date,
        lt: end_date,
      },

      userId,
    },
    include: { userAccount: true, category: true, entity: true, goal: true },
    orderBy: {
      date: "desc",
    },
  });

  return transactionsFound;
}

export async function makeTransaction(
  db: PrismaClient,
  bookId: string,
  id: number,
  userId: string,
) {
  const data = await db.transaction.findFirst({
    where: {
      bookId,
      id,
      userId,
    },
  });

  if (!data) throw new Error("Transaction not found");

  if (data.state !== 1) {
    // comfirmed transaction
    await db.transaction.update({
      data: {
        state: 1,
      },
      where: {
        id: Number(data.id),
      },
    });
  }

  if (data.transferType === 2) {
    const goal = await db.goals.findFirst({
      where: { id: Number(data.goalId) },
    });

    let validate;
    if (goal?.type === 1) {
      validate = data.type === 1 ? 1 : -1;
    } else {
      validate = data.type === 1 ? -1 : 1;
    }

    await db.goals.update({
      where: { id: Number(data.goalId) },
      data: {
        saved: {
          increment: data.amount,
        },
      },
    });

    await db.userAccount.update({
      where: { id: data.accountId! },
      data: {
        balance: {
          increment: data.amount * validate,
        },
      },
    });
  } else {
    let validate;
    if (data.transferType === 1) {
      validate = data.type === 1 ? 1 : -1;
    } else {
      validate = data.type === 1 ? -1 : 1;
    }
    await db.userAccount.update({
      where: { id: data.accountId! },
      data: {
        balance: {
          increment: data.amount * validate,
        },
      },
    });
  }
}

export async function updateTransaction(
  db: PrismaClient,
  id: number,
  data: Prisma.TransactionUncheckedUpdateInput,
) {
  return db.$transaction(async (db) => {
    const oldTransaction = await db.transaction.findUnique({
      where: { id },
      select: {
        amount: true,
        type: true,
        accountId: true,
        transferType: true,
      },
    });

    if (!oldTransaction) {
      throw new Error("Transaction not found");
    }

    const transferType = oldTransaction.transferType;

    // Obtain the new amount and type if provided, otherwise use old values
    const newAmount =
      data.amount !== undefined
        ? (data.amount as number)
        : oldTransaction.amount;
    const newType =
      data.type !== undefined ? (data.type as number) : oldTransaction.type;

    let amountDiff = 0;

    if (transferType === 1) {
      // Transfer type
      amountDiff =
        newAmount * (newType === 1 ? 1 : -1) -
        oldTransaction.amount * (oldTransaction.type === 1 ? 1 : -1);
    } else if (transferType === 2) {
      // Savings type
      amountDiff =
        newAmount * (newType === 1 ? -1 : 1) -
        oldTransaction.amount * (oldTransaction.type === 1 ? -1 : 1);
    }

    await db.userAccount.update({
      where: { id: oldTransaction.accountId! },
      data: {
        balance: {
          increment: amountDiff,
        },
      },
    });

    const transaction = await db.transaction.update({
      where: { id },
      data,
    });

    return transaction;
  });
}

export async function deleteTransaction(db: PrismaClient, id: number) {
  return db.$transaction(async (db) => {
    const transaction = await db.transaction.findUnique({
      where: { id },
      select: { amount: true, type: true, accountId: true },
    });

    await db.transaction.delete({ where: { id } });

    await db.userAccount.update({
      where: { id: transaction!.accountId! },
      data: {
        balance: {
          increment: -transaction!.amount * (transaction!.type === 1 ? 1 : -1),
        },
      },
    });

    return transaction;
  });
}

export async function getTransactionsByFilter(
  db: PrismaClient,
  options: FilterOptions,
) {
  const { bookId } = options;
  const { filterEndDate, filterStartDate } = filtersHandler(options);

  const transactionsFound = await db.transaction.findMany({
    where: {
      bookId,
      date: {
        gte: filterStartDate,
        lt: filterEndDate,
      },
    },
    include: { userAccount: true, category: true, entity: true, goal: true },
    orderBy: {
      date: "desc",
    },
  });

  return transactionsFound;
}

export async function getTransactionsByQuery(
  db: PrismaClient,
  bookId: string,
  userId: string,
  query: string,
) {
  return db.transaction.findMany({
    where: {
      bookId,
      userId,
      OR: [
        {
          description: {
            mode: "insensitive",
            contains: query,
          },
        },
        {
          category: {
            name: {
              mode: "insensitive",
              contains: query,
            },
          },
        },
        {
          entity: {
            name: {
              contains: query,
            },
          },
        },
        {
          goal: {
            name: {
              contains: query,
            },
          },
        },
      ],
    },
    include: { userAccount: true, category: true, entity: true, goal: true },
    orderBy: {
      date: "desc",
    },
    take: 50,
  });
}

export async function getTransactions(
  db: PrismaClient,
  bookId: string,
  userId: string,
  options: PaginationOptions,
) {
  const { limit = 5, page = 1 } = options;
  const skip = (page - 1) * limit;
  const [transaction, total] = await db.$transaction([
    db.transaction.findMany({
      skip,
      take: limit,
      where: {
        bookId,
        userId,
      },
      include: { userAccount: true, category: true, entity: true, goal: true },
      orderBy: { createdAt: "desc" },
    }),
    db.transaction.count({
      where: {
        bookId,
        userId,
      },
    }),
  ]);

  return {
    transaction,
    total,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getTransactionById(
  db: PrismaClient,
  id: number,
  bookId: string,
  userId: string,
) {
  return await db.transaction.findFirst({
    where: { id, bookId, userId },
    include: { userAccount: true, category: true, entity: true, goal: true },
  });
}

export async function cancelTransaction(
  db: PrismaClient,
  id: number,
  bookId: string,
  userId: string,
) {
  const transaction = await db.transaction.update({
    where: { id, bookId, userId },
    include: { goal: true },
    data: { state: 2 },
  });

  let validate;

  if (transaction.goalId) {
    if (transaction.goal?.type === 1) {
      validate = transaction.type === 1 ? -1 : 1;
    } else {
      validate = transaction.type === 1 ? 1 : -1;
    }
  } else {
    validate = transaction.type === 1 ? -1 : 1;
  }

  db.userAccount.update({
    where: { id: transaction.accountId!, bookId, userId },
    data: {
      balance: {
        increment: -transaction.amount * validate,
      },
    },
  });

  if (transaction.goalId) {
    db.goals.update({
      where: { id: Number(transaction.goalId) },
      data: {
        saved: {
          decrement: transaction.amount,
        },
      },
    });
  }

  return transaction;
}

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;
export type TransactionIncludes = ThenArg<
  ReturnType<typeof getTransactionById>
>;
