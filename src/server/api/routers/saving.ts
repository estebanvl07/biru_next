import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { createSaving } from "~/modules/Saving/schema";
import * as SavingServices from "../services/saving.services";

export const savingRouter = createTRPCRouter({
  getSavings: protectedProcedure.query(({ input, ctx }) => {
    const userId = ctx.session.user.id;
    return SavingServices.getSavings(ctx.db, userId);
  }),
  create: protectedProcedure
    .input(createSaving)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      return SavingServices.createSaving(ctx.db, { ...input, userId });
    }),
  getSavingById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input, ctx }) => {
      const userId = ctx.session.user.id;
      return SavingServices.getSavingById(ctx.db, { id: input.id, userId });
    }),
});
