import RequirementMismatchInfo from "../models/RequirementMismatchInfo.js";
import ReqMisLinkInfo from "../models/ReqMisLinkInfo.js";
import mongoose from "mongoose";

const getQueryConditions = (id) => {
  const queryConditions = [];
  if (mongoose.Types.ObjectId.isValid(id)) {
    queryConditions.push({ _id: new mongoose.Types.ObjectId(id) });
  }
  const numericId = Number(id);
  if (!isNaN(numericId)) {
    queryConditions.push({ leadId: numericId }, { rmId: numericId });
  }
  return queryConditions;
};

export const getPendingReqMisForms = async (req, res) => {
  try {
    const { mobileNo, fillDate } = req.query;
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

    const record = await RequirementMismatchInfo.findOne({
      $or: [
        { leadId: Number(id) || 0 },
        { _id: mongoose.Types.ObjectId.isValid(id) ? id : null }
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

    const queryConditions = getQueryConditions(id);
    let record = queryConditions.length > 0 ? await ReqMisLinkInfo.findOne({ $or: queryConditions }) : null;

    const newCommentObj = {
      commentdescription: searchComments,
      ReadingFlag: false,
    };

    if (!record) {
      let mainRecord = null;
      if (mongoose.Types.ObjectId.isValid(id)) {
        mainRecord = await RequirementMismatchInfo.findById(id);
      }
      const numericId = Number(id);
      if (!mainRecord && !isNaN(numericId)) {
        mainRecord = await RequirementMismatchInfo.findOne({
          $or: [{ leadId: numericId }, { rmId: numericId }]
        });
      }

      if (mainRecord) {
        record = new ReqMisLinkInfo({
          rmId: mainRecord.rmId || Date.now(),
          leadId: mainRecord.leadId || null,
          agentName: mainRecord.agentName || null,
          customerName: mainRecord.customerName || null,
          propertyType: mainRecord.propertyType || null,
          rmStatusName: mainRecord.rmStatusName || "Searching",
          Comment: [newCommentObj],
          searchComments: searchComments,
          updatedBy: updatedBy || "Admin"
        });

        await record.save();

        return res.status(200).json({
          success: true,
          message: "Comment added successfully.",
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

    const updatedRecord = await ReqMisLinkInfo.findByIdAndUpdate(
      record._id,
      {
        $push: { Comment: newCommentObj },
        $set: {
          searchComments: searchComments,
          updatedBy: updatedBy || "Admin"
        }
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Comment added successfully.",
      data: updatedRecord,
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

    const queryConditions = getQueryConditions(id);
    let record = queryConditions.length > 0 ? await ReqMisLinkInfo.findOne({ $or: queryConditions }) : null;

    const newLinkObj = {
      linkdescription: searchLink,
      ReadingFlag: false,
    };

    if (!record) {
      let mainRecord = null;
      if (mongoose.Types.ObjectId.isValid(id)) {
        mainRecord = await RequirementMismatchInfo.findById(id);
      }
      const numericId = Number(id);
      if (!mainRecord && !isNaN(numericId)) {
        mainRecord = await RequirementMismatchInfo.findOne({
          $or: [{ leadId: numericId }, { rmId: numericId }]
        });
      }

      if (mainRecord) {
        record = new ReqMisLinkInfo({
          rmId: mainRecord.rmId || Date.now(),
          leadId: mainRecord.leadId || null,
          agentName: mainRecord.agentName || null,
          customerName: mainRecord.customerName || null,
          propertyType: mainRecord.propertyType || null,
          rmStatusName: mainRecord.rmStatusName || "Searching",
          Link: [newLinkObj],
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
        message: "Record not found.",
      });
    }

    const updatedRecord = await ReqMisLinkInfo.findByIdAndUpdate(
      record._id,
      {
        $push: { Link: newLinkObj },
        $set: {
          searchLink: searchLink,
          updatedBy: updatedBy || "Admin"
        }
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Search link added successfully.",
      data: updatedRecord,
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

export const CommentsAndLinksById = async (req, res) => {
  try {
    const { id } = req.params;
    const queryConditions = getQueryConditions(id);

    const record = queryConditions.length > 0 ? await ReqMisLinkInfo.findOne({ $or: queryConditions }) : null;

    if (!record) {
      return res.status(200).json({
        success: true,
        data: {
          Comment: [],
          Link: [],
          searchComments: null,
          searchLink: null
        }
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        Comment: record.Comment || [],
        Link: record.Link || [],
        searchComments: record.searchComments || null,
        searchLink: record.searchLink || null,
        updatedOn: record.updatedOn || record.createdOn
      }
    });
  } catch (error) {
    console.error("Error fetching comments and links:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch comments and links.",
      error: error.message
    });
  }
};

export const markNotificationsAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const queryConditions = getQueryConditions(id);

    const record = queryConditions.length > 0 ? await ReqMisLinkInfo.findOne({ $or: queryConditions }) : null;

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Link/Comment record not found.",
      });
    }

    // Set ReadingFlag to true for all entries in Comment and Link arrays
    if (record.Comment && record.Comment.length > 0) {
      record.Comment.forEach(item => {
        item.ReadingFlag = true;
      });
    }

    if (record.Link && record.Link.length > 0) {
      record.Link.forEach(item => {
        item.ReadingFlag = true;
      });
    }

    await record.save();

    return res.status(200).json({
      success: true,
      message: "Notifications marked as read successfully.",
      data: record
    });
  } catch (error) {
    console.error("Error marking notifications as read:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to mark notifications as read.",
      error: error.message
    });
  }
};