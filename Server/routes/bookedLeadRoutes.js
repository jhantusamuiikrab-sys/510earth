import express from "express";
import fileUpload from "../middleware/imgfileUpload.js";
import { createBookedLead } from "../controllers/bookedLeadController.js";
const bookedLeedrouter = express.Router();

// Define field schema specifically for this route
const bookedLeadUpload = fileUpload.fields([
  { name: "bookingImageFile", maxCount: 1 },
  { name: "bookingFormFile", maxCount: 1 },
  { name: "saleConfirmationDocFile", maxCount: 1 },
]);

bookedLeedrouter.post("/create", bookedLeadUpload, createBookedLead);

export default bookedLeedrouter;