// import express from "express";

// import {
//   createFloorPlan,
//   updateFloorPlan,
//   toggleFloorPlanStatus,
//   deleteFloorPlan,
// } from "../controllers/flatApartmentFloorPlanController.js";

// const floorplanrouter = express.Router();

// /*
// =========================================================
// CREATE
// POST
// /api/flat-apartment-properties/:propertyId/floor-plans
// =========================================================
// */
// floorplanrouter.post(
//   "/:propertyId/floor-plans",
//   createFloorPlan
// );


// /*
// =========================================================
// EDIT
// PUT
// /api/flat-apartment-properties/:propertyId/floor-plans/:floorPlanId
// =========================================================
// */
// floorplanrouter.put(
//   "/:propertyId/floor-plans/:floorPlanId",
//   updateFloorPlan
// );


// /*
// =========================================================
// ACTIVE / INACTIVE
// PATCH
// /api/flat-apartment-properties/:propertyId/floor-plans/:floorPlanId/status
// =========================================================
// */
// floorplanrouter.patch(
//   "/:propertyId/floor-plans/:floorPlanId/status",
//   toggleFloorPlanStatus
// );


// /*
// =========================================================
// DELETE
// DELETE
// /api/flat-apartment-properties/:propertyId/floor-plans/:floorPlanId
// =========================================================
// */
// floorplanrouter.delete(
//   "/:propertyId/floor-plans/:floorPlanId",
//   deleteFloorPlan
// );

// export default floorplanrouter;

import express from "express";

import {
  createFloorPlan,
  getFloorPlans,
  getFloorPlanById,
  updateFloorPlan,
  toggleFloorPlanStatus,
  deleteFloorPlan,
  restoreFloorPlan,
} from "../controllers/flatApartmentFloorPlanController.js";

const floorplanrouter =
  express.Router();

/*
=========================================================
GET ALL FLOOR PLANS
=========================================================

GET
/api/flat-apartment-properties/:propertyId/floor-plans

GET only 2BHK:

/api/flat-apartment-properties/:propertyId/floor-plans?bhk=2BHK

GET active:

/api/flat-apartment-properties/:propertyId/floor-plans?status=active
=========================================================
*/

floorplanrouter.get(
  "/:propertyId/floor-plans",
  getFloorPlans
);

/*
=========================================================
GET SINGLE FLOOR PLAN
=========================================================
*/

floorplanrouter.get(
  "/:propertyId/floor-plans/:floorPlanId",
  getFloorPlanById
);

/*
=========================================================
CREATE
=========================================================
*/

floorplanrouter.post(
  "/:propertyId/floor-plans",
  createFloorPlan
);

/*
=========================================================
UPDATE
=========================================================
*/

floorplanrouter.put(
  "/:propertyId/floor-plans/:floorPlanId",
  updateFloorPlan
);

/*
=========================================================
ACTIVE / INACTIVE
=========================================================
*/

floorplanrouter.patch(
  "/:propertyId/floor-plans/:floorPlanId/status",
  toggleFloorPlanStatus
);

/*
=========================================================
RESTORE
=========================================================
*/

floorplanrouter.patch(
  "/:propertyId/floor-plans/:floorPlanId/restore",
  restoreFloorPlan
);

/*
=========================================================
DELETE
=========================================================
*/

floorplanrouter.delete(
  "/:propertyId/floor-plans/:floorPlanId",
  deleteFloorPlan
);

export default floorplanrouter;