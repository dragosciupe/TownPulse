import { AccountUpgradeRequestModel } from "../db/models/account-upgrade-requests";
import { AccountType } from "../util";

export type UserData = {
  id: string;
  username: string;
  city: string;
  email: string;
  accountType: AccountType;
};

export type UpgradeRequest = {
  requestId: string;
} & AccountUpgradeRequestModel;
