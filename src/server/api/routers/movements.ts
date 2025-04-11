import { createMovements, updateMovements } from "~/modules/Movements/schema";
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
  update: protectedProcedure
    .input(updateMovements)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;
      return MovementsServices.updateMovement(ctx.db, { ...input, userId });
    }),
  getAll: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input: bookId }) => {
      const userId = ctx.session.user.id;
      return MovementsServices.getMovements(ctx.db, userId, bookId);
    }),
  getMovementById: protectedProcedure
    .input(
      z.object({
        bookId: z.string(),
        id: z.number(),
      }),
    )
    .query(async ({ input, ctx }) => {
      return MovementsServices.getMovementById({
        db: ctx.db,
        userId: ctx.session.user.id,
        id: input.id,
        bookId: input.bookId,
      });
    }),
  disable: protectedProcedure
    .input(
      z.object({
        bookId: z.string(),
        id: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return MovementsServices.disableMovement({
        db: ctx.db,
        userId: ctx.session.user.id,
        id: input.id,
        bookId: input.bookId,
      });
    }),
  available: protectedProcedure
    .input(
      z.object({
        bookId: z.string(),
        id: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      return MovementsServices.availableMovement({
        db: ctx.db,
        userId: ctx.session.user.id,
        id: input.id,
        bookId: input.bookId,
      });
    }),
  makeMovement: protectedProcedure
    .input(
      z.object({
        accountId: z.number(),
        bookId: z.string(),
        id: z.number(),
        amount: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return MovementsServices.makeMovement({
        db: ctx.db,
        ...input,
        userId: ctx.session.user.id,
      });
    }),
});
