import fs from "fs";
import path from "path";

import SuitableBusiness from "../models/SuitableBusiness.js";
import { convertToWebp } from "../services/imageConverter.js";

/*
=========================================================
UPLOAD DIRECTORY
=========================================================
*/

const suitableBusinessUploadDir = path.join(
  process.cwd(),
  "uploads",
  "suitablebusiness"
);

/*
=========================================================
DELETE IMAGE FILE
=========================================================
*/

const deleteImageFile = (imagePath) => {
  try {
    if (!imagePath) return;

    const fileName = path.basename(imagePath);

    const fullPath = path.join(
      suitableBusinessUploadDir,
      fileName
    );

    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  } catch (error) {
    console.error(
      "Suitable business image delete error:",
      error.message
    );
  }
};

/*
=========================================================
CREATE SUITABLE BUSINESS
POST /api/suitablebusiness
=========================================================
*/

export const createsuitablebusiness = async (
  req,
  res
) => {
  let newImage = null;

  try {
    const {
      Name,
      IsActive = true,
    } = req.body;

    /*
    =====================================================
    VALIDATE NAME
    =====================================================
    */

    if (!Name || !Name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Suitable business name is required.",
      });
    }

    /*
    =====================================================
    CHECK DUPLICATE
    =====================================================
    */

    const existingBusiness =
      await SuitableBusiness.findOne({
        Name: Name.trim(),
        IsDelete: false,
      });

    if (existingBusiness) {
      return res.status(409).json({
        success: false,
        message:
          "Suitable business with this name already exists.",
      });
    }

    /*
    =====================================================
    IMAGE
    =====================================================
    */

    let image = null;

    if (req.file) {
      newImage = await convertToWebp(
        req.file.buffer,
        suitableBusinessUploadDir
      );

      image =
        `/uploads/suitablebusiness/${newImage}`;
    }

    /*
    =====================================================
    CREATE
    =====================================================
    */

    const suitableBusiness =
      await SuitableBusiness.create({
        Name: Name.trim(),

        Image: image,

        IsActive:
          IsActive === true ||
          IsActive === "true",

        IsDelete: false,
      });

    return res.status(201).json({
      success: true,
      message:
        "Suitable business created successfully.",
      data: suitableBusiness,
    });
  } catch (error) {
    console.error(
      "createsuitablebusiness:",
      error
    );

    /*
    =====================================================
    DELETE NEW IMAGE IF DB CREATION FAILS
    =====================================================
    */

    if (newImage) {
      deleteImageFile(newImage);
    }

    return res.status(500).json({
      success: false,
      message:
        "Failed to create suitable business.",
      error: error.message,
    });
  }
};

/*
=========================================================
GET ALL SUITABLE BUSINESSES
GET /api/suitablebusiness
=========================================================
*/

export const getsuitablebusinesses = async (
  req,
  res
) => {
  try {
    const {
      search = "",
      status = "all",
      page = 1,
      limit = 20,
    } = req.query;

    /*
    =====================================================
    PAGINATION
    =====================================================
    */

    const currentPage = Math.max(
      Number(page) || 1,
      1
    );

    const pageLimit = Math.min(
      Math.max(Number(limit) || 20, 1),
      100
    );

    /*
    =====================================================
    BASE QUERY
    =====================================================
    */

    const query = {
      IsDelete: false,
    };

    /*
    =====================================================
    SEARCH
    =====================================================
    */

    if (search.trim()) {
      query.Name = {
        $regex: search.trim(),
        $options: "i",
      };
    }

    /*
    =====================================================
    STATUS
    =====================================================
    */

    if (status === "active") {
      query.IsActive = true;
    }

    if (status === "inactive") {
      query.IsActive = false;
    }

    /*
    =====================================================
    COUNT
    =====================================================
    */

    const total =
      await SuitableBusiness.countDocuments(query);

    /*
    =====================================================
    DATA
    =====================================================
    */

    const data =
      await SuitableBusiness.find(query)
        .sort({
          createdAt: -1,
        })
        .skip(
          (currentPage - 1) * pageLimit
        )
        .limit(pageLimit)
        .lean();

    /*
    =====================================================
    RESPONSE
    =====================================================
    */

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
      "getsuitablebusinesses:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch suitable businesses.",
      error: error.message,
    });
  }
};

/*
=========================================================
GET ACTIVE SUITABLE BUSINESSES
GET /api/suitablebusiness/active
=========================================================
*/

export const getActiveSuitableBusinesses = async (
  req,
  res
) => {
  try {
    const data =
      await SuitableBusiness.find({
        IsDelete: false,
        IsActive: true,
      })
        .sort({
          Name: 1,
        })
        .lean();

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(
      "getActiveSuitableBusinesses:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch active suitable businesses.",
      error: error.message,
    });
  }
};

/*
=========================================================
GET SUITABLE BUSINESS BY ID
GET /api/suitablebusiness/:id
=========================================================
*/

