import type { PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";

export async function geActivationCode(db: PrismaClient, code: string) {
  const verificationCode = await db.userVerificationCode.findFirst({
    where: {
      usedAt: null,
      type: 1,
      token: code,
      expireAt: {
        gte: new Date(),
      },
    },
    select: {
      id: true,
      userId: true,
    },
  });

  if (!verificationCode) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "El código de activación no es válido",
    });
  }

  return verificationCode;
}

export const activationCodeUsed = (
  db: PrismaClient,
  verificationCodeId: number,
) => {
  return db.userVerificationCode.update({
    where: {
      usedAt: null,
      type: 1,
      id: verificationCodeId,
    },
    data: {
      usedAt: new Date(),
    },
  });
};
