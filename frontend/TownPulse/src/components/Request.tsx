import "@fortawesome/fontawesome-free/css/all.css";
import { UpgradeRequest } from "../remote/response-types";
import { AccountType, type UserData } from "../util/Types";
import { useRouteLoaderData, useSubmit } from "react-router-dom";
import { upgradeRequestStatusToString } from "../util/Methods";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import classes from "./Request.module.css";
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

  const dateConstructor = new Date(requestItem.date);
  const day = dateConstructor.getDate();
  const month = dateConstructor.getMonth() + 1;
  const year = dateConstructor.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;
  let stiluri:string= 'default';

  if(upgradeRequestStatusToString(requestItem.status)==='ACCEPTED'){
    stiluri='green';

  }
    if(upgradeRequestStatusToString(requestItem.status)==='PENDING'){
      stiluri='yellow';
    }
    if(upgradeRequestStatusToString(requestItem.status)==='REJECTED'){
      stiluri='red';
    }
 

  if (userData.accountType === AccountType.TOWN_HALL) {
    return (
      <div className={classes.requestBigDiv}>
        <div className={classes.requestCredentialsDivI}>
          <div>
            <FontAwesomeIcon icon={faUser} className={classes.requestIcon} />
          </div>
          <div className={classes.requestCredentialsDiv}>
            <div>
              <label>Username:</label>
              <label>{requestItem.accountUsername}</label>
            </div>

            <div>
              <label>Date:</label>
              <label>{formattedDate}</label>
            </div>
          </div>
        </div>
        <div className={classes.requestBtnDiv}>
          <button
            className={classes.requestBtn}
            onClick={() => handleActionTrigger("accept")}
          >
            Accepta
          </button>
          <button
            className={classes.requestBtn}
            onClick={() => handleActionTrigger("reject")}
          >
            Refuza
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className={classes.requestBigDiv}>
        <div>
          <label>Date:</label>
          <label>{formattedDate}</label>
        </div>

        <div>
          <label style={{paddingRight:'5px'}}>Status:</label>
          <label style={{color:stiluri}}>{upgradeRequestStatusToString(requestItem.status)}</label>
        </div>
      </div>
    );
  }
}

export default Request;
