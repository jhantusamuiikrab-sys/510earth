import Zone from "../models/Zone.js";
import {CATEGORY_ENUM} from "../models/Nearby.js";
// =====================================================
// CREATE ZONE
// =====================================================

export const createZone = async (req, res) => {
  try {
    const {
      ZoneName,
      ZoneArea,
      Category,
      IsActive = true,
    } = req.body;
    
    // -----------------------------------------
    // Validation
    // -----------------------------------------

    if (!ZoneName || !ZoneName.trim()) {
      return res.status(400).json({
        success: false,
        message: "Zone name is required",
      });
    }

    if (!Category) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }

    if (!CATEGORY_ENUM.includes(Category)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category",
      });
    }

    // -----------------------------------------
    // Check duplicate
    // -----------------------------------------

    const existingZone = await Zone.findOne({
      ZoneName: ZoneName.trim(),
      IsDelete: false,
    });

    if (existingZone) {
      return res.status(409).json({
        success: false,
        message: "Zone already exists",
      });
    }

    // -----------------------------------------
    // Create
    // -----------------------------------------

    const zone = await Zone.create({
      ZoneName: ZoneName.trim(),
      ZoneArea: ZoneArea?.trim() || null,
      catagory: Category,
      IsActive: Boolean(IsActive),
      IsDelete: false,
    });

    return res.status(201).json({
      success: true,
      message: "Zone created successfully",
      data: zone,
    });
  } catch (error) {
    console.error("createZone error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Zone name already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create zone",
      error: error.message,
    });
  }
};

// =====================================================
// GET ALL ZONES
// =====================================================

export const getZones = async (req, res) => {
  try {
    const {
      search = "",
      status = "all",
      category = "all",
      includeDeleted = "false",
    } = req.query;

    const filter = {};

    // -----------------------------------------
    // Deleted filter
    // -----------------------------------------

    if (includeDeleted !== "true") {
      filter.IsDelete = false;
    }

    // -----------------------------------------
    // Search
    // Searches:
    // ZoneName
    // ZoneArea
    // Category
    // -----------------------------------------

    const trimmedSearch = search.trim();

    if (trimmedSearch) {
      filter.$or = [
        {
          ZoneName: {
            $regex: trimmedSearch,
            $options: "i",
          },
        },
        {
          ZoneArea: {
            $regex: trimmedSearch,
            $options: "i",
          },
        },
        {
          category: {
            $regex: trimmedSearch,
            $options: "i",
          },
        },
      ];
    }

    // -----------------------------------------
    // Category filter
    // -----------------------------------------

    if (
      category &&
      category !== "all"
    ) {
      if (!CATEGORY_ENUM.includes(category)) {
        return res.status(400).json({
          success: false,
          message: "Invalid category filter",
        });
      }

      filter.catagory = category;
    }

    // -----------------------------------------
    // Status filter
    // -----------------------------------------

    if (status === "active") {
      filter.IsActive = true;
    }

    if (status === "inactive") {
      filter.IsActive = false;
    }

    // -----------------------------------------
    // Fetch
    // -----------------------------------------

    const zones = await Zone.find(filter)
      .sort({
        createdAt: -1,
      })
      .lean();      

    return res.status(200).json({
      success: true,
      count: zones.length,
      data: zones,
    });
  } catch (error) {
    console.error("getZones error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch zones",
      error: error.message,
    });
  }
};

// =====================================================
// GET SINGLE ZONE
// =====================================================

export const getZoneById = async (req, res) => {
  try {
    const { id } = req.params;

    const zone = await Zone.findOne({
      _id: id,
      IsDelete: false,
    });

    if (!zone) {
      return res.status(404).json({
        success: false,
        message: "Zone not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: zone,
    });
  } catch (error) {
    console.error("getZoneById error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch zone",
      error: error.message,
    });
  }
};

// =====================================================
// UPDATE ZONE
// =====================================================

