import express from "express";
import {createLeadSource

} from "../controllers/LeadSourceController.js";

const leadSourceRouter = express.Router();

leadSourceRouter.post("/", createLeadSource);


export default leadSourceRouter;