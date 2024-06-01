import { CodeSchema, RecoverSchema } from "~/modules/Recover/schema";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import * as EmailServices from "../services/email.services";
import * as VerifyCode from "../services/verificationCode.services";
import * as UserServices from "../services/users.services";
import { z } from "zod";

export const recoverRouter = createTRPCRouter({
  verifyEmail: publicProcedure
    .input(RecoverSchema)
    .mutation(({ ctx, input }) => {
      return EmailServices.userComfirmCode(ctx.db, input.email);
    }),
  verifyCode: publicProcedure.input(CodeSchema).mutation(({ ctx, input }) => {
    return VerifyCode.findCode(ctx.db, input.code);
  }),
  changePassword: publicProcedure
    .input(z.object({ code: z.string(), password: z.string() }))
    .mutation(({ ctx, input }) => {
      return UserServices.changePassword(ctx.db, input.code, input.password);
    }),
});
