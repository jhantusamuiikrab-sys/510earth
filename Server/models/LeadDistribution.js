import mongoose from "mongoose";

const LeadDistributionSchema = new mongoose.Schema(
  {
    PropertyType: {
      type: String,
      trim: true,
    },
    PropertyName: {
      type: String,
      trim: true,
    },
    AgentName: {
      type: String,
      trim: true,
    },
    PropertyConnectedDate: {
      type: Date,
      default: Date.now, // Pass function reference without execution brackets ()
    },
    LastAssignDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("LeadDistribution", LeadDistributionSchema);