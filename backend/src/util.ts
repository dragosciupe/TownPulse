export const enum AccountType {
  NORMAL,
  CREATOR,
  TOWN_HALL,
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
