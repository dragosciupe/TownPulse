import mongoose from "mongoose";

export interface EventModel {
  creatorId: string;
  title: string;
  duration: number;
  date: number;
  city: string;
  description: string;
  coordinates: [number, number];
  likeCount: number;
}

const eventSchema = new mongoose.Schema({
  creatorId: { type: String, required: true },
  title: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Number, required: true },
  city: { type: String, required: true },
  description: { type: String, required: true },
  coordinates: { type: Array<Number>, required: true },
  likeCount: { type: Number, required: true },
});

const EventModel = mongoose.model("Events", eventSchema);

export async function addEvent(event: EventModel) {
  const newEvent = new EventModel(event);
  await newEvent.save();
}

export const getEventsByCity = (eventsCity: string) =>
  EventModel.find({ city: eventsCity });

export const getEvents = EventModel.find();
