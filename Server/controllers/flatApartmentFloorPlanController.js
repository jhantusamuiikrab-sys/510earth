import mongoose from "mongoose";
import FlatApartmentProperty from "../models/Propertyinfo.js";

const BHK_ENUM = [
  "1BHK",
  "2BHK",
  "3BHK",
  "4BHK",
  "5BHK",
  "6BHK",
  "6.5BHK",
];

/*
=========================================================
HELPERS
=========================================================
*/

const toNumber = (value, defaultValue = 0) => {
  if (
    value === undefined ||
    value === null ||
    value === ""
  ) {
    return defaultValue;
  }

  const number = Number(value);

  return Number.isFinite(number)
    ? number
    : defaultValue;
};

const parseImages = (images) => {
  if (!images) {
    return [];
  }

  if (Array.isArray(images)) {
    return images;
  }

  if (typeof images === "string") {
    try {
      const parsed = JSON.parse(images);

      return Array.isArray(parsed)
        ? parsed
        : [];
    } catch {
      return [];
    }
  }
  return [];
};

const normalizeImages = (images) => {
  return parseImages(images)
    .filter(Boolean)
    .map((image) => ({
      GalleryImgInfo:
        image.GalleryImgInfo || "",

      GalleryImgInfoPath:
        image.GalleryImgInfoPath || "",
    }));
};

const validateIds = (
  propertyId,
  floorPlanId = null
) => {
  if (
    !mongoose.Types.ObjectId.isValid(
      propertyId
    )
  ) {
    return false;
  }

  if (
    floorPlanId &&
    !mongoose.Types.ObjectId.isValid(
      floorPlanId
    )
  ) {
    return false;
  }

  return true;
};

/*
=========================================================
CREATE FLOOR PLAN

POST
/api/flat-apartment-properties/:propertyId/floor-plans
=========================================================

Example body:

{
  "BHK": "2BHK",
  "AreaInSqFt": 1250,
  "PricePerSqft": 4500,
  "TotalPricePerBHK": 5625000,
  "Block": "A",
  "Direction": "East",
  "Toilet": 2,
  "NoofBalcony": 2,
  "Description": "Premium 2 BHK",
  "BuiltUpArea": 1200,
  "CarpetArea": 950,
  "BhRmId": "BR-002",
  "ActualSqFt": 1250,
  "Images": []
}
=========================================================
*/

export const createFloorPlan = async (
  req,
  res
) => {
  try {
    const { propertyId } = req.params;

    if (!propertyId) {
      return res.status(400).json({
        success: false,
        message: "Property ID is required",
      });
    }

    if (
      !mongoose.Types.ObjectId.isValid(
        propertyId
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid property ID",
      });
    }

    const {
      BHK,
      AreaInSqFt,
      PricePerSqft,
      TotalPricePerBHK,
      Block,
      Direction,
      Toilet,
      NoofBalcony,
      Description,
      BuiltUpArea,
      CarpetArea,
      BhRmId,
      ActualSqFt,
      Images,
    } = req.body;

    /*
    =====================================================
    VALIDATE BHK
    =====================================================
    */

    if (!BHK) {
      return res.status(400).json({
        success: false,
        message: "BHK is required",
      });
    }

    if (!BHK_ENUM.includes(BHK)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid BHK. Allowed values: " +
          BHK_ENUM.join(", "),
      });
    }

    /*
    =====================================================
    PROPERTY
    =====================================================
    */

    const property =
      await FlatApartmentProperty.findById(
        propertyId
      );

    if (!property) {
      return res.status(404).json({
        success: false,
        message:
          "Flat/Apartment property not found",
      });
    }

    if (property.isDelete) {
      return res.status(400).json({
        success: false,
        message:
          "Cannot add floor plan to deleted property",
      });
    }

    /*
    =====================================================
    CREATE FLOOR PLAN
    =====================================================
    */

    const floorPlan = {
      BHK,

      AreaInSqFt: toNumber(
        AreaInSqFt
      ),

      PricePerSqft: toNumber(
        PricePerSqft
      ),

      TotalPricePerBHK: toNumber(
        TotalPricePerBHK
      ),

      Block:
        Block?.trim() || "",

      Direction:
        Direction?.trim() || "",

      Toilet: toNumber(Toilet),

      NoofBalcony:
        toNumber(NoofBalcony),

      Description:
        Description?.trim() || "",

      BuiltUpArea:
        toNumber(BuiltUpArea),

      CarpetArea:
        toNumber(CarpetArea),

      BhRmId:
        BhRmId?.trim() || null,

      ActualSqFt:
        toNumber(ActualSqFt),

      Images:
        normalizeImages(Images),

      IsActive: true,

      IsDelete: false,
    };

    /*
    IMPORTANT:

    Do NOT check whether another floor plan
    with the same BHK exists.

    This allows:

    1BHK -> unlimited
    2BHK -> unlimited
    3BHK -> unlimited
    etc.
    */

    property.FloorPlans.push(
      floorPlan
    );

    await property.save();

    const createdFloorPlan =
      property.FloorPlans[
        property.FloorPlans.length - 1
      ];

    return res.status(201).json({
      success: true,
      message:
        `${BHK} floor plan created successfully`,
      data: createdFloorPlan,
    });
  } catch (error) {
    console.error(
      "Create Floor Plan Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to create floor plan",
      error: error.message,
    });
  }
};

