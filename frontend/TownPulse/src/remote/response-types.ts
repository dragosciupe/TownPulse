import { UpgradeRequestStatus } from "../util/Types";

export type UpgradeRequest = {
  requestId: string;
  accountId: string;
  city: string;
  date: number;
  status: UpgradeRequestStatus;
};

export type BasicResponse<T> = {
  status: boolean;
  data: T;
};
