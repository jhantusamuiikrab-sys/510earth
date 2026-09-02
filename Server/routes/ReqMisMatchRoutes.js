import express from "express";
import {
  createRequirementMismatch,
  //getRequirementMismatch,
  getAllRequirementMismatch,
} from "../controllers/ReqMismatchController.js";

const reqMisMatchRouter = express.Router();

reqMisMatchRouter.post("/", createRequirementMismatch);
// reqMisMatchRouter.get("/:id", getRequirementMismatch);
reqMisMatchRouter.get("/", getAllRequirementMismatch);

export default reqMisMatchRouter;