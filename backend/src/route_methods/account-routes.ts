import { Request, Response } from "express";
import {
  type RegisterAccountRequest,
  type LoginAccountRequest,
  ProfilePictureRequest,
} from "./request-types";
import fs from "fs";

import { type UserData } from "./response-types";

import {
  UserModel,
  addNewUser,
  findUserByUsername,
  findUserByEmail,
  updateProfilePictureStatus,
} from "../db/models/user";

import { isRequestValid, AccountType, SUPER_SECRET_PASSWORD } from "../util";
import jwt from "jsonwebtoken";

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

  res.send("Account registered successfully");
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
    savedEvents: currentUser.savedEvents,
  };

  const token = jwt.sign(
    { id: userDataResponse.id, username: userDataResponse.username },
    SUPER_SECRET_PASSWORD,
    { expiresIn: "1 days" }
  );

  res.json({
    userData: userDataResponse,
    authToken: token,
  });
};

export const changeProfilePicture = async (req: Request, res: Response) => {
  const profilePictureRequest: ProfilePictureRequest = {
    accountId: req.body.accountId,
    base64Photo: req.body.base64Photo,
  };

  if (!isRequestValid(profilePictureRequest)) {
    res
      .status(400)
      .send("Request object does not have all the correct properties");
    return;
  }

  const base64ProfileImage = profilePictureRequest.base64Photo;

  const dataWithoutPrefix = base64ProfileImage.replace(
    /^data:image\/\w+;base64,/,
    ""
  );
  const buffer = Buffer.from(dataWithoutPrefix, "base64");
  const filePath = `public/profile/${profilePictureRequest.accountId}.jpg`;

  fs.writeFile(filePath, buffer, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Image saved successfully!");
    }
  });

  await updateProfilePictureStatus(profilePictureRequest.accountId, true);
  res.send("Profile picture changed succesfully");
};
