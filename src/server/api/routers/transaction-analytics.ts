import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { endOfWeek, startOfWeek, subWeeks } from "date-fns";
import _ from "lodash";
import { Transaction } from "@prisma/client";
import console from "console";

const defaultInput = {
  userId: z.string(),
  bookId: z.string(),
  week: z.number().default(1),
};

export const transactionAnalyticsRouter = createTRPCRouter({
  weekMovements: protectedProcedure
    .input(z.object(defaultInput))
    .query(async ({ ctx, input }) => {
      const { userId, bookId, week } = input;
      const date = new Date();

      let start;
      let end;

      if (week === 1) {
        start = startOfWeek(date, { weekStartsOn: 0 });
        end = endOfWeek(date, { weekStartsOn: 0 });
      } else if (week === 2) {
        const lastWeek = subWeeks(date, 1);
        start = startOfWeek(lastWeek, { weekStartsOn: 0 });
        end = endOfWeek(lastWeek, { weekStartsOn: 0 });
      }

      const transactions = await ctx.db.transaction.findMany({
        where: {
          state: 1,
          userId,
          bookId,
          date: {
            gte: start,
            lt: end,
          },
        },
      });

      const incomeTransactions = transactions.filter(
        (transaction) => transaction.type === 1,
      );

      const expenseTransactions = transactions.filter(
        (transaction) => transaction.type === 2,
      );

      const weekDays = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"];

      const incomeGroupByDay = _.groupBy(
        incomeTransactions,
        (transaction) =>
          weekDays[
            new Date(transaction.date ?? transaction.createdAt).getDay()
          ],
      );

      const expenseGroupByDay = _.groupBy(
        expenseTransactions,
        (transaction) =>
          weekDays[
            new Date(transaction.date ?? transaction.createdAt).getDay()
          ],
      );

      const incomeStatistics = weekDays.map((day) => {
        const transactions = incomeGroupByDay[day] ?? [];
        const amount = transactions.reduce(
          (acc, transaction) => acc + transaction.amount,
          0,
        );

        return {
          day,
          transactions,
          amount,
        };
      });

      const expenseStatistics = weekDays.map((day) => {
        const transactions = expenseGroupByDay[day] ?? [];
        const amount = transactions.reduce(
          (acc, transaction) => acc + transaction.amount,
          0,
        );

        return {
          day,
          transactions,
          amount,
        };
      });

      return { incomeStatistics, expenseStatistics };
    }),
  monthlyByDay: protectedProcedure
    .input(z.object(defaultInput))
    .query(async ({ ctx, input }) => {
      const { userId, bookId } = input;

      const transactions = await ctx.db.transaction.findMany({
        where: {
          userId: String(userId),
          bookId: String(bookId),
          type: 2,
        },
      });

      // Agrupar transacciones por día del mes (01 a 31)
      const grouped = _.groupBy(transactions, (transaction) => {
        const date = new Date(transaction.date ?? transaction.createdAt);
        return String(date.getDate()).padStart(2, "0"); // "01", "02", ..., "31"
      });

      // Crear un array ordenado del 01 al 31
      const statistics = Array.from({ length: 31 }, (_, i) => {
        const day = String(i + 1).padStart(2, "0"); // i + 1 garantiza que no inicia en 00
        return {
          day,
          transactions: grouped[day] ?? [],
        };
      });

      return statistics;
    }),
});
