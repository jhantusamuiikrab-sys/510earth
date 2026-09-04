import mongoose from "mongoose";
import PropertyInfo from "../models/Propertyinfo.js";

const PROPERTY_FIELDS = [
  // =====================================================
  // LISTING
  // =====================================================

  "PropertyType",
  "SubPropertyType",

  "propertyName",
  "displaycity",
  "location",

  "listingImage",
  "listingImageAltText",
  "listingImageTitle",

  "projectStatus",

  "price",
  "buildupArea",
  "carpetArea",
  "plotArea",

  "isFeatured",
  "negotiable",

  "plotSize",
  "mainFeature",
  "possessionMonthYear",

  // Parking
  "isParkingExists",

  "openParking",
  "NoOfopenParking",
  "openParkingPrice",

  "covererParking",
  "NoOfcoverParking",
  "coveredParkingPrice",

  "mechanicalParking",
  "NoOfmechanicalParking",
  "mechanicalParkingPrice",

  "basementParking",
  "NoOfBasementParking",
  "BasementParkingPrice",

  "totalFloorsOfBuilding",

  "displayLocation",
  "newHtmlEditor",

  "priceByUnit",
  "agreementNumber",

  "zoneId",
  "zoneArea",

  "isBoxPrice",
  "isBoxPriceWithParking",

  // =====================================================
  // MAIN PAGE
  // =====================================================

  "LandPlotCoverImage",

  "coverPhoto",
  "coverPhotoAltText",
  "coverPhotoTitle",

  "caption",
  "overview",

  "FloorPlans",
  "PlotAreaDetails",
  "LandPlotFloorDetails",
  "LandPlotElevation",

  "Amenities",
  "NearbyPlaces",

  "gallery",

  "sitePlanImage",
  "sitePlanImageAltText",
  "sitePlanImageTitle",

  "sitePlanTotalFloors",
  "sitePlanTotalLandArea",
  "sitePlanDescription",

  "map",
  "mapImageAltText",
  "mapImageTitle",

  "eBrochure",

  "propertyAge",

  "WashRoomType",
  "washroom",

  "NoOfMeetingRoom",
  "NoOfCabin",

  "MinNoOfSeat",
  "MaxNoOfSeat",

  "PantryType",
  "ConferenceRoom",
  "ReceptionArea",

  "LoadingUnloadingFacility",

  "ownership",
  "description",

  "usp",

  "boundaryWall",

  "LPFloorsallowedforconstruction",
  "LPNoOfOpenSide",
  "LPconstructiondoneonproperty",

  "Authority",

  "totalNumberOfTowers",
  "totalOpenSpace",
  "totalProjectSize",

  "videoDescription",

  "socialMediaPhoto",
  "socialMediaImageAltText",
  "socialMediaImageTitle",

  // =====================================================
  // MAIN PAGE ADD ON
  // =====================================================

  "fullAddress",

  "GSTapplicable",
  "GSTCharges",
  "TaxGovtCharge",

  "plCharges",
  "feCharges",
  "otherCharges",

  "possessionDate",

  "developersName",
  "developersAddress",
  "developersPhoneNumber",
  "developersWebsite",
  "developersEmailId",

  "contactPersonName",
  "contactPersonPhone",
  "contactPersonAlternatePhone",
  "contactPersonEmailId",
  "contactPersonDesignation",

  "personShowProperty",

  "personSPPhoneNumber",
  "personSpAltPhoneNumber",
  "personSpEmailId",

  "rateNegotiationPersonName",
  "rateNegotiationPersonPhone",
  "rateNegotiationPersonAltPhone",
  "rateNegotiationPersonsEmail",

  // Communication flags
  "isDeveloperCommunicationPhone",
  "isDeveloperCommunicationEmail",

  "iscontactPersonCommunicationPhone",
  "iscontactPersonCommunicationEmail",

  "isPersonSPCommunicationPhone",
  "isPersonSPCommunicationEmail",

  "isRateCommunicationPhone",
  "isRateCommunicationEmail",

  "propertyWebsite",

  "paymentScheduleImage",
  "paymentScheduleImageUploadDate",

  "costSheetImage",
  "costSheetUploadDate",

  // =====================================================
  // MAP LOCATION
  // =====================================================

  "state",
  "city",
  "maplocation",
  "address",
  "street",
  "locality",
  "pincode",

  "latitude",
  "longitude",

  // =====================================================
  // SEO
  // =====================================================

  "title",
  "seodescription",
  "keywords",

  "googleTagManager",

  "urlMapping",

  "seoImage",
  "seoImageAltText",
  "seoImageTitle",

  // =====================================================
  // GLOBAL
  // =====================================================

  "PropertyStatus",
  "isActive",
];


