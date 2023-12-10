import { UpgradeRequest } from "../remote/response-types";
import { AccountType, type UserData } from "../util/Types";
import { useRouteLoaderData, useSubmit } from "react-router-dom";
import { upgradeRequestStatusToString } from "../util/Methods";

type RequestProps = {
  requestItem: UpgradeRequest;
};

function Request({ requestItem }: RequestProps) {
  const userData = useRouteLoaderData("root") as UserData;
  const triggerAction = useSubmit();

  function handleActionTrigger(mode: "accept" | "reject") {
    triggerAction(
      { mode: mode, requestId: requestItem.requestId },
      { method: "POST" }
    );
  }

  if (userData.accountType === AccountType.TOWN_HALL) {
    return (
      <div>
        <div>
          <label>Username:</label>
          <label>{requestItem.accountUsername}</label>
        </div>

        <div>
          <label>Date:</label>
          <label>{requestItem.date}</label>
        </div>

        <div>
          <button onClick={() => handleActionTrigger("accept")}>Accepta</button>
          <button onClick={() => handleActionTrigger("reject")}>Refuza</button>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div>
          <label>Date:</label>
          <label>{requestItem.date}</label>
        </div>

        <div>
          <label>Status:</label>
          <label>{upgradeRequestStatusToString(requestItem.status)}</label>
        </div>
      </div>
    );
  }
}

export default Request;
