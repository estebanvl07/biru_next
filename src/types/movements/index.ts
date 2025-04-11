import { Category, Entities, FixedMovements } from "@prisma/client";
import { TransactionIncludes } from "../transactions";
import { GoalsIncludes } from "../goal/goal.types";

export interface MovementsIncludes extends FixedMovements {
  category?: Category;
  entity?: Entities;
  goal?: GoalsIncludes;
  transactions?: TransactionIncludes[];
  transferType?: "goal" | "transaction" | "movement" | "saving";
}
