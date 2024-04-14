import { RootInfoSlice } from ".";
import { IUser } from "../user";
export interface UserSlice extends RootInfoSlice {
  userInfo?: IUser;
  headerTitle?: string;
}
