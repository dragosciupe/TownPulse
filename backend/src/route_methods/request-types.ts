import { PostComment } from "../db/models/events";
import { EventType } from "../util";

export type RegisterAccountRequest = {
  username: string;
  password: string;
  city: string;
  email: string;
};

export type LoginAccountRequest = {
  username: string;
  password: string;
};

export type AccountUpgradeRequest = {
  townHallAccountId: string;
  requestId: string;
};

export type RequestWithAccountId = {
  accountId: string;
};

export type AddEventRequest = {
  creatorUsername: string;
  eventType: EventType;
  title: string;
  startTime: string;
  duration: number;
  date: number;
  description: string;
  coordinates: [number, number];
  photo: string;
};

export type LikeEventRequest = {
  eventId: string;
  accountId: string;
};

export type AddCommentRequest = {
  eventId: string;
} & PostComment;

export type ProfilePictureRequest = {
  accountId: string;
  base64Photo: string;
};
