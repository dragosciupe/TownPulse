import { Request, Response } from "express";
import {
  type RegisterAccountRequest,
  type LoginAccountRequest,
} from "./request-types";

import { type UserData } from "./response-types";

import {
  UserModel,
  addNewUser,
  findUserByUsername,
  findUserByEmail,
} from "../db/models/user";

import { isRequestValid, AccountType } from "../util";

export const registerUser = async (req: Request, res: Response) => {
  const registerRequest: RegisterAccountRequest = {
    username: req.body.username,
    password: req.body.password,
    city: req.body.city,
    email: req.body.email,
  };

  if (!isRequestValid(registerRequest)) {
    res
      .status(400)
      .send("Request object does not have all the correct properties");
    return;
  }

  const doesUserExist = await findUserByUsername(registerRequest.username);
  if (doesUserExist) {
    res.status(400).send("An account with this username already exists");
    return;
  }

  const doesEmailExist = await findUserByEmail(registerRequest.email);
  if (doesEmailExist) {
    res.status(400).send("An account with this email already exists");
    return;
  }

  const userModel: UserModel = {
    username: registerRequest.username,
    password: registerRequest.password,
    city: registerRequest.city,
    email: registerRequest.email,
    accountType: AccountType.NORMAL,
    savedEvents: Array(),
  };

  await addNewUser(userModel);
  res.send("Account registered succesfully");
};

export const loginUser = async (req: Request, res: Response) => {
  const loginRequest: LoginAccountRequest = {
    username: req.body.username,
    password: req.body.password,
  };

  if (!isRequestValid(loginRequest)) {
    res
      .status(400)
      .send("Request object does not have all the correct properties");
    return;
  }

  const currentUser = await findUserByUsername(loginRequest.username);
  if (!currentUser) {
    res.status(400).json("No account with this username exists");
    return;
  }

  if (currentUser.password !== loginRequest.password) {
    res.status(400).json("Password is not correct");
    return;
  }

  const userDataResponse: UserData = {
    id: currentUser._id.toString(),
    username: currentUser.username,
    city: currentUser.city,
    email: currentUser.email,
    accountType: currentUser.accountType,
  };
  res.json(userDataResponse);
};
