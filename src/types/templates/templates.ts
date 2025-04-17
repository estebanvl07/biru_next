import { Templates, User } from "@prisma/client";
import { TransactionIncludes } from "~/server/api/services/transactions.services";
import { CategoryIncludes } from "../category/category.types";
import { EntityIncludes } from "../entities/entity.types";
export interface TemplatesIncludes extends Templates {
  user: User;
  category: CategoryIncludes;
  entity: EntityIncludes;
  transactions: TransactionIncludes[];
}
