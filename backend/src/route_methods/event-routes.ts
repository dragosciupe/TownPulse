import { Request, Response } from "express";

import fs from "fs";

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
import {
  findUserById,
  findUserByUsername,
  updateSavedEventsById,
} from "../db/models/user";

export const addEvent = async (req: Request, res: Response) => {
  const addEventRequest: AddEventRequest = {
    creatorUsername: req.body.creatorUsername,
    eventType: req.body.eventType,
    title: req.body.title,
    startTime: req.body.startTime,
    duration: req.body.duration,
    date: req.body.date,
    description: req.body.description,
    coordinates: req.body.coordinates,
    photo: req.body.photo,
  };

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
    eventType: addEventRequest.eventType,
    city: eventPoster.city,
    likes: Array(),
    comments: Array(),
    participants: Array(),
  };

  const newEvent = await addNewEvent(eventToAdd);

  //saving the event image
  const base64EventImage = addEventRequest.photo;

  const dataWithoutPrefix = base64EventImage.replace(
    /^data:image\/\w+;base64,/,
    ""
  );
  const buffer = Buffer.from(dataWithoutPrefix, "base64");
  const filePath = `public/images/${newEvent._id}.jpg`;

  fs.writeFile(filePath, buffer, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Image saved successfully!");
    }
  });

  res.send("Event was added succesfully");
};

export const getEvents = async (req: Request, res: Response) => {
  type EventToSend = {
    id: string;
    creatorId: string;
  } & EventModel;

  const allEvents = await getAllEvents();
  const eventsToSend: Array<EventToSend> = Array();

  for (let i = 0; i < allEvents.length; i++) {
    const event = allEvents[i];
    const curEventCreator = (await findUserByUsername(event.creatorUsername))!;

    const eventToAdd: EventToSend = {
      id: event._id.toString(),
      creatorUsername: event.creatorUsername,
      creatorId: curEventCreator._id.toString(),
      eventType: event.eventType,
      title: event.title,
      startTime: event.startTime,
      duration: event.duration,
      date: event.date,
      city: event.city,
      description: event.description,
      coordinates: event.coordinates,
      likes: event.likes,
      comments: event.comments,
      participants: event.participants,
    };

    eventsToSend.push(eventToAdd);
  }

  res.json(eventsToSend);
};

export const getSavedEvents = async (req: Request, res: Response) => {
  const getSavedEventsRequest = {
    accountId: req.query.accountId as string,
  };

  if (!isRequestValid(getSavedEventsRequest)) {
    res
      .status(400)
      .send("Request object does not have all the correct properties");
    return;
  }

  type EventToSend = {
    id: string;
  } & EventModel;

  const user = (await findUserById(getSavedEventsRequest.accountId))!;
  const allEvents: Array<EventToSend> = Array();

  for (let i = 0; i < user.savedEvents.length; i++) {
    const event = (await findEventById(user.savedEvents[i]))!;
    const eventToSend: EventToSend = {
      id: event._id.toString(),
      creatorUsername: event.creatorUsername,
      eventType: event.eventType,
      title: event.title,
      startTime: event.startTime,
      duration: event.duration,
      date: event.date,
      city: event.city,
      description: event.description,
      coordinates: event.coordinates,
      likes: event.likes,
      comments: event.comments,
      participants: event.participants,
    };

    allEvents.push(eventToSend);
  }

  res.json(allEvents);
};

export const getEventById = async (req: Request, res: Response) => {
  const getEventRequest = {
    eventId: req.query.eventId as string,
  };

  if (!isRequestValid(getEventRequest)) {
    res
      .status(400)
      .send("Request object does not have all the correct properties");
    return;
  }

  const event = (await findEventById(getEventRequest.eventId))!;
  const eventToSend = {
    id: event._id.toString(),
    creatorUsername: event.creatorUsername,
    eventType: event.eventType,
    title: event.title,
    startTime: event.startTime,
    duration: event.duration,
    date: event.date,
    city: event.city,
    description: event.description,
    coordinates: event.coordinates,
    likes: event.likes,
    comments: event.comments,
    participants: event.participants,
  };
  res.json(eventToSend);
};

export const eventAction = async (
  req: Request,
  res: Response,
  type: "likes" | "participants" | "save"
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
  } else if (type === "participants") {
    let participants = event.participants;

    if (participants.find((userId) => userId === likeEventRequest.accountId)) {
      participants = participants.filter(
        (userId) => userId !== likeEventRequest.accountId
      );
    } else {
      participants.push(likeEventRequest.accountId);
    }

    await updateParticipantsById(likeEventRequest.eventId, participants);
  } else {
    const user = (await findUserById(likeEventRequest.accountId))!;
    let savedEvents = user.savedEvents;

    if (savedEvents.find((id) => id === likeEventRequest.eventId)) {
      savedEvents = savedEvents.filter((id) => id !== likeEventRequest.eventId);
    } else {
      savedEvents.push(likeEventRequest.eventId);
    }

    await updateSavedEventsById(likeEventRequest.accountId, savedEvents);
  }

  res.send("Event action succes");
};

export const addComment = async (req: Request, res: Response) => {
  const addCommentRequest: AddCommentRequest = {
    eventId: req.body.eventId,
    authorId: req.body.authorId,
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
    authorId: addCommentRequest.authorId,
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
