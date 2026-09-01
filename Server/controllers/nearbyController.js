import Nearby, {
  CATEGORY_ENUM,
} from "../models/Nearby.js";

import fs from "fs";
import path from "path";

import { convertToWebp } from "../services/imageConverter.js";

const nearbyUploadDir = path.join(
  process.cwd(),
  "uploads",
  "nearby"
);

// =====================================================
// DELETE IMAGE FILE
// =====================================================

const deleteImageFile = (imagePath) => {
  try {
    if (!imagePath) return;

    const fileName = path.basename(imagePath);

    const fullPath = path.join(
      nearbyUploadDir,
      fileName
    );

    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  } catch (error) {
    console.error(
      "Image delete error:",
      error.message
    );
  }
};

// =====================================================
// CREATE NEARBY
// =====================================================

export const createNearby = async (req, res) => {
  let newImage = null;

  try {
    const {
      name,
      catagory,
      faIconClass,
      isActive = true,
    } = req.body;

    // =================================================
    // VALIDATE NAME
    // =================================================

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Nearby name is required.",
      });
    }

    // =================================================
    // VALIDATE CATEGORY
    // =================================================

    if (
      !catagory ||
      !CATEGORY_ENUM.includes(catagory)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Valid category is required.",
        allowedCategories:
          CATEGORY_ENUM,
      });
    }

    // =================================================
    // CHECK DUPLICATE
    // =================================================

    const existingNearby =
      await Nearby.findOne({
        name: name.trim(),
        catagory,
        isDelete: false,
      });

    if (existingNearby) {
      return res.status(409).json({
        success: false,
        message:
          "Nearby with this name already exists in this category.",
      });
    }

    // =================================================
    // IMAGE
    // =================================================

    let image = null;

    if (req.file) {
      newImage = await convertToWebp(
        req.file.buffer,
        nearbyUploadDir
      );

      image = `/uploads/nearby/${newImage}`;
    }

    // =================================================
    // CREATE
    // =================================================

    const nearby = await Nearby.create({
      name: name.trim(),

      catagory,

      image,

      faIconClass:
        faIconClass?.trim() ||
        "fa-solid fa-location-dot",

      isActive:
        isActive === true ||
        isActive === "true",
    });

    return res.status(201).json({
      success: true,
      message: "Nearby created successfully.",
      data: nearby,
    });
  } catch (error) {
    console.error("createNearby:", error);

    if (newImage) {
      deleteImageFile(newImage);
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create nearby.",
      error: error.message,
    });
  }
};

// =====================================================
// GET ALL NEARBY
// =====================================================

export const getNearbys = async (req, res) => {
  try {
    const {
      search = "",
      status = "all",
      catagory = "all",
      page = 1,
      limit = 20,
    } = req.query;

    const currentPage = Math.max(
      Number(page) || 1,
      1
    );

    const pageLimit = Math.min(
      Math.max(Number(limit) || 20, 1),
      100
    );

    const query = {
      isDelete: false,
    };

    // =================================================
    // SEARCH
    // =================================================

    if (search.trim()) {
      query.name = {
        $regex: search.trim(),
        $options: "i",
      };
    }

    // =================================================
    // STATUS
    // =================================================

    if (status === "active") {
      query.isActive = true;
    }

    if (status === "inactive") {
      query.isActive = false;
    }

    // =================================================
    // CATEGORY
    // =================================================

    if (
      catagory !== "all" &&
      CATEGORY_ENUM.includes(catagory)
    ) {
      query.catagory = catagory;
    }

    // =================================================
    // COUNT
    // =================================================

    const total =
      await Nearby.countDocuments(query);

    // =================================================
    // DATA
    // =================================================

    const data = await Nearby.find(query)
      .sort({
        createdAt: -1,
      })
      .skip(
        (currentPage - 1) * pageLimit
      )
      .limit(pageLimit)
      .lean();

    return res.status(200).json({
      success: true,

      data,

      pagination: {
        page: currentPage,
        limit: pageLimit,
        total,
        totalPages: Math.ceil(
          total / pageLimit
        ),
      },
    });
  } catch (error) {
    console.error("getNearbys:", error);

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch nearby records.",
      error: error.message,
    });
  }
};

// =====================================================
// GET ACTIVE NEARBY
// =====================================================

export const getActiveNearbys = async (
  req,
  res
) => {
  try {
    const {
      catagory = "all",
    } = req.query;

    const query = {
      isDelete: false,
      isActive: true,
    };

    if (
      catagory !== "all" &&
      CATEGORY_ENUM.includes(catagory)
    ) {
      query.catagory = catagory;
    }

    const data = await Nearby.find(query)
      .sort({
        name: 1,
      })
      .lean();

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(
      "getActiveNearbys:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch active nearby records.",
      error: error.message,
    });
  }
};

// =====================================================
// GET SINGLE NEARBY
// =====================================================

