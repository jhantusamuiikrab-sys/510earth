import mongoose from "mongoose";

const StateCitySchema = new mongoose.Schema(
  {
    StateName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    Cities: {
      type: [String],
      default: [],
    },

    IsActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: "StateCities",
  }
);

const StateCity = mongoose.model(
  "StateCity",
  StateCitySchema
);

export default StateCity;