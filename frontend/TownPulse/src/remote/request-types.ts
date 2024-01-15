import { PostComment } from "../util/Types";

export type LoginAccountRequest = {
  username: string;
  password: string;
};

export type RegisterAccountRequest = {
  username: string;
  password: string;
  city: string;
  email: string;
};

export type RequestWithAccountId = {
  accountId: string;
};

export type AccountUpgradeRequest = {
  townHallAccountId: string;
  requestId: string;
};

export type AddEventRequest = {
  creatorUsername: string;
  title: string;
  duration: number;
  date: number;
  description: string;
  coordinates: [number, number];
};

export type AddCommentRequest = {
  eventId: string;
 
}&PostComment;

export type EventActionRequest = {
  eventId: string;
  accountId: string;
};

export type ProfilePictureRequest = {
  accountId: string;
  base64Photo: string;
};
