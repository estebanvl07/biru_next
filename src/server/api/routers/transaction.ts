import {
  createTransaction,
  updateTransaction,
} from "~/modules/Transactions/schema";
import { filterInput } from "~/modules/Common/schema";
import * as TransactionServices from "~/server/api/services/transactions.services";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const transactionsRouter = createTRPCRouter({
  getTransactions: protectedProcedure
    .input(filterInput)
    .query(({ input, ctx }) => {
      return TransactionServices.getTransactionsByFilter(ctx.db, input);
    }),
  getTransactionById: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(({ input, ctx }) => {
      return TransactionServices.getTransactionById(ctx.db, input.id);
    }),
  create: protectedProcedure
    .input(createTransaction)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const response = await TransactionServices.createTransaction(ctx.db, {
        ...input,
        userId,
      });
      return response;
    }),
  update: protectedProcedure
    .input(updateTransaction)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { id, ...transaction } = input;
      const response = await TransactionServices.updateTransaction(
        ctx.db,
        Number(id),
        {
          ...transaction,
          userId,
        },
      );
      return response;
    }),
});
