import { LoaderFunction, redirect } from "react-router-dom";
import {
  MIN_USERNAME_LENGTH,
  MAX_USERNAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  USER_DATA_KEY,
} from "../util/Constants";

import { type UserData } from "./Types";

export function checkFieldForError(
  field: string,
  value: string,
  password: string = ""
): string {
  switch (field) {
    case "username": {
      if (value.length < MIN_USERNAME_LENGTH)
        return `Username needs to be at least ${MIN_USERNAME_LENGTH} characters long`;

      if (value.length > MAX_USERNAME_LENGTH)
        return `Username needs to be at most ${MAX_USERNAME_LENGTH} characters long`;

      return "";
    }

    case "password": {
      if (value.length < MIN_PASSWORD_LENGTH)
        return `Password needs to be at least ${MIN_PASSWORD_LENGTH} characters long`;

      return "";
    }

    case "confirmPassword": {
      if (value != password) return "The passwords should be the same";

      return "";
    }

    case "city": {
      if (value.length === 0) return "City is mandatory";

      return "";
    }

    case "email": {
      if (value.length === 0) return "Email is mandatory";

      return "";
    }

    default: {
      return "";
    }
  }
}

export function saveUserData(userData: UserData) {
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
}

export function getUserData(): UserData | null {
  const userData = localStorage.getItem(USER_DATA_KEY);
  if (!userData) return null;
  return JSON.parse(userData);
}

export function deleteUserData() {
  localStorage.removeItem(USER_DATA_KEY);
}

export const authLoader: LoaderFunction<UserData> = () => {
  return getUserData();
};

export function logoutAction() {
  deleteUserData();
  return redirect("/");
}
