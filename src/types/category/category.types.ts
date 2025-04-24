import { Category } from "@prisma/client";
import { TransactionIncludes } from "~/types/transactions";

export interface CategoryIncludes extends Category {
  transactions: TransactionIncludes[];
}
