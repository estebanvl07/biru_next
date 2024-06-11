import type { PrismaClient, User } from "@prisma/client";
import { mailer } from "~/utils/mailer";
import { generateRandomString } from "~/utils/crypto";
import { TRPCError } from "@trpc/server";

export async function sendConfirmationEmail(db: PrismaClient, user: User) {
  const token = generateRandomString(24);
  const name = user.name ?? "Usuario";
  // TODO: use dayjs or date-fns
  const expireAt = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

  await db.userVerificationCode.create({
    data: {
      type: 1,
      token,
      expireAt,
      userId: user.id,
    },
  });

  mailer.userConfirmationEmail({
    name,
    to: user.email,
    token: token,
  });
}

export async function userConfirmCode(db: PrismaClient, email: string) {
  const [user] = await db.user.findMany({ where: { email } });

  if (!user) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "El usuario no ha sido encontrado",
    });
  }

  const code = generateRandomString(6);
  const expireAt = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

  await db.userVerificationCode.create({
    data: {
      type: 1,
      token: code,
      expireAt,
      userId: user.id,
    },
  });

  mailer.recover({
    code,
    name: user.name ?? "Invitado",
    to: user.email,
  });
}
