import type { PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import type { PrismaTransaction } from "~/server/db";

export enum VerificationCodeType {
  Activation = 1,
  Recovery = 2,
}

export async function geActivationCode(db: PrismaClient, code: string) {
  const verificationCode = await db.userVerificationCode.findFirst({
    where: {
      usedAt: null,
      type: VerificationCodeType.Activation,
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

export async function getRecoveryCode(
  db: PrismaClient,
  code: string,
  email: string,
) {
  const tokenFound = await db.userVerificationCode.findFirst({
    where: {
      usedAt: null,
      type: VerificationCodeType.Recovery,
      token: code,
      expireAt: {
        gte: new Date(),
      },
      user: {
        email,
      },
    },
    select: {
      id: true,
      userId: true,
    },
  });

  if (!tokenFound) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "El código de recuperación no es válido",
    });
  }
  return tokenFound;
}

export async function getRecoveryCodeById(db: PrismaClient, id: number) {
  const tokenFound = await db.userVerificationCode.findUnique({
    where: {
      usedAt: null,
      type: VerificationCodeType.Recovery,
      id,
      expireAt: {
        gte: new Date(),
      },
    },
    select: {
      userId: true,
      id: true,
    },
  });

  if (!tokenFound) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "El código de recuperación no es válido",
    });
  }

  return tokenFound;
}

export async function updateVerificationCodeUsage(
  db: PrismaClient | PrismaTransaction,
  verificationCodeId: number,
  type: VerificationCodeType,
) {
  return db.userVerificationCode.update({
    where: {
      usedAt: null,
      type,
      id: verificationCodeId,
    },
    data: {
      usedAt: new Date(),
    },
  });
}

export async function createVerificationCode(
  db: PrismaClient | PrismaTransaction,
  userId: string,
  type: VerificationCodeType,
  token: string,
  expireAt: Date,
) {
  return db.userVerificationCode.create({
    data: {
      type,
      token,
      expireAt,
      userId,
    },
  });
}
