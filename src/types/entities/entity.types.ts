import { Entities, Transaction } from "@prisma/client";

export interface EntityIncludes extends Entities {
  transactions: Transaction[];
}
