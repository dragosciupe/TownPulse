import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./pages/RootLayout.tsx";
import HomePage from "./pages/HomePage.tsx";
import EventsCalendarPage from "./pages/EventsCalendarPage.tsx";
import AddEventPage from "./pages/AddEventPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import AuthenticationPage, {
  action as authAction,
} from "./pages/AuthenticationPage.tsx";
import { authLoader, logoutAction } from "./util/Methods.ts";

const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    element: <RootLayout />,
    loader: authLoader,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/eventsCalendar", element: <EventsCalendarPage /> },
      { path: "/addEvent", element: <AddEventPage /> },
      { path: "/profile", element: <ProfilePage /> },
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
