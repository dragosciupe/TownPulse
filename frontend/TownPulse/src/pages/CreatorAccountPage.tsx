import {
  useRouteLoaderData,
  useLoaderData,
  LoaderFunction,
  json,
} from "react-router-dom";
import { type UserData } from "../util/Types";
import { getUserData } from "../util/Methods";
import { type RequestWithAccountId } from "../remote/request-types";
import CreatorAccountHeader from "../components/CreatorAccountHeader";
import CreatorRequests from "../components/CreatorRequests";
import { UpgradeRequest, BasicResponse } from "../remote/response-types";

function CreatorAccountPage() {
  const userData = useRouteLoaderData("root") as UserData;
  const requestsList = useLoaderData() as Array<UpgradeRequest>;

  return (
    <>
      <CreatorAccountHeader
        accountType={userData.accountType}
        city={userData.city}
      />
      <CreatorRequests requestList={requestsList} />
    </>
  );
}

export default CreatorAccountPage;

export async function creatorRequestAction() {
  const accountId = getUserData()!.id;

  const response = await fetch("http://localhost:3000/upgradeAccount", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ accountId: accountId }),
  });

  const responseData = await response.text();

  let creatorAccountResponse: BasicResponse<string> = {
    status: response.ok,
    data: responseData,
  };

  return json(creatorAccountResponse);
}

export const creatorRequestsLoader: LoaderFunction<UserData> = async () => {
  const accountId = getUserData()!.id;
  const accountIdParams: RequestWithAccountId = {
    accountId: accountId,
  };
  const accountParams = new URLSearchParams(accountIdParams).toString();

  const response = await fetch(
    `http://localhost:3000/accountUpgradeRequests?${accountParams}`
  );

  return response;
};
