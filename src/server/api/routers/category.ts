import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { createCategory } from "~/modules/category/schema";
import * as categoryServices from "~/server/api/services/category.services";

export const categoriesRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createCategory)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      return categoryServices.createCategory(ctx.db, {
        ...input,
        type: parseInt(input.type),
        userId,
      });
    }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    return categoryServices.getAllCategories(ctx.db, userId);
  }),
});
