import { type UpgradeRequest } from "../remote/response-types";
import Request from "./Request.tsx";

type CreatorRequestsProps = {
  requestList: Array<UpgradeRequest>;
};

function CreatorRequests({ requestList }: CreatorRequestsProps) {
  if (requestList.length === 0) {
    return <h3 style={{ textAlign: "center" }}>Nu exista cereri!</h3>;
  }

  return (
    <>
      <ul>
        {requestList.map((request) => (
          <li key={request.requestId}>
            <Request requestItem={request} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default CreatorRequests;
