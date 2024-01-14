import { Link } from "react-router-dom";
import classes from "./HomePage.module.css";
import { type HomePageEvent } from "../util/Types";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
type EventProps = {
  event: HomePageEvent;
};

export default function Event({ event }: EventProps) {
  const dateConstructor = new Date(event.date);
  const day = dateConstructor.getDate();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[dateConstructor.getMonth()];
  const formattedDate = `${day} ${month}`;

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
             <div className={classes.homePageIcons}>
             <CalendarMonthIcon/>
               <p style={{marginLeft:'0px'}}>{formattedDate}</p>
             </div>
             <div className={classes.homePageIcons}>
              <LocationOnIcon/>
              <p style={{marginLeft:'0px'}}>{event.city}</p>
              </div>
              <div className={classes.homePageIcons}>
                <AccessTimeIcon/>
              <p style={{marginLeft:'0px'}}>18:30</p>
              </div>
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
