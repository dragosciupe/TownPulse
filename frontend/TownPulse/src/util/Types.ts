export const enum AccountType {
  NORMAL,
  CREATOR,
  TOWN_HALL,
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
export type EventProps = {
  id: string;
  title: string;
  img: string;
  desc: string;
  date: Date;
  city: string;
};
