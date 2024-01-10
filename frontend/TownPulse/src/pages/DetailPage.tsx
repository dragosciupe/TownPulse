import { type Event } from "../util/Types";
import classes from "../components/DeatilPage.module.css";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Mapp from "../components/Map";
import { useLoaderData, useSubmit } from "react-router-dom";
import { formatDateInCustomFormat, getUserData } from "../util/Methods";
import EventComments from "../components/EventComments.tsx";
import { EventActionRequest } from "../remote/request-types.ts";

export default function DetailPage() {
  const curEvent = useLoaderData() as Event;
  const triggerAction = useSubmit();

  function handleEventInteraction(actionMode: "like" | "join" | "save") {
    const userData = getUserData();
    if (!userData) {
      //To do: show the user feedback/an error,they are not logged in so they can't like/join/save an event;
      return;
    }
    const eventAction: EventActionRequest = {
      eventId: curEvent.id,
      accountId: userData.id,
    };
    triggerAction(
      { eventAction: JSON.stringify(eventAction), mode: actionMode },
      { method: "POST" }
    );
  }

  return (
    <div className={classes.mainDiv}>
      <div
        style={{
          backgroundImage: `url(http://localhost:3000/images/${curEvent.id}.jpg)`,
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
        <h2>{formatDateInCustomFormat(curEvent.date)}</h2>
        <h2 className={classes.detailPageTitle}>{curEvent.title}</h2>
        <h2>{curEvent.creatorUsername}</h2>
      </div>

      <div className={classes.firstDiv}>
        <div>
          <div className={classes.iconDetailDiv}>
            <FontAwesomeIcon
              icon={faCalendar}
              style={{ paddingRight: "10px", paddingBottom: "5px" }}
            />
            <p>{formatDateInCustomFormat(curEvent.date)}</p>
          </div>
          <div className={classes.iconDetailDiv}>
            <FontAwesomeIcon icon={faClock} style={{ paddingRight: "10px" }} />
            <p>{curEvent.duration} ore</p>
          </div>
          <div>
            <p>{curEvent.eventType}</p>
          </div>
        </div>
        <div className={classes.likesDiv}>
          <div className={classes.smallDetailDiv}>
            <button
              style={{ width: "90px" }}
              className={classes.detailPageBtn}
              onClick={() => handleEventInteraction("like")}
            >
              Like
            </button>
            <p>{curEvent.likes.length}</p>
          </div>
          <div className={classes.smallDetailDiv}>
            <button
              className={classes.detailPageBtn}
              onClick={() => {
                handleEventInteraction("join");
              }}
            >
              Participa
            </button>
            <p> {curEvent.participants.length}</p>
          </div>
          <div className={classes.smallDetailDiv}>
            <button
              className={classes.detailPageBtn}
              onClick={() => {
                handleEventInteraction("save");
              }}
            >
              Salveaza
            </button>
          </div>
        </div>
      </div>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ width: "50%", textAlign: "center", fontSize: "24px" }}>
            {curEvent.description}
          </div>
          <div
            style={{
              width: "40%",
              height: "300px !important",
              borderRadius: "10px",
            }}
          >
            <Mapp lat={curEvent.coordinates[0]} lng={curEvent.coordinates[1]} />
          </div>
        </div>
      </div>
      <EventComments eventId={curEvent.id} comments={curEvent.comments} />
    </div>
  );
}

export const detailsPageAction = async ({ request }) => {
  const data = await request.formData();
  const mode = data.get("mode");
  let payloadToSend = data.get("eventAction");
  let urlEndpoint: string;

  if (mode === "comment") {
    payloadToSend = data.get("commentRequest");
    urlEndpoint = "addComment";
  } else if (mode === "like") {
    urlEndpoint = "likeEvent";
  } else if (mode === "join") {
    urlEndpoint = "joinEvent";
  } else {
    urlEndpoint = "saveEvent";
  }

  const response = await fetch(`http://localhost:3000/${urlEndpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payloadToSend,
  });

  return response;
};

export const eventDetailsLoader = async ({ params }) => {
  const id = params.eventId;

  const paramsToSend = new URLSearchParams({ eventId: id }).toString();

  const response = await fetch(
    `http://localhost:3000/getEvent?${paramsToSend}`
  );

  return response;
};
