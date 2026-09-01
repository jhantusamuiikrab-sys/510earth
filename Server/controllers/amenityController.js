import path from "path";
import Amenity from "../models/Amenity.js";
import {CATEGORY_ENUM} from "../models/Nearby.js";
import { convertToWebp } from "../services/imageConverter.js";

const amenityUploadDir = path.join(
  process.cwd(),
  "uploads",
  "amenity"
);

// =====================================================
// DELETE IMAGE FILE
// =====================================================

const deleteImageFile = (imagePath) => {
  try {
    if (!imagePath) return;

    const fileName = path.basename(imagePath);

    const fullPath = path.join(
      amenityUploadDir,
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
// CREATE AMENITY
// =====================================================

export const createAmenity = async (
  req,
  res
) => {
  let newImage = null;

  try {
    const {
      name,
      catagory,
      isActive = true,
    } = req.body;

    // =================================================
    // VALIDATE NAME
    // =================================================

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Amenity name is required.",
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
        message: "Valid category is required.",
        allowedCategories: CATEGORY_ENUM,
      });
    }

    // =================================================
    // CHECK DUPLICATE
    // =================================================

    const existingAmenity =
      await Amenity.findOne({
        name: name.trim(),
        catagory,
        isDelete: false,
      });

    if (existingAmenity) {
      return res.status(409).json({
        success: false,
        message:
          "Amenity with this name already exists in this category.",
      });
    }

    // =================================================
    // IMAGE
    // =================================================

    let image = null;

    if (req.file) {
      newImage = await convertToWebp(
        req.file.buffer,
        amenityUploadDir,
        "amenity"
      );

      image = `/uploads/amenity/${newImage}`;
    }

    // =================================================
    // CREATE
    // =================================================

    const amenity = await Amenity.create({
      name: name.trim(),

      catagory,

      image,

      isActive:
        isActive === true ||
        isActive === "true",

      isDelete: false,
    });

    return res.status(201).json({
      success: true,
      message:
        "Amenity created successfully.",
      data: amenity,
    });
  } catch (error) {
    console.error(
      "createAmenity:",
      error
    );

    // Delete newly created image
    // if database creation fails
    if (newImage) {
      deleteImageFile(newImage);
    }

    return res.status(500).json({
      success: false,
      message:
        "Failed to create amenity.",
      error: error.message,
    });
  }
};

// =====================================================
// GET ALL AMENITIES
// =====================================================

export const getAmenities = async (
  req,
  res
) => {
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
      await Amenity.countDocuments(query);

    // =================================================
    // DATA
    // =================================================

    const data =
      await Amenity.find(query)
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
    console.error(
      "getAmenities:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch amenity records.",
      error: error.message,
    });
  }
};

// =====================================================
// GET ACTIVE AMENITIES
// =====================================================

export const getActiveAmenities = async (
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
    // DATA
    // =================================================

    const data =
      await Amenity.find(query)
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
      "getActiveAmenities:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch active amenities.",
      error: error.message,
    });
  }
};

// =====================================================
// GET AMENITY BY ID
// =====================================================

export const getAmenityById = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const amenity =
      await Amenity.findOne({
        _id: id,
        isDelete: false,
      });

    if (!amenity) {
      return res.status(404).json({
        success: false,
        message: "Amenity not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: amenity,
    });
  } catch (error) {
    console.error(
      "getAmenityById:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch amenity.",
      error: error.message,
    });
  }
};

// =====================================================
// UPDATE AMENITY
// =====================================================

