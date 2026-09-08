import mongoose from "mongoose";

const LeadDistributionSchema = new mongoose.Schema(
  {
    PropertyType: {
      type: "String",
    },
    PropertyName: {
      type: "String",
    },
    AgentName: {
      type: "String",
    },
    PropertyConnectedDate: {
      type: Date.now(),
    },
    LastAssignDate: {
      type: Date.now(),
    },
  },
  { timestamps: true },
);

export default mongoose.model("leaddistributioninfo",LeadDistributionSchema)
// export const LeadDistributionInfo = mongoose.model(
//   "leaddistributioninfo",
//   LeadDistributionSchema,
// );