export const getsuitablebusinessbyid = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const suitableBusiness =
      await SuitableBusiness.findOne({
        _id: id,
        IsDelete: false,
      });

    if (!suitableBusiness) {
      return res.status(404).json({
        success: false,
        message:
          "Suitable business not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: suitableBusiness,
    });
  } catch (error) {
    console.error(
      "getsuitablebusinessbyid:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch suitable business.",
      error: error.message,
    });
  }
};

/*
=========================================================
UPDATE SUITABLE BUSINESS
PUT /api/suitablebusiness/:id
=========================================================
*/

export const updatesuitablebusiness = async (
  req,
  res
) => {
  let newImage = null;

  try {
    const { id } = req.params;

    const {
      Name,
      IsActive,
    } = req.body;

    /*
    =====================================================
    FIND BUSINESS
    =====================================================
    */

    const suitableBusiness =
      await SuitableBusiness.findOne({
        _id: id,
        IsDelete: false,
      });

    if (!suitableBusiness) {
      return res.status(404).json({
        success: false,
        message:
          "Suitable business not found.",
      });
    }

    /*
    =====================================================
    NAME
    =====================================================
    */

    if (Name !== undefined) {
      if (!Name.trim()) {
        return res.status(400).json({
          success: false,
          message:
            "Suitable business name cannot be empty.",
        });
      }

      /*
      Check duplicate
      */

      const duplicate =
        await SuitableBusiness.findOne({
          _id: {
            $ne: id,
          },

          Name: Name.trim(),

          IsDelete: false,
        });

      if (duplicate) {
        return res.status(409).json({
          success: false,
          message:
            "Suitable business with this name already exists.",
        });
      }

      suitableBusiness.Name =
        Name.trim();
    }

    /*
    =====================================================
    ACTIVE STATUS
    =====================================================
    */

    if (IsActive !== undefined) {
      suitableBusiness.IsActive =
        IsActive === true ||
        IsActive === "true";
    }

    /*
    =====================================================
    IMAGE
    =====================================================
    */

    if (req.file) {
      newImage = await convertToWebp(
        req.file.buffer,
        suitableBusinessUploadDir
      );

      const oldImage =
        suitableBusiness.Image;

      suitableBusiness.Image =
        `/uploads/suitablebusiness/${newImage}`;

      /*
      Save DB first
      */

      await suitableBusiness.save();

      /*
      Delete old image after successful save
      */

      if (oldImage) {
        deleteImageFile(oldImage);
      }

      return res.status(200).json({
        success: true,
        message:
          "Suitable business updated successfully.",
        data: suitableBusiness,
      });
    }

    /*
    =====================================================
    SAVE WITHOUT IMAGE
    =====================================================
    */

    await suitableBusiness.save();

    return res.status(200).json({
      success: true,
      message:
        "Suitable business updated successfully.",
      data: suitableBusiness,
    });
  } catch (error) {
    console.error(
      "updatesuitablebusiness:",
      error
    );

    /*
    =====================================================
    DELETE NEW IMAGE IF UPDATE FAILS
    =====================================================
    */

    if (newImage) {
      deleteImageFile(newImage);
    }

    return res.status(500).json({
      success: false,
      message:
        "Failed to update suitable business.",
      error: error.message,
    });
  }
};

/*
=========================================================
ACTIVE / INACTIVE TOGGLE
PATCH /api/suitablebusiness/:id/status
=========================================================
*/

export const togglesuitablebusinessstatus =
  async (req, res) => {
    try {
      const { id } = req.params;

      const suitableBusiness =
        await SuitableBusiness.findOne({
          _id: id,
          IsDelete: false,
        });

      if (!suitableBusiness) {
        return res.status(404).json({
          success: false,
          message:
            "Suitable business not found.",
        });
      }

      suitableBusiness.IsActive =
        !suitableBusiness.IsActive;

      await suitableBusiness.save();

      return res.status(200).json({
        success: true,

        message:
          suitableBusiness.IsActive
            ? "Suitable business activated successfully."
            : "Suitable business deactivated successfully.",

        data: suitableBusiness,
      });
    } catch (error) {
      console.error(
        "togglesuitablebusinessstatus:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to change suitable business status.",
        error: error.message,
      });
    }
  };

/*
=========================================================
DELETE SUITABLE BUSINESS - SOFT DELETE
DELETE /api/suitablebusiness/:id
=========================================================
*/

export const deletesuitablebusiness = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const suitableBusiness =
      await SuitableBusiness.findOne({
        _id: id,
        IsDelete: false,
      });

    if (!suitableBusiness) {
      return res.status(404).json({
        success: false,
        message:
          "Suitable business not found.",
      });
    }

    /*
    =====================================================
    SOFT DELETE
    =====================================================
    */

    suitableBusiness.IsDelete = true;
    suitableBusiness.IsActive = false;

    await suitableBusiness.save();

    /*
    =====================================================
    DELETE IMAGE FILE
    =====================================================
    */

    if (suitableBusiness.Image) {
      deleteImageFile(
        suitableBusiness.Image
      );
    }

    return res.status(200).json({
      success: true,
      message:
        "Suitable business deleted successfully.",
    });
  } catch (error) {
    console.error(
      "deletesuitablebusiness:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to delete suitable business.",
      error: error.message,
    });
  }
};