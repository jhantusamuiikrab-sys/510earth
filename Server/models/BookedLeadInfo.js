const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookedLeadInfoSchema = new Schema(
  {
    bkLdId: { type: Number, required: true, unique: true }, // Maps to BkLdId IDENTITY
    leadId: { type: Number, default: null },
    leadDate: { type: String, default: null },

    // Project & Builder Details
    nameOfTheProject: { type: String, default: null },
    nameOfTheProjectId: { type: String, default: null },
    nameOfTheBuilderPromoter: { type: String, default: null },

    // Primary Applicant Info
    nameOfTheFirstApplicant: { type: String, default: null },
    mobileNo: { type: String, default: null },
    alternateMobileNo: { type: String, default: null },
    emailId: { type: String, default: null },
    dateOfBirth: { type: String, default: null },
    communicationAddress: { type: String, default: null },
    locality: { type: String, default: null },
    profession: { type: String, default: null },
    companyName: { type: String, default: null },
    designation: { type: String, default: null },
    companyAddress: { type: String, default: null },

    // Joint Applicant Info
    nameOfJointApplicant: { type: String, default: null },
    jointApplicantMobileNo: { type: String, default: null },
    jointApplicantAlternateMobileNo: { type: String, default: null },
    jointApplicantEmailId: { type: String, default: null },
    jointApplicantDateOfBirth: { type: String, default: null },
    jointApplicantCommunicationAddress: { type: String, default: null },
    jointApplicantLocality: { type: String, default: null },
    jointApplicantProfession: { type: String, default: null },

    // Property Unit Details
    blockOrTower: { type: String, default: null },
    flatNumber: { type: String, default: null },
    floorNumber: { type: String, default: null },
    flooor: { type: String, default: null },
    propertyNumber: { type: String, default: null },
    plotNumbers: { type: String, default: null },
    squareFt: { type: String, default: null },
    totalLandArea: { type: String, default: null },
    totalLandAreaUnitId: { type: Number, default: null },
    totalLandAreaUnit: { type: String, default: null },

    // Financials & Pricing
    flatCost: { type: String, default: null },
    carParking: { type: String, default: null },
    totalConsideration: { type: String, default: null },
    unitPrice: { type: String, default: null },
    propertyPrice: { type: String, default: null },
    advanceAmount: { type: String, default: null },
    bankLoan: { type: String, default: null },
    preferredBank: { type: String, default: null },

    // Feedback & Source
    reference: { type: String, default: null },
    yourExperienceWith510Earth: { type: String, default: null },
    howDoYouKnowUs: { type: String, default: null },
    leadSourceId: { type: Number, default: null },
    leadSource: { type: String, default: null },

    // Booking Dates & Workflow
    bookingDate: { type: String, default: null },
    probableDateForAgreement: { type: String, default: null },
    probableDateOfRegistry: { type: String, default: null },
    isBookingApproved: { type: Boolean, default: null },
    bookingApprovalDate: { type: Date, default: null },

    // Admin Flags
    isBookingDoneByAdmin: { type: Boolean, default: null },
    bookingDoneByAdminId: { type: String, default: null },
    bookingDoneByAdminName: { type: String, default: null },

    // Documents & Attachments
    bookingImageFile: { type: String, default: null },
    bookingImageFileWithPath: { type: String, default: null },
    bookingFormFile: { type: String, default: null },
    bookingFormFileWithPath: { type: String, default: null },
    saleConfirmationDocFile: { type: String, default: null },
    saleConfirmationDocFileWithPath: { type: String, default: null },

    // System Flags
    isActive: { type: Boolean, default: null },
    status: { type: Number, default: null },

    // Audit Fields
    createdBy: { type: String, default: null },
    updatedBy: { type: String, default: null }
  },
  {
    timestamps: { createdAt: 'createdOn', updatedAt: 'updatedOn' }
  }
);

module.exports = mongoose.model('BookedLeadInfo', BookedLeadInfoSchema);