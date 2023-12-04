import ProfileNavigation from "../components/ProfileNavigation";
import { Outlet, useRouteLoaderData, Link } from "react-router-dom";
import { UserData } from "../util/Types";

function RootProfileLayout() {
  const userData = useRouteLoaderData("root") as UserData;

  if (!userData) {
    return (
      <>
        <h1>You need to be logged in</h1>
        <Link to="/authentication?mode=login" />
      </>
    );
  }

  return (
    <>
      <ProfileNavigation />
      <Outlet />
    </>
  );
}

export default RootProfileLayout;
