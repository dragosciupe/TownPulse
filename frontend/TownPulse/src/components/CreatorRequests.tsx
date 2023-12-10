import { type UpgradeRequest } from "../remote/response-types";

type CreatorRequestsProps = {
  requestList: Array<UpgradeRequest>;
};

function CreatorRequests({ requestList }: CreatorRequestsProps) {
  return (
    <>
      <ul>
        {requestList.map((request) => (
          <li key={request.requestId}>{request.accountId}</li>
        ))}
      </ul>
    </>
  );
}

export default CreatorRequests;
