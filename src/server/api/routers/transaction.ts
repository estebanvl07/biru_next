import { Transaction } from "@prisma/client";
import { createTransaction } from "~/modules/transactions/schema";
import { filter, filterInput } from "~/modules/common/schema";
import * as TransactionServices from "~/server/api/services/transactions.services";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";


// interface MyEvents {
//   new: (data: Transaction) => void;
//   // update: (data: Transaction) => void;
// }

// declare interface MyEventEmitter {
//   on<TEv extends keyof MyEvents>(event: TEv, listener: MyEvents[TEv]): this;
//   off<TEv extends keyof MyEvents>(event: TEv, listener: MyEvents[TEv]): this;
//   once<TEv extends keyof MyEvents>(event: TEv, listener: MyEvents[TEv]): this;
//   emit<TEv extends keyof MyEvents>(
//     event: TEv,
//     ...args: Parameters<MyEvents[TEv]>
//   ): boolean;
// }

// class MyEventEmitter extends EventEmitter {}

// const ee = new MyEventEmitter();

export const transactionsRouter = createTRPCRouter({
  getTransactions: protectedProcedure
    .input(filterInput)
    .query(({ input, ctx }) => {
      return TransactionServices.getTransactionsByFilter(ctx.db, input);
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
});