/*
=========================================================
FIELDS THAT MUST NOT BE UPDATED DIRECTLY
=========================================================
*/

const PROTECTED_FIELDS = [
  "_id",
  "__v",
  "createdAt",
  "updatedAt",

  "createdBy",
  "updatedBy",

  "isDelete",

  // FloorPlans should ideally have dedicated APIs.
  "FloorPlans",
];


/*
=========================================================
HELPER
GET USER ID
=========================================================
*/

const getUserId = (req) => {
  return req.user?._id || req.user?.id || null;
};


/*
=========================================================
HELPER
PICK ONLY ALLOWED FIELDS
=========================================================
*/

const pickAllowedFields = (data = {}) => {
  const result = {};

  PROPERTY_FIELDS.forEach((field) => {
    if (data[field] !== undefined) {
      result[field] = data[field];
    }
  });

  return result;
};


/*
=========================================================
HELPER
TRIM STRING FIELDS
=========================================================
*/

const trimStringFields = (data) => {
  const stringFields = [
    "PropertyType",
    "SubPropertyType",

    "propertyName",
    "displaycity",
    "location",

    "listingImage",
    "listingImageAltText",
    "listingImageTitle",

    "projectStatus",

    "plotSize",
    "mainFeature",
    "possessionMonthYear",

    "displayLocation",
    "newHtmlEditor",

    "agreementNumber",
    "zoneArea",

    "coverPhoto",
    "coverPhotoAltText",
    "coverPhotoTitle",

    "caption",
    "overview",

    "sitePlanImage",
    "sitePlanImageAltText",
    "sitePlanImageTitle",

    "sitePlanTotalFloors",
    "sitePlanTotalLandArea",
    "sitePlanDescription",

    "map",
    "mapImageAltText",
    "mapImageTitle",

    "eBrochure",

    "propertyAge",
    "WashRoomType",

    "PantryType",
    "ConferenceRoom",
    "ReceptionArea",

    "ownership",
    "description",

    "Authority",

    "fullAddress",
    "TaxGovtCharge",

    "developersName",
    "developersAddress",
    "developersPhoneNumber",
    "developersWebsite",
    "developersEmailId",

    "contactPersonName",
    "contactPersonPhone",
    "contactPersonAlternatePhone",
    "contactPersonEmailId",
    "contactPersonDesignation",

    "personSPPhoneNumber",
    "personSpAltPhoneNumber",
    "personSpEmailId",

    "rateNegotiationPersonName",
    "rateNegotiationPersonPhone",
    "rateNegotiationPersonAltPhone",
    "rateNegotiationPersonsEmail",

    "propertyWebsite",

    "paymentScheduleImage",
    "costSheetImage",

    "state",
    "city",
    "maplocation",
    "address",
    "street",
    "locality",
    "pincode",

    "title",
    "seodescription",
    "keywords",
    "googleTagManager",

    "urlMapping",

    "seoImage",
    "seoImageAltText",
    "seoImageTitle",

    "socialMediaPhoto",
    "socialMediaImageAltText",
    "socialMediaImageTitle",
  ];

  stringFields.forEach((field) => {
    if (
      data[field] !== undefined &&
      typeof data[field] === "string"
    ) {
      data[field] = data[field].trim();
    }
  });

  return data;
};


/*
=========================================================
CREATE PROPERTY
POST /api/properties
=========================================================
*/