export const updateAmenity = async (
  req,
  res
) => {
  let newImage = null;

  try {
    const { id } = req.params;

    const {
      name,
      catagory,
      isActive,
    } = req.body;

    // =================================================
    // FIND AMENITY
    // =================================================

    const amenity =
      await Amenity.findOne({
        _id: id,
        isDelete: false,
      });

    if (!amenity) {
      return res.status(404).json({
        success: false,
        message: "Amenity not found.",
      });
    }

    // =================================================
    // NAME
    // =================================================

    if (name !== undefined) {
      if (!name.trim()) {
        return res.status(400).json({
          success: false,
          message:
            "Amenity name cannot be empty.",
        });
      }

      const duplicate =
        await Amenity.findOne({
          _id: {
            $ne: id,
          },

          name: name.trim(),

          catagory:
            catagory !== undefined
              ? catagory
              : amenity.catagory,

          isDelete: false,
        });

      if (duplicate) {
        return res.status(409).json({
          success: false,
          message:
            "Amenity with this name already exists in this category.",
        });
      }

      amenity.name = name.trim();
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
            "Invalid amenity category.",
          allowedCategories:
            CATEGORY_ENUM,
        });
      }

      // Check duplicate when category
      // changes

      const duplicate =
        await Amenity.findOne({
          _id: {
            $ne: id,
          },

          name: amenity.name,

          catagory,

          isDelete: false,
        });

      if (duplicate) {
        return res.status(409).json({
          success: false,
          message:
            "Amenity with this name already exists in this category.",
        });
      }

      amenity.catagory = catagory;
    }

    // =================================================
    // ACTIVE STATUS
    // =================================================

    if (isActive !== undefined) {
      amenity.isActive =
        isActive === true ||
        isActive === "true";
    }

    // =================================================
    // IMAGE
    // =================================================

    if (req.file) {
      newImage = await convertToWebp(
        req.file.buffer,
        amenityUploadDir,
        "amenity"
      );

      const oldImage = amenity.image;

      amenity.image =
        `/uploads/amenity/${newImage}`;

      await amenity.save();

      // Delete old image
      if (oldImage) {
        deleteImageFile(oldImage);
      }

      return res.status(200).json({
        success: true,
        message:
          "Amenity updated successfully.",
        data: amenity,
      });
    }

    // =================================================
    // SAVE
    // =================================================

    await amenity.save();

    return res.status(200).json({
      success: true,
      message:
        "Amenity updated successfully.",
      data: amenity,
    });
  } catch (error) {
    console.error(
      "updateAmenity:",
      error
    );

    // Delete newly created image
    // if update fails
    if (newImage) {
      deleteImageFile(newImage);
    }

    return res.status(500).json({
      success: false,
      message:
        "Failed to update amenity.",
      error: error.message,
    });
  }
};

// =====================================================
// ACTIVE / INACTIVE TOGGLE
// =====================================================

export const toggleAmenityStatus =
  async (req, res) => {
    try {
      const { id } = req.params;

      const amenity =
        await Amenity.findOne({
          _id: id,
          isDelete: false,
        });

      if (!amenity) {
        return res.status(404).json({
          success: false,
          message:
            "Amenity not found.",
        });
      }

      amenity.isActive =
        !amenity.isActive;

      await amenity.save();

      return res.status(200).json({
        success: true,

        message: amenity.isActive
          ? "Amenity activated successfully."
          : "Amenity deactivated successfully.",

        data: amenity,
      });
    } catch (error) {
      console.error(
        "toggleAmenityStatus:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to change amenity status.",
        error: error.message,
      });
    }
  };

// =====================================================
// DELETE AMENITY - SOFT DELETE
// =====================================================

export const deleteAmenity = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const amenity =
      await Amenity.findOne({
        _id: id,
        isDelete: false,
      });

    if (!amenity) {
      return res.status(404).json({
        success: false,
        message:
          "Amenity not found.",
      });
    }

    amenity.isDelete = true;
    amenity.isActive = false;

    await amenity.save();

    // Delete image file
    if (amenity.image) {
      deleteImageFile(amenity.image);
    }

    return res.status(200).json({
      success: true,
      message:
        "Amenity deleted successfully.",
    });
  } catch (error) {
    console.error(
      "deleteAmenity:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to delete amenity.",
      error: error.message,
    });
  }
};