/*
=========================================================
GET ALL FLOOR PLANS

GET
/api/flat-apartment-properties/:propertyId/floor-plans

Optional:

?bhk=2BHK
?status=active
=========================================================
*/

export const getFloorPlans = async (
  req,
  res
) => {
  try {
    const { propertyId } =
      req.params;

    const {
      bhk = "all",
      status = "all",
    } = req.query;

    if (
      !validateIds(propertyId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid property ID",
      });
    }

    const property =
      await FlatApartmentProperty
        .findById(propertyId)
        .select("FloorPlans");

    if (!property) {
      return res.status(404).json({
        success: false,
        message:
          "Flat/Apartment property not found",
      });
    }

    let floorPlans =
      property.FloorPlans || [];

    /*
    =====================================================
    FILTER BHK
    =====================================================
    */

    if (
      bhk !== "all" &&
      BHK_ENUM.includes(bhk)
    ) {
      floorPlans =
        floorPlans.filter(
          (item) =>
            item.BHK === bhk
        );
    }

    /*
    =====================================================
    FILTER STATUS
    =====================================================
    */

    if (status === "active") {
      floorPlans =
        floorPlans.filter(
          (item) =>
            item.IsActive === true &&
            item.IsDelete !== true
        );
    }

    if (status === "inactive") {
      floorPlans =
        floorPlans.filter(
          (item) =>
            item.IsActive === false &&
            item.IsDelete !== true
        );
    }

    if (status === "deleted") {
      floorPlans =
        floorPlans.filter(
          (item) =>
            item.IsDelete === true
        );
    }

    /*
    =====================================================
    GROUP BY BHK

    Useful for your frontend:

    {
      "1BHK": [],
      "2BHK": [],
      "3BHK": []
    }
    =====================================================
    */

    const grouped = {};

    BHK_ENUM.forEach((item) => {
      grouped[item] = [];
    });

    floorPlans.forEach((item) => {
      if (!grouped[item.BHK]) {
        grouped[item.BHK] = [];
      }

      grouped[item.BHK].push(item);
    });

    return res.status(200).json({
      success: true,

      total:
        floorPlans.length,

      data: floorPlans,

      grouped,
    });
  } catch (error) {
    console.error(
      "Get Floor Plans Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch floor plans",
      error: error.message,
    });
  }
};

/*
=========================================================
GET SINGLE FLOOR PLAN

GET
/api/flat-apartment-properties/:propertyId/floor-plans/:floorPlanId
=========================================================
*/