export const getNearbyById = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const nearby = await Nearby.findOne({
      _id: id,
      isDelete: false,
    });

    if (!nearby) {
      return res.status(404).json({
        success: false,
        message: "Nearby not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: nearby,
    });
  } catch (error) {
    console.error(
      "getNearbyById:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch nearby.",
      error: error.message,
    });
  }
};

// =====================================================
// UPDATE NEARBY
// =====================================================

export const updateNearby = async (
  req,
  res
) => {
  let newImage = null;

  try {
    const { id } = req.params;

    const nearby = await Nearby.findOne({
      _id: id,
      isDelete: false,
    });

    if (!nearby) {
      return res.status(404).json({
        success: false,
        message: "Nearby not found.",
      });
    }

    const {
      name,
      catagory,
      faIconClass,
      isActive,
    } = req.body;

    // =================================================
    // NAME
    // =================================================

    if (name !== undefined) {
      if (!name.trim()) {
        return res.status(400).json({
          success: false,
          message:
            "Nearby name cannot be empty.",
        });
      }

      const duplicate =
        await Nearby.findOne({
          _id: {
            $ne: id,
          },

          name: name.trim(),

          catagory:
            catagory !== undefined
              ? catagory
              : nearby.catagory,

          isDelete: false,
        });

      if (duplicate) {
        return res.status(409).json({
          success: false,
          message:
            "Nearby with this name already exists in this category.",
        });
      }

      nearby.name = name.trim();
    }

    // =================================================
    // CATEGORY
    // =================================================

    if (catagory !== undefined) {
      if (
        !CATEGORY_ENUM.includes(
          catagory
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid nearby category.",
          allowedCategories:
            CATEGORY_ENUM,
        });
      }

      // Check duplicate when only category
      // changes
      const duplicate =
        await Nearby.findOne({
          _id: {
            $ne: id,
          },

          name: nearby.name,

          catagory,

          isDelete: false,
        });

      if (duplicate) {
        return res.status(409).json({
          success: false,
          message:
            "Nearby with this name already exists in this category.",
        });
      }

      nearby.catagory = catagory;
    }

    // =================================================
    // ICON
    // =================================================

    if (faIconClass !== undefined) {
      nearby.faIconClass =
        faIconClass.trim() ||
        "fa-solid fa-location-dot";
    }

    // =================================================
    // ACTIVE STATUS
    // =================================================

    if (isActive !== undefined) {
      nearby.isActive =
        isActive === true ||
        isActive === "true";
    }

    // =================================================
    // IMAGE
    // =================================================

    if (req.file) {
      newImage = await convertToWebp(
        req.file.buffer,
        nearbyUploadDir
      );

      const oldImage = nearby.image;

      nearby.image =
        `/uploads/nearby/${newImage}`;

      await nearby.save();

      if (oldImage) {
        deleteImageFile(oldImage);
      }

      return res.status(200).json({
        success: true,
        message:
          "Nearby updated successfully.",
        data: nearby,
      });
    }

    // =================================================
    // SAVE
    // =================================================

    await nearby.save();

    return res.status(200).json({
      success: true,
      message: "Nearby updated successfully.",
      data: nearby,
    });
  } catch (error) {
    console.error("updateNearby:", error);

    if (newImage) {
      deleteImageFile(newImage);
    }

    return res.status(500).json({
      success: false,
      message:
        "Failed to update nearby.",
      error: error.message,
    });
  }
};

// =====================================================
// ACTIVE / INACTIVE TOGGLE
// =====================================================

export const toggleNearbyStatus = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const nearby = await Nearby.findOne({
      _id: id,
      isDelete: false,
    });

    if (!nearby) {
      return res.status(404).json({
        success: false,
        message: "Nearby not found.",
      });
    }

    nearby.isActive =
      !nearby.isActive;

    await nearby.save();

    return res.status(200).json({
      success: true,

      message: nearby.isActive
        ? "Nearby activated successfully."
        : "Nearby deactivated successfully.",

      data: nearby,
    });
  } catch (error) {
    console.error(
      "toggleNearbyStatus:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to change nearby status.",
      error: error.message,
    });
  }
};

// =====================================================
// DELETE NEARBY - SOFT DELETE
// =====================================================

export const deleteNearby = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const nearby = await Nearby.findOne({
      _id: id,
      isDelete: false,
    });

    if (!nearby) {
      return res.status(404).json({
        success: false,
        message: "Nearby not found.",
      });
    }

    nearby.isDelete = true;
    nearby.isActive = false;

    await nearby.save();

    if (nearby.image) {
      deleteImageFile(nearby.image);
    }

    return res.status(200).json({
      success: true,
      message:
        "Nearby deleted successfully.",
    });
  } catch (error) {
    console.error(
      "deleteNearby:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to delete nearby.",
      error: error.message,
    });
  }
};