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
  getTemplates: protectedProcedure.query(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    return TemplatesServices.getTemplates(ctx.db, userId);
  }),
  getTemplateById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      return TemplatesServices.getTemplateById(ctx.db, input.id, userId);
    }),
});
