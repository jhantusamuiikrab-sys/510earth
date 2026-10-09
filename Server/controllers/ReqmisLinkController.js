import RequirementMismatchInfo from "../models/RequirementMismatchInfo.js";
import ReqMisLinkInfo from "../models/ReqMisLinkInfo.js";
import mongoose from "mongoose";

export const getPendingReqMisForms = async (req, res) => {
  try {
    const { mobileNo, fillDate } = req.query;

    // Base query only fetching records with status 'Searching'
    const query = { rmStatusName: "Searching" };

    if (mobileNo) {
      query.phoneNumber = { $regex: mobileNo, $options: "i" };
    }

    if (fillDate) {
      const startDate = new Date(fillDate);
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date(fillDate);
      endDate.setHours(23, 59, 59, 999);

      query.createdOn = { $gte: startDate, $lte: endDate };
    }

    const records = await RequirementMismatchInfo.find(query).sort({ createdOn: -1 });
    
    return res.status(200).json({
      success: true,
      count: records.length,
      data: records,
    });
  } catch (error) {
    console.error("Error fetching searching records:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch records.",
      error: error.message,
    });
  }
};

export const getReqMisFormById = async (req, res) => {
  try {
    const { id } = req.params;

    // Search by leadId (cast to Number if leadId is stored as a Number in your schema)
    const record = await RequirementMismatchInfo.findOne({ 
      $or: [
        { leadId: Number(id) }, 
        { _id: id } // Fallback to Mongo _id if id isn't a valid leadId integer
      ] 
    });

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Record not found for the given Lead ID.",
      });
    }

    return res.status(200).json({
      success: true,
      data: record,
    });
  } catch (error) {
    console.error("Error fetching record by Lead ID:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch record.",
      error: error.message,
    });
  }
};

export const addCommentToReqMisForm = async (req, res) => {
  try {
    const { id } = req.params;
    const { searchComments, updatedBy } = req.body;

    if (!searchComments) {
      return res.status(400).json({
        success: false,
        message: "Comment text is required.",
      });
    }

    // Build conditional query array based on ID type
    const queryConditions = [];

    // Check if ID is a valid MongoDB ObjectId
    if (mongoose.Types.ObjectId.isValid(id)) {
      queryConditions.push({ _id: new mongoose.Types.ObjectId(id) });
    }

    // Check if ID is numeric
    const numericId = Number(id);
    if (!isNaN(numericId)) {
      queryConditions.push({ leadId: numericId }, { rmId: numericId });
    }

    let record = await ReqMisLinkInfo.findOne({ $or: queryConditions });

    // If record is not found in ReqMisLinkInfo, attempt to fetch parent details from RequirementMismatchInfo
    if (!record && mongoose.Types.ObjectId.isValid(id)) {
      const mainRecord = await RequirementMismatchInfo.findById(id);

      if (mainRecord) {
        // Find next available rmId or use timestamp-based numeric ID
        const nextRmId = Date.now();

        record = new ReqMisLinkInfo({
          rmId: mainRecord.rmId || nextRmId,
          leadId: mainRecord.leadId || null,
          agentId: mainRecord.agentId || null,
          agentName: mainRecord.agentName || null,
          customerName: mainRecord.customerName || null,
          propertyType: mainRecord.propertyType || null,
          rmStatusName: mainRecord.rmStatusName || "Searching",
          searchComments: searchComments,
          updatedBy: updatedBy || "Admin"
        });

        await record.save();

        return res.status(200).json({
          success: true,
          message: "Comment saved successfully.",
          data: record,
        });
      }
    }

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Record not found.",
      });
    }

    // Update existing record
    record.searchComments = searchComments;
    record.updatedBy = updatedBy || "Admin";
    await record.save();

    return res.status(200).json({
      success: true,
      message: "Comment updated successfully.",
      data: record,
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to add comment.",
      error: error.message,
    });
  }
};

export const addSearchLinkToReqMisForm = async (req, res) => {
  try {
    const { id } = req.params;
    const { searchLink, updatedBy } = req.body;

    if (!searchLink) {
      return res.status(400).json({
        success: false,
        message: "Property search link URL is required.",
      });
    }

    const queryConditions = [];

    // Valid MongoDB ObjectId search
    if (mongoose.Types.ObjectId.isValid(id)) {
      queryConditions.push({ _id: new mongoose.Types.ObjectId(id) });
    }

    // Numeric ID search for leadId / rmId
    const numericId = Number(id);
    if (!isNaN(numericId)) {
      queryConditions.push({ leadId: numericId }, { rmId: numericId });
    }

    // Try finding existing link record
    let record = queryConditions.length > 0 ? await ReqMisLinkInfo.findOne({ $or: queryConditions }) : null;

    // Fallback: search main collection if not yet in ReqMisLinkInfo
    if (!record) {
      let mainRecord = null;
      if (mongoose.Types.ObjectId.isValid(id)) {
        mainRecord = await RequirementMismatchInfo.findById(id);
      }
      if (!mainRecord && !isNaN(numericId)) {
        mainRecord = await RequirementMismatchInfo.findOne({
          $or: [{ leadId: numericId }, { rmId: numericId }]
        });
      }

      if (mainRecord) {
        record = new ReqMisLinkInfo({
          rmId: mainRecord.rmId || Date.now(),
          leadId: mainRecord.leadId || null,
          agentId: mainRecord.agentId || null,
          agentName: mainRecord.agentName || null,
          customerName: mainRecord.customerName || null,
          propertyType: mainRecord.propertyType || null,
          rmStatusName: mainRecord.rmStatusName || "Searching",
          searchLink: searchLink,
          updatedBy: updatedBy || "Admin"
        });

        await record.save();

        return res.status(200).json({
          success: true,
          message: "Search link added successfully.",
          data: record,
        });
      }
    }

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Record not found in system.",
      });
    }

    // Update existing record
    record.searchLink = searchLink;
    record.updatedBy = updatedBy || "Admin";
    await record.save();

    return res.status(200).json({
      success: true,
      message: "Search link updated successfully.",
      data: record,
    });
  } catch (error) {
    console.error("Error adding search link:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to add search link.",
      error: error.message,
    });
  }
};