export const createProperty = async (req, res) => {
  try {
    let data = req.body || {};

    /*
    -----------------------------------------------------
    Validate body
    -----------------------------------------------------
    */
   
    if (!data || typeof data !== "object" || Array.isArray(data)) {
      return res.status(400).json({
        success: false,
        message: "Invalid property data",
      });
    }

    /*
    -----------------------------------------------------
    Trim strings
    -----------------------------------------------------
    */

    data = trimStringFields({
      ...data,
    });

    /*
    -----------------------------------------------------
    Property name validation
    -----------------------------------------------------
    */    
    if (!data.propertyName || typeof data.propertyName !== "string" || !data.propertyName.trim()) {
      return res.status(400).json({
        success: false,
        message: "Property name is required",
      });
    }

    /*
    -----------------------------------------------------
    URL mapping validation
    -----------------------------------------------------
    */

    if (
      data.urlMapping !== undefined &&
      data.urlMapping !== null &&
      data.urlMapping !== ""
    ) {
      const existingProperty =
        await PropertyInfo.findOne({
          urlMapping: data.urlMapping,
          isDelete: false,
        }).lean();

      if (existingProperty) {
        return res.status(409).json({
          success: false,
          message: "URL mapping already exists",
        });
      }
    }

    /*
    -----------------------------------------------------
    Pick only allowed fields
    -----------------------------------------------------
    */

    const propertyData =
      pickAllowedFields(data);

    /*
    -----------------------------------------------------
    FloorPlans

    FloorPlans are intentionally NOT handled by this API.

    They should be created/updated using dedicated
    FloorPlan APIs.
    -----------------------------------------------------
    */

    delete propertyData.FloorPlans;

    /*
    -----------------------------------------------------
    Server controlled fields
    -----------------------------------------------------
    */

    propertyData.isDelete = false;

    propertyData.isActive =
      data.isActive !== undefined
        ? Boolean(data.isActive)
        : true;

    const userId = getUserId(req);

    propertyData.createdBy = userId;
    propertyData.updatedBy = userId;

    /*
    -----------------------------------------------------
    Create
    -----------------------------------------------------
    */

    const property =
      new PropertyInfo(propertyData);

    await property.save();

    /*
    -----------------------------------------------------
    Response
    -----------------------------------------------------
    */

    return res.status(201).json({
      success: true,
      message: "Property created successfully",
      data: property,
    });

  } catch (error) {
    console.error(
      "CREATE PROPERTY ERROR:",
      error
    );

    /*
    -----------------------------------------------------
    Mongoose validation error
    -----------------------------------------------------
    */

    if (error.name === "ValidationError") {
      const validationErrors = {};

      Object.keys(error.errors).forEach(
        (field) => {
          validationErrors[field] =
            error.errors[field].message;
        }
      );

      return res.status(400).json({
        success: false,
        message: "Property validation failed",
        errors: validationErrors,
      });
    }

    /*
    -----------------------------------------------------
    Duplicate key
    -----------------------------------------------------
    */

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Duplicate property data",
        error: error.keyValue || null,
      });
    }

    /*
    -----------------------------------------------------
    General error
    -----------------------------------------------------
    */

    return res.status(500).json({
      success: false,
      message: "Failed to create property",
      error: error.message,
    });
  }
};


/*
=========================================================
GET ALL PROPERTIES
GET /api/properties
=========================================================
*/

