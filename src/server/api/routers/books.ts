import { createTRPCRouter, protectedProcedure } from "../trpc";
import * as BookServices from "../services/books.services";
import { createBook, updateBook } from "~/modules/Books/schema";
import { z } from "zod";

export const booksRouter = createTRPCRouter({
  getBooksByUserId: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    return await BookServices.getBooksByUserId(ctx.db, userId);
  }),
  getBookById: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input: bookId }) => {
      const userId = ctx.session.user.id;
      return await BookServices.getBookById(ctx.db, bookId, userId);
    }),
  createBook: protectedProcedure
    .input(createBook)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      return await BookServices.createBook(ctx.db, { ...input, userId });
    }),
  updateBook: protectedProcedure
    .input(updateBook)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      return await BookServices.updateBook(ctx.db, input);
    }),
  deleteBook: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input: bookId }) => {
      const userId = ctx.session.user.id;
      return await BookServices.deleteBook(ctx.db, bookId, userId);
    }),
  lastAccess: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input: bookId }) => {
      return BookServices.setLastAccess(ctx.db, bookId, ctx.session.user.id);
    }),
  getBalance: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input: bookId }) => {
      const userId = ctx.session.user.id;
      return BookServices.getBookBalance(ctx.db, userId, bookId);
    }),
});
