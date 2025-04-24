import { Templates, User } from "@prisma/client";
import { TransactionIncludes } from "~/types/transactions";
import { CategoryIncludes } from "../category/category.types";
import { EntityIncludes } from "../entities/entity.types";
export interface TemplatesIncludes extends Templates {
  user: User;
  category: CategoryIncludes;
  entity: EntityIncludes;
  transactions: TransactionIncludes[];
}
