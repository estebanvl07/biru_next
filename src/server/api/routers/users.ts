import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { createUser } from "~/modules/signin/createUser.schema";
import * as usersServices from "~/server/api/services/users.services";
import { z } from "zod";

export const usersRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createUser)
    .mutation(async ({ ctx, input }) => {
      return usersServices.createUser(ctx.db, {
        ...input,
      });
    }),
  // update: protectedProcedure.input({}).mutation(async ({ ctx, input }) => {
  //   const userId = ctx.session.user.id;
  //   return {};
  // }),
});
