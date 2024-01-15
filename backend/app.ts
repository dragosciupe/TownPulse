import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import cookieParser from "cookie-parser";

import {
  registerUser,
  loginUser,
  changeProfilePicture,
} from "./src/route_methods/account-routes";
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
  getSavedEvents,
} from "./src/route_methods/event-routes";

import { PORT, MONGO_URL } from "./src/util";
import { jwtAuthMiddleware } from "./src/route_methods/middleware/jwtAuthMiddleware";

const app = express();
const profileImagesPath = path.join(__dirname, "public", "profile");

app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.static("public"));
app.use("/images", express.static(path.join(__dirname, "public", "images")));

app.use("/profile", (req, res, next) => {
  express.static(profileImagesPath)(req, res, (err) => {
    console.log(err?.message);
    res.sendFile(path.join(profileImagesPath, "no_profile_picture.jpg"));
  });
});

app.post("/registerAccount", registerUser);
app.post("/loginAccount", loginUser);
app.post("/changeProfilePicture", jwtAuthMiddleware, changeProfilePicture);
app.post("/upgradeAccount", jwtAuthMiddleware, upgradeAccountRequest);
app.post("/acceptAccountUpgrade", jwtAuthMiddleware, (req, res) =>
  accountUpgradeRequestAction(req, res, "accept")
);
app.post("/rejectAccountUpgrade", jwtAuthMiddleware, (req, res) =>
  accountUpgradeRequestAction(req, res, "reject")
);
app.get(
  "/accountUpgradeRequests",
  jwtAuthMiddleware,
  getAccountUpgradeRequests
);
app.post("/addEvent", jwtAuthMiddleware, addEvent);
app.post("/likeEvent", jwtAuthMiddleware, (req, res) =>
  eventAction(req, res, "likes")
);
app.post("/joinEvent", jwtAuthMiddleware, (req, res) =>
  eventAction(req, res, "participants")
);
app.post("/addComment", jwtAuthMiddleware, addComment);
app.post("/saveEvent", jwtAuthMiddleware, (req, res) =>
  eventAction(req, res, "save")
);
app.get("/getAllEvents", getEvents);
app.get("/getEvent", jwtAuthMiddleware, getEventById);
app.get("/getSavedEvents", jwtAuthMiddleware, getSavedEvents);

app.listen(PORT, () => {
  console.log("Server started");
});

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => console.log(error));
