import { createTRPCRouter, protectedProcedure } from "../trpc";
import * as Budget from "../services/budget.services";
import * as Account from "../services/userAccount.services";
import { z } from "zod";
export const budgetRouter = createTRPCRouter({
  getExepensesCurrentMonth: protectedProcedure.query(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    return Budget.getCurrentMovementsMonth(ctx.db, userId);
  }),
  getCurrentBudget: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input: bookId }) => {
      const userId = ctx.session.user.id;
      return Budget.getBudgetSummary(ctx.db, userId, bookId);
    }),
});
