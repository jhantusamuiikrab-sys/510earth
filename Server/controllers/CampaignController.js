import Campaign from "../models/FbFormInfo.js";

// POST API: Create new Lead Setup / Campaign
export const createCampaign = async (req, res) => {
  try {
    const { addId, formId, campaignName, propertyName, propertyType } = req.body;

    // Validate incoming form fields
    if (!addId || !formId || !campaignName || !propertyName || !propertyType) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields.",
      });
    }

    // Check if campaign name already exists
    const existingCampaign = await Campaign.findOne({ name: campaignName });
    if (existingCampaign) {
      return res.status(409).json({
        success: false,
        message: "A campaign with this name already exists.",
      });
    }

    // Generate numeric numeric ID (or use Date.now())
    const nextId = Date.now();

    // Create and save new document matching your Mongoose Schema
    const newCampaign = await Campaign.create({
      Id: nextId,
      FrmId: formId,
      name: campaignName,
      setup_name: propertyName, // Mapping Property Name to setup_name
      PropertyType: propertyType,
      locale: "en",
      status: "Off",
      IsActive: true,
      setup_IsActive: true,
      IsDeleted: false,
    });

    return res.status(201).json({
      success: true,
      message: "Campaign created successfully!",
      data: newCampaign,
    });
  } catch (error) {
    console.error("Error registering campaign:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error. Failed to register campaign.",
      error: error.message,
    });
  }
};

// GET API: Fetch all active campaigns for the table
export const getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({ IsDeleted: false }).sort({ CreatedOn: -1 });

    const formattedData = campaigns.map((item) => ({
      id: item._id,
      addId: item.Id || 'N/A',
      locale: item.locale || 'en',
      campaignName: item.name,
      formId: item.FrmId,
      propertyName: item.setup_name,
      propertyType: item.PropertyType,
      setupOn: item.CreatedOn ? new Date(item.CreatedOn).toLocaleString() : '',
      status: item.status || 'Off',
    }));

    return res.status(200).json(formattedData);
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch campaigns",
      error: error.message,
    });
  }
};

export const getPropertyTypes = async (req, res) => {
  try {
    const types = await Campaign.distinct("PropertyType", { IsDeleted: false });
    
    // Filter out null/undefined/empty string values if any exist
    const validTypes = types.filter(Boolean);

    return res.status(200).json(validTypes);
  } catch (error) {
    console.error("Error fetching property types:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch property types",
      error: error.message,
    });
  }
};

// GET API: Fetch unique Property Names filtered by selected Property Type
export const getPropertyNamesByType = async (req, res) => {
  try {
    const { type } = req.query;

    if (!type) {
      return res.status(400).json({
        success: false,
        message: "Property type query parameter is required.",
      });
    }

    // Finds distinct setup_name (PropertyName) where PropertyType matches
    const names = await Campaign.distinct("setup_name", {
      PropertyType: type,
      IsDeleted: false,
    });

    const validNames = names.filter(Boolean);

    return res.status(200).json(validNames);
  } catch (error) {
    console.error("Error fetching property names:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch property names",
      error: error.message,
    });
  }
};