export const getFloorPlanById =
  async (req, res) => {
    try {
      const {
        propertyId,
        floorPlanId,
      } = req.params;

      if (
        !validateIds(
          propertyId,
          floorPlanId
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid property ID or floor plan ID",
        });
      }

      const property =
        await FlatApartmentProperty
          .findById(propertyId)
          .select("FloorPlans");

      if (!property) {
        return res.status(404).json({
          success: false,
          message:
            "Flat/Apartment property not found",
        });
      }

      const floorPlan =
        property.FloorPlans.id(
          floorPlanId
        );

      if (!floorPlan) {
        return res.status(404).json({
          success: false,
          message:
            "Floor plan not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: floorPlan,
      });
    } catch (error) {
      console.error(
        "Get Floor Plan Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to fetch floor plan",
        error: error.message,
      });
    }
  };

/*
=========================================================
UPDATE FLOOR PLAN

PUT
/api/flat-apartment-properties/:propertyId/floor-plans/:floorPlanId
=========================================================
*/

export const updateFloorPlan =
  async (req, res) => {
    try {
      const {
        propertyId,
        floorPlanId,
      } = req.params;

      if (
        !validateIds(
          propertyId,
          floorPlanId
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid property ID or floor plan ID",
        });
      }

      const property =
        await FlatApartmentProperty.findById(
          propertyId
        );

      if (!property) {
        return res.status(404).json({
          success: false,
          message:
            "Flat/Apartment property not found",
        });
      }

      const floorPlan =
        property.FloorPlans.id(
          floorPlanId
        );

      if (!floorPlan) {
        return res.status(404).json({
          success: false,
          message:
            "Floor plan not found",
        });
      }

      /*
      ===================================================
      BHK
      ===================================================
      */

      if (req.body.BHK !== undefined) {
        if (
          !BHK_ENUM.includes(
            req.body.BHK
          )
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Invalid BHK. Allowed values: " +
              BHK_ENUM.join(", "),
          });
        }

        floorPlan.BHK =
          req.body.BHK;
      }

      /*
      ===================================================
      TEXT FIELDS
      ===================================================
      */

      if (
        req.body.Block !== undefined
      ) {
        floorPlan.Block =
          req.body.Block;
      }

      if (
        req.body.Direction !==
        undefined
      ) {
        floorPlan.Direction =
          req.body.Direction;
      }

      if (
        req.body.Description !==
        undefined
      ) {
        floorPlan.Description =
          req.body.Description;
      }

      if (
        req.body.BhRmId !==
        undefined
      ) {
        floorPlan.BhRmId =
          req.body.BhRmId || null;
      }

      /*
      ===================================================
      NUMBER FIELDS
      ===================================================
      */

      const numericFields = [
        "AreaInSqFt",
        "PricePerSqft",
        "TotalPricePerBHK",
        "Toilet",
        "NoofBalcony",
        "BuiltUpArea",
        "CarpetArea",
        "ActualSqFt",
      ];

      numericFields.forEach(
        (field) => {
          if (
            req.body[field] !==
            undefined
          ) {
            floorPlan[field] =
              toNumber(
                req.body[field]
              );
          }
        }
      );

      /*
      ===================================================
      IMAGES
      ===================================================
      */

      if (
        req.body.Images !==
        undefined
      ) {
        floorPlan.Images =
          normalizeImages(
            req.body.Images
          );
      }

      /*
      ===================================================
      STATUS
      ===================================================
      */

      if (
        req.body.IsActive !==
        undefined
      ) {
        floorPlan.IsActive =
          req.body.IsActive ===
          true ||
          req.body.IsActive ===
          "true";
      }

      await property.save();

      return res.status(200).json({
        success: true,
        message:
          "Floor plan updated successfully",
        data: floorPlan,
      });
    } catch (error) {
      console.error(
        "Update Floor Plan Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to update floor plan",
        error: error.message,
      });
    }
  };

