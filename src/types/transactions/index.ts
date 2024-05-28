import {
  Category,
  Entities,
  Goals,
  Transaction,
  User,
  UserAccount,
} from "@prisma/client";

export interface TransactionIncludes extends Transaction {
  category?: Category;
  goal?: Goals;
  entity?: Entities;
  user: User;
  useAccount: UserAccount;
}
