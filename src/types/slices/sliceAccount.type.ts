import { RootInfoSlice } from ".";
import { IAccount, IDashboardInfoAccount } from "../account";

export interface AccountSlice extends RootInfoSlice {
  accounts?: IAccount[];
  accountSelected?: IAccount;
  dashboardInfo?: IDashboardInfoAccount;
  originPath?: string;
}
