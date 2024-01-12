import Event from "../components/Event";
import classes from "../components/HomePage.module.css";
import FilterBar from "../components/FilterBar";
import { Event as EventModel } from "../util/Types";
import { LoaderFunction, useLoaderData } from "react-router-dom";
import { useState } from "react";

function HomePage() {
  const loadedEvents = useLoaderData() as Array<EventModel>;
  const [filteredEvents, setFilteredEvents] = useState(loadedEvents);

  function handleEventFiltering(events: Array<EventModel>) {
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
