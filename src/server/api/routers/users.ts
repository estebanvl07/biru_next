import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import * as usersServices from "~/server/api/services/users.services";
import { registerUserInput } from "~/modules/Register/resolver";
import { Z_STRING } from "~/lib/resolver/zod";

export const usersRouter = createTRPCRouter({
  register: publicProcedure
    .input(registerUserInput)
    .mutation(({ ctx, input }) => {
      return usersServices.registerUser(ctx.db, input);
    }),
  activate: publicProcedure.input(Z_STRING).mutation(({ ctx, input }) => {
    return usersServices.activateUser(ctx.db, input);
  }),
});
