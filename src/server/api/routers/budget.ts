import { createTRPCRouter, protectedProcedure } from "../trpc";
import * as Budget from "../services/budget.services";
import * as Account from "../services/userAccount.services";
export const budgetRouter = createTRPCRouter({
  getExepensesCurrentMonth: protectedProcedure.query(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    return Budget.getExepensesCurrentMonth(ctx.db, userId);
  }),
  getBudgetSummary: protectedProcedure.query(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    const expenses = await Budget.getExepensesCurrentMonth(ctx.db, userId);
    const account = await Account.getAccountById(ctx.db, { userId, id: 2 });

    if (!account) return { totalBudget: 0 };

    const incomes =
      expenses?.reduce(
        (acc, { amount, type }) => (type === 1 ? acc + amount : acc),
        0,
      ) || 0;

    const totalBudget = account.balance || 0 + incomes;

    return { totalBudget };
  }),
});
