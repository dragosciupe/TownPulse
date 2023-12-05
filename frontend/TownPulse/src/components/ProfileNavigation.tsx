import { useRouteLoaderData, NavLink } from "react-router-dom";
import { AccountType, UserData } from "../util/Types";
import classes from "./ProfileNavigation.module.css";

function isPageActive(isActive: boolean): string | undefined {
  return isActive ? classes.active : undefined;
}

function ProfileNavigation() {
  const userData = (useRouteLoaderData("root") as UserData)!;

  return (
    <nav className={classes.profile_navigation}>
      <ul>
        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) => isPageActive(isActive)}
            end
          >
            Account details
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile/savedEvents"
            className={({ isActive }) => isPageActive(isActive)}
          >
            Saved events
          </NavLink>
        </li>
        {userData.accountType === AccountType.NORMAL && (
          <li>
            <NavLink
              to="/profile/creatorAccountPage"
              className={({ isActive }) => isPageActive(isActive)}
            >
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
