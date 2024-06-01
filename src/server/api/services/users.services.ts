import type { PrismaClient } from "@prisma/client";
import { sendConfirmationEmail } from "./email.services";
import type { RegisterUserInputType } from "~/modules/Register/resolver";
import { comparePassword, hashPassword } from "~/utils/crypto";
import { TRPCError } from "@trpc/server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
  geActivationCode,
  activationCodeUsed,
} from "./verificationCode.services";
import { getAccountById } from "./userAccount.services";

export async function registerUser(
  db: PrismaClient,
  data: RegisterUserInputType,
  // data: Prisma.UserCreateInput,
) {
  try {
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
  } catch (error) {
    // log the instance of the error
    if (error instanceof PrismaClientKnownRequestError) {
      if (
        error.code === "P2002" &&
        (error.meta as { target: string[] })?.target.includes("email")
      ) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "El correo ya esta en uso",
        });
      }
    }
    throw error;
  }
}

export async function activateUser(db: PrismaClient, code: string) {
  const { userId, id: verificationCodeId } = await geActivationCode(db, code);

  const user = await db.user.update({
    where: {
      id: userId,
      emailVerified: null,
    },
    data: {
      emailVerified: new Date(),
    },
  });

  await activationCodeUsed(db, verificationCodeId);

  return user;
}

export async function getUserByEmail(db: PrismaClient, email: string) {
  return db.user.findUnique({
    where: { email },
  });
}

export async function authPasswordUser(
  db: PrismaClient,
  email: string,
  password: string,
) {
  const user = await db.user.findUnique({
    where: { email },
    include: {
      userPassword: {
        select: {
          password: true,
        },
      },
    },
  });

  if (!user) {
    return null;
  }

  if (!user.userPassword) {
    return null;
  }

  const isPasswordMatching = comparePassword(
    password,
    user.userPassword.password ?? "",
  );

  if (!isPasswordMatching) {
    return null;
  }

  return user;
}

export async function changePassword(
  db: PrismaClient,
  code: string,
  password: string,
) {
  try {
    const { userId, id: verificationCodeId } = await geActivationCode(db, code);

    console.log(userId);

    const passwordHashed = hashPassword(password);
    const user = await db.userPassword.update({
      where: {
        userId,
      },
      data: {
        password: passwordHashed,
      },
    });

    await activationCodeUsed(db, verificationCodeId);

    return user;
  } catch (error) {
    console.error(error);
  }
}
