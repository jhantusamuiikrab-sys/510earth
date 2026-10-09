import RequirementMismatchInfo from "../models/RequirementMismatchInfo.js";
import ReqMisLinkInfo from "../models/ReqMisLinkInfo.js";
import mongoose from "mongoose";

/**
 * @desc    Create a new Requirement Mismatch Record
 * @route   POST /api/requirement-mismatch
 * @access  Private
 */
export const createRequirementMismatch = async (req, res) => {
  try {
    const data = req.body;

    if (!data.customerName || !data.phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "Customer Name and Primary Phone Number are required fields.",
      });
    }

    let rmId = data.rmId;
    if (!rmId) {
      const lastRecord = await RequirementMismatchInfo.findOne({}, { rmId: 1 })
        .sort({ rmId: -1 })
        .lean();
      rmId = lastRecord && lastRecord.rmId ? lastRecord.rmId + 1 : 1001;
    }

    const preferredLocationStr = Array.isArray(data.preferredLocations)
      ? data.preferredLocations.filter(Boolean).join(", ")
      : data.preferredLocation || null;

    const pvDoneOwnselfStr = Array.isArray(data.pvDoneOwnself)
      ? data.pvDoneOwnself.filter(Boolean).join(", ")
      : data.pvDoneOwnself || null;

    const newMismatchRecord = new RequirementMismatchInfo({
      ...data,
      rmId,
      leadId: data.leadId ? Number(data.leadId) : null,
      preferredLocation: preferredLocationStr,
      pvDoneOwnself: pvDoneOwnselfStr,
      custDOB: data.custDOB || null,
      custAnniversaryDate: data.custAnniversaryDate || null,
      ucPossessionDate: data.ucPossessionDate || null,
      reqAssignDate: data.reqAssignDate ? new Date(data.reqAssignDate) : new Date(),
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
 * @desc    Get All Requirement Mismatch Records (with Notification Counts)
 * @route   GET /api/requirement-mismatch
 */
export const getAllRequirementMismatch = async (req, res) => {
  try {
    const { fillDate, assignDate, mobileNo, rmmStatus } = req.query;
    let query = {};

    if (mobileNo) {
      query.phoneNumber = { $regex: mobileNo,$options: "i" };
    }
    if (rmmStatus) {
      query.rmStatusName = rmmStatus;
    }

    const records = await RequirementMismatchInfo.find(query).sort({ createdAt: -1 }).lean();

    const leadIds = records.map(r => r.leadId).filter(Boolean);
    const rmIds = records.map(r => r.rmId).filter(Boolean);

    const linkInfos = await ReqMisLinkInfo.find({
      $or: [{ leadId: { $in: leadIds } }, { rmId: {$in: rmIds } }]
    }).lean();

    const enrichedRecords = records.map((record) => {
      const match = linkInfos.find(
        (link) => (link.leadId && link.leadId === record.leadId) || (link.rmId && link.rmId === record.rmId)
      );

      let commentCount = match?.commentsList?.length || (match?.searchComments ? 1 : 0);
      let linkCount = match?.searchLinksList?.length || (match?.searchLink ? 1 : 0);

      return {
        ...record,
        hasNotification: commentCount > 0 || linkCount > 0,
        notificationCount: commentCount + linkCount
      };
    });

    return res.status(200).json({
      success: true,
      count: enrichedRecords.length,
      data: enrichedRecords,
    });
  } catch (error) {
    console.error("Error fetching records:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch records.",
      error: error.message,
    });
  }
};

/**
 * @desc    Update Requirement Mismatch Record
 * @route   PUT /api/requirement-mismatch/:id
 */
export const updateRequirementMismatch = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    const isObjectId = mongoose.Types.ObjectId.isValid(id);
    const numericId = Number(id);
    const isNumeric = !isNaN(numericId);

    const orConditions = [];

    if (isObjectId) {
      orConditions.push({ _id: id });
    }

    if (isNumeric) {
      orConditions.push({ rmId: numericId });
      orConditions.push({ leadId: numericId });
    }

    orConditions.push({ customId: id });
    orConditions.push({ reqId: id });

    const query = { $or: orConditions };

    if (Array.isArray(updateData.preferredLocations)) {
      updateData.preferredLocation = updateData.preferredLocations.filter(Boolean).join(", ");
    }
    if (Array.isArray(updateData.pvDoneOwnself)) {
      updateData.pvDoneOwnself = updateData.pvDoneOwnself.filter(Boolean).join(", ");
    }

    updateData.custDOB = updateData.custDOB || null;
    updateData.custAnniversaryDate = updateData.custAnniversaryDate || null;
    updateData.ucPossessionDate = updateData.ucPossessionDate || null;

    const updatedRecord = await RequirementMismatchInfo.findOneAndUpdate(
      query,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedRecord) {
      return res.status(404).json({
        success: false,
        message: `Requirement Mismatch record not found for query parameter: ${id}`,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Record updated successfully.",
      data: updatedRecord,
    });
  } catch (error) {
    console.error("Error updating Requirement Mismatch:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error: Unable to update record.",
      error: error.message,
    });
  }
};