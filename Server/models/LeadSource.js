import mongoose from "mongoose";

// ==========================================
// LEAD SOURCE SCHEMA
// ==========================================

const LeadSourceSchema = new mongoose.Schema(
  {
    // ==========================================
    // NAME
    // ==========================================

    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
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
  },
  {
    collection: "LeadSources",
    timestamps: { 
      createdAt: "dateAdded", 
      updatedAt: "dateModified" 
    },
  }
);

// ==========================================
// INDEXES
// ==========================================

// ------------------------------------------
// UNIQUE NAME CHECK
// ------------------------------------------
//
// Prevents duplicate lead source names.
// Deleted records do not participate
// in the uniqueness check.
//
LeadSourceSchema.index(
  {
    name: 1,
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

// LeadSourceSchema.index({
//   name: 1,
// });

// ------------------------------------------
// General active + non-deleted filtering
// ------------------------------------------

LeadSourceSchema.index({
  isDelete: 1,
  isActive: 1,
});

// ==========================================
// MODEL
// ==========================================

const LeadSource = mongoose.model("LeadSource", LeadSourceSchema);

export default LeadSource;