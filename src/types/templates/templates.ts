import { Templates, User } from "@prisma/client";
import { TransactionIncludes } from "~/server/api/services/transactions.services";

export interface TemplatesIncludes extends Templates {
  user: User;
  transactions: TransactionIncludes[];
}
