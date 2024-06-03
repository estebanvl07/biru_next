import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { createEntity, updateEntity } from "~/modules/Entities/schema";
import * as EntityServices from "../services/entity.services";

export const entityRouter = createTRPCRouter({
  getEntities: protectedProcedure.query(({ input, ctx }) => {
    const userId = ctx.session.user.id;
    return EntityServices.getEntities(ctx.db, userId);
  }),
  create: protectedProcedure
    .input(createEntity)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      return EntityServices.createEntity(ctx.db, { ...input, userId });
    }),
  update: protectedProcedure.input(updateEntity).mutation(({ ctx, input }) => {
    const userId = ctx.session.user.id;
    return EntityServices.updateEntity(ctx.db, {
      ...input,
      id: Number(input.id),
      userId,
    });
  }),
  getEntityById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input, ctx }) => {
      const userId = ctx.session.user.id;
      return EntityServices.getEntityById(ctx.db, { id: input.id, userId });
    }),
});
