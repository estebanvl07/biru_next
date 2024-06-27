import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import * as usersServices from "~/server/api/services/users.services";
import { registerUserInput } from "~/modules/Register/resolver";
import { Z_STRING } from "~/lib/resolver/zod";
import {
  recoverUserInput,
  verifyCodeInput,
  changePasswordInput,
} from "~/modules/Recover/resolver";

export const usersRouter = createTRPCRouter({
  register: publicProcedure
    .input(registerUserInput)
    .mutation(({ ctx, input }) => {
      return usersServices.registerUser(ctx.db, input);
    }),
  activate: publicProcedure.input(Z_STRING).mutation(({ ctx, input }) => {
    return usersServices.activateUser(ctx.db, input);
  }),
  recover: publicProcedure
    .input(recoverUserInput)
    .mutation(({ ctx, input }) => {
      const { email } = input;
      return usersServices.recoverUser(ctx.db, email);
    }),
  recoverVerify: publicProcedure
    .input(verifyCodeInput)
    .mutation(({ ctx, input }) => {
      return usersServices.recoverVerify(ctx.db, input);
    }),
  recoverChangePassword: publicProcedure
    .input(changePasswordInput)
    .mutation(({ ctx, input }) => {
      return usersServices.recoverChangePassword(ctx.db, input);
    }),
});
