import { RootInfoSlice } from ".";
import { ITransaction, ITransactionRequest } from "../transactions";

export type filterItem = {
  title: string;
  value: string | number;
  text?: string;
  type: string;
};

export type FilterOptions = filterItem[];

export interface TransactionSlice extends RootInfoSlice {
  transactions?: ITransaction[];
  lastTransactions?: ITransaction[];
  defaultValues?: ITransactionRequest;
  filterOptions?: FilterOptions;
  detail?: ITransaction;
  formTransactionValues?: {
    amount?: number;
    type?: number;
    description?: string;
    category?: number;
    destinatary?: string;
  };
  modalEdit?: boolean;
}
