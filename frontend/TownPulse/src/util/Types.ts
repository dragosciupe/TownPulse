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

export enum Cities {
  BUCHAREST = "Bucuresti",
  CLUJ = "Cluj-Napoca",
  TIMISOARA = "Timisoara",
  IASI = "Iasi",
  CONSTANTA = "Constanta",
  BRASOV = "Brasov",
  GALATI = "Galati",
  CRAIOVA = "Craiova",
  BAIA_MARE = "Baia-Mare",
  PLOIESTI = "Ploiesti",
  ORADEA = "Oradea",
  DEVA = "Deva",
  SIMERIA = "Simeria",
}

export enum OrderBy {
  DATE = "Data",
  LIKES = "Like-uri",
  PARTICIPANTS = "Participanti",
}

export enum SortOrder {
  ASCENDING = "Crescator",
  DESCENDING = "Descrescator",
}

export type UserData = {
  id: string;
  username: string;
  city: string;
  email: string;
  accountType: AccountType;
  savedEvents: Array<string>;
};

export type PostComment = {
  authorId: string;
  author: string;
  date: number;
  message: string;
};

export type Event = {
  id: string;
  creatorUsername: string;
  creatorId: string;
  eventType: EventType;
  title: string;
  startTime: string;
  duration: number;
  date: number;
  city: string;
  description: string;
  coordinates: [number, number];
  likes: Array<string>;
  comments: Array<PostComment>;
  participants: Array<string>;
};

export type HomePageEvent = {
  id: string;
  creatorUsername: string;
  creatorId: string;
  eventType: EventType;
  title: string;
  startTime: string;
  duration: number;
  date: number;
  city: string;
  description: string;
  likesCount: number;
  commentsCount: number;
  participantsCount: number;
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