export const getAllProperties = async (
  req,
  res
) => {
  try {
    const {
      search = "",

      PropertyType,
      SubPropertyType,

      state,
      city,

      projectStatus,

      isFeatured,
      isActive,

      page = 1,
      limit = 20,
    } = req.query;

    /*
    -----------------------------------------------------
    Pagination
    -----------------------------------------------------
    */

    const pageNumber = Math.max(
      parseInt(page, 10) || 1,
      1
    );

    const limitNumber = Math.min(
      Math.max(
        parseInt(limit, 10) || 20,
        1
      ),
      100
    );

    /*
    -----------------------------------------------------
    Base query
    -----------------------------------------------------
    */

    const query = {
      isDelete: false,
    };

    /*
    -----------------------------------------------------
    Search
    -----------------------------------------------------
    */

    if (
      typeof search === "string" &&
      search.trim()
    ) {
      const searchRegex = {
        $regex: search.trim(),
        $options: "i",
      };

      query.$or = [
        {
          propertyName: searchRegex,
        },
        {
          PropertyType: searchRegex,
        },
        {
          SubPropertyType: searchRegex,
        },
        {
          location: searchRegex,
        },
        {
          displaycity: searchRegex,
        },
        {
          city: searchRegex,
        },
        {
          maplocation: searchRegex,
        },
        {
          developersName: searchRegex,
        },
        {
          urlMapping: searchRegex,
        },
        {
          agreementNumber: searchRegex,
        },
      ];
    }

    /*
    -----------------------------------------------------
    Filters
    -----------------------------------------------------
    */

    if (PropertyType) {
      query.PropertyType = PropertyType;
    }

    if (SubPropertyType) {
      query.SubPropertyType =
        SubPropertyType;
    }

    if (state) {
      query.state = state;
    }

    if (city) {
      query.city = city;
    }

    if (projectStatus) {
      query.projectStatus =
        projectStatus;
    }

    /*
    -----------------------------------------------------
    Featured
    -----------------------------------------------------
    */

    if (isFeatured !== undefined) {
      query.isFeatured =
        String(isFeatured) === "true";
    }

    /*
    -----------------------------------------------------
    Active
    -----------------------------------------------------
    */

    if (isActive !== undefined) {
      query.isActive =
        String(isActive) === "true";
    }

    /*
    -----------------------------------------------------
    Skip
    -----------------------------------------------------
    */

    const skip =
      (pageNumber - 1) *
      limitNumber;

    /*
    -----------------------------------------------------
    Query
    -----------------------------------------------------
    */

    const [
      properties,
      total,
    ] = await Promise.all([
      PropertyInfo.find(query)
        .sort({
          createdAt: -1,
        })
        .skip(skip)
        .limit(limitNumber)

        .populate(
          "createdBy",
          "name username"
        )

        .populate(
          "updatedBy",
          "name username"
        )

        .populate(
          "Amenities"
        )

        .populate(
          "NearbyPlaces.nearbyId"
        )

        .lean(),

      PropertyInfo.countDocuments(query),
    ]);

    /*
    -----------------------------------------------------
    Response
    -----------------------------------------------------
    */

    return res.status(200).json({
      success: true,

      data: properties,
      pagination: {
        total,

        page: pageNumber,

        limit: limitNumber,

        totalPages:
          Math.ceil(
            total / limitNumber
          ),

        hasNextPage:
          pageNumber <
          Math.ceil(
            total / limitNumber
          ),

        hasPrevPage:
          pageNumber > 1,
      },
    });

  } catch (error) {
    console.error(
      "GET ALL PROPERTIES ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch properties",
      error: error.message,
    });
  }
};


/*
=========================================================
GET PROPERTY BY ID
GET /api/properties/:propertyId
=========================================================
*/

export const getPropertyById = async (
  req,
  res
) => {
  try {
    const { propertyId } =
      req.params;

    /*
    -----------------------------------------------------
    Validate ObjectId
    -----------------------------------------------------
    */

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

    /*
    -----------------------------------------------------
    Find property
    -----------------------------------------------------
    */

    const property =
      await PropertyInfo.findOne({
        _id: propertyId,
        isDelete: false,
      })

        .populate(
          "createdBy",
          "name username"
        )

        .populate(
          "updatedBy",
          "name username"
        )

        .populate(
          "Amenities"
        )

        .populate(
          "NearbyPlaces.nearbyId"
        );

    /*
    -----------------------------------------------------
    Not found
    -----------------------------------------------------
    */

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    /*
    -----------------------------------------------------
    Response
    -----------------------------------------------------
    */

    return res.status(200).json({
      success: true,
      data: property,
    });

  } catch (error) {
    console.error(
      "GET PROPERTY BY ID ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch property",
      error: error.message,
    });
  }
};


/*
=========================================================
UPDATE PROPERTY
PUT /api/properties/:propertyId
=========================================================
*/

