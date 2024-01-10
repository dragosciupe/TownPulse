import { getUserData, getAccountTypeString } from "../util/Methods";

function AccountDetailsPage() {
  const userData = getUserData()!;

  return (
    <div>
      <div>
        <label>Nume de utilizator: {userData.username}</label>
      </div>

      <div>
        <label>Oras: {userData.city}</label>
      </div>

      <div>
        <label>
          Tip utilizator: {getAccountTypeString(userData.accountType)}
        </label>
      </div>

      <div>
        <label>Email: {userData.email}</label>
      </div>
    </div>
  );
}

export default AccountDetailsPage;
