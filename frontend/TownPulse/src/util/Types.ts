export const enum AccountType {
  NORMAL,
  CREATOR,
  TOWN_HALL,
}

export enum EventType {
  DIVERTISMENT = "Divertisment",
  CULTURAL = "Cultural",
  PROFESIONAL = "Profesional",
  COMUNITAR = "Comunitar",
}

export const enum UpgradeRequestStatus {
  PENDING,
  ACCEPTED,
  REJECTED,
}

export type UserData = {
  id: string;
  username: string;
  city: string;
  email: string;
  accountType: AccountType;
};

export type PostComment = {
  author: string;
  date: number;
  message: string;
};

export type Event = {
  id: string;
  creatorUsername: string;
  eventType: EventType;
  title: string;
  duration: number;
  date: number;
  city: string;
  description: string;
  coordinates: [number, number];
  likes: Array<string>;
  comments: Array<PostComment>;
  participants: Array<string>;
};

export type AddEventRequest = {
  creatorUsername: string;
  eventType: EventType;
  title: string;
  duration: number;
  date: number;
  description: string;
  coordinates: [number, number];
  photo: string;
};
