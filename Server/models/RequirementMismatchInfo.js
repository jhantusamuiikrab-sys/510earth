const mongoose = require('mongoose');
const { Schema } = mongoose;

const RequirementMismatchInfoSchema = new Schema(
  {
    rmId: { type: Number, required: true, unique: true }, // Map to SQL Identity
    leadId: { type: Number, default: null },
    leadDate: { type: String, default: null },
    
    // Agent Info
    agentId: { type: String, default: null },
    agentName: { type: String, default: null },
    
    // Customer Info
    customerName: { type: String, default: null },
    emailId: { type: String, default: null },
    phoneNumber: { type: String, default: null },
    phoneNumberIsOnSocialMedia: { type: String, default: null },
    alternatePhoneNumber: { type: String, default: null },
    alternatePhoneNumberIsOnSocialMedia: { type: String, default: null },
    custDOB: { type: String, default: null },
    custAnniversaryDate: { type: String, default: null },

    // Location Info
    countryId: { type: String, default: null },
    countryName: { type: String, default: null },
    stateId: { type: String, default: null },
    stateName: { type: String, default: null },
    customerCityId: { type: String, default: null },
    customerCityName: { type: String, default: null },
    preferredLocation: { type: String, default: null },
    preferredLocationPurpose: { type: String, default: null },

    // Property Requirements
    propertyTypeId: { type: String, default: null },
    propertyType: { type: String, default: null },
    subPropertyTypeId: { type: String, default: null },
    subPropertyType: { type: String, default: null },
    preferredBHK: { type: String, default: null },
    preferredFloor: { type: String, default: null },
    sqFtFrom: { type: String, default: null },
    sqFtTo: { type: String, default: null },
    budgetFrom: { type: String, default: null },
    budgetTo: { type: String, default: null },
    constructionStatus: { type: String, default: null },
    isUC: { type: Boolean, default: null },
    ucPossessionDate: { type: String, default: null },
    buildingType: { type: String, default: null },
    
    // Vastu & Amenities
    isVastuPrefrence: { type: Boolean, default: null },
    vastuPrefrence: { type: String, default: null },
    amenities: { type: String, default: null },
    generalAmenities: { type: String, default: null },
    
    // Parking Details
    coveredParking: { type: String, default: null },
    openParking: { type: String, default: null },
    mechanicalParking: { type: String, default: null },
    parkingNotRequired: { type: String, default: null },

    // Property Activity
    propertyOffered: { type: String, default: null },
    propertyVisited: { type: String, default: null },
    propertyInterested: { type: String, default: null },
    propertyOfferedVisited: { type: String, default: null },
    pvDoneOwnself: { type: String, default: null },

    // Financial & Brokerage
    isBrokerage: { type: String, default: null },
    brokeragePercentage: { type: String, default: null },
    
    // Commercial / Specific Requirements
    businessType: { type: String, default: null },
    floorType: { type: String, default: null },
    cellingHeight: { type: String, default: null },
    entranceWidth: { type: String, default: null },
    noOfSeats: { type: String, default: null },
    loadUnload: { type: String, default: null },
    specialRequirement: { type: String, default: null },

    // Land Details
    landArea: { type: String, default: null },
    landAreaUnitId: { type: Number, default: null },
    landAreaUnitName: { type: String, default: null },
    rLandAuthId: { type: Number, default: null },
    rLandAuthName: { type: String, default: null },
    rLandOwnId: { type: Number, default: null },
    rLandOwnName: { type: String, default: null },

    // Purpose
    rPurposeToBuyId: { type: String, default: null },
    rPurposeToBuyName: { type: String, default: null },

    // System / Workflow
    preparedBy: { type: String, default: null },
    huntedBy: { type: String, default: null },
    isActive: { type: Boolean, default: null },
    status: { type: Number, default: null },
    rmStatusId: { type: Number, default: null },
    rmStatusName: { type: String, default: null },
    rmNotifyFlag: { type: Number, default: null },
    reqAssignDate: { type: Date, default: null },

    // Audit Info
    createdBy: { type: String, default: null },
    updatedBy: { type: String, default: null }
  },
  {
    timestamps: { createdAt: 'createdOn', updatedAt: 'updatedOn' } // Automatically manages CreatedOn & UpdatedOn
  }
);

module.exports = mongoose.model('RequirementMismatchInfo', RequirementMismatchInfoSchema);