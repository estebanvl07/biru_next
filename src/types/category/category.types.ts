import { Category } from "@prisma/client";
import { TransactionIncludes } from "~/server/api/services/transactions.services";

export interface CategoryIncludes extends Category {
  transactions: TransactionIncludes[];
}
