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

export function createAccount(
  db: PrismaClient,
  data: Prisma.UserAccountUncheckedCreateInput,
) {
  console.log(data);

  return db.userAccount.create({
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
