import {
  useRouteLoaderData,
  useLoaderData,
  LoaderFunction,
  json,
} from "react-router-dom";
import { AccountType, type UserData } from "../util/Types";
import { getUserData, getAuthToken } from "../util/Methods";
import {
  AccountUpgradeRequest,
  type RequestWithAccountId,
} from "../remote/request-types";
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

export async function creatorRequestAction({ request }) {
  const userData = getUserData()!;
  let urlEndpoint: string;
  let requestBody: AccountUpgradeRequest | RequestWithAccountId;

  if (userData.accountType === AccountType.TOWN_HALL) {
    const data = await request.formData();
    const mode = data.get("mode");
    const requestId = data.get("requestId");

    urlEndpoint =
      mode === "accept" ? "acceptAccountUpgrade" : "rejectAccountUpgrade";
    requestBody = {
      townHallAccountId: userData.id,
      requestId: requestId,
    };
  } else {
    requestBody = { accountId: userData.id };
    urlEndpoint = "upgradeAccount";
  }

  const response = await fetch(`http://localhost:3000/${urlEndpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify(requestBody),
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
    `http://localhost:3000/accountUpgradeRequests?${accountParams}`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  return response;
};
