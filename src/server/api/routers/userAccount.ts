import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { createUserAccount } from "~/modules/Account/schema";
import * as userAccount from "~/server/api/services/userAccount.services";
import * as transactionServices from "~/server/api/services/transactions.services";
import { z } from "zod";

export const userAccountRouter = createTRPCRouter({
  seed: protectedProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    return userAccount.setSeed(ctx.db, userId);
  }),
  create: protectedProcedure
    .input(createUserAccount)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      return userAccount.createAccount(ctx.db, {
        ...input,
        userId,
      });
    }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    return userAccount.getAllAccounts(ctx.db, userId);
  }),
  getOne: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      return userAccount.getAccountById(ctx.db, { ...input, userId });
    }),
  setLastAccess: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      return userAccount.setLastAccess(ctx.db, id);
    }),
  getBalance: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    return userAccount.getBalanceAccount(ctx.db, userId);
  }),
});
