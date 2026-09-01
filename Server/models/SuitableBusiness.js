import mongoose from "mongoose";

const SuitableBusinessSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: [true, "Business name is required"],
      trim: true,
      maxlength: 200,
    },

    Image: {
      type: String,
      default: null,
    },

    IsActive: {
      type: Boolean,
      default: true,
    },

    IsDelete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: "SuitableBusinesses",
  }
);

// Search index
SuitableBusinessSchema.index({
  Name: "text",
});

// Prevent duplicate active business names
SuitableBusinessSchema.index(
  { Name: 1 },
  {
    unique: true,
    partialFilterExpression: {
      IsDelete: false,
    },
  }
);

export default mongoose.model(
  "SuitableBusiness",
  SuitableBusinessSchema
);