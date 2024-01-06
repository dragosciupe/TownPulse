import { Request, Response } from "express";

import {
  LikeEventRequest,
  type AddEventRequest,
  AddCommentRequest,
} from "./request-types";
import { isRequestValid } from "../util";
import {
  addEvent as addNewEvent,
  getEvents as getAllEvents,
  EventModel,
  findEventById,
  PostComment,
  updateCommentsById,
  updateLikesById,
  updateParticipantsById,
} from "../db/models/events";
import { findUserByUsername } from "../db/models/user";
import { ObjectId } from "mongoose";

export const addEvent = async (req: Request, res: Response) => {
  const addEventRequest: AddEventRequest = {
    creatorUsername: req.body.creatorUsername,
    title: req.body.title,
    duration: req.body.duration,
    description: req.body.description,
    coordinates: req.body.coordinates,
  };
  console.log(req.body)
  console.log(addEventRequest)
  if (!isRequestValid(addEventRequest)) {
    res
      .status(400)
      .send("Request object does not have all the correct properties");
    return;
  }

  const eventPoster = (await findUserByUsername(
    addEventRequest.creatorUsername
  ))!;

  if (eventPoster.accountType === 0) {
    res.status(400).send("You do not have creator rights");
    return;
  }

  const eventToAdd: EventModel = {
    ...addEventRequest,
    date: new Date().getTime(),
    city: eventPoster.city,
    photoUrl: "test-url",
    likes: Array(),
    comments: Array(),
    participants: Array(),
  };

  await addNewEvent(eventToAdd);
  res.send("Event was added succesfully");
};

export const getEvents = async (req: Request, res: Response) => {
  type EventToSend = {
    id: string;
  } & EventModel;

  const allEvents = await getAllEvents();

  const eventsToSend: Array<EventToSend> = allEvents.map((event) => {
    return {
      id: event._id.toString(),
      creatorUsername: event.creatorUsername,
      title: event.title,
      duration: event.duration,
      date: event.date,
      city: event.city,
      photoUrl: event.photoUrl,
      description: event.description,
      coordinates: event.coordinates,
      likes: event.likes,
      comments: event.comments,
      participants: event.participants,
    };
  });

  res.json(eventsToSend);
};

export const eventAction = async (
  req: Request,
  res: Response,
  type: "likes" | "participants"
) => {
  const likeEventRequest: LikeEventRequest = {
    eventId: req.body.eventId,
    accountId: req.body.accountId,
  };

  if (!isRequestValid(likeEventRequest)) {
    res
      .status(400)
      .send("Request object does not have all the correct properties");
    return;
  }

  const event = (await findEventById(likeEventRequest.eventId))!;

  if (type === "likes") {
    let likes = event.likes;

    if (likes.find((userId) => userId === likeEventRequest.accountId)) {
      likes = likes.filter((userId) => userId !== likeEventRequest.accountId);
    } else {
      likes.push(likeEventRequest.accountId);
    }

    await updateLikesById(likeEventRequest.eventId, likes);
  } else {
    let participants = event.participants;

    if (participants.find((userId) => userId === likeEventRequest.accountId)) {
      participants = participants.filter(
        (userId) => userId !== likeEventRequest.accountId
      );
    } else {
      participants.push(likeEventRequest.accountId);
    }

    await updateParticipantsById(likeEventRequest.eventId, participants);
  }

  res.send("Event updated successfully");
};

export const addComment = async (req: Request, res: Response) => {
  const addCommentRequest: AddCommentRequest = {
    eventId: req.body.eventId,
    author: req.body.author,
    date: req.body.date,
    message: req.body.message,
  };

  if (!isRequestValid(addCommentRequest)) {
    res
      .status(400)
      .send("Request object does not have all the correct properties");
    return;
  }

  const commentToAdd: PostComment = {
    author: addCommentRequest.author,
    date: addCommentRequest.date,
    message: addCommentRequest.message,
  };

  const eventToEdit = (await findEventById(addCommentRequest.eventId))!;
  const comments = eventToEdit.comments;
  comments.push(commentToAdd);

  await updateCommentsById(addCommentRequest.eventId, comments);

  res.send("Comment added successfully");
};
