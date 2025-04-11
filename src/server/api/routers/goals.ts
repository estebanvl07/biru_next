import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { createGoal, updateGoal } from "~/modules/Goals/schema";
import * as GoalsServices from "../services/goal.services";

export const goalsRouter = createTRPCRouter({
  getGoals: protectedProcedure.query(({ input, ctx }) => {
    const userId = ctx.session.user.id;
    return GoalsServices.getGoals(ctx.db, userId);
  }),
  create: protectedProcedure
    .input(createGoal)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      return GoalsServices.createGoal(ctx.db, { ...input, userId });
    }),
  update: protectedProcedure.input(updateGoal).mutation(({ ctx, input }) => {
    const userId = ctx.session.user.id;
    return GoalsServices.updateGoal(ctx.db, {
      ...input,
      id: Number(input.id),
      userId,
    });
  }),
  cancel: protectedProcedure
    .input(z.object({ id: z.number(), bookId: z.string() }))
    .mutation(({ ctx, input }) => {
      const userId = ctx.session.user.id;
      return GoalsServices.cancelGoal(ctx.db, { ...input, userId });
    }),
  getGoalById: protectedProcedure
    .input(z.object({ id: z.number(), bookId: z.string() }))
    .query(({ input, ctx }) => {
      const userId = ctx.session.user.id;
      return GoalsServices.getGoalById(ctx.db, { ...input, userId });
    }),
});
