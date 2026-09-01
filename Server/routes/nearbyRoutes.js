import express from "express";

import fileUpload from "../middleware/imgfileUpload.js";

import {
  createNearby,
  getNearbys,
  getActiveNearbys,
  getNearbyById,
  updateNearby,
  toggleNearbyStatus,
  deleteNearby,
} from "../controllers/nearbyController.js";

const nearbyrouter = express.Router();

// Public
nearbyrouter.get("/active", getActiveNearbys);

// Admin
nearbyrouter.get("/", getNearbys);

nearbyrouter.get("/:id", getNearbyById);

nearbyrouter.post(
  "/",
  fileUpload.single("image"),
  createNearby
);

nearbyrouter.put(
  "/:id",
  fileUpload.single("image"),
  updateNearby
);

nearbyrouter.patch(
  "/:id/toggle-status",
  toggleNearbyStatus
);

nearbyrouter.delete(
  "/:id",
  deleteNearby
);

export default nearbyrouter;