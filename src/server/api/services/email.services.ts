import { FixedMovements, PrismaClient, User } from "@prisma/client";
import { mailer } from "~/utils/mailer";
import { generateRandomString } from "~/utils/crypto";
import type { PrismaTransaction } from "~/server/db";
import {
  VerificationCodeType,
  createVerificationCode,
} from "./verificationCode.services";

export async function sendConfirmationEmail(
  db: PrismaClient | PrismaTransaction,
  user: User,
) {
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

  await createVerificationCode(
    db,
    user.id,
    VerificationCodeType.Activation,
    token,
    expireAt,
  );

  console.log("sending email");

  mailer.userConfirmationEmail({
    name,
    to: user.email,
    token: token,
  });
}

export async function recoverUserEmail(
  db: PrismaClient | PrismaTransaction,
  user: User,
) {
  const code = generateRandomString(4).toUpperCase(); // TODO: numbers only
  const name = user.name ?? "Usuario";
  // TODO: use dayjs or date-fns
  const expireAt = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

  await createVerificationCode(
    db,
    user.id,
    VerificationCodeType.Recovery,
    code,
    expireAt,
  );

  mailer.recoverUser({
    name,
    to: user.email,
    code,
  });

  return code;
}

type GroupedData = {
  [key: string]: FixedMovements[];
};

// export async function reminderMovement(db: PrismaClient) {
//   const today = new Date();
//   today.setHours(0, 0, 0, 0);

//   const users = await db.user.findMany({
//     where: {
//       movements: {
//         some: {
//           next_ocurrence: {
//             lte: today,
//           },
//         },
//       },
//     },
//     include: {
//       movements: {
//         where: {
//           next_ocurrence: {
//             lte: today,
//           },
//           reminder_sent: false,
//         },
//       },
//     },
//   });

//   console.log(users);

//   if (users) {
//     users.map(({ email, name, movements }) => {
//       console.log({
//         name: name || "",
//         to: email,
//         movements: movements,
//       });
//       mailer.remiderMovement({
//         name: name || "",
//         to: email,
//         movements: movements,
//       });
//     });
//   }

//   return [];
// }
