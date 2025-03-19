import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { categoriesRouter } from "./routers/category";
import { transactionsRouter } from "./routers/transaction";
import { userAccountRouter } from "./routers/userAccount";
import { usersRouter } from "./routers/users";
import { entityRouter } from "./routers/entity";
import { goalsRouter } from "./routers/goals";
import { movementsRouter } from "./routers/movements";
import { notificationRouter } from "./routers/notification";
import { templateRouter } from "./routers/templates";
import { budgetRouter } from "./routers/budget";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  users: usersRouter,
  userAccount: userAccountRouter,
  category: categoriesRouter,
  transaction: transactionsRouter,
  entity: entityRouter,
  goals: goalsRouter,
  templates: templateRouter,
  movements: movementsRouter,
  notifications: notificationRouter,
  budget: budgetRouter,
});

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
