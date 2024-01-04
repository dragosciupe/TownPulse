import Event from "../components/Event";
import { EVENTS } from "../util/Constants";
import classes from "../components/HomePage.module.css";
import FilterBar from "../components/FilterBar";
function HomePage() {
  return (
  
   <div className={classes.mainDiv}>
    <FilterBar />
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
      </div>
  );
}

export default HomePage;
