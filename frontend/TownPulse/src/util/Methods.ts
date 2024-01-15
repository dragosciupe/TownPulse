import { LoaderFunction, redirect } from "react-router-dom";
import {
  MIN_USERNAME_LENGTH,
  MAX_USERNAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  USER_DATA_KEY,
  AUTH_TOKEN_KEY,
} from "../util/Constants";

import {
  AccountType,
  Event,
  HomePageEvent,
  UpgradeRequestStatus,
  type UserData,
} from "./Types";

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
      const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isEmailValid = emailRegex.test(value);

      if (!isEmailValid) return "Email is invalid";
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

export function modifySavedEvents(eventId: string) {
  const userData = getUserData()!;
  console.log(eventId);
  if (userData.savedEvents.find((ev) => ev === eventId)) {
    userData.savedEvents = userData.savedEvents.filter((ev) => ev !== eventId);
  } else {
    userData.savedEvents.push(eventId);
  }

  console.log(userData);
  saveUserData(userData);
}

export function saveAuthToken(token: string) {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function getAuthToken(): string {
  return localStorage.getItem(AUTH_TOKEN_KEY)!;
}

export const authLoader: LoaderFunction<UserData> = () => {
  return getUserData();
};

export function logoutAction() {
  deleteUserData();
  return redirect("/");
}

export function upgradeRequestStatusToString(
  status: UpgradeRequestStatus
): string {
  switch (status) {
    case UpgradeRequestStatus.PENDING: {
      return "PENDING";
    }

    case UpgradeRequestStatus.ACCEPTED: {
      return "ACCEPTED";
    }

    case UpgradeRequestStatus.REJECTED: {
      return "REJECTED";
    }
  }
}

export function getAccountTypeString(accountType: AccountType): string {
  switch (accountType) {
    case AccountType.NORMAL: {
      return "Normal";
    }

    case AccountType.CREATOR: {
      return "Creator";
    }

    case AccountType.TOWN_HALL: {
      return "Primarie";
    }
  }
}

export function formatDateInCustomFormat(timestamp: number) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dateObject = new Date(timestamp);

  const day = dateObject.getDate();
  const month = months[dateObject.getMonth()];
  const year = dateObject.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}

export function getHomePageEvents(events: Array<Event>): Array<HomePageEvent> {
  return events.map((ev) => {
    const homePageEv: HomePageEvent = {
      ...ev,
      likesCount: ev.likes.length,
      commentsCount: ev.comments.length,
      participantsCount: ev.participants.length,
    };

    return homePageEv;
  });
}
