import { Prisma, PrismaClient } from "@prisma/client";

// {
//     id        Int      @id @default(autoincrement())
//     name      String
//     type      Int
//     balance   Int?     @default(0)
//     reference String?
//     state     Int?     @default(1) // 1: activo, 0: inactivo
//     createdAt DateTime @default(now())
//     updatedAt DateTime @updatedAt
//     user      User     @relation(fields: [userId], references: [id])
//     userId    String
//   }

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

export function createAccount(
  db: PrismaClient,
  data: Prisma.UserAccountUncheckedCreateInput,
) {
  return db.userAccount.create({
    data: {
      ...data,
      state: 1,
    },
  });
}

export function getAllAccounts(db: PrismaClient, userId: string) {
  return db.userAccount.findMany({
    where: {
      userId,
    },
  });
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
