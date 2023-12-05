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
          <h3>{title}</h3>
          <p>{desc}</p>
          <p>{formattedDate}</p>
          <p>{city}</p>
        </div>
      </article>
    </li>
  );
}
