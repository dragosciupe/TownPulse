import { UserData, type Event } from "../util/Types";
import classes from "../components/DeatilPage.module.css";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Mapp from "../components/Map";
import { useLoaderData, useSubmit } from "react-router-dom";
import {
  formatDateInCustomFormat,
  getAuthToken,
  getUserData,
  modifySavedEvents,
} from "../util/Methods";
import EventComments from "../components/EventComments.tsx";
import { EventActionRequest } from "../remote/request-types.ts";
import IconButton from "@mui/material/IconButton";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import BookmarkIcon from "@mui/icons-material/Bookmark";
export default function DetailPage() {
  const curEvent = useLoaderData() as Event;
  const triggerAction = useSubmit();
  let eventFormat: string;
  function handleEventInteraction(actionMode: "like" | "join" | "save") {
    const userData = getUserData();
    if (!userData) {
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
  if (curEvent.eventType === "Divertisment") {
    eventFormat = "Eveniment de divertisment";
  } else {
    eventFormat = `Eveniment ${curEvent.eventType}`;
  }
  const userData = getUserData()!;
  let isLiked: string | undefined = curEvent.likes.find(
    (accID) => accID === userData.id
  );

  let isJoining: string | undefined = curEvent.participants.find(
    (accID) => accID === userData.id
  );

  let isSaved: string | undefined = userData.savedEvents.find(
    (ev) => ev === curEvent.id
  );
  const handleLikeClick = () => {
    handleEventInteraction("like");
  };
  const handleParticipClick = () => {
    handleEventInteraction("join");
  };
  const handleSaveClick = () => {
    handleEventInteraction("save");
  };

  return (
    <div className={classes.mainDiv}>
      <div
        style={{
          backgroundImage: `url(http://localhost:3000/images/${curEvent.id}.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "550px",
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
            <p>
              {formatDateInCustomFormat(curEvent.date)}, {curEvent.startTime}
            </p>
          </div>
          <div className={classes.iconDetailDiv}>
            <FontAwesomeIcon icon={faClock} style={{ paddingRight: "10px" }} />
            <p>{curEvent.duration} ore</p>
          </div>
          <div>
            <p className={classes.typeP}>{eventFormat}</p>
          </div>
        </div>
        <div className={classes.likesDiv}>
          <div className={classes.smallDetailDiv}>
            <IconButton>
              <ThumbUpAltIcon
                style={{ width: "90px" }}
                className={`${classes.detailPageBtn} ${
                  isLiked ? classes.active : ""
                }`}
                onClick={handleLikeClick}
              ></ThumbUpAltIcon>
            </IconButton>
            <p>{curEvent.likes.length}</p>
          </div>
          <div className={classes.smallDetailDiv}>
            <IconButton>
              <AddCircleOutlineIcon
                className={`${classes.detailPageBtn} ${
                  isJoining ? classes.active : ""
                }`}
                style={{ width: "90px" }}
                onClick={handleParticipClick}
              />
            </IconButton>
            <p> {curEvent.participants.length}</p>
          </div>
          <div className={classes.smallDetailDiv}>
            <IconButton>
              <BookmarkIcon
                className={`${classes.detailPageBtn} ${
                  isSaved ? classes.active : ""
                }`}
                style={{ width: "110px" }}
                onClick={handleSaveClick}
              />
            </IconButton>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: "20px" }}>
        <div style={{ flex: 1 }}>
          <div className={classes.detailDesc}>{curEvent.description}</div>

          <EventComments eventId={curEvent.id} comments={curEvent.comments} />
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              width: "100%",

              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <Mapp lat={curEvent.coordinates[0]} lng={curEvent.coordinates[1]} />
          </div>
        </div>
      </div>
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
    const parsedPayload = JSON.parse(payloadToSend) as EventActionRequest;
    modifySavedEvents(parsedPayload.eventId);
    urlEndpoint = "saveEvent";
  }

  const response = await fetch(`http://localhost:3000/${urlEndpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body: payloadToSend,
  });

  return response;
};

export const eventDetailsLoader = async ({ params }) => {
  const id = params.eventId;

  const paramsToSend = new URLSearchParams({ eventId: id }).toString();

  const response = await fetch(
    `http://localhost:3000/getEvent?${paramsToSend}`,
    {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    }
  );

  return response;
};
