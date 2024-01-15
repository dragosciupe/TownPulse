import mongoose from "mongoose";
import { AccountType } from "../../util";

export interface UserModel {
  username: string;
  password: string;
  city: string;
  email: string;
  accountType: AccountType;
  savedEvents: Array<string>;
}

const userSchema = new mongoose.Schema<UserModel>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  city: { type: String, required: true },
  email: { type: String, required: true },
  accountType: { type: Number, required: true },
  savedEvents: { type: [String], required: true },
});

export const User = mongoose.model<UserModel>("user", userSchema);

export async function addNewUser(user: UserModel) {
  const newUser = new User(user);
  await newUser.save();
}

export async function upgradeUserToCreator(id: string) {
  await User.findByIdAndUpdate(id, { accountType: AccountType.CREATOR });
}

export const findAllUsers = () => User.find();

export const findUserByUsername = (username: string) =>
  User.findOne({ username: username });

export const findUserByEmail = (email: string) =>
  User.findOne({ email: email });

export const findUserById = (id: string) => User.findById(id);

export const updateSavedEventsById = (id: string, savedEvents: Array<string>) =>
  User.findByIdAndUpdate(id, { savedEvents: savedEvents });

export const updateProfilePictureStatus = (id: string, status: boolean) =>
  User.findByIdAndUpdate(id, { hasProfilePicture: status });
