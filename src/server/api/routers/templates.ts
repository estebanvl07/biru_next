import { createTemplate, updateTemplate } from "~/modules/Templates/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import * as TemplatesServices from "../services/templates.services";
import { z } from "zod";

export const templateRouter = createTRPCRouter({
  createTemplate: protectedProcedure
    .input(createTemplate)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      return TemplatesServices.createTemplate(ctx.db, { ...input, userId });
    }),
  updateTemplate: protectedProcedure
    .input(updateTemplate)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      return TemplatesServices.updateTemplate(ctx.db, {
        ...input,
        id: Number(input.id),
        userId,
      });
    }),
  getTemplates: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input: bookId }) => {
      const userId = ctx.session.user.id;
      return TemplatesServices.getTemplates(ctx.db, userId, bookId);
    }),
  getTemplateById: protectedProcedure
    .input(z.object({ id: z.number(), bookId: z.string() }))
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      return TemplatesServices.getTemplateById(
        ctx.db,
        input.id,
        userId,
        input.bookId,
      );
    }),
  disabledTemplate: protectedProcedure
    .input(z.object({ id: z.number(), bookId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      return TemplatesServices.disabledTemplate(
        ctx.db,
        input.id,
        userId,
        input.bookId,
      );
    }),
  availableTemplate: protectedProcedure
    .input(z.object({ id: z.number(), bookId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      return TemplatesServices.availableTemplate(
        ctx.db,
        input.id,
        userId,
        input.bookId,
      );
    }),
});
