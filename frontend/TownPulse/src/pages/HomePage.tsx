import Event from "../components/Event";
import classes from "../components/HomePage.module.css";
import FilterBar from "../components/FilterBar";
import { Event as EventModel } from "../util/Types";
import { LoaderFunction, useLoaderData } from "react-router-dom";

function HomePage() {
  const events = useLoaderData() as Array<EventModel>;
  

  return (
    <div className={classes.mainDiv}>
      <FilterBar />
      <ul id={classes.events}>
        {events.map((ev) => (
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
