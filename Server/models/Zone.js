import mongoose from "mongoose";
import { CATEGORY_ENUM } from "./Nearby.js";

const ZoneSchema = new mongoose.Schema(
  {
    ZoneName: {
      type: String,
      trim: true,
      default: null,
    },

    ZoneArea: {
      type: String,
      trim: true,
      default: null,
    },

    catagory: {
          type: String,
          enum: CATEGORY_ENUM,
          default: null,
          trim: true,
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
    collection: "zones",
  }
);

// Prevent duplicate active zone names
ZoneSchema.index(
  { ZoneName: 1 },
  {
    unique: true,
    partialFilterExpression: {
      IsDelete: false,
    },
  }
);

const Zone = mongoose.model("Zone", ZoneSchema);

export default Zone;