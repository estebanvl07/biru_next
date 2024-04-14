import { ISelectOptions } from "../root.types";

export interface ITransactionRequest {
  accountId: number;
  userId: number;
  amount: number;
  type: number;
  date: string;
  recipient: string;
  description: string;
  categoryId: number;
}

export interface ITransaction {
  id: number;
  accountId: number;
  userId: number;
  amount: number;
  type: number;
  date: string;
  recipient: string;
  description: string;
  categoryId: number;
  state: number;
  createdAt: string;
  updatedAt: string;
}
