import { useRouteLoaderData, Form, useActionData } from "react-router-dom";
import { AccountType, UserData } from "../util/Types";
import { getUserData } from "../util/Methods";

function CreatorAccountPage() {
  const userData = useRouteLoaderData("root") as UserData;
  const creatorRequestResponse = useActionData() as string;

  return (
    <>
      {userData.accountType === AccountType.NORMAL ? (
        <Form method="POST">
          <button>Request a creator account</button>
        </Form>
      ) : undefined}
      {creatorRequestResponse && <p>{creatorRequestResponse}</p>}
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
