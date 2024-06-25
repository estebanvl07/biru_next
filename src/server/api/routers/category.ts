import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { createCategory, updateCategory } from "~/modules/Category/schema";
import * as categoryServices from "~/server/api/services/category.services";
import { z } from "zod";

export const categoriesRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createCategory)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      return categoryServices.createCategory(ctx.db, {
        ...input,
        userId,
      });
    }),
  update: protectedProcedure
    .input(updateCategory)
    .mutation(({ ctx, input }) => {
      const userId = ctx.session.user.id;
      return categoryServices.updateCategory(ctx.db, {
        ...input,
        id: Number(input.id),
        userId,
      });
    }),
  createDefaults: protectedProcedure
    .input(z.array(createCategory))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      return categoryServices.createDefaults(ctx.db, {
        categories: input,
        userId,
      });
    }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    return categoryServices.getAllCategories(ctx.db, userId);
  }),
  getCategoryById: protectedProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      return categoryServices.getCategoryById(ctx.db, input, userId);
    }),
});
