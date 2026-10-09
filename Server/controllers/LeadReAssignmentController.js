import reAssignmentInfo from "../models/reAssignmentInfo.js";

// POST API: Create new Lead Reassignment Request
// export const createReAssignmentLead = async (req, res) => {
//   try {
//     const { leadId, AssignerId, assignerName, AssignedToId, assignToName, SubLeadStatus } = req.body;

//     // Validate required fields
//     if (!leadId || !AssignerId || !AssignedToId) {
//       return res.status(400).json({
//         success: false,
//         message: "Please fill in all required fields (leadId, AssignerId, AssignedToId).",
//       });
//     }

//     // Create and save document in reAssignmentInfo collection
//     const newReAssignment = await reAssignmentInfo.create({
//       leadId,
//       AssignerId,
//       assignerName: assignerName ? { id: AssignerId, name: assignerName } : undefined,
//       AssignedToId,
//       assignToName: assignToName ? { id: AssignedToId, name: assignToName } : undefined,
//       assignedOn: new Date(),
//       approvedOn: null,
//       isActive: true,
//       status: false, // Default to Pending
//       StatusId: 1,
//       StatusName: "Pending",
//       SubLeadStatusId: 10,
//       SubLeadStatus: SubLeadStatus || "Client requested agent reassignment",
//       subLeadStatus: {
//         id: 10,
//         name: SubLeadStatus || "Client requested agent reassignment",
//       },
//     });

//     return res.status(201).json({
//       success: true,
//       message: "Lead reassignment request created successfully!",
//       data: newReAssignment,
//     });
//   } catch (error) {
//     console.error("Error creating reassignment request:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Server Error. Failed to create reassignment request.",
//       error: error.message,
//     });
//   }
// };

// GET API: Fetch all active reassignment requests (with filtering & pagination)
// export const getReAssignmentLeads = async (req, res) => {
//   try {
//     const { assignedTo, status, leadId, page = 1, limit = 100 } = req.query;

//     // Build dynamic query
//     const query = { isActive: true };

//     if (assignedTo) query.AssignedToId = assignedTo;
//     if (leadId) query.leadId = leadId;
//     if (status !== undefined) query.status = status === 'true';

//     const skip = (Number(page) - 1) * Number(limit);

//     const [reAssignmentLeads, total] = await Promise.all([
//       reAssignmentInfo
//         .find(query)
//         .populate('leadId')
//         .populate('AssignerId', 'name email')
//         .populate('AssignedToId', 'name email')
//         .sort({ assignedOn: -1 })
//         .skip(skip)
//         .limit(Number(limit))
//         .lean(),
//       reAssignmentInfo.countDocuments(query),
//     ]);

//     return res.status(200).json({
//       success: true,
//       totalRecords: total,
//       currentPage: Number(page),
//       totalPages: Math.ceil(total / Number(limit)),
//       data: reAssignmentLeads,
//     });
//   } catch (error) {
//     console.error("Error fetching reassignment leads:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch reassignment leads",
//       error: error.message,
//     });
//   }
// };

// GET API: Fetch all active reassignment requests
export const getReAssignmentLeads = async (req, res) => {
  try {
    const { assignedTo, status, leadId, page = 1, limit = 100 } = req.query;

    // Build dynamic query
    const query = { isActive: true };

    if (assignedTo) query.AssignedToId = assignedTo;
    if (leadId) query.leadId = leadId;
    if (status !== undefined) query.status = status === 'true';

    const skip = (Number(page) - 1) * Number(limit);

    // Fetch data WITHOUT populating missing user IDs
    const [reAssignmentLeads, total] = await Promise.all([
      reAssignmentInfo
        .find(query)
        .sort({ assignedOn: -1 })
        .skip(skip)
        .limit(Number(limit))
        .lean(),
      reAssignmentInfo.countDocuments(query),
    ]);

    return res.status(200).json({
      success: true,
      totalRecords: total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      data: reAssignmentLeads,
    });
  } catch (error) {
    console.error("Error fetching reassignment leads:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch reassignment leads",
      error: error.message,
    });
  }
};

// PUT API: Update status (Approve or Reject Reassignment)
// export const updateReAssignmentStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status, StatusName } = req.body;

//     if (status === undefined) {
//       return res.status(400).json({
//         success: false,
//         message: "Status parameter is required.",
//       });
//     }

//     const updatedRecord = await reAssignmentInfo.findByIdAndUpdate(
//       id,
//       {
//         status: Boolean(status),
//         StatusName: StatusName || (status ? "Approved" : "Rejected"),
//         approvedOn: status ? new Date() : null,
//       },
//       { new: true }
//     );

//     if (!updatedRecord) {
//       return res.status(404).json({
//         success: false,
//         message: "Reassignment record not found.",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: `Reassignment request ${status ? "approved" : "rejected"} successfully!`,
//       data: updatedRecord,
//     });
//   } catch (error) {
//     console.error("Error updating reassignment status:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to update reassignment status",
//       error: error.message,
//     });
//   }
// };