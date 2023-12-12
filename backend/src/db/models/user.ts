import mongoose from "mongoose";
import { AccountType } from "../../util";

export interface UserModel {
  username: string;
  password: string;
  city: string;
  email: string;
  accountType: AccountType;
}

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  city: { type: String, required: true },
  email: { type: String, required: true },
  accountType: { type: Number, required: true },
});

export const User = mongoose.model("user", userSchema);

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
