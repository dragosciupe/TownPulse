import mongoose, { Schema, SchemaType } from "mongoose";

export interface PostComment {
  authorId: string;
  author: string;
  date: number;
  message: string;
}

export interface EventModel {
  creatorUsername: string;
  eventType: string;
  title: string;
  startTime: string;
  duration: number;
  date: number;
  city: string;
  description: string;
  coordinates: [number, number];
  likes: Array<string>;
  comments: Array<PostComment>;
  participants: Array<string>;
}

const PostCommentSchema = new mongoose.Schema<PostComment>({
  authorId: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Number, required: true },
  message: { type: String, required: true },
});

const eventSchema = new mongoose.Schema<EventModel>({
  creatorUsername: { type: String, required: true },
  eventType: { type: String, required: true },
  title: { type: String, required: true },
  startTime: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Number, required: true },
  city: { type: String, required: true },
  description: { type: String, required: true },
  coordinates: { type: [Number], required: true },
  likes: { type: [String], required: true },
  comments: { type: [PostCommentSchema], required: true },
  participants: { type: [String], required: true },
});

const EventModel = mongoose.model<EventModel>("Events", eventSchema);

export function addEvent(event: EventModel) {
  const newEvent = new EventModel(event);
  return newEvent.save();
}

export const getEventsByCity = (eventsCity: string) =>
  EventModel.find({ city: eventsCity });

export const getEvents = () => EventModel.find();

export const findEventById = (eventId: string) => EventModel.findById(eventId);

export const updateLikesById = (eventId: string, likes: Array<string>) =>
  EventModel.findByIdAndUpdate(eventId, { likes: likes });

export const updateParticipantsById = (
  eventId: string,
  participants: Array<string>
) => EventModel.findByIdAndUpdate(eventId, { participants: participants });

export const updateCommentsById = (
  eventId: string,
  comments: Array<PostComment>
) => EventModel.findByIdAndUpdate(eventId, { comments: comments });
