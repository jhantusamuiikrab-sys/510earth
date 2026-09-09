import mongoose from 'mongoose';

const partnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    contactNo: {
      type: String,
      required: true,
      trim: true
    },
    alternateNo: {
      type: String,
      trim: true
    },
    address: {
      type: String,
      trim: true
    },
    // Store direct string names instead of ObjectIds
    stateName: {
      type: String,
      required: true,
      trim: true
    },
    cityName: {
      type: String,
      required: true,
      trim: true
    },
    businessType: {
      type: String,
      trim: true
    },
    size: {
      type: String
    },
    userId: {
      type: String,
      unique: true,
      sparse: true
    },
    password: {
      type: String,
      required: true
    },
    panNumber: {
      type: String,
      uppercase: true,
      trim: true
    },
    adharNumber: {
      type: String,
      trim: true
    },
    partnerImage: {
      type: String
    },
    userType: {
      type: String,
      default: 'Partner'
    },
    isActive: {
      type: Boolean,
      default: true
    },
    isDelete: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: { createdAt: 'dateAdded', updatedAt: 'dateModified' }
  }
);

export default mongoose.model('Partner', partnerSchema);