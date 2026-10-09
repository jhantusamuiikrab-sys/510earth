import mongoose from "mongoose";
const { Schema } = mongoose;

const linkSchema = new Schema(
  {
    linkdescription: {
      type: String,
      trim: true,
    },
    ReadingFlag: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: true,
    
  }
);

const CommentSchema = new Schema(
  {
    commentdescription: {
      type: String,
      trim: true,
    },
    ReadingFlag: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: true,
  
  }
);

const ReqMisLinkInfoSchema = new Schema(
  {
    rmId: { type: Number, required: true },
    leadId: { type: Number, default: null },

    agentName: { type: String, default: null },
    customerName: { type: String, default: null },
    propertyType: { type: String, default: null },
    rmStatusName: { type: String, default: null },

    searchLink: { type: String, default: null },
    searchComments: { type: String, default: null },

    Link: {
      type: [linkSchema],
      default: [],
    },
    Comment: {
      type: [CommentSchema],
      default: [],
    },

    createdBy: { type: String, default: null },
    updatedBy: { type: String, default: null },
  },
  {
    timestamps: { createdAt: "createdOn", updatedAt: "updatedOn" },
  }
);

export default mongoose.model("ReqMisLinkInfo", ReqMisLinkInfoSchema);