import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import { registerUser, loginUser } from "./src/route_methods/accounts";
import {
  upgradeAccountRequest,
  acceptAccountUpgradeRequest,
} from "./src/route_methods/account-upgrades";

import { PORT, MONGO_URL } from "./src/util";

const app = express();

app.use(bodyParser.json());

app.post("/registerAccount", registerUser);
app.post("/loginAccount", loginUser);
app.post("/upgradeAccount", upgradeAccountRequest);
app.post("/acceptAccountUpgrade", acceptAccountUpgradeRequest);

app.listen(PORT, () => {
  console.log("Server started");
});

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => console.log(error));
