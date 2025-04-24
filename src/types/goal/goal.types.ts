import { Goals, Entities } from "@prisma/client";
import { TransactionIncludes } from "~/types/transactions";

export interface GoalsIncludes extends Goals {
  transactions: TransactionIncludes[];
  entity: Entities;
}
