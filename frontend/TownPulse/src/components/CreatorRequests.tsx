import { type UpgradeRequest } from "../remote/response-types";

type CreatorRequestsProps = {
  requestList: Array<UpgradeRequest>;
};

function CreatorRequests({ requestList }: CreatorRequestsProps) {
  if (requestList.length === 0) {
    return <h3>There aren't any requests</h3>;
  }

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
