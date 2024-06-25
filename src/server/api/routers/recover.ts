import { CodeSchema, RecoverSchema } from "~/modules/Recover/schema";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

import * as EmailServices from "../services/email.services";
import * as VerifyCode from "../services/verificationCode.services";
import * as UserServices from "../services/users.services";

export const recoverRouter = createTRPCRouter({
  verifyEmail: publicProcedure
    .input(RecoverSchema)
    .mutation(({ ctx, input }) => {
      return EmailServices.getConfirmCode(ctx.db, input.email);
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
