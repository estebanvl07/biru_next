import type { PrismaClient } from "@prisma/client";
import { recoverUserEmail, sendConfirmationEmail } from "./email.services";
import type { RegisterUserInputType } from "~/modules/Register/resolver";
import { comparePassword, hashPassword } from "~/utils/crypto";
import { TRPCError } from "@trpc/server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
  geActivationCode,
  getRecoveryCode,
  getRecoveryCodeById,
  updateVerificationCodeUsage,
  VerificationCodeType,
} from "./verificationCode.services";
import type { PrismaTransaction } from "~/server/db";
import type {
  VerifyCodeInputType,
  ChangePasswordInputType,
} from "~/modules/Recover/resolver";
import jwt from "jsonwebtoken";
import { env } from "~/env";

export async function registerUser(
  db: PrismaClient,
  data: RegisterUserInputType,
) {
  try {
    async function userAccountTransaction(tx: PrismaTransaction) {
      const password = hashPassword(data.password);
      const user = await tx.user.create({
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

      await tx.account.create({
        data: {
          provider: "credentials",
          providerAccountId: user.userPassword!.id,
          type: "credentials",
          userId: user.id,
        },
      });

      user.userPassword = null;
      return user;
    }

    const user = await db.$transaction(async (tx) => {
      const user = await userAccountTransaction(tx);
      await sendConfirmationEmail(tx, user);
    });

    return user;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (
        error.code === "P2002" &&
        (error.meta as { target: string[] })?.target.includes("email")
      ) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "Ha ocurrido un error, prueba con otro correo o intenta más tarde",
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

  await updateVerificationCodeUsage(
    db,
    verificationCodeId,
    VerificationCodeType.Activation,
  );

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
    user.userPassword.password,
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

    const passwordHashed = hashPassword(password);

    const user = await db.user.findFirst({
      where: {
        id: userId
      }
    })

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "El usuario no ha sido encontrado",
      });
    }

    const [userPass] = await db.userPassword.findMany({
      where: {
        userId
      }
    })

    console.log("user pass", userPass);
    if (!userPass) {
      console.log("because not user found");
      
      await db.userPassword.create({
        data: {
          state: 1,
          userId,
          email: user.email,
          password: passwordHashed,
        },
      });
    } else {
      await db.userPassword.update({
        where: {
          userId,
        },
        data: {
          password: passwordHashed,
        },
      });
    }

    await updateVerificationCodeUsage(
      db,
      verificationCodeId,
      VerificationCodeType.Activation,
    );

    return user;
  } catch (error) {
    console.error(error);
  }
}

export async function recoverUser(db: PrismaClient, email: string) {
  const userWithPassword = await db.user.findUnique({
    where: {
      email,
      userPassword: { email },
    },
    include: {
      userPassword: true,
    },
  });

  if (!userWithPassword || !userWithPassword?.userPassword) {
    // Si el usuario existe pero no tiene contraseña enviar un correo que se intento ingresar con contraseña y que solo tiene habilitado x, Ex. Google, Facebook
    return;
  }

  await recoverUserEmail(db, userWithPassword);
}

export async function recoverVerify(
  db: PrismaClient,
  data: VerifyCodeInputType,
) {
  const { id: codeId } = await getRecoveryCode(db, data.code, data.email);

  const payload = { codeId };
  const token = jwt.sign(payload, env.JWT_CHANGE_PASSWORD, {
    expiresIn: "1h",
  });

  return token;
}

export async function recoverChangePassword(
  db: PrismaClient,
  data: ChangePasswordInputType,
) {
  const payload = jwt.verify(data.token, env.JWT_CHANGE_PASSWORD);
  if (typeof payload !== "object" || typeof payload.codeId !== "number") {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Token inválido",
    });
  }

  const { userId, id: codeId } = await getRecoveryCodeById(db, payload.codeId);

  const password = hashPassword(data.password);

  await db.$transaction(async (tx) => {
    await tx.userPassword.update({
      where: {
        userId,
      },
      data: {
        password,
      },
    });

    await updateVerificationCodeUsage(
      tx,
      codeId,
      VerificationCodeType.Recovery,
    );
  });
}
