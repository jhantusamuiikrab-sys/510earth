import express from "express";
import {createLeadSource,
    getLeadSources,
    deleteLeadSource,
    updateLeadSource
} from "../controllers/LeadSourceController.js";

const leadSourceRouter = express.Router();

leadSourceRouter.post("/", createLeadSource);
leadSourceRouter.get("/", getLeadSources);
leadSourceRouter.delete("/:id", deleteLeadSource);
leadSourceRouter.put("/:id", updateLeadSource);

export default leadSourceRouter;