export const updateProperty = async (
  req,
  res
) => {
  try {
    const { propertyId } =
      req.params;

    /*
    -----------------------------------------------------
    Validate ID
    -----------------------------------------------------
    */

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

    /*
    -----------------------------------------------------
    Find property
    -----------------------------------------------------
    */

    const property =
      await PropertyInfo.findOne({
        _id: propertyId,
        isDelete: false,
      });

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    /*
    -----------------------------------------------------
    Prepare request data
    -----------------------------------------------------
    */

    let data = req.body || {};

    if (
      !data ||
      typeof data !== "object" ||
      Array.isArray(data)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid property data",
      });
    }

    data = trimStringFields({
      ...data,
    });

    /*
    -----------------------------------------------------
    Property name validation
    -----------------------------------------------------
    */

    if (
      data.propertyName !== undefined &&
      (
        typeof data.propertyName !==
          "string" ||
        !data.propertyName.trim()
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Property name cannot be empty",
      });
    }

    /*
    -----------------------------------------------------
    URL mapping uniqueness
    -----------------------------------------------------
    */

    if (
      data.urlMapping !== undefined
    ) {
      const newUrlMapping =
        data.urlMapping;

      if (
        newUrlMapping &&
        newUrlMapping !==
          property.urlMapping
      ) {
        const existing =
          await PropertyInfo.findOne({
            urlMapping:
              newUrlMapping,

            isDelete: false,

            _id: {
              $ne: propertyId,
            },
          }).lean();

        if (existing) {
          return res.status(409).json({
            success: false,
            message:
              "URL mapping already exists",
          });
        }
      }
    }

    /*
    -----------------------------------------------------
    Pick only schema fields
    -----------------------------------------------------
    */

    const updateData =
      pickAllowedFields(data);

    /*
    -----------------------------------------------------
    Never update protected fields
    -----------------------------------------------------
    */

    PROTECTED_FIELDS.forEach(
      (field) => {
        delete updateData[field];
      }
    );

    /*
    -----------------------------------------------------
    Don't allow isDelete through update API
    -----------------------------------------------------
    */

    delete updateData.isDelete;

    /*
    -----------------------------------------------------
    Update fields
    -----------------------------------------------------
    */

    Object.keys(updateData).forEach(
      (field) => {
        property[field] =
          updateData[field];
      }
    );

    /*
    -----------------------------------------------------
    Server controlled
    -----------------------------------------------------
    */

    property.updatedBy =
      getUserId(req);

    /*
    -----------------------------------------------------
    Save
    -----------------------------------------------------
    */

    await property.save();

    /*
    -----------------------------------------------------
    Response
    -----------------------------------------------------
    */

    return res.status(200).json({
      success: true,
      message:
        "Property updated successfully",
      data: property,
    });

  } catch (error) {
    console.error(
      "UPDATE PROPERTY ERROR:",
      error
    );

    /*
    -----------------------------------------------------
    Validation error
    -----------------------------------------------------
    */

    if (
      error.name ===
      "ValidationError"
    ) {
      const validationErrors = {};

      Object.keys(error.errors).forEach(
        (field) => {
          validationErrors[field] =
            error.errors[field].message;
        }
      );

      return res.status(400).json({
        success: false,
        message:
          "Property validation failed",
        errors:
          validationErrors,
      });
    }

    /*
    -----------------------------------------------------
    Duplicate
    -----------------------------------------------------
    */

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "Duplicate property data",
        error:
          error.keyValue || null,
      });
    }

    /*
    -----------------------------------------------------
    General
    -----------------------------------------------------
    */

    return res.status(500).json({
      success: false,
      message:
        "Failed to update property",
      error: error.message,
    });
  }
};


/*
=========================================================
ACTIVATE / DEACTIVATE PROPERTY
PATCH /api/properties/:propertyId/status
=========================================================
*/

export const togglePropertyStatus = async (
  req,
  res
) => {
  try {
    const { propertyId } =
      req.params;

    /*
    -----------------------------------------------------
    Validate ID
    -----------------------------------------------------
    */

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

    /*
    -----------------------------------------------------
    Find property
    -----------------------------------------------------
    */

    const property =
      await PropertyInfo.findById(
        propertyId
      );

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    /*
    -----------------------------------------------------
    Deleted property
    -----------------------------------------------------
    */

    if (property.isDelete) {
      return res.status(400).json({
        success: false,
        message:
          "Deleted property cannot be activated",
      });
    }

    /*
    -----------------------------------------------------
    Toggle
    -----------------------------------------------------
    */

    property.isActive =
      !property.isActive;

    property.updatedBy =
      getUserId(req);

    await property.save();

    /*
    -----------------------------------------------------
    Response
    -----------------------------------------------------
    */

    return res.status(200).json({
      success: true,

      message:
        property.isActive
          ? "Property activated successfully"
          : "Property deactivated successfully",

      data: {
        _id: property._id,

        isActive:
          property.isActive,

        isDelete:
          property.isDelete,
      },
    });

  } catch (error) {
    console.error(
      "TOGGLE PROPERTY STATUS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to update property status",
      error: error.message,
    });
  }
};


