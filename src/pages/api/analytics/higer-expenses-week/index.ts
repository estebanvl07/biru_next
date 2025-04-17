import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import _ from "lodash";

export const dynamic = "force-dynamic";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const prisma = new PrismaClient();

  const { userId, bookId } = request.query;

  const transactions = await prisma.transaction.findMany({
    where: {
      userId: String(userId),
      bookId: String(bookId),
    },
  });

  // Agrupar por día de la semana (0 = Domingo, 1 = Lunes, ..., 6 = Sábado)
  const grouped = _.groupBy(transactions, (transaction) => {
    const date = new Date(transaction.date ?? transaction.createdAt);
    return String(date.getDay()); // "0" a "6"
  });

  // Rellenar todos los días de la semana
  const statistics = Array.from({ length: 7 }, (_, i) => {
    const day = String(i); // "0" a "6"
    return {
      day, // puedes mapear luego a nombres como "Domingo", "Lunes", etc.
      transactions: grouped[day] ?? [],
    };
  });

  response.status(200).json({ success: true, statistics });
}
