import express from "express";
import fileUpload from "../middleware/imgfileUpload.js";
import {
  createBookedLead,
  deleteBookedLeadbyid,
  getBookedLead,
  getBookedLeadbyid,
  updateBookedLeadbyid,
} from "../controllers/bookedLeadController.js";
const bookedLeedrouter = express.Router();

// Define field schema specifically for this route
const bookedLeadUpload = fileUpload.fields([
  { name: "bookingImageFile", maxCount: 1 },
  { name: "bookingFormFile", maxCount: 1 },
  { name: "saleConfirmationDocFile", maxCount: 1 },
]);

bookedLeedrouter.post("/create", bookedLeadUpload, createBookedLead);
bookedLeedrouter.get("/get", getBookedLead);
bookedLeedrouter.get("/getbyid", getBookedLeadbyid);
bookedLeedrouter.patch("/approval", updateBookedLeadbyid);
bookedLeedrouter.delete("/delete/:id", deleteBookedLeadbyid);

export default bookedLeedrouter;
