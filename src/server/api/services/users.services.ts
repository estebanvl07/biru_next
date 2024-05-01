import type { PrismaClient } from "@prisma/client";
import { sendConfirmationEmail } from "./email.services";
import type { RegisterUserInputType } from "~/modules/register/resolver";
import { hashPassword } from "~/utils/crypto";

export async function registerUser(
  db: PrismaClient,
  data: RegisterUserInputType,
  // data: Prisma.UserCreateInput,
) {
  const password = hashPassword(data.password);
  const user = await db.user.create({
    data: {
      email: data.email.toLowerCase(),
      name: data.name,
      userPassword: {
        create: {
          password,
          email: data.email.toLowerCase(),
        },
      },
    },
    include: {
      userPassword: true,
    },
  });
  await db.account.create({
    data: {
      provider: "credentials",
      providerAccountId: user.userPassword!.id,
      type: "credentials",
      userId: user.id,
    },
  });

  await sendConfirmationEmail(db, user);

  return user;
}
