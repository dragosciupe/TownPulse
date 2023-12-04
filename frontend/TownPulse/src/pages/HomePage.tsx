import Event from "../components/Event";
import { EVENTS } from "../util/Constants";
import classes from "../components/HomePage.module.css"
import imd from "../util/images/collage-party.jpg"
function HomePage() {
  
  return (
    <>
      <h1>Welcome to the home page</h1>
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
