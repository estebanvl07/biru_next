import {
  Category,
  Entities,
  Goals,
  Transaction,
  User,
  UserAccount,
} from "@prisma/client";

export enum FILTERS {
  none = 0,
  day = 1,
  month = 2,
  six_month = 3,
  year = 4,
  customized = 5,
}

export interface FilterOptions {
  accountId?: number;
  filter?: FILTERS;
  startDate?: Date | undefined;
  endDate?: Date | undefined;
}

export interface TransactionIncludes extends Transaction {
  category?: Category;
  goal?: Goals;
  entity?: Entities;
  user: User;
  useAccount: UserAccount;
}
