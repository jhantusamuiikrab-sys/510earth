import express from "express";
import fileUpload from "../middleware/imgfileUpload.js";
import {
  createsuitablebusiness,
  getsuitablebusinesses,
  getActiveSuitableBusinesses,
  getsuitablebusinessbyid,
  updatesuitablebusiness,
  togglesuitablebusinessstatus,
  deletesuitablebusiness,
} from "../controllers/suitableBusinessController.js";

const suitableBusinessRouter =
  express.Router();

/*
=========================================================
SUITABLE BUSINESS ROUTES
=========================================================
*/

/*
GET ALL

/api/suitablebusiness
/api/suitablebusiness?search=restaurant
/api/suitablebusiness?status=active
/api/suitablebusiness?page=1&limit=20
*/

suitableBusinessRouter.get(
  "/",
  getsuitablebusinesses
);

/*
GET ACTIVE

/api/suitablebusiness/active
*/

suitableBusinessRouter.get(
  "/active",
  getActiveSuitableBusinesses
);

/*
GET BY ID

/api/suitablebusiness/:id
*/

suitableBusinessRouter.get(
  "/:id",
  getsuitablebusinessbyid
);

/*
CREATE

POST /api/suitablebusiness

FormData:

Name
IsActive
image
*/

suitableBusinessRouter.post(
  "/",
  fileUpload.single("image"),
  createsuitablebusiness
);

/*
UPDATE

PUT /api/suitablebusiness/:id

FormData:

Name
IsActive
image
*/

suitableBusinessRouter.put(
  "/:id",
  fileUpload.single("image"),
  updatesuitablebusiness
);

/*
TOGGLE STATUS

PATCH /api/suitablebusiness/:id/status
*/

suitableBusinessRouter.patch(
  "/:id/status",
  togglesuitablebusinessstatus
);

/*
DELETE

DELETE /api/suitablebusiness/:id
*/

suitableBusinessRouter.delete(
  "/:id",
  deletesuitablebusiness
);

export default suitableBusinessRouter;