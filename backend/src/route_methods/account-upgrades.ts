import { Request, Response } from "express";
import { type AccountUpgradeRequest } from "./request-types";

import {
  AccountUpgradeRequestModel,
  findRequestByAccountId,
  findRequestById,
  addRequest,
  updateRequestStatus,
} from "../db/models/account-upgrade-requests";

import { findUserById, upgradeUserToCreator } from "../db/models/user";
import { isRequestValid, AccountType, UpgradeRequestStatus } from "../util";

export const upgradeAccountRequest = async (req: Request, res: Response) => {
  const accountId = req.body.accountId;

  if (!accountId) {
    res
      .status(400)
      .send("Request object does not have all the correct properties");
    return;
  }

  const doesUserAlreadyRequested = await findRequestByAccountId(accountId);
  if (doesUserAlreadyRequested) {
    res.status(400).send("You already sent an account upgrade request");
    return;
  }

  const curUser = (await findUserById(accountId))!;

  const upgradeRequestModel: AccountUpgradeRequestModel = {
    accountId: accountId,
    city: curUser.city,
    status: UpgradeRequestStatus.PENDING,
  };

  await addRequest(upgradeRequestModel);
  res.send("Account upgrade request sent succesfully");
};

export const accountUpgradeRequestAction = async (
  req: Request,
  res: Response,
  mode: "accept" | "reject"
) => {
  const acceptUpgradeRequest: AccountUpgradeRequest = req.body;

  if (!isRequestValid(acceptUpgradeRequest)) {
    res
      .status(400)
      .send("Request object does not have all the correct properties");
    return;
  }

  const curUpgradeRequest = await findRequestById(
    acceptUpgradeRequest.requestId
  );
  if (!curUpgradeRequest) {
    res.status(400).send("Upgrade request does not exist");
    return;
  }

  const accountToUpgrade = await findUserById(curUpgradeRequest.accountId);
  if (!accountToUpgrade) {
    res.status(400).send("Account to upgrade does not exist");
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

  if (mode === "accept") {
    await upgradeUserToCreator(curUpgradeRequest.accountId);
    await updateRequestStatus(
      curUpgradeRequest._id.toString(),
      UpgradeRequestStatus.ACCEPTED
    );
    res.send("Account upgraded succesfully");
  } else {
    await updateRequestStatus(
      curUpgradeRequest._id.toString(),
      UpgradeRequestStatus.REJECTED
    );
    res.send("Request rejected succesfully");
  }
};
