import express from 'express';
import { getReAssignmentLeads  } from '../controllers/LeadReAssignmentController.js';
const ReAssignmentRouter = express.Router();

ReAssignmentRouter.get('/', getReAssignmentLeads);


export default ReAssignmentRouter;