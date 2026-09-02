import RequirementMismatchInfo from "../models/RequirementMismatchInfo.js";

/**
 * @desc    Create a new Requirement Mismatch Record
 * @route   POST /api/requirement-mismatch
 * @access  Private
 */
export const createRequirementMismatch = async (req, res) => {
  try {
    const data = req.body;

    // 1. Basic Validation
    if (!data.customerName || !data.phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "Customer Name and Primary Phone Number are required fields.",
      });
    }

    // 2. Auto-generate sequential rmId if not provided
    let rmId = data.rmId;
    if (!rmId) {
      const lastRecord = await RequirementMismatchInfo.findOne({}, { rmId: 1 })
        .sort({ rmId: -1 })
        .lean();
      rmId = lastRecord && lastRecord.rmId ? lastRecord.rmId + 1 : 1001;
    }

    // 3. Format Array fields to String to match Schema types
    const preferredLocationStr = Array.isArray(data.preferredLocations)
      ? data.preferredLocations.filter(Boolean).join(", ")
      : data.preferredLocation || null;

    const pvDoneOwnselfStr = Array.isArray(data.pvDoneOwnself)
      ? data.pvDoneOwnself.filter(Boolean).join(", ")
      : data.pvDoneOwnself || null;

    // 4. Construct DB Record aligned strictly with your schema
    const newMismatchRecord = new RequirementMismatchInfo({
      ...data,
      rmId,
      leadId: data.leadId ? Number(data.leadId) : null,
      preferredLocation: preferredLocationStr,
      pvDoneOwnself: pvDoneOwnselfStr,

      // Handle String/Date conversions safely
      custDOB: data.custDOB || null,
      custAnniversaryDate: data.custAnniversaryDate || null,
      ucPossessionDate: data.ucPossessionDate || null,
      reqAssignDate: data.reqAssignDate ? new Date(data.reqAssignDate) : new Date(),

      // System Flags
      isActive: data.isActive !== undefined ? data.isActive : true,
      status: data.status ? Number(data.status) : 1,
      rmStatusId: data.rmStatusId ? Number(data.rmStatusId) : 1,
      rmStatusName: data.rmStatusName || "Pending",
    });

    const savedRecord = await newMismatchRecord.save();

    return res.status(201).json({
      success: true,
      message: "Requirement Mismatch record created successfully.",
      data: savedRecord,
    });
  } catch (error) {
    console.error("Error creating Requirement Mismatch:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Duplicate Error: Record with this rmId already exists.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server Error: Unable to save record.",
      error: error.message,
    });
  }
};

/**
 * @desc    Get Requirement Mismatch Record by Lead ID or rmId
 * @route   GET /api/requirement-mismatch/:id
 */
// export const getRequirementMismatch = async (req, res) => {

//   try {
//     const { id } = req.params;
//     const record = await RequirementMismatchInfo.findOne({
//       $or: [{ rmId: Number(id) || 0 }, { leadId: Number(id) || 0 }],
//     });

//     if (!record) {
//       return res.status(404).json({
//         success: false,
//         message: "Requirement Mismatch record not found.",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       data: record,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch record.",
//       error: error.message,
//     });
//   }
// };

// GET /api/requirement-mismatch
export const getAllRequirementMismatch = async (req, res) => {
  try {
    const { fillDate, assignDate, mobileNo, rmmStatus } = req.query;
    let query = {};

    if (mobileNo) {
      query.phoneNumber = { $regex: mobileNo, $options: "i" };
    }
    if (rmmStatus) {
      query.rmStatusName = rmmStatus;
    }

    const records = await RequirementMismatchInfo.find(query).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: records.length,
      data: records,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch records.",
      error: error.message,
    });
  }
};