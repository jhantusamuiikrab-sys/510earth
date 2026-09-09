import mongoose from "mongoose";

export const SubscribeSchema = new mongoose.Schema(
  {
    email: { type: String, trim: true, required: true },
  },
  { timestamps: true },
);

export default mongoose.model("Subscriberinfo", SubscribeSchema);
