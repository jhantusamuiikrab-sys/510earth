import express from "express";
import {
  createRequirementMismatch,
  //getRequirementMismatch,
  getAllRequirementMismatch,
  updateRequirementMismatch
} from "../controllers/ReqMismatchController.js";

const reqMisMatchRouter = express.Router();

reqMisMatchRouter.post("/", createRequirementMismatch);
reqMisMatchRouter.patch("/:id", updateRequirementMismatch);
// reqMisMatchRouter.get("/:id", getRequirementMismatch);
reqMisMatchRouter.get("/", getAllRequirementMismatch);

export default reqMisMatchRouter;