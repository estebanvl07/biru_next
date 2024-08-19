import { Category, Entities, FixedMovements } from "@prisma/client";
import { TransactionIncludes } from "../transactions";

export interface MovementsIncludes extends FixedMovements {
  category?: Category;
  entity?: Entities;
  transactions?: TransactionIncludes[];
}
