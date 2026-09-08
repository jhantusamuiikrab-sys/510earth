import fs from "fs";
import path from "path";
import BookedLeadInfo from "../models/BookedLeadInfo.js";
import { convertToWebp } from "../services/imageConverter.js";
import PDFDocument from "pdfkit";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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

    const {
      leadDate,
      bookingDate,
      leadStartDate,
      leadEndDate,
      bookingStartDate,
      bookingEndDate,
    } = req.query;

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
export const editBookedLead = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const files = req.files || {};

    // Check if the record exists first
    const existingLead = await BookedLeadInfo.findById(id);
    if (!existingLead) {
      return res.status(404).json({
        success: false,
        message: "Booked lead not found.",
      });
    }

    // Process files only if new ones are uploaded, otherwise keep existing paths
    const [bookingImage, bookingForm, saleDoc] = await Promise.all([
      files.bookingImageFile?.[0]
        ? saveProcessedFile(files.bookingImageFile[0])
        : Promise.resolve(null),
      files.bookingFormFile?.[0]
        ? saveProcessedFile(files.bookingFormFile[0])
        : Promise.resolve(null),
      files.saleConfirmationDocFile?.[0]
        ? saveProcessedFile(files.saleConfirmationDocFile[0])
        : Promise.resolve(null),
    ]);

    // Build the update payload dynamically
    const updateData = { ...payload };

    if (bookingImage) {
      updateData.bookingImageFile = bookingImage.filename;
      updateData.bookingImageFileWithPath = bookingImage.filePath;
    }
    if (bookingForm) {
      updateData.bookingFormFile = bookingForm.filename;
      updateData.bookingFormFileWithPath = bookingForm.filePath;
    }
    if (saleDoc) {
      updateData.saleConfirmationDocFile = saleDoc.filename;
      updateData.saleConfirmationDocFileWithPath = saleDoc.filePath;
    }

    // Update the record in the database
    const updatedRecord = await BookedLeadInfo.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true },
    );

    return res.status(200).json({
      success: true,
      message: "Booked lead updated successfully!",
      data: updatedRecord,
    });
  } catch (error) {
    console.error("Error updating Booked Lead:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "Duplicate key error: A record with this value already exists.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server Error: Failed to update booked lead.",
      error: error.message,
    });
  }
};
export const pdfDownloader = async (req, res) => {
  try {
    const lead = await BookedLeadInfo.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    const filename = `Booking_Form_${lead.bkLdId || req.params.id}.pdf`;

    // Set headers before piping streams
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.setHeader("Access-Control-Expose-Headers", "Content-Disposition");

    const doc = new PDFDocument({ size: "A4", margin: 30 });

    // Pipe PDF to HTTP response stream
    doc.pipe(res);

    // Dynamic Image Loading (safely handle missing image files)
    const logoPath = path.join(__dirname, "../images/510earth.png"); // Adjust path if logo is stored elsewhere
    try {
      doc.image(logoPath, 30, 30, { width: 180 });
    } catch (err) {
      console.warn("Logo file missing at path:", logoPath);
    }

    // Corporate Header Text
    doc.fontSize(9).font("Helvetica-Bold").text("CORPORATE OFFICE", 260, 28);
    doc
      .fontSize(8)
      .font("Helvetica")
      .text(
        "Municipal Premises No. 540, 1st floor, Block-GD, Plot No-50, P.O-East Kol-\n" +
          "kata Township, P.S- Kasba, District South 24 Parganas, Rajdanga Main\n" +
          "Road ( near GST Bhawan ), Kolkata-700107\n" +
          "Contact No - +91-9073338396\n\n" +
          "West Bengal RERA Registration number - WBRERA/A/SOU/2023/000185\n" +
          "Maharashtra RERA Registration number - A52100043083",
        260,
        42,
        { width: 255, align: "left" },
      );

    doc
      .fontSize(14)
      .font("Helvetica-Bold")
      .text("Booked Application Form", 30, 155, {
        align: "center",
        width: 535,
      });

    const startX = 30;
    let startY = 180;
    const colWidths = [125, 142, 125, 143];
    const rowHeight = 33;

    const formatDate = (dateStr) => {
      if (!dateStr) return "";
      const d = new Date(dateStr);
      return isNaN(d.getTime()) ? dateStr : d.toISOString().split("T")[0];
    };

    const tableData = [
      [
        { label: "Name of the Project", value: lead.nameOfTheProject },
        {
          label: "Name of the Builder/ Promoter",
          value: lead.nameOfTheBuilderPromoter || "Madhabi. 510earth",
        },
      ],
      [
        {
          label: "Name of the 1st Applicant",
          value: lead.nameOfTheFirstApplicant,
          fullWidth: true,
        },
      ],
      [
        { label: "Mobile No.", value: lead.mobileNo },
        { label: "Alternate Mobile No.", value: lead.alternateMobileNo },
      ],
      [
        { label: "Mail Id", value: lead.emailId },
        { label: "Date of Birth", value: formatDate(lead.dateOfBirth) },
      ],
      [
        { label: "Communication Address", value: lead.communicationAddress },
        { label: "Locality", value: lead.locality },
      ],
      [
        { label: "Profession", value: lead.profession },
        { label: "Company Name", value: lead.companyName },
      ],
      [
        { label: "Designation", value: lead.designation },
        { label: "Company Address", value: lead.companyAddress },
      ],
      [
        { label: "Name of Joint Applicant", value: lead.nameOfJointApplicant },
        { label: "MobileNo", value: lead.jointApplicantMobileNo },
      ],
      [
        { label: "Alternate Mobile No", value: lead.jointApplicantAltMobileNo },
        { label: "EmailID", value: lead.jointApplicantEmailId },
      ],
      [
        { label: "Date of Birth", value: formatDate(lead.jointApplicantDob) },
        { label: "Communication Address", value: lead.jointApplicantAddress },
      ],
      [
        { label: "Locality", value: lead.jointApplicantLocality },
        { label: "Profession", value: lead.jointApplicantProfession },
      ],
      [
        { label: "Block/Tower", value: lead.blockOrTower },
        { label: "FlatNumber", value: lead.flatNumber },
      ],
      [
        { label: "FloorNumber", value: lead.floorNumber },
        { label: "Car Parking", value: lead.carParking },
      ],
      [
        { label: "Flat Cost", value: lead.flatCost },
        { label: "Advance Amount", value: lead.advanceAmount },
      ],
      [
        {
          label: "Probable Date Of Agreement",
          value: formatDate(lead.probableDateForAgreement),
        },
        {
          label: "Probable Date Of Registry",
          value: formatDate(lead.probableDateOfRegistry),
        },
      ],
      [
        { label: "Total Consideration", value: lead.totalConsideration },
        { label: "Bank Loan", value: lead.bankLoan },
      ],
      [
        { label: "Preferred Bank", value: lead.preferredBank },
        { label: "Booking Date", value: formatDate(lead.bookingDate) },
      ],
      [
        { label: "Reference", value: lead.reference },
        {
          label: "Your Experience With 510Earth",
          value: lead.experienceWith510Earth,
        },
      ],
      [
        {
          label: "How Do You Know Us",
          value: lead.howDoYouKnowUs,
          fullWidth: true,
        },
      ],
    ];

    doc.lineWidth(0.5).strokeColor("#cccccc");

    tableData.forEach((row) => {
      if (row[0].fullWidth) {
        const cellWidth = colWidths[1] + colWidths[2] + colWidths[3];

        doc.rect(startX, startY, colWidths[0], rowHeight).stroke();
        doc.rect(startX + colWidths[0], startY, cellWidth, rowHeight).stroke();

        doc
          .fontSize(9)
          .font("Helvetica")
          .fillColor("#000000")
          .text(row[0].label || "", startX + 4, startY + 6, {
            width: colWidths[0] - 8,
          });

        doc
          .fontSize(9)
          .font("Helvetica")
          .fillColor("#000000")
          .text(
            row[0].value ? String(row[0].value) : "",
            startX + colWidths[0] + 4,
            startY + 6,
            { width: cellWidth - 8 },
          );

        startY += rowHeight;
      } else {
        let currentX = startX;

        // Cell 1
        doc.rect(currentX, startY, colWidths[0], rowHeight).stroke();
        doc
          .fontSize(9)
          .font("Helvetica")
          .fillColor("#000000")
          .text(row[0]?.label || "", currentX + 4, startY + 6, {
            width: colWidths[0] - 8,
          });
        currentX += colWidths[0];

        // Cell 2
        doc.rect(currentX, startY, colWidths[1], rowHeight).stroke();
        doc
          .fontSize(9)
          .font("Helvetica")
          .fillColor("#000000")
          .text(
            row[0]?.value ? String(row[0].value) : "",
            currentX + 4,
            startY + 6,
            { width: colWidths[1] - 8 },
          );
        currentX += colWidths[1];

        // Cell 3
        doc.rect(currentX, startY, colWidths[2], rowHeight).stroke();
        doc
          .fontSize(9)
          .font("Helvetica")
          .fillColor("#000000")
          .text(row[1]?.label || "", currentX + 4, startY + 6, {
            width: colWidths[2] - 8,
          });
        currentX += colWidths[2];

        // Cell 4
        doc.rect(currentX, startY, colWidths[3], rowHeight).stroke();
        doc
          .fontSize(9)
          .font("Helvetica")
          .fillColor("#000000")
          .text(
            row[1]?.value ? String(row[1].value) : "",
            currentX + 4,
            startY + 6,
            { width: colWidths[3] - 8 },
          );

        startY += rowHeight;
      }
    });

    // Finalize PDF Stream
    doc.end();
  } catch (err) {
    console.error("PDF generation error:", err);

    // Prevent sending JSON after headers or stream piped
    if (!res.headersSent) {
      res.status(500).json({ message: "Error generating document" });
    }
  }
};
