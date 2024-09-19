import { createTRPCRouter, protectedProcedure } from "../trpc";
import * as MonthlyBudgetServices from "../services/monthlyBudget.services";

export const monthlyBudgetRouter = createTRPCRouter({
  getIncomes: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    return MonthlyBudgetServices.getIncomes(ctx.db, userId);
  }),
  getEgress: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    return MonthlyBudgetServices.getEgress(ctx.db, userId);
  }),
  getMovementPlanneds: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    return MonthlyBudgetServices.getMovementPlanneds(ctx.db, userId);
  }),
});
