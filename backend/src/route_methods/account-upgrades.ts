import { Request, Response } from "express";
import { type AcceptAccountUpgradeRequest } from "./request-types";

import {
  AccountUpgradeRequestModel,
  findAccountUpgradeRequest,
  findAccountUpgradeRequestById,
  addAccountRequest,
  deleteAccountUpgradeRequestById,
} from "../db/models/account-upgrade-requests";

import { findUserById, upgradeUserToCreator } from "../db/models/user";
import { isRequestValid, AccountType } from "../util";

export const upgradeAccountRequest = async (req: Request, res: Response) => {
  const accountId = req.body.accountId;

  if (!accountId) {
    res
      .status(400)
      .send("Request object does not have all the correct properties");
    return;
  }

  const doesUserAlreadyRequested = await findAccountUpgradeRequest(accountId);
  if (doesUserAlreadyRequested) {
    res.status(400).send("You already sent an account upgrade request");
    return;
  }

  const curUser = (await findUserById(accountId))!;

  const upgradeRequestModel: AccountUpgradeRequestModel = {
    accountId: accountId,
    city: curUser.city,
  };

  await addAccountRequest(upgradeRequestModel);
  res.send("Account upgrade request sent succesfully");
};

export const acceptAccountUpgradeRequest = async (
  req: Request,
  res: Response
) => {
  const acceptUpgradeRequest: AcceptAccountUpgradeRequest = {
    townHallAccountId: req.body.townHallAccountId,
    requestId: req.body.requestId,
  };

  if (!isRequestValid(acceptUpgradeRequest)) {
    res
      .status(400)
      .send("Request object does not have all the correct properties");
    return;
  }

  const curUpgradeRequest = await findAccountUpgradeRequestById(
    acceptUpgradeRequest.requestId
  );
  if (!curUpgradeRequest) {
    res.status(400).send("Upgrade request does not exist");
    return;
  }

  const townHallAccount = await findUserById(
    acceptUpgradeRequest.townHallAccountId
  );
  if (
    !townHallAccount ||
    townHallAccount.accountType != AccountType.TOWN_HALL ||
    townHallAccount.city !== curUpgradeRequest.city
  ) {
    res
      .status(400)
      .send("Account id is wrong or the account is managing another town hall");
    return;
  }

  const accountToUpgrade = await findUserById(curUpgradeRequest.accountId);
  if (!accountToUpgrade) {
    res.status(400).send("Account to upgrade does not exist");
    return;
  }

  await upgradeUserToCreator(curUpgradeRequest.accountId);
  await deleteAccountUpgradeRequestById(acceptUpgradeRequest.requestId);

  res.send("Account upgraded succesfully");
};
