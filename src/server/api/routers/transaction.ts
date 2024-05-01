import { z } from "zod";
import { createTransaction } from "~/modules/transactions/schema";
import * as TransactionServices from "~/server/api/services/transactions.services";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const transactionsRouter = createTRPCRouter({
  getTransactions: protectedProcedure
    .input(z.object({ accountId: z.string() }))
    .query(({ input, ctx }) => {
      return TransactionServices.getTransactionsByAccount(
        ctx.db,
        Number(input.accountId),
      );
    }),
  create: protectedProcedure
    .input(createTransaction)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      // simulate a slow db call
      return TransactionServices.createTransaction(ctx.db, {
        ...input,
        userId,
      });
    }),
  //   getLatest: protectedProcedure.query(({ ctx }) => {
  //     return ctx.db.post.findFirst({
  //       orderBy: { createdAt: "desc" },
  //       where: { createdBy: { id: ctx.session.user.id } },
  //     });
  //   }),
  //   getSecretMessage: protectedProcedure.query(() => {
  //     return "you can now see this secret message!";
  //   }),
});
