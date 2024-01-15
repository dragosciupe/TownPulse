import { useLoaderData, LoaderFunction } from "react-router-dom";
import { type Event as EventModel } from "../util/Types";
import Event from "../components/Event.tsx";
import classes from "../components/HomePage.module.css";
import { getHomePageEvents, getUserData, getAuthToken } from "../util/Methods";

function SavedEventsPage() {
  const initialEvents = useLoaderData() as Array<EventModel>;
  const events = getHomePageEvents(initialEvents);

  return (
    <div className={classes.mainDiv}>
      <ul id={classes.events}>
        {events.map((ev) => (
          <Event key={ev.id} event={ev} />
        ))}
      </ul>
    </div>
  );
}

export default SavedEventsPage;

export const savedEventsLoader: LoaderFunction<
  Array<EventModel>
> = async () => {
  const userData = getUserData()!;
  const paramsToSend = new URLSearchParams({
    accountId: userData.id,
  }).toString();

  const response = await fetch(
    `http://localhost:3000/getSavedEvents?${paramsToSend}`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  return response;
};
