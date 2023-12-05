import ProfileNavigation from "../components/ProfileNavigation";
import { Outlet, useRouteLoaderData } from "react-router-dom";
import { UserData } from "../util/Types";

function RootProfileLayout() {
  const userData = useRouteLoaderData("root") as UserData;

  if (!userData) {
    return (
      <>
        <h1 style={{ textAlign: "center" }}>You need to be logged in</h1>
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
