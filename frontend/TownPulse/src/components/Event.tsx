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
      <article>
        <img src={img} alt={id} />
        <div>
          <div className={classes.bigP}>
            <p>{formattedDate}</p>
            <p>{city}</p>
          </div>
          <h3>{title}</h3>
          <p style={{ fontWeight: "normal", paddingLeft:"13px" }}>{desc}</p>
          <div style={{padding:"20px"}}className={classes.bigP}>
            <p>Likes</p>
            <p>Comentarii</p>
            <p>Participanti</p>
          </div>
        </div>
      </article>
    </li>
  );
}
