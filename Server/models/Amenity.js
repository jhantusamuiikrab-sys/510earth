import mongoose from "mongoose";
import { CATEGORY_ENUM } from "./Nearby.js";

const AmenitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    image: {
      type: String,
      default: null,
      trim: true,
    },

    catagory: {
      type: String,
      enum: CATEGORY_ENUM,
      default: null,
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },

    isDelete: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
    collection: "Amenities",
  }
);

// Prevent duplicate active/non-deleted amenities
// with the same name within the same category.
AmenitySchema.index(
  { name: 1, catagory: 1 },
  {
    unique: true,
    partialFilterExpression: {
      isDelete: false,
    },
  }
);

// Category filtering index
AmenitySchema.index({
  catagory: 1,
  isActive: 1,
  isDelete: 1,
});

export default mongoose.model(
  "Amenity",
  AmenitySchema
);