import express from "express";

import fileUpload from "../middleware/imgfileUpload.js";

import {
  createAmenity,
  getAmenities,
  getActiveAmenities,
  getAmenityById,
  updateAmenity,
  toggleAmenityStatus,
  deleteAmenity,
} from "../controllers/amenityController.js";

const amenityrouter = express.Router();

// GET all
amenityrouter.get(
  "/",
  getAmenities
);

// Public
amenityrouter.get("/active", getActiveAmenities);

// GET single
amenityrouter.get(
  "/:id",
  getAmenityById
);

// CREATE
amenityrouter.post(
  "/",
  fileUpload.single("image"),
  createAmenity
);

// UPDATE
amenityrouter.put(
  "/:id",
  fileUpload.single("image"),
  updateAmenity
);

// ACTIVE / INACTIVE
amenityrouter.patch(
  "/:id/toggle-status",
  toggleAmenityStatus
);

// DELETE
amenityrouter.delete(
  "/:id",
  deleteAmenity
);

export default amenityrouter;