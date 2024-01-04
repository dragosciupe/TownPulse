import { Request, Response } from "express";

import { LikeEventRequest, type AddEventRequest } from "./request-types";
import { isRequestValid } from "../util";
import {
  addEvent as addNewEvent,
  EventModel,
  findEventById,
  updateLikesById,
} from "../db/models/events";
import { findUserById } from "../db/models/user";

export const addEvent = async (req: Request, res: Response) => {
  const addEventRequest: AddEventRequest = {
    creatorId: req.body.creatorId,
    title: req.body.title,
    duration: req.body.duration,
    date: req.body.date,
    description: req.body.description,
    coordinates: req.body.coordinates,
  };

  if (!isRequestValid(addEventRequest)) {
    res
      .status(400)
      .send("Request object does not have all the correct properties");
    return;
  }

  const eventPoster = (await findUserById(addEventRequest.creatorId))!;

  const eventToAdd: EventModel = {
    ...addEventRequest,
    city: eventPoster.city,
    likes: Array(),
    comments: Array(),
    participants: Array(),
  };

  await addNewEvent(eventToAdd);
  res.send("Event was added succesfully");
};

export const likeEvent = async (req: Request, res: Response) => {
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
  let likes = event.likes;

  if (likes.find((userId) => userId === likeEventRequest.accountId)) {
    likes = likes.filter((userId) => userId !== likeEventRequest.accountId);
  } else {
    likes.push(likeEventRequest.accountId);
  }

  await updateLikesById(likeEventRequest.eventId, likes);

  res.send("Likes updated successfully");
};
