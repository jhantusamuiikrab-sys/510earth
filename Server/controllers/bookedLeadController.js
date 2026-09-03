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
        message:
          "Duplicate key error: A record with this bkLdId already exists.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server Error: Failed to save booked lead.",
      error: error.message,
    });
  }
};

// 1. Get all booked leads with pagination & filter options
export const getBookedLead = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { leadDate, bookingDate, leadStartDate, leadEndDate, bookingStartDate, bookingEndDate } = req.query;

    // Default query filter
    const filter = { isActive: true };

    // --- Lead Date Filtering --- 
    if (leadDate) {
      // Exact lead date match (e.g., "2026-01-15")
      filter.leadDate = leadDate;
    } else if (leadStartDate || leadEndDate) {
      // Lead date range match
      filter.leadDate = {};
      if (leadStartDate) filter.leadDate.$gte = leadStartDate;
      if (leadEndDate) filter.leadDate.$lte = leadEndDate;
    }

    // --- Booking Date Filtering ---
    if (bookingDate) {
      // Exact booking date match (e.g., "2026-01-20")
      filter.bookingDate = bookingDate;
    } else if (bookingStartDate || bookingEndDate) {
      // Booking date range match
      filter.bookingDate = {};
      if (bookingStartDate) filter.bookingDate.$gte = bookingStartDate;
      if (bookingEndDate) filter.bookingDate.$lte = bookingEndDate;
    }

    const [data, total] = await Promise.all([
      BookedLeadInfo.find(filter)
        .sort({ createdOn: -1 }) // Newest first
        .skip(skip)
        .limit(limit),
      BookedLeadInfo.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      count: data.length,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      data,
    });
  } catch (error) {
    console.error("Error fetching booked leads:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// 2. Get single booked lead by ID using route parameters
export const getBookedLeadbyid = async (req, res) => {
  try {
    // Read ID from URL params (fallback to req.body if legacy code requires it)
    const id = req.params.id || req.body.id;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Lead ID is required",
      });
    }

    const data = await BookedLeadInfo.findById(id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Booked lead record not found",
      });
    }

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Error fetching lead by ID:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
export const updateBookedLeadbyid = async (req, res) => {
  try {
    const { id, isApprove } = req.body;
    const data = await BookedLeadInfo.findById(id);
    data.isBookingApproved = Boolean(isApprove);
    data.bookingApprovalDate = isApprove ? new Date() : null;
    await data.save();
    return res.status(200).json({
      success: true,
      message: "Lead approval status updated successfully",
      data,
    });
  } catch (error) {
    console.log(error);
  }
};
export const deleteBookedLeadbyid = async (req, res) => {
  try {
    const id = req.params.id || req.body.id;
    const deletedLead = await BookedLeadInfo.findByIdAndDelete(id);
    if (!deletedLead) {
      return res.status(404).json({
        success: false,
        message: "Booked lead not found or already deleted",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Lead deleted successfully",
      deletedId: id,
    });
  } catch (error) {
    console.error("Error deleting lead:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
