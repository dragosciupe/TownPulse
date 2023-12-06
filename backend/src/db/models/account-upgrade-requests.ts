import mongoose, { ObjectId } from "mongoose";
import { UpgradeRequestStatus } from "../../util";

export interface AccountUpgradeRequestModel {
  accountId: string;
  city: string;
  status: UpgradeRequestStatus;
}

const accountUpgradeRequestSchema = new mongoose.Schema({
  accountId: { type: String, required: true },
  city: { type: String, required: true },
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

export const findRequestByAccountId = (accountId: string) =>
  AccountUpgradeRequest.findOne({ accountId: accountId });

export const findRequestById = (requestId: string) =>
  AccountUpgradeRequest.findById(requestId);

export const updateRequestStatus = (
  requestId: string,
  newStatus: UpgradeRequestStatus
) => AccountUpgradeRequest.findByIdAndUpdate(requestId, { status: newStatus });

export const deleteRequestById = (requestId: string) =>
  AccountUpgradeRequest.findByIdAndDelete(requestId);
