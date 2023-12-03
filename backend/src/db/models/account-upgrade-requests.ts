import mongoose, { ObjectId } from "mongoose";

export interface AccountUpgradeRequestModel {
  accountId: string;
  city: string;
}

const accountUpgradeRequestSchema = new mongoose.Schema({
  accountId: { type: String, required: true },
  city: { type: String, required: true },
});

export const AccountUpgradeRequest = mongoose.model(
  "account_upgrade_request",
  accountUpgradeRequestSchema
);

export async function addAccountRequest(
  accountRequest: AccountUpgradeRequestModel
) {
  const requestToAdd = new AccountUpgradeRequest(accountRequest);
  await requestToAdd.save();
}

export const findAccountUpgradeRequest = (accountId: string) =>
  AccountUpgradeRequest.findOne({ accountId: accountId });

export const findAccountUpgradeRequestById = (requestId: string) =>
  AccountUpgradeRequest.findById(requestId);

export const deleteAccountUpgradeRequestById = (requestId: string) =>
  AccountUpgradeRequest.findByIdAndDelete(requestId);
