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

export const enum EventType {
  DIVERTISMENT = "Divertisment",
  CULTURAL = "Cultural",
  PROFESIONAL = "Profesional",
  COMUNITAR = "Comunitar",
}

//Methods
export function isRequestValid(requestObject: Object): boolean {
  const requestPropertiesTypes = Object.values(requestObject).map(
    (v) => typeof v
  );

  return !requestPropertiesTypes.includes("undefined");
}

//Constants
export const PORT = 3000;
export const MONGO_URL =
  "mongodb+srv://ciupedragos8:dragos123@cluster0.ymjaolg.mongodb.net/?retryWrites=true&w=majority";
export const SUPER_SECRET_PASSWORD = "password";
