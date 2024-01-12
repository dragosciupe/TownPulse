import { Link } from "react-router-dom";
import classes from "./HomePage.module.css";
import { type HomePageEvent } from "../util/Types";

type EventProps = {
  event: HomePageEvent;
};

export default function Event({ event }: EventProps) {
  const dateConstructor = new Date(event.date);
  const day = dateConstructor.getDate();
  const month = dateConstructor.getMonth() + 1;
  const year = dateConstructor.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  return (
    <li className={classes.event}>
      <div className={classes.eventLink}>
        <Link to={`/${event.id}`} className={classes.Link}>
          <img
            src={`http://localhost:3000/images/${event.id}.jpg`}
            alt={event.id}
          />
          <div>
            <div className={classes.bigP}>
              <p>{formattedDate}</p>
              <p>{event.city}</p>
            </div>
            <h3>{event.title}</h3>
            <h2 className={classes.creator}>{event.creatorUsername}</h2>
            <p className={classes.eventDesc} style={{ fontWeight: "normal" }}>
              {event.description}
            </p>
            <div style={{ padding: "20px" }} className={classes.likesDiv}>
              <div>{event.likesCount} Likes</div>
              <div>{event.commentsCount} Comentarii</div>
              <div>{event.participantsCount} Participanti</div>
            </div>
          </div>
        </Link>
      </div>
    </li>
  );
}
