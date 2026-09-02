import fs from "fs";
import path from "path";
import BookedLeadInfo from "../models/BookedLeadInfo.js";
import { convertToWebp } from "../services/imageConverter.js";

const uploadDir = path.join(process.cwd(), "uploads", "booked-leads");

const saveProcessedFile = async (fileObj) => {
  if (!fileObj) return { filename: null, filePath: null };

  // Ensure target folder exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  // 1. If Image: Pass ONLY uploadDir to convertToWebp
  if (fileObj.mimetype.startsWith("image/")) {
    const filename = await convertToWebp(fileObj.buffer, uploadDir);

    return {
      filename,
      filePath: path.join("uploads", "booked-leads", filename),
    };
  }

  // 2. Non-Image Files (PDFs, Audio, etc.)
  const timestamp = Date.now();
  const cleanOriginalName = fileObj.originalname.replace(/\s+/g, "_");
  const filename = `${fileObj.fieldname}-${timestamp}-${cleanOriginalName}`;
  const fullPath = path.join(uploadDir, filename);

  await fs.promises.writeFile(fullPath, fileObj.buffer);

  return {
    filename,
    filePath: path.join("uploads", "booked-leads", filename),
  };
};

export const createBookedLead = async (req, res) => {
  try {
    const payload = req.body;
    const files = req.files || {};

    const [bookingImage, bookingForm, saleDoc] = await Promise.all([
      saveProcessedFile(files.bookingImageFile?.[0]),
      saveProcessedFile(files.bookingFormFile?.[0]),
      saveProcessedFile(files.saleConfirmationDocFile?.[0]),
    ]);

    const newBookedLead = new BookedLeadInfo({
      ...payload,
      bkLdId: payload.bkLdId ? Number(payload.bkLdId) : Date.now(),

      bookingImageFile: bookingImage.filename || "",
      bookingImageFileWithPath: bookingImage.filePath || "",
      bookingFormFile: bookingForm.filename || "",
      bookingFormFileWithPath: bookingForm.filePath || "",
      saleConfirmationDocFile: saleDoc.filename || "",
      saleConfirmationDocFileWithPath: saleDoc.filePath || "",

      isActive: true,
      status: 1,
    });

    const savedRecord = await newBookedLead.save();

    return res.status(201).json({
      success: true,
      message: "Booked lead created successfully!",
      data: savedRecord,
    });
  } catch (error) {
    console.error("Error creating Booked Lead:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Duplicate key error: A record with this bkLdId already exists.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server Error: Failed to save booked lead.",
      error: error.message,
    });
  }
};