import express from "express";
import { registerSubscriber } from "../controllers/SubscriberController.js";

const subscriberRoute = express.Router();

subscriberRoute.post("/subscriber", registerSubscriber);

export default subscriberRoute;
