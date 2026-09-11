import express from 'express';
import { createCampaign, getCampaigns, getPropertyTypes, getPropertyNamesByType } from '../controllers/CampaignController.js';
const CampaignRouter = express.Router();

CampaignRouter.post('/create', createCampaign);
CampaignRouter.get('/', getCampaigns);
// CampaignRouter.delete('/:id', deleteCampaign);
// CampaignRouter.put('/:id', updateCampaign);

// Property Type and Dependent Property Name Endpoints
CampaignRouter.get("/properties/types", getPropertyTypes);
CampaignRouter.get("/properties", getPropertyNamesByType);

export default CampaignRouter;