import { ITransaction } from "../transactions";

export interface IAccount {
  id: number;
  name: string;
  type: string;
  balance: number;
  reference: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAccountRequired
  extends Omit<IAccount, "id" | "createdAt" | "updatedAt"> {}

export interface IDashboardInfoAccount {
  balance: number;
  totalIncome: number;
  totalExpenses: number;
  recentTransactions: ITransaction[] | undefined;
}
