import LeadSource from "../models/LeadSource.js"; // Adjust path as needed
import mongoose from "mongoose";

// @desc    Create a new Lead Source
// @route   POST /api/lead-sources
// @access  Private / Public (depending on your setup)
export const createLeadSource = async (req, res) => {
  try {
    const { name, isActive } = req.body;

    // 1. Basic validation
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Name is required',
      });
    }

    // 2. Check if active/non-deleted lead source with the same name already exists (case-insensitive)
    const existingSource = await LeadSource.findOne({
      name: { $regex: new RegExp(`^${name.trim()}$`, 'i') },
      isDelete: false,
    });

    if (existingSource) {
      return res.status(400).json({
        success: false,
        message: 'A lead source with this name already exists',
      });
    }

    // 3. Create new LeadSource instance
    const leadSource = new LeadSource({
      name: name.trim(),
      isActive: isActive !== undefined ? isActive : true,
    });

    // 4. Save to database
    const savedLeadSource = await leadSource.save();

    // 5. Return success response
    return res.status(201).json({
      success: true,
      message: 'Lead source created successfully',
      data: savedLeadSource,
    });
  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }

    // Generic server error
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};
