import classes from "../components/DeatilPage.module.css";
import { UserData, type PostComment } from "../util/Types";
import { formatDateInCustomFormat } from "../util/Methods";
import { useRef } from "react";
import { useSubmit, useRouteLoaderData } from "react-router-dom";
import { AddCommentRequest } from "../remote/request-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

type EventCommentsProps = {
  eventId: string;
  comments: Array<PostComment>;
};

function EventComments({ eventId, comments }: EventCommentsProps) {
  const commentText = useRef<HTMLTextAreaElement>(null);
  const triggerAction = useSubmit();
  const userData = useRouteLoaderData("root") as UserData;
  comments = comments.sort((com1, com2) => com2.date - com1.date);

  function addComment() {
    const commentRequest: AddCommentRequest = {
      eventId: eventId,
      author: userData.username,
      date: new Date().getTime(),
      message: commentText.current?.value || "",
    };

    triggerAction(
      { commentRequest: JSON.stringify(commentRequest), mode: "comment" },
      { method: "POST" }
    );
  }

  return (
    <div className={classes.commDiv}>
      <p className={classes.comm}>Comentarii</p>
      
      <ul>
        {comments.map((com) => (
          <li key={com.date} className={classes.commUl}>
            <h3>{com.author}</h3>
            <p>{formatDateInCustomFormat(com.date)}</p>
            <p>{com.message}</p>
          </li>
        ))}
      </ul>
      <div style={{display:'flex',paddingBottom:'20px'}}>
      <textarea className={classes.textAreaDetail} ref={commentText} />
      <button className={classes.addCommBtn} onClick={addComment}><FontAwesomeIcon icon={faPlus} /></button>
      </div>
    </div>
  );
}

export default EventComments;
