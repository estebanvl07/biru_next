import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { createGoal } from "~/modules/Goals/schema";
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
  getGoalById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input, ctx }) => {
      const userId = ctx.session.user.id;
      return GoalsServices.getGoalById(ctx.db, { id: input.id, userId });
    }),
});
