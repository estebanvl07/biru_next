import { PrismaClient, Prisma } from "@prisma/client";
import { addDays } from "date-fns";
import { createTransaction } from "./transactions.services";
type GetMovement = {
  db: PrismaClient;
  userId: string;
  id: number;
  bookId: string;
};
type MakeMovement = {
  db: PrismaClient;
  userId: string;
  id: number;
  amount: number;
  accountId: number;
  bookId: string;
};

export async function createMovement(
  db: PrismaClient,
  data: Prisma.FixedMovementsUncheckedCreateInput,
) {
  const result = await db.fixedMovements.create({
    data: { ...data, status: true, reminder_sent: true },
  });
  return result;
}

export async function updateMovement(
  db: PrismaClient,
  data: Prisma.FixedMovementsUncheckedUpdateInput,
) {
  const result = await db.fixedMovements.update({
    data,
    where: {
      id: Number(data.id),
      bookId: String(data.bookId),
      userId: String(data.userId),
    },
  });
  return result;
}

export async function getMovementById({ bookId, db, id, userId }: GetMovement) {
  const result = await db.fixedMovements.findFirst({
    where: { id, userId, bookId },
    include: {
      transactions: true,
      category: true,
      entity: true,
      goal: true,
    },
  });
  return result;
}

export async function getMovements(
  db: PrismaClient,
  userId: string,
  bookId: string,
) {
  return db.fixedMovements.findMany({
    where: { userId, bookId },
    include: {
      category: true,
      transactions: {
        include: {
          category: true,
          entity: true,
          goal: true,
          userAccount: true,
        },
      },
      entity: true,
    },
  });
}

export async function makeMovement({
  bookId,
  db,
  id,
  accountId,
  userId,
  amount,
}: MakeMovement) {
  if (!accountId) throw new Error("Debe seleccionar una cuenta");

  const movement = await getMovementById({ db, userId, id, bookId });

  if (movement) {
    try {
      const data = {
        reference: movement.entity?.reference,
        description: movement.description,
        recipient: movement.entity?.name,
        categoryId: movement.categoryId,
        entityId: movement.entityId,
        goalId: movement.goalId,
        fiexedId: id,
        type: movement.type,
        transferType: 1,
        date: new Date(),
        accountId,
        state: 1,
        amount,
        bookId,
        userId,
      };

      await createTransaction(db, data);
      const movementModifed = await db.fixedMovements.update({
        data: {
          last_ocurrence: movement.next_ocurrence,
          next_ocurrence: addDays(
            new Date(movement.next_ocurrence),
            movement.frecuency,
          ),
        },
        where: {
          id,
          userId,
          bookId,
        },
      });

      if (movement.goalId) {
        await db.goals.update({
          where: { id: Number(movement.goalId) },
          data: {
            saved: {
              increment: amount,
            },
          },
        });
      }

      return movementModifed;
    } catch (error) {
      return error;
    }
  }
}

interface DeleteMovement {
  db: PrismaClient;
  userId: string;
  id: number;
  bookId: string;
}

export async function availableMovement({
  db,
  userId,
  id,
  bookId,
}: DeleteMovement) {
  const movement = await getMovementById({ db, userId, id, bookId });

  if (movement) {
    await db.fixedMovements.update({
      data: { status: true },
      where: {
        id,
        userId,
        bookId,
      },
    });
  }

  return movement;
}

export async function disableMovement({
  db,
  userId,
  id,
  bookId,
}: DeleteMovement) {
  const movement = await getMovementById({ db, userId, id, bookId });

  if (movement) {
    await db.fixedMovements.update({
      data: { status: false },
      where: {
        id,
        userId,
        bookId,
      },
    });
  }

  return movement;
}
