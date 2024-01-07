import {
  type EventModel,
  PostComment,
} from "../../../../backend/src/db/models/events";
import ted from "../util/images/conferinta.jpg";
import classes from "../components/DeatilPage.module.css";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

import Mapp from "../components/Map";
//const data = useLoaderData();
const comment: PostComment = {
  author: "Alice",
  date: new Date().getTime(),
  message: "This is a sample comment.",
};
const comment1: PostComment = {
  author: "Coite",
  date: new Date().getTime(),
  message: "This is a sample comment!.",
};
const data: EventModel = {
  creatorUsername: "JohnDoe",
  title: "Sample Event",
  duration: 3,
  date: new Date().getTime(),
  city: "Sample City",
  photoUrl: ted,
  description: "A TED talk is a recorded public-speaking presentation that was originally given at the main TED (technology, entertainment and design) annual event or one of its many satellite events around the world. TED is a nonprofit devoted to spreading ideas, usually in the form of short, powerful talks, often called ",
  coordinates: [37.7749, -122.4194],
  likes: ["User1", "User2"],
  comments: [comment, comment1],
  participants: ["User1", "User2"],
};

export default function DetailPage() {
  function formatDateInCustomFormat(timestamp: number) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const dateObject = new Date(timestamp);

    const day = dateObject.getDate();
    const month = months[dateObject.getMonth()];
    const year = dateObject.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
  }
  console.log(ted);
  
  return (
    <div className={classes.mainDiv}>
      <div
        style={{
          backgroundImage: `url(${data.photoUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "450px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
          alignItems: "center",
          color: "white",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
          marginTop: "-17px",
        }}
        className={classes.detailPageImg}
      >
        <h2>{formatDateInCustomFormat(data.date)}</h2>
        <h2 className={classes.detailPageTitle}>{data.title}</h2>
        <h2>{data.creatorUsername}</h2>
      </div>

      <div className={classes.firstDiv}>
        <div>
          <div className={classes.iconDetailDiv}>
            <FontAwesomeIcon
              icon={faCalendar}
              style={{ paddingRight: "10px", paddingBottom: "5px" }}
            />
            <p>{formatDateInCustomFormat(data.date)}</p>
          </div>
          <div className={classes.iconDetailDiv}>
            <FontAwesomeIcon icon={faClock} style={{ paddingRight: "10px" }} />
            <p>{data.duration} ore</p>
          </div>
        </div>
        <div className={classes.likesDiv}>
          <div className={classes.smallDetailDiv}>
            <button style={{ width: "90px" }} className={classes.detailPageBtn}>
              Like
            </button>
            <p>{data.likes.length}</p>
          </div>
          <div className={classes.smallDetailDiv}>
            <button className={classes.detailPageBtn}>Participanti</button>
            <p> {data.participants.length}</p>
          </div>
        </div>
      </div>
      <div>
        <div style={{display:"flex",justifyContent:'space-between',}} >
        <div style={{width:"50%",textAlign:'center',fontSize:'24px'}}>{data.description}</div>
        <div style={{width:"40%",height:"300px !important",borderRadius:"10px",}}>
          <Mapp />
          </div>
        </div>
        <div className={classes.commDiv}>
          <p className={classes.comm}>Comentarii</p>
          <ul >
            {data.comments.map((com) => (
              <li key={com.message} className={classes.commUl}>
                <h3>{com.author}</h3>
                <p>{formatDateInCustomFormat(com.date)}</p>
                <p>{com.message}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
/*
export async function loader(params) {
    const id = params.eventID;
    const response = await fetch ('http://localhost:3000'+id)
    if (!response.ok){
        throw json({message:"Could not fetch"},{status: 500})
    }   else{
        return response;
    }

    
}
*/
