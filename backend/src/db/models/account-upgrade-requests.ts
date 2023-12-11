import mongoose, { ObjectId } from "mongoose";
import { UpgradeRequestStatus } from "../../util";

export interface AccountUpgradeRequestModel {
  accountId: string;
  accountUsername: string;
  city: string;
  date: number;
  status: UpgradeRequestStatus;
}

const accountUpgradeRequestSchema = new mongoose.Schema({
  accountId: { type: String, required: true },
  accountUsername: { type: String, required: true },
  city: { type: String, required: true },
  date: { type: Number, required: true },
  status: { type: Number, required: true },
});

export const AccountUpgradeRequest = mongoose.model(
  "account_upgrade_request",
  accountUpgradeRequestSchema
);

export async function addRequest(accountRequest: AccountUpgradeRequestModel) {
  const requestToAdd = new AccountUpgradeRequest(accountRequest);
  await requestToAdd.save();
}

export const findRequestById = (requestId: string) =>
  AccountUpgradeRequest.findById(requestId);

export const updateRequestStatus = (
  requestId: string,
  newStatus: UpgradeRequestStatus
) => AccountUpgradeRequest.findByIdAndUpdate(requestId, { status: newStatus });

export const deleteRequestById = (requestId: string) =>
  AccountUpgradeRequest.findByIdAndDelete(requestId);

export const getRequestsForAccount = (accountId: string) =>
  AccountUpgradeRequest.find({ accountId: accountId }).sort({
    date: "descending",
  });

export const getRequestsForTownHall = (city: string) =>
  AccountUpgradeRequest.find({
    city: city,
    status: UpgradeRequestStatus.PENDING,
  });
