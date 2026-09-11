import mongoose from "mongoose";

const FbFormInfoSchema = new mongoose.Schema(
  {
    FrmId: {
      type: String, // Or mongoose.Schema.Types.ObjectId if referencing another model
      required: true,
      index: true
    },
    Id: {
      type: Number, // Or String depending on your original data type
      required: true
    },
    locale: {
      type: String,
      default: 'en'
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    setup_name: {
      type: String,
      trim: true
    },
    PropertyType: {
      type: String
    },
    status: {
      type: String,
      default: 'active'
    },
    IsActive: {
      type: Boolean,
      default: true
    },
    setup_IsActive: {
      type: Boolean,
      default: true
    },
    IsDeleted: {
      type: Boolean,
      default: false
    }
  },
  {
    // Automatically creates and updates `createdAt` and `updatedAt` (maps to CreatedOn / UpdatedOn)
    timestamps: { createdAt: 'CreatedOn', updatedAt: 'UpdatedOn' },
    collection: 'FbFormInfo'
  }
);

const FbFormInfo = mongoose.model("FbFormInfo", FbFormInfoSchema);
export default FbFormInfo;