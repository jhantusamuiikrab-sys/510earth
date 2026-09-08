import express from "express";
import { createLeadDistribution, deleteLeadDistribution, viewLeadDistribution } from "../controllers/LeadDistributionController.js";

const LeadDistributionRouter = express.Router();

LeadDistributionRouter.post("/LeadDistribution",createLeadDistribution);
LeadDistributionRouter.get("/LeadDistribution",viewLeadDistribution);
LeadDistributionRouter.delete("/LeadDistribution/:id",deleteLeadDistribution);

export default LeadDistributionRouter;