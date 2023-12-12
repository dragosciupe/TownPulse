import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import { registerUser, loginUser } from "./src/route_methods/account-routes";
import {
  upgradeAccountRequest,
  accountUpgradeRequestAction,
  getAccountUpgradeRequests,
} from "./src/route_methods/account-upgrade-routes";
import { addEvent } from "./src/route_methods/event-routes";

import { PORT, MONGO_URL } from "./src/util";

const app = express();

app.use(cors());
app.use(bodyParser.json());

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

app.listen(PORT, () => {
  console.log("Server started");
});

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => console.log(error));
