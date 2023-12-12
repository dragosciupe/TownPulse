import { NavLink } from "react-router-dom";
import classes from "./ProfileNavigation.module.css";

function isPageActive(isActive: boolean): string | undefined {
  return isActive ? classes.active : undefined;
}

function ProfileNavigation() {
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

        <li>
          <NavLink
            to="/profile/creatorAccountPage"
            className={({ isActive }) => isPageActive(isActive)}
          >
            Creator's account
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default ProfileNavigation;
