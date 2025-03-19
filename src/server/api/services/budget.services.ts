import { PrismaClient } from "@prisma/client";

export async function getExepensesCurrentMonth(
  db: PrismaClient,
  userId: string,
) {
  try {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const movements = await db.fixedMovements.findMany({
      where: {
        userId,
        status: true,
        next_ocurrence: {
          gte: firstDayOfMonth,
          lte: lastDayOfMonth,
        },
      },
      include: {
        category: true,
      },
    });

    return movements;
  } catch (error) {}
}
