import express from 'express';
import { registerPartner, getAllPartners, deletePartner, updatePartner} from '../controllers/PartnerController.js';

const PartnerRouter = express.Router();

// POST /api/partners/register
PartnerRouter.post('/register', registerPartner);
// GET /api/partners
PartnerRouter.get('/', getAllPartners);
// DELETE /api/partners/:id
PartnerRouter.delete('/:id', deletePartner);
// PUT /api/partners/:id
PartnerRouter.put('/:id', updatePartner);

export default PartnerRouter;