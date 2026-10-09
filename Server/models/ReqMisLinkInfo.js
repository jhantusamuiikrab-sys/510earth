import mongoose from 'mongoose';
const { Schema } = mongoose;

const ReqMisLinkInfoSchema = new Schema(
  {
    rmId: { type: Number, required: true, unique: true }, // Map to SQL Identity
    leadId: { type: Number, default: null },
    
    // Agent Info
    agentName: { type: String, default: null },
    
    // Customer Info
    customerName: { type: String, default: null },
    // Property Requirements
    propertyType: { type: String, default: null },
    rmStatusName: { type: String, default: null },

    //Property Search Info
    searchLink: { type: String, default: null },
    searchComments: { type: String, default: null },

    // Audit Info
    createdBy: { type: String, default: null },
    updatedBy: { type: String, default: null }
  },
  {
    timestamps: { createdAt: 'createdOn', updatedAt: 'updatedOn' } // Automatically manages CreatedOn & UpdatedOn
  }
);

export default mongoose.model('ReqMisLinkInfo', ReqMisLinkInfoSchema);