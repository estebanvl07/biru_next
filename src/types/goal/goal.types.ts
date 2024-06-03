import { Goals } from "@prisma/client";
import { TransactionIncludes } from "~/server/api/services/transactions.services";

export interface GoalsIncludes extends Goals {
    transactions: TransactionIncludes[];
  }
  