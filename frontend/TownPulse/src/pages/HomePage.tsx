import Event from "../components/Event";
import classes from "../components/HomePage.module.css";
import FilterBar from "../components/FilterBar";
import { Event as EventModel, HomePageEvent } from "../util/Types";
import { LoaderFunction, useLoaderData } from "react-router-dom";
import { useState } from "react";
import { getHomePageEvents } from "../util/Methods";

function HomePage() {
  const initialEvents = useLoaderData() as Array<EventModel>;
  const loadedEvents = getHomePageEvents(initialEvents);
  const [filteredEvents, setFilteredEvents] = useState(loadedEvents);

  function handleEventFiltering(events: Array<HomePageEvent>) {
    setFilteredEvents(events);
  }

  return (
    <div className={classes.mainDiv}>
      <FilterBar
        initialEvents={loadedEvents}
        updateEvents={handleEventFiltering}
        
      />
      <ul id={classes.events}>
        {filteredEvents.map((ev) => (
          <Event key={ev.id} event={ev} />
        ))}
      </ul>
    </div>
  );
}

export default HomePage;

export const eventsLoader: LoaderFunction<Array<EventModel>> = async () => {
  const response = await fetch(`http://localhost:3000/getAllEvents`);

  return response;
};
