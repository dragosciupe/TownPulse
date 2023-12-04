export const enum AccountType {
  NORMAL,
  CREATOR,
  TOWN_HALL,
}

export type UserData = {
  id: string;
  username: string;
  city: string;
  email: string;
  accountType: AccountType;
};
