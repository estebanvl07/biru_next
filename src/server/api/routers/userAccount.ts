import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { createUserAccount } from "~/modules/Account/schema";
import * as userAccount from "~/server/api/services/userAccount.services";
import { z } from "zod";

export const userAccountRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createUserAccount)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      return userAccount.createAccount(ctx.db, {
        ...input,
        userId,
      });
    }),
  getDefaultAccount: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input: bookId }) => {
      const userId = ctx.session.user.id;
      return userAccount.getMainAccount(ctx.db, userId, bookId);
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
});
