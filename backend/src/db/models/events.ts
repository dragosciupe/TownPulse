import mongoose, { Schema, SchemaType } from "mongoose";

export type PostComment = {
  author: string;
  date: number;
  message: string;
};

export interface EventModel {
  creatorId: string;
  title: string;
  duration: number;
  date: number;
  city: string;
  description: string;
  coordinates: [number, number];
  likes: Array<string>;
  comments: Array<PostComment>;
  participants: Array<string>;
}

const eventSchema = new mongoose.Schema<EventModel>({
  creatorId: { type: String, required: true },
  title: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Number, required: true },
  city: { type: String, required: true },
  description: { type: String, required: true },
  coordinates: { type: [Number], required: true },
  likes: { type: [String], required: true },
  participants: { type: [String], required: true },
});

const EventModel = mongoose.model<EventModel>("Events", eventSchema);

export async function addEvent(event: EventModel) {
  const newEvent = new EventModel(event);
  await newEvent.save();
}

export const getEventsByCity = (eventsCity: string) =>
  EventModel.find({ city: eventsCity });

export const getEvents = EventModel.find();

export const findEventById = (eventId: string) => EventModel.findById(eventId);
export const updateLikesById = (eventId: string, likes: Array<string>) =>
  EventModel.findByIdAndUpdate(eventId, { likes: likes });
