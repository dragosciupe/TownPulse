import { NavLink, useRouteLoaderData, Form, useMatch } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import { UserData } from "../util/Types";
import logo from '../util/images/svjicon.png'
function isPageActive(isActive: boolean): string | undefined {
  return isActive ? classes.active : undefined;
}

function MainNavigation() {
  const userData = useRouteLoaderData("root") as UserData;
  const ruote = useMatch('/:eventid')
  console.log(ruote);
  return (
    <header className={classes.header}>
      <div>
          <img src={logo} alt ='nu este poza' className={classes.image}/>
          <p className={classes.bigP}>
          <p className={classes.firstP}>TownPulse</p>
          <p className={classes.secondP}>All events. One place</p>
          </p>
       </div>
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
            {userData === null ? (
              <NavLink
                to="/authentication?mode=login"
                className={({ isActive }) => isPageActive(isActive)}
              >
                Log in
              </NavLink>
            ) : (
              <Form action="/logout" method="post">
                <button id={classes.logout_button}>Logout</button>
              </Form>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
