import type { PrismaClient, User } from "@prisma/client";
import { mailer } from "~/utils/mailer";
import { generateRandomString } from "~/utils/crypto";

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
