import { createMovements } from "~/modules/Movements/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import * as MovementsServices from "../services/movements.services";
import { z } from "zod";

export const movementsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createMovements)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      return MovementsServices.createMovement(ctx.db, { ...input, userId });
    }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    return MovementsServices.getMovements(ctx.db, userId);
  }),
  getMovementById: protectedProcedure
    .input(z.number())
    .query(async ({ input, ctx }) => {
      return MovementsServices.getMovementById(ctx.db, input);
    }),
});
