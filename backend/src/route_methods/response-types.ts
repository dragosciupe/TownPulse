import { AccountType } from "../util";

export type UserData = {
  id: string;
  username: string;
  city: string;
  email: string;
  accountType: AccountType;
};