export const updateZone = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      ZoneName,
      ZoneArea,
      Category,
      IsActive,
    } = req.body;    

    // -----------------------------------------
    // Find zone
    // -----------------------------------------

    const zone = await Zone.findOne({
      _id: id,
      IsDelete: false,
    });

    if (!zone) {
      return res.status(404).json({
        success: false,
        message: "Zone not found",
      });
    }

    // -----------------------------------------
    // Validation
    // -----------------------------------------

    if (!ZoneName || !ZoneName.trim()) {
      return res.status(400).json({
        success: false,
        message: "Zone name is required",
      });
    }

    if (!Category) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }

    if (!CATEGORY_ENUM.includes(Category)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category",
      });
    }

    // -----------------------------------------
    // Duplicate check
    // -----------------------------------------

    const duplicateZone = await Zone.findOne({
      _id: {
        $ne: id,
      },
      ZoneName: ZoneName.trim(),
      IsDelete: false,
    });

    if (duplicateZone) {
      return res.status(409).json({
        success: false,
        message:
          "Another zone with this name already exists",
      });
    }

    // -----------------------------------------
    // Update
    // -----------------------------------------

    zone.ZoneName = ZoneName.trim();

    zone.ZoneArea =
      ZoneArea?.trim() || null;

    // IMPORTANT
    zone.catagory = Category;

    if (typeof IsActive === "boolean") {
      zone.IsActive = IsActive;
    }

    // -----------------------------------------
    // Save
    // -----------------------------------------

    await zone.save();    

    return res.status(200).json({
      success: true,
      message: "Zone updated successfully",
      data: zone,
    });

  } catch (error) {
    console.error(
      "updateZone error:",
      error
    );

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Zone name already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update zone",
      error: error.message,
    });
  }
};
// =====================================================
// TOGGLE ACTIVE / INACTIVE
// =====================================================

export const toggleZoneStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const zone = await Zone.findOne({
      _id: id,
      IsDelete: false,
    });

    if (!zone) {
      return res.status(404).json({
        success: false,
        message: "Zone not found",
      });
    }

    zone.IsActive = !zone.IsActive;

    await zone.save();

    return res.status(200).json({
      success: true,
      message: zone.IsActive
        ? "Zone activated successfully"
        : "Zone deactivated successfully",
      data: zone,
    });
  } catch (error) {
    console.error("toggleZoneStatus error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to change zone status",
      error: error.message,
    });
  }
};

// =====================================================
// ACTIVATE ZONE
// =====================================================

export const activateZone = async (req, res) => {
  try {
    const { id } = req.params;

    const zone = await Zone.findOneAndUpdate(
      {
        _id: id,
        IsDelete: false,
      },
      {
        $set: {
          IsActive: true,
        },
      },
      {
        new: true,
      }
    );

    if (!zone) {
      return res.status(404).json({
        success: false,
        message: "Zone not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Zone activated successfully",
      data: zone,
    });
  } catch (error) {
    console.error("activateZone error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to activate zone",
      error: error.message,
    });
  }
};

// =====================================================
// DEACTIVATE ZONE
// =====================================================

export const deactivateZone = async (req, res) => {
  try {
    const { id } = req.params;

    const zone = await Zone.findOneAndUpdate(
      {
        _id: id,
        IsDelete: false,
      },
      {
        $set: {
          IsActive: false,
        },
      },
      {
        new: true,
      }
    );

    if (!zone) {
      return res.status(404).json({
        success: false,
        message: "Zone not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Zone deactivated successfully",
      data: zone,
    });
  } catch (error) {
    console.error("deactivateZone error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to deactivate zone",
      error: error.message,
    });
  }
};

// =====================================================
// DELETE ZONE - SOFT DELETE
// =====================================================

export const deleteZone = async (req, res) => {
  try {
    const { id } = req.params;

    const zone = await Zone.findOneAndUpdate(
      {
        _id: id,
        IsDelete: false,
      },
      {
        $set: {
          IsDelete: true,
          IsActive: false,
        },
      },
      {
        new: true,
      }
    );

    if (!zone) {
      return res.status(404).json({
        success: false,
        message: "Zone not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Zone deleted successfully",
      data: zone,
    });
  } catch (error) {
    console.error("deleteZone error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete zone",
      error: error.message,
    });
  }
};