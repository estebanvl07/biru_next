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

export enum STATUS_TRANS {
  confirmed = 1,
  cancelled = 2,
  scheduled = 3,
}
export interface FilterOptions {
  bookId: string;
  accountId?: number;
  filter?: FILTERS;
  startDate?: Date | undefined;
  endDate?: Date | undefined;
}

export interface TransactionIncludes extends Transaction {
  category?: Category;
  goal?: Goals;
  entity?: Entities;
  user?: User;
  userAccount?: UserAccount;
}
