import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import * as usersServices from "~/server/api/services/users.services";
import * as settingServices from "~/server/api/services/setting.services";

import { registerUserInput } from "~/modules/Register/resolver";
import { Z_STRING } from "~/lib/resolver/zod";
import z from "zod";
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
  setSetting: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      return settingServices.setUiSetting(ctx.db, {
        widgetOrder: input,
        userId,
      });
    }),
  getUiSetting: protectedProcedure.query(({ ctx }) => {
    const userId = ctx.session.user.id;
    return settingServices.getUiSetting(ctx.db, userId);
  }),
});
