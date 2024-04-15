import { postRouter } from "~/server/api/routers/post";
import { categoriesRouter } from "./routers/category";
import { transactionsRouter } from "./routers/transaction";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { userAccountRouter } from "./routers/userAccount";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  category: categoriesRouter,
  transaction: transactionsRouter,
  userAccount: userAccountRouter,
});

console.log("appRouter:", appRouter);

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
