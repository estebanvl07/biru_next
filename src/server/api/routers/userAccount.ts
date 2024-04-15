import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { createUserAccount } from "~/modules/account/schema";
import * as userAccount from "~/server/api/services/userAccount.services";

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
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    return userAccount.getAllAccounts(ctx.db, userId);
  }),
});
