import mongoose from "mongoose";

// ==========================================
// CATEGORY ENUM
// ==========================================

const CATEGORY_ENUM = [
  "Flat Apartment",
  "Independent House Villa",
  "Commercial",
  "Land",
];

// ==========================================
// NEARBY SCHEMA
// ==========================================

const NearbySchema = new mongoose.Schema(
  {
    // ==========================================
    // NAME
    // ==========================================

    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 150,
    },

    // ==========================================
    // IMAGE
    // ==========================================

    image: {
      type: String,
      default: null,
      trim: true,
    },

    // ==========================================
    // CATEGORY
    // ==========================================

    catagory: {
      type: String,
      required: true,
      enum: CATEGORY_ENUM,
      trim: true,
    },

    // ==========================================
    // ACTIVE STATUS
    // ==========================================

    isActive: {
      type: Boolean,
      default: true,
    },

    // ==========================================
    // SOFT DELETE
    // ==========================================

    isDelete: {
      type: Boolean,
      default: false,
    },

    // ==========================================
    // FONT AWESOME ICON
    // ==========================================

    faIconClass: {
      type: String,
      default: "fa-solid fa-location-dot",
      trim: true,
    },
  },
  {
    collection: "Nearbys",
    timestamps: true,
  }
);

// ==========================================
// INDEXES
// ==========================================

// ------------------------------------------
// UNIQUE NAME + CATEGORY
// ------------------------------------------
//
// Same name is allowed in different categories.
//
// Example:
//
// Hospital + Flat Apartment      ✅
// Hospital + Commercial          ✅
// Hospital + Land                ✅
//
// But:
//
// Hospital + Flat Apartment      ❌
// Hospital + Flat Apartment      ❌
//
// Deleted records do not participate
// in the uniqueness check.
//
NearbySchema.index(
  {
    name: 1,
    catagory: 1,
  },
  {
    unique: true,
    partialFilterExpression: {
      isDelete: false,
    },
  }
);

// ------------------------------------------
// Search / sort by name
// ------------------------------------------

NearbySchema.index({
  name: 1,
});

// ------------------------------------------
// General active + non-deleted filtering
// ------------------------------------------

NearbySchema.index({
  isActive: 1,
  isDelete: 1,
});

// ------------------------------------------
// Main category filtering
// ------------------------------------------

NearbySchema.index({
  catagory: 1,
  isActive: 1,
  isDelete: 1,
});

// ==========================================
// MODEL
// ==========================================

const Nearby = mongoose.model(
  "Nearby",
  NearbySchema
);

export default Nearby;

// ==========================================
// EXPORT ENUM
// ==========================================

export { CATEGORY_ENUM };