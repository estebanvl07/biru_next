import { Category, Entities, Transaction, UserAccount } from "@prisma/client";
import { observable } from "@trpc/server/observable";
import EventEmitter from "events";
import { z } from "zod";
import { createTransaction } from "~/modules/transactions/schema";
import * as TransactionServices from "~/server/api/services/transactions.services";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

interface TransactionsIncludes extends Transaction {
  userAccount: UserAccount;
  category: Category;
  entity: Entities | null;
}

interface MyEvents {
  new: (data: Transaction) => void;
  // update: (data: Transaction) => void;
}

declare interface MyEventEmitter {
  on<TEv extends keyof MyEvents>(event: TEv, listener: MyEvents[TEv]): this;
  off<TEv extends keyof MyEvents>(event: TEv, listener: MyEvents[TEv]): this;
  once<TEv extends keyof MyEvents>(event: TEv, listener: MyEvents[TEv]): this;
  emit<TEv extends keyof MyEvents>(
    event: TEv,
    ...args: Parameters<MyEvents[TEv]>
  ): boolean;
}

class MyEventEmitter extends EventEmitter {}

const ee = new MyEventEmitter();

export const transactionsRouter = createTRPCRouter({
  getTransactions: protectedProcedure
    .input(z.object({ accountId: z.string() }))
    .query(({ input, ctx }) => {
      return TransactionServices.getTransactionsByAccount(
        ctx.db,
        Number(input.accountId),
      );
    }),
  create: protectedProcedure
    .input(createTransaction)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const response = await TransactionServices.createTransaction(ctx.db, {
        ...input,
        userId,
      });
      return response;
    }),
  // onCreate: protectedProcedure.subscription(() => {
  //   return observable<Transaction>((emit) => {
  //     const onNew = (data: Transaction) => {
  //       emit.next(data);
  //     };
  //     ee.on("new", onNew);
  //     return () => {
  //       ee.off("new", onNew);
  //     };
  //   });
  // }),
  //   getLatest: protectedProcedure.query(({ ctx }) => {
  //     return ctx.db.post.findFirst({
  //       orderBy: { createdAt: "desc" },
  //       where: { createdBy: { id: ctx.session.user.id } },
  //     });
  //   }),
  //   getSecretMessage: protectedProcedure.query(() => {
  //     return "you can now see this secret message!";
  //   }),
});
