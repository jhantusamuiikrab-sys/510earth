import mongoose from "mongoose";

const ADMIN_ROLE_ENUM = [  
  "admin", 
  "agent",
  "staff",
];

const AdminUserSchema = new mongoose.Schema(
  {
    // =========================
    // BASIC INFORMATION
    // =========================
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 50,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },

    phoneno: {
      type: String,
      trim: true,
      default: null,
    },

    // =========================
    // AUTHENTICATION
    // =========================
    password: {
      type: String,
      required: true,
      minlength: 6      
    },
    Decriptedpassword: {
      type: String,
      required: true,
      minlength: 6      
    },

    // =========================
    // ROLE & ACCESS
    // =========================
    role: {
      type: String,
      enum: ADMIN_ROLE_ENUM,
      default: "staff",
      required: true,
    },
    
    status: {
      type: Boolean,
      default: true,
    },

    // =========================
    // PROFILE
    // =========================
    profileImage: {
      type: String,
      default: null,
    },

    designation: {
      type: String,
      trim: true,
      default: null,
    },    

    // =========================
    // LOGIN SECURITY
    // =========================
    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    isPhoneVerified: {
      type: Boolean,
      default: false,
    },

    lastLoginAt: {
      type: Date,
      default: null,
    },

    lastLoginIP: {
      type: String,
      default: null,
    },

    loginAttempts: {
      type: Number,
      default: 0,
    },   

    // =========================
    // PASSWORD SECURITY
    // =========================
    passwordChangedAt: {
      type: Date,
      default: null,
    },

    passwordResetToken: {
      type: String,
      default: null     
    },

    passwordResetExpires: {
      type: Date,
      default: null      
    },
    // =========================
    // ACCOUNT INFORMATION
    // =========================
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdminUser",
      default: null,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// =========================
// INDEXES
// =========================

AdminUserSchema.index({
  isDeleted: 1,
});

const AdminUser = mongoose.model("AdminUser", AdminUserSchema);

export default AdminUser;