/*
=========================================================
ACTIVE / INACTIVE

PATCH
/api/flat-apartment-properties/:propertyId/floor-plans/:floorPlanId/status
=========================================================
*/

export const toggleFloorPlanStatus =
  async (req, res) => {
    try {
      const {
        propertyId,
        floorPlanId,
      } = req.params;

      if (
        !validateIds(
          propertyId,
          floorPlanId
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid property ID or floor plan ID",
        });
      }

      const property =
        await FlatApartmentProperty.findById(
          propertyId
        );

      if (!property) {
        return res.status(404).json({
          success: false,
          message:
            "Flat/Apartment property not found",
        });
      }

      const floorPlan =
        property.FloorPlans.id(
          floorPlanId
        );

      if (!floorPlan) {
        return res.status(404).json({
          success: false,
          message:
            "Floor plan not found",
        });
      }

      floorPlan.IsActive =
        !floorPlan.IsActive;

      await property.save();

      return res.status(200).json({
        success: true,
        message:
          floorPlan.IsActive
            ? "Floor plan activated successfully"
            : "Floor plan deactivated successfully",

        data: {
          _id: floorPlan._id,
          BHK: floorPlan.BHK,
          IsActive:
            floorPlan.IsActive,
        },
      });
    } catch (error) {
      console.error(
        "Toggle Floor Plan Status Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to update floor plan status",
        error: error.message,
      });
    }
  };

/*
=========================================================
DELETE FLOOR PLAN

SOFT DELETE

DELETE
/api/flat-apartment-properties/:propertyId/floor-plans/:floorPlanId
=========================================================
*/

export const deleteFloorPlan =
  async (req, res) => {
    try {
      const {
        propertyId,
        floorPlanId,
      } = req.params;

      if (
        !validateIds(
          propertyId,
          floorPlanId
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid property ID or floor plan ID",
        });
      }

      const property =
        await FlatApartmentProperty.findById(
          propertyId
        );

      if (!property) {
        return res.status(404).json({
          success: false,
          message:
            "Flat/Apartment property not found",
        });
      }

      const floorPlan =
        property.FloorPlans.id(
          floorPlanId
        );

      if (!floorPlan) {
        return res.status(404).json({
          success: false,
          message:
            "Floor plan not found",
        });
      }

      /*
      Do soft delete instead of
      physically removing it.
      */

      floorPlan.IsDelete = true;
      floorPlan.IsActive = false;

      await property.save();

      return res.status(200).json({
        success: true,
        message:
          "Floor plan deleted successfully",
      });
    } catch (error) {
      console.error(
        "Delete Floor Plan Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to delete floor plan",
        error: error.message,
      });
    }
  };

/*
=========================================================
RESTORE FLOOR PLAN

PATCH
/api/flat-apartment-properties/:propertyId/floor-plans/:floorPlanId/restore
=========================================================
*/

export const restoreFloorPlan =
  async (req, res) => {
    try {
      const {
        propertyId,
        floorPlanId,
      } = req.params;

      if (
        !validateIds(
          propertyId,
          floorPlanId
        )
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid property ID or floor plan ID",
        });
      }

      const property =
        await FlatApartmentProperty.findById(
          propertyId
        );

      if (!property) {
        return res.status(404).json({
          success: false,
          message:
            "Flat/Apartment property not found",
        });
      }

      const floorPlan =
        property.FloorPlans.id(
          floorPlanId
        );

      if (!floorPlan) {
        return res.status(404).json({
          success: false,
          message:
            "Floor plan not found",
        });
      }

      floorPlan.IsDelete = false;
      floorPlan.IsActive = true;

      await property.save();

      return res.status(200).json({
        success: true,
        message:
          "Floor plan restored successfully",
        data: floorPlan,
      });
    } catch (error) {
      console.error(
        "Restore Floor Plan Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to restore floor plan",
        error: error.message,
      });
    }
  };