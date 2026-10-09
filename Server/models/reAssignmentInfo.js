import mongoose from 'mongoose';

const reAssignmentInfoSchema = new mongoose.Schema(
  {
    leadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lead',
      required: true,
      index: true
    },

    // Assigner fields
    AssignerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    assignerName: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      name: { type: String, trim: true }
    },

    // AssignTo fields
    AssignedToId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    assignToName: {
      id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      name: { type: String, trim: true }
    },

    // Dates & Active State
    assignedOn: {
      type: Date,
      default: Date.now
    },
    approvedOn: {
      type: Date,
      default: null
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true
    },

    // Status as Boolean (per your requirement)
    status: {
      type: Boolean,
      default: false
    },

    // Status relational fields
    StatusId: {
      type: Number,
      default: null
    },
    StatusName: {
      type: String,
      trim: true,
      default: null
    },

    // SubLeadStatus fields
    SubLeadStatusId: {
      type: Number,
      default: null
    },
    SubLeadStatus: {
      type: String,
      trim: true,
      default: null
    },
    subLeadStatus: {
      id: { type: Number, default: null },
      name: { type: String, trim: true, default: null }
    }
  },
  {
    timestamps: true // Manages createdAt (CreatedOn) and updatedAt (UpdatedOn)
  }
);

// Indexes
reAssignmentInfoSchema.index({ AssignedToId: 1, isActive: 1 });
reAssignmentInfoSchema.index({ leadId: 1, assignedOn: -1 });

export default mongoose.model('ReAssignmentInfo', reAssignmentInfoSchema);

