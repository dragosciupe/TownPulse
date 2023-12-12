import { Request, Response } from "express";

import { type AddEventRequest } from "./request-types";
import { isRequestValid } from "../util";
import { addEvent as addNewEvent, EventModel } from "../db/models/events";
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
    likeCount: 0,
  };

  await addNewEvent(eventToAdd);
  res.send("Event was added succesfully");
};
