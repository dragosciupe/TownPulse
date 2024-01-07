import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./pages/RootLayout.tsx";
import HomePage, { eventsLoader } from "./pages/HomePage.tsx";
import EventsCalendarPage from "./pages/EventsCalendarPage.tsx";
import AddEventPage,{action as addEventAction} from "./pages/AddEventPage.tsx";
import RootProfileLayout from "./pages/RootProfileLayout.tsx";
import DetailPage, {/*loader as detailPageLoader*/} from "./pages/DetailPage.tsx";
import AuthenticationPage, {
  action as authAction,
} from "./pages/AuthenticationPage.tsx";
import { authLoader, logoutAction } from "./util/Methods.ts";
import CreatorAccountPage, {
  creatorRequestAction,
  creatorRequestsLoader,
} from "./pages/CreatorAccountPage.tsx";
import AccountDetailsPage from "./pages/AccountDetailsPage.tsx";
import SavedEventsPage from "./pages/SavedEventsPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    element: <RootLayout />,
    loader: authLoader,
    children: [
      { index: true, element: <HomePage />, loader: eventsLoader },
      { path: "/:eventid", element: <DetailPage />,/* loader: detailPageLoader */},
      { path: "/eventsCalendar", element: <EventsCalendarPage /> },
      { path: "/addEvent", element: <AddEventPage />,action:addEventAction },
      {
        path: "/profile",
        element: <RootProfileLayout />,
        children: [
          { index: true, element: <AccountDetailsPage /> },
          { path: "savedEvents", element: <SavedEventsPage /> },
          {
            path: "creatorAccountPage",
            element: <CreatorAccountPage />,
            loader: creatorRequestsLoader,
            action: creatorRequestAction,
          },
        ],
      },
      {
        path: "/authentication",
        element: <AuthenticationPage />,
        action: authAction,
      },
      { path: "logout", action: logoutAction },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
