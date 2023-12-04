import { useRouteLoaderData, NavLink } from "react-router-dom";
import { AccountType, UserData } from "../util/Types";

function ProfileNavigation() {
  const userData = (useRouteLoaderData("root") as UserData)!;

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/profile">Account details</NavLink>
        </li>
        <li>
          <NavLink to="/profile/savedEvents">Saved events</NavLink>
        </li>
        {userData.accountType === AccountType.NORMAL && (
          <li>
            <NavLink to="/profile/creatorAccountPage">
              Request a creator's account
            </NavLink>
          </li>
        )}
        {userData.accountType === AccountType.TOWN_HALL && (
          <li>Creator requests</li>
        )}
      </ul>
    </nav>
  );
}

export default ProfileNavigation;
