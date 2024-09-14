import type { NextApiRequest, NextApiResponse } from "next";
// To stream responses you must use Route Handlers in the App Router, even if the rest of your app uses the Pages Router.
import { PrismaClient } from "@prisma/client";
import { reminderMovement } from "~/server/api/services/email.services";

export const dynamic = "force-dynamic"; // static by default, unless reading the request

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const prisma = new PrismaClient();
  reminderMovement(prisma)
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
      response.status(500).json({ success: false, error: "Invalid Error" });
    });

  response.status(200).json({ success: true });
}
