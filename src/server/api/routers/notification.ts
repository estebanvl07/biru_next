import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import * as NotificationServices from "../services/notifications.services";

export const notificationRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(
      z.object({
        bookId: z.string(),
        take: z.number().optional(),
      }),
    )
    .query(({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { bookId, take = 60 } = input;
      return NotificationServices.getNotifications(
        ctx.db,
        userId,
        bookId,
        take,
      );
    }),
  markAllAsRead: protectedProcedure
    .input(z.string())
    .mutation(({ ctx, input: bookId }) => {
      const userId = ctx.session.user.id;
      return NotificationServices.markAllAsRead(ctx.db, userId, bookId);
    }),
  onRead: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        bookId: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      const userId = ctx.session.user.id;
      return NotificationServices.markAsRead(
        ctx.db,
        input.id,
        input.bookId,
        userId,
      );
    }),
});