/*
=========================================================
FEATURED / UNFEATURED PROPERTY
PATCH /api/properties/:propertyId/featured
=========================================================
*/

export const togglePropertyFeatured = async (
  req,
  res
) => {
  try {
    const { propertyId } =
      req.params;

    /*
    -----------------------------------------------------
    Validate ID
    -----------------------------------------------------
    */

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

    /*
    -----------------------------------------------------
    Find property
    -----------------------------------------------------
    */

    const property =
      await PropertyInfo.findOne({
        _id: propertyId,
        isDelete: false,
      });

    if (!property) {
      return res.status(404).json({
        success: false,
        message:
          "Property not found",
      });
    }

    /*
    -----------------------------------------------------
    Toggle featured
    -----------------------------------------------------
    */

    property.isFeatured =
      !property.isFeatured;

    property.updatedBy =
      getUserId(req);

    await property.save();

    /*
    -----------------------------------------------------
    Response
    -----------------------------------------------------
    */

    return res.status(200).json({
      success: true,

      message:
        property.isFeatured
          ? "Property marked as featured"
          : "Property removed from featured",

      data: {
        _id: property._id,

        isFeatured:
          property.isFeatured,
      },
    });

  } catch (error) {
    console.error(
      "TOGGLE FEATURED ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to update featured status",
      error: error.message,
    });
  }
};


/*
=========================================================
SOFT DELETE PROPERTY
DELETE /api/properties/:propertyId
=========================================================
*/

export const deleteProperty = async (
  req,
  res
) => {
  try {
    const { propertyId } =
      req.params;

    /*
    -----------------------------------------------------
    Validate ID
    -----------------------------------------------------
    */

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

    /*
    -----------------------------------------------------
    Find property
    -----------------------------------------------------
    */

    const property =
      await PropertyInfo.findById(
        propertyId
      );

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    /*
    -----------------------------------------------------
    Already deleted
    -----------------------------------------------------
    */

    if (property.isDelete) {
      return res.status(400).json({
        success: false,
        message:
          "Property is already deleted",
      });
    }

    /*
    -----------------------------------------------------
    Soft delete
    -----------------------------------------------------
    */

    property.isDelete = true;
    property.isActive = false;

    property.updatedBy =
      getUserId(req);

    await property.save();

    /*
    -----------------------------------------------------
    Response
    -----------------------------------------------------
    */

    return res.status(200).json({
      success: true,
      message:
        "Property deleted successfully",

      data: {
        _id: property._id,

        isActive:
          property.isActive,

        isDelete:
          property.isDelete,
      },
    });

  } catch (error) {
    console.error(
      "DELETE PROPERTY ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to delete property",
      error: error.message,
    });
  }
};


/*
=========================================================
RESTORE DELETED PROPERTY
PATCH /api/properties/:propertyId/restore
=========================================================
*/

export const restoreProperty = async (
  req,
  res
) => {
  try {
    const { propertyId } =
      req.params;

    /*
    -----------------------------------------------------
    Validate ID
    -----------------------------------------------------
    */

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

    /*
    -----------------------------------------------------
    Find property
    -----------------------------------------------------
    */

    const property =
      await PropertyInfo.findById(
        propertyId
      );

    if (!property) {
      return res.status(404).json({
        success: false,
        message:
          "Property not found",
      });
    }

    /*
    -----------------------------------------------------
    Check status
    -----------------------------------------------------
    */

    if (!property.isDelete) {
      return res.status(400).json({
        success: false,
        message:
          "Property is already active",
      });
    }

    /*
    -----------------------------------------------------
    Restore
    -----------------------------------------------------
    */

    property.isDelete = false;
    property.isActive = true;

    property.updatedBy =
      getUserId(req);

    await property.save();

    /*
    -----------------------------------------------------
    Response
    -----------------------------------------------------
    */

    return res.status(200).json({
      success: true,

      message:
        "Property restored successfully",

      data: {
        _id: property._id,

        isActive:
          property.isActive,

        isDelete:
          property.isDelete,
      },
    });

  } catch (error) {
    console.error(
      "RESTORE PROPERTY ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to restore property",
      error: error.message,
    });
  }
};
