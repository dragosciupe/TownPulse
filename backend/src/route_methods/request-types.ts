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
