import EventCalendarButton from "../components/EventCalendarButton";
import clasess from "../components/EventCalendarButton.module.css";
import { Event as EventModel } from "../util/Types";
import { LoaderFunction, useLoaderData } from "react-router-dom";
import { getHomePageEvents } from "../util/Methods";
import { useState } from "react";
import { getUserData } from "../util/Methods";
import classes from "../components/HomePage.module.css";
import Event from "../components/Event";
function EventsCalendarPage() {
  const today = new Date();
  today.setHours(4, 0, 0, 0);
  const day1 = today.getTime();

  const day2 = new Date(today);
  day2.setDate(today.getDate() + 1);
  const day2T = day2.getTime();

  const day3 = new Date(today);
  day3.setDate(today.getDate() + 2);
  const day3T = day3.getTime();

  const day4 = new Date(today);
  day4.setDate(today.getDate() + 3);
  const day4T = day4.getTime();

  const day5 = new Date(today);
  day5.setDate(today.getDate() + 4);
  const day5T = day5.getTime();

  const day6 = new Date(today);
  day6.setDate(today.getDate() + 5);
  const day6T = day6.getTime();

  const day7 = new Date(today);
  day7.setDate(today.getDate() + 6);
  const day7T = day7.getTime();

  const initialEvents = useLoaderData() as Array<EventModel>;
  const loadedEvents = getHomePageEvents(initialEvents);
  const userData = getUserData();
  const filteredByCity = loadedEvents.filter(
    (event) => event.city === userData?.city
  );
  const [isActive, setIsActive] = useState(0);
  const [filteredEvents, setFilteredEvents] = useState(filteredByCity);
  function handleSelect(timestamp, number) {
    setFilteredEvents(
      filteredByCity.filter((event) => event.date === timestamp)
    );
    setIsActive(number);
  }

  return (
    <>
      <div className={clasess.calendarDiv}>
        <EventCalendarButton
          isActive={isActive === 1}
          timestamp={day1}
          onSelect={() => handleSelect(day1, 1)}
        />
        <EventCalendarButton
          isActive={isActive === 2}
          timestamp={day2T}
          onSelect={() => handleSelect(day2T, 2)}
        />
        <EventCalendarButton
          isActive={isActive === 3}
          timestamp={day3T}
          onSelect={() => handleSelect(day3T, 3)}
        />
        <EventCalendarButton
          isActive={isActive === 4}
          timestamp={day4T}
          onSelect={() => handleSelect(day4T, 4)}
        />
        <EventCalendarButton
          isActive={isActive === 5}
          timestamp={day5T}
          onSelect={() => handleSelect(day5T, 5)}
        />
        <EventCalendarButton
          isActive={isActive === 6}
          timestamp={day6T}
          onSelect={() => handleSelect(day6T, 6)}
        />
        <EventCalendarButton
          isActive={isActive === 7}
          timestamp={day7T}
          onSelect={() => handleSelect(day7T, 7)}
        />
      </div>
      <div style={{ marginLeft: "100px" }}>
        <ul id={classes.events}>
          {filteredEvents.map((ev) => (
            <Event key={ev.id} event={ev} />
          ))}
        </ul>
      </div>
    </>
  );
}

export default EventsCalendarPage;
export const eventsLoader: LoaderFunction<Array<EventModel>> = async () => {
  const response = await fetch(`http://localhost:3000/getAllEvents`);
  const data = await response.json();

  return data;
};
