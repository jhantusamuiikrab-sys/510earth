import express from "express";

import {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  togglePropertyStatus,
  togglePropertyFeatured,
  deleteProperty,
  restoreProperty,
} from "../controllers/PropertyController.js";

import fileUpload from "../middleware/imgfileUpload.js";

const propertyrouter =
  express.Router();

/*
=========================================================
CREATE PROPERTY
=========================================================
*/

propertyrouter.post(
  "/",
  fileUpload.any(),
  createProperty
);

/*
=========================================================
GET ALL
=========================================================
*/

propertyrouter.get(
  "/",
  getAllProperties
);

/*
=========================================================
GET BY ID
=========================================================
*/

propertyrouter.get(
  "/:propertyId",
  getPropertyById
);

/*
=========================================================
UPDATE
=========================================================
*/

propertyrouter.put(
  "/:propertyId",
  updateProperty
);

/*
=========================================================
ACTIVE / INACTIVE
=========================================================
*/

propertyrouter.patch(
  "/:propertyId/status",
  togglePropertyStatus
);

/*
=========================================================
FEATURED
=========================================================
*/

propertyrouter.patch(
  "/:propertyId/featured",
  togglePropertyFeatured
);

/*
=========================================================
RESTORE
=========================================================
*/

propertyrouter.patch(
  "/:propertyId/restore",
  restoreProperty
);

/*
=========================================================
DELETE
=========================================================
*/

propertyrouter.delete(
  "/:propertyId",
  deleteProperty
);

export default propertyrouter;