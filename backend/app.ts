import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";

import { registerUser, loginUser } from "./src/route_methods/account-routes";
import {
  upgradeAccountRequest,
  accountUpgradeRequestAction,
  getAccountUpgradeRequests,
} from "./src/route_methods/account-upgrade-routes";
import {
  addComment,
  addEvent,
  eventAction,
  getEventById,
  getEvents,
} from "./src/route_methods/event-routes";

import { PORT, MONGO_URL } from "./src/util";

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.static("public"));
app.use("/images", express.static(path.join(__dirname, "public", "images")));

app.post("/registerAccount", registerUser);
app.post("/loginAccount", loginUser);
app.post("/upgradeAccount", upgradeAccountRequest);
app.post("/acceptAccountUpgrade", (req, res) =>
  accountUpgradeRequestAction(req, res, "accept")
);
app.post("/rejectAccountUpgrade", (req, res) =>
  accountUpgradeRequestAction(req, res, "reject")
);
app.get("/accountUpgradeRequests", getAccountUpgradeRequests);
app.post("/addEvent", addEvent);
app.post("/likeEvent", (req, res) => eventAction(req, res, "likes"));
app.post("/joinEvent", (req, res) => eventAction(req, res, "participants"));
app.post("/addComment", addComment);
app.get("/getAllEvents", getEvents);
app.get("/getEvent", getEventById);

app.listen(PORT, () => {
  console.log("Server started");
});

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => console.log(error));
