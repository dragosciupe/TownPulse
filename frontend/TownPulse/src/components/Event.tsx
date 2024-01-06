import { Link } from "react-router-dom";
import { EventProps } from "../util/Types";
import classes from "./HomePage.module.css";

export default function Event({
  id,
  title,
  img,
  desc,
  date,
  city,
}: EventProps) {
  const formattedDate = new Date(date).toLocaleDateString();

  return (
    <li className={classes.event}>
      <div className={classes.eventLink}>
      <Link to={`/${id}`} className={classes.Link}>
        <img src={img} alt={id} />
        <div>
          <div className={classes.bigP}>
            <p>{formattedDate}</p>
            <p>{city}</p>
          </div>
          <h3>{title}</h3>
          <h2 className={classes.creator}>Creator</h2>
          <p style={{ fontWeight: "normal", paddingLeft:"13px" }}>{desc}</p>
          <div style={{padding:"20px"}}className={classes.bigP}>
            <p>Likes</p>
            <p>Comentarii</p>
            <p>Participanti</p>
          </div>
        </div>
        
      </Link>
      </div>
    </li>
  );
}
