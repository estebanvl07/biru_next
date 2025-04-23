// utils/notifications/types.ts

import { GoalsIncludes } from "~/types/goal/goal.types";
import { MovementsIncludes } from "~/types/movements";
import { TransactionIncludes } from "~/types/transactions";

export type NotificationPayloadMap = {
  "transaction.created": TransactionIncludes;
  "transaction.edited": TransactionIncludes;
  "transaction.nearDeadline": TransactionIncludes;
  "transaction.success": TransactionIncludes;
  "transaction.expired": TransactionIncludes;
  "transaction.lastDay": TransactionIncludes;

  "movement:executed": MovementsIncludes;
  "movement:error": MovementsIncludes;
  "movement:success": MovementsIncludes;
  "movement:nearDeadline": MovementsIncludes;
  "movement:expired": MovementsIncludes;
  "movement:lastDay": MovementsIncludes;

  //    "budget:initialized": MovementsIncludes;
  //   "goal.nearDeadline": GoalsIncludes;
  //   "goal.completed": GoalsIncludes;
  //   "movement.upcoming": MovementsIncludes;
  //   "movement.failed": MovementsIncludes;
  //   "budget.limitReached": { userId: string; budget: Budget };
  //   "budget.success": { userId: string; budget: Budget };
  //   "budget.projectedNegative": { userId: string; budget: Budget };
  //   "budget.balanceUpdate": { userId: string; budget: Budget };
};

export type NotificationInput<K extends keyof NotificationPayloadMap> =
  NotificationPayloadMap[K];
