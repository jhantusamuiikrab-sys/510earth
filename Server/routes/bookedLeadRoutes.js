import express from "express";
import fileUpload from "../middleware/imgfileUpload.js";
import {
  createBookedLead,
  deleteBookedLeadbyid,
  editBookedLead,
  getBookedLead,
  getBookedLeadbyid,
  pdfDownloader,
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
bookedLeedrouter.get("/getbyid/:id", getBookedLeadbyid);
bookedLeedrouter.patch("/approval", updateBookedLeadbyid);
bookedLeedrouter.delete("/delete/:id", deleteBookedLeadbyid);
bookedLeedrouter.patch("/edit/:id", bookedLeadUpload, editBookedLead);
bookedLeedrouter.get("/download/:id",pdfDownloader);

export default bookedLeedrouter;
