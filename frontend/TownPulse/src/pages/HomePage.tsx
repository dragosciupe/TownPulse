import Event from "../components/Event";
import { EVENTS } from "../util/Constants";
import classes from "../components/HomePage.module.css";
function HomePage() {
  return (
    <>
      <ul id={classes.events}>
        {EVENTS.map((ev) => (
          <Event
            key={ev.id}
            id={ev.id}
            title={ev.title}
            img={ev.img}
            date={new Date(ev.date)}
            desc={ev.desc}
            city={ev.city}
          />
        ))}
      </ul>
    </>
  );
}

export default HomePage;
