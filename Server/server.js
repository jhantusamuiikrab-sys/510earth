import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import adminrouter from "./routes/adminUserRoutes.js";
import propertyrouter from "./routes/PropertyRoutes.js";
import floorplanrouter from "./routes/flatApartmentFloorPlanRoutes.js";

import suitableBusinessRouter from "./routes/suitablebusinessRoutes.js";
import nearbyrouter from "./routes/nearbyRoutes.js";
import amenityrouter from   "./routes/amenityRoutes.js";

import StateCityrouter from "./routes/stateCityRoutes.js";
import zonerouter from "./routes/zoneRoutes.js";

import cookieParser from "cookie-parser";

import path from "path";
import bookedLeedrouter from "./routes/bookedLeadRoutes.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  // "https://510earth.com",
  "http://localhost:5173"
];

app.use(cors({
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/admin", adminrouter);
app.use("/api/properties", propertyrouter);
app.use("/api/floorplanproperties", floorplanrouter);
app.use("/api/nearby", nearbyrouter);
app.use("/api/amenities", amenityrouter);
app.use("/api/suitablebusiness", suitableBusinessRouter);
app.use("/api/csc", StateCityrouter);
app.use("/api/zones", zonerouter);
app.use("/api/booked-leads", bookedLeedrouter);

app.use(express.urlencoded({ extended: true }));

app.use(
  "/uploads",
  express.static(
    path.join(process.cwd(), "uploads")
  )
);

app.get("/", (req, res) => {
  res.json({
    message: "Server Running"
  });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});