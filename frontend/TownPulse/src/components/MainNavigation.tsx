import { NavLink } from "react-router-dom";

import classes from "./MainNavigation.module.css";

function isPageActive(isActive: boolean): string | undefined {
  return isActive ? classes.active : undefined;
}

function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => isPageActive(isActive)}
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/eventsCalendar"
              className={({ isActive }) => isPageActive(isActive)}
            >
              Events calendar
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/addEvent"
              className={({ isActive }) => isPageActive(isActive)}
            >
              Add event
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) => isPageActive(isActive)}
            >
              Profile
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/authentication"
              className={({ isActive }) => isPageActive(isActive)}
            >
              Log in
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
