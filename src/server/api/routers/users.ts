import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import * as usersServices from "~/server/api/services/users.services";
import { registerUserInput } from "~/modules/register/resolver";

export const usersRouter = createTRPCRouter({
  register: publicProcedure
    .input(registerUserInput)
    .mutation(({ ctx, input }) => {
      return usersServices.registerUser(ctx.db, input);
    }),
});
