import {
  createTransaction,
  updateTransaction,
} from "~/modules/Transactions/schema";
import { filterInput } from "~/modules/Common/schema";
import * as TransactionServices from "~/server/api/services/transactions.services";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { advanceSchema } from "~/modules/Transactions/advanceSchema";
// import { Server } from "socket.io";

// const io = new Server();

export const transactionsRouter = createTRPCRouter({
  getTransactionsByFilter: protectedProcedure
    .input(filterInput)
    .query(({ input, ctx }) => {
      return TransactionServices.getTransactionsByFilter(ctx.db, input);
    }),
  getTransactions: protectedProcedure
    .input(
      z.object({
        bookId: z.string(),
        page: z.number().min(1),
        limit: z.number().min(1).max(100),
      }),
    )
    .query(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      const transactions = await TransactionServices.getTransactions(
        ctx.db,
        input.bookId,
        userId,
        {
          limit: input.limit,
          page: input.page,
        },
      );
      return transactions;
    }),
  getTransactionByQuery: protectedProcedure
    .input(
      z.object({
        bookId: z.string(),
        query: z.string(),
      }),
    )
    .query(({ input, ctx }) => {
      const userId = ctx.session.user.id;
      const { query, bookId } = input;
      return TransactionServices.getTransactionsByQuery(
        ctx.db,
        bookId,
        userId,
        query,
      );
    }),
  getTransactionById: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        bookId: z.string(),
      }),
    )
    .query(({ input, ctx }) => {
      const userId = ctx.session.user.id;

      return TransactionServices.getTransactionById(
        ctx.db,
        input.id,
        input.bookId,
        userId,
      );
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
  makeTransaction: protectedProcedure
    .input(z.object({ bookId: z.string(), id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const response = await TransactionServices.makeTransaction(
        ctx.db,
        input.bookId,
        input.id,
        userId,
      );
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
  search: protectedProcedure.input(advanceSchema).query(({ input, ctx }) => {
    const userId = ctx.session.user.id;
    return TransactionServices.searchTransactions(ctx.db, input, userId);
  }),
});
