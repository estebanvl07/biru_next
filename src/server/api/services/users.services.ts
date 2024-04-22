import { Prisma, PrismaClient } from "@prisma/client";

export function createUser(db: PrismaClient, data: Prisma.UserCreateInput) {
  db.user.create({
    data,
  });
}
