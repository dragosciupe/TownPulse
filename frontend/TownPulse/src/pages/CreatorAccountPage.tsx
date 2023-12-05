import { useRouteLoaderData, Form, useActionData } from "react-router-dom";
import { AccountType, UserData } from "../util/Types";
import { getUserData } from "../util/Methods";
import classes from "../components/Auth.module.css";

function CreatorAccountPage() {
  const userData = useRouteLoaderData("root") as UserData;
  const creatorRequestResponse = useActionData() as string;

  return (
    <>
      {userData.accountType === AccountType.NORMAL ? (
        <>
          <h3 style={{ textAlign: "center" }}>
            You can apply to become a creator on TownPulse.
            <br />
            As a creator you can post events for the people of your city to see
            <br /> <br /> <br />
            Note: Your city's town hall can approve or reject your request
            however they see fit.
          </h3>

          <Form method="POST" className={classes.actions}>
            <button>Request a creator account</button>
          </Form>
        </>
      ) : undefined}
      {creatorRequestResponse && (
        <p
          style={{ textAlign: "center", marginTop: "30px", fontSize: "larger" }}
        >
          {creatorRequestResponse}
        </p>
      )}
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

  return response;
}
