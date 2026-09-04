import bcrypt from "bcryptjs";
import AdminUser from "../models/AdminUser.js";
import mongoose from "mongoose";

export const createAdminUser = async (req, res) => {
  try {
    const {
      name,
      username,
      email,
      phoneno,
      password,
      role,
      designation,
      profileImage,
    } = req.body;

    if (
      !name ||
      !username ||
      !email ||
      !password ||
      !role
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Name, username, email, password and role are required",
      });
    }

    if (!["agent", "staff"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Only agent or staff can be created",
      });
    }

    const existingUser = await AdminUser.findOne({
      $or: [
        { username: username.toLowerCase() },
        { email: email.toLowerCase() },
      ],
      isDeleted: false,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Username or email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      12
    );

    const user = await AdminUser.create({
      name,
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      phoneno,
      password: hashedPassword,
      Decriptedpassword: password,
      role,
      designation,
      profileImage,
      status: true,
      createdBy: req.adminUser._id,
    });

    return res.status(201).json({
      success: true,
      message: `${role} created successfully`,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        phoneno: user.phoneno,
        role: user.role,
        status: user.status,
        designation: user.designation,
        profileImage: user.profileImage,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("createAdminUser:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create user",
    });
  }
};

export const toggleAdminUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await AdminUser.findOne({
      _id: userId,
      isDeleted: false,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Don't allow admin to deactivate himself
    if (
      user._id.toString() ===
      req.adminUser._id.toString()
    ) {
      return res.status(400).json({
        success: false,
        message: "You cannot deactivate your own account",
      });
    }

    user.status = !user.status;

    await user.save();

    return res.status(200).json({
      success: true,
      message: user.status
        ? "User activated successfully"
        : "User deactivated successfully",
      status: user.status,
    });
  } catch (error) {
    console.error("toggleAdminUserStatus:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update user status",
    });
  }
};

export const deleteAdminUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await AdminUser.findOne({
      _id: userId,
      isDeleted: false,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (
      user._id.toString() ===
      req.adminUser._id.toString()
    ) {
      return res.status(400).json({
        success: false,
        message: "You cannot delete your own account",
      });
    }

    user.isDeleted = true;
    user.deletedAt = new Date();
    user.status = false;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("deleteAdminUser:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete user",
    });
  }
};

export const resetUserPassword = async (req, res) => {
  try {
    const { userId } = req.params;
    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "New password must be at least 6 characters",
      });
    }

    const user = await AdminUser.findOne({
      _id: userId,
      isDeleted: false,
    }).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      12
    );

    user.password = hashedPassword;
    user.Decriptedpassword=newPassword;
    user.passwordChangedAt = new Date();

    // Clear reset information if present
    user.passwordResetToken = null;
    user.passwordResetExpires = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("resetUserPassword:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to reset password",
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const {
      currentPassword,
      newPassword,
    } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Current password and new password are required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "New password must be at least 6 characters",
      });
    }

    const user = await AdminUser.findById(
      req.adminUser._id
    ).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const passwordMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!passwordMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    const samePassword = await bcrypt.compare(
      newPassword,
      user.password
    );

    if (samePassword) {
      return res.status(400).json({
        success: false,
        message:
          "New password must be different from current password",
      });
    }

    user.password = await bcrypt.hash(
      newPassword,
      12
    );
    user.Decriptedpassword=newPassword;

    user.passwordChangedAt = new Date();

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("changePassword:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to change password",
    });
  }
};

export const getAdminUsers = async (req, res) => {
  try {
    const {
      role,
      search,
      status,
      page = 1,
      limit = 20,
    } = req.query;

    // Admin can see ONLY agent and staff
    const query = {
      isDeleted: false,
      role: {
        $in: ["agent", "staff"],
      },
    };

    // Optional role filter
    if (role && ["agent", "staff"].includes(role)) {
      query.role = role;
    }
    
    // Optional status filter
    if (status !== undefined && status !== "") {
      query.status = status === "true";
    }

    // Optional search
    if (search && search.trim()) {
      query.$or = [
        {
          name: {
            $regex: search.trim(),
            $options: "i",
          },
        },
        {
          username: {
            $regex: search.trim(),
            $options: "i",
          },
        },
        {
          email: {
            $regex: search.trim(),
            $options: "i",
          },
        },
        {
          phoneno: {
            $regex: search.trim(),
            $options: "i",
          },
        },
      ];
    }

    const pageNumber = Math.max(Number(page) || 1, 1);
    const limitNumber = Math.max(Number(limit) || 20, 1);

    const skip = (pageNumber - 1) * limitNumber;
    
    const [users, total] = await Promise.all([
      AdminUser.find(query)
        .select("-password -passwordResetToken -passwordResetExpires")
        .populate("createdBy", "name username")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNumber),

      AdminUser.countDocuments(query),
    ]);    

    return res.status(200).json({
      success: true,
      users,
      pagination: {
        total,
        page: pageNumber,
        limit: limitNumber,
        totalPages: Math.ceil(total / limitNumber),
      },
    });
  } catch (error) {
    console.error("getAdminUsers:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};

export const getAdminUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const user = await AdminUser.findOne({
      _id: id,
      isDeleted: false,
      role: {
        $in: ["agent", "staff"],
      },
    })
      .select(
        "-password " +        
        "-passwordResetToken " +
        "-passwordResetExpires " +
        "-loginAttempts " +
        "-lastLoginIP"
      )
      .populate("createdBy", "name username");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Agent/Staff not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("getAdminUserById:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch user",
    });
  }
};

export const updateAdminUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const {
      name,
      username,
      email,
      phoneno,
      role,
      status,
      profileImage,
      designation,
      isEmailVerified,
      isPhoneVerified,
    } = req.body;

    // ==========================================
    // VALIDATE ROLE
    // ==========================================

    if (role !== undefined && !["agent", "staff"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Only agent or staff role is allowed",
      });
    }

    // ==========================================
    // FIND USER
    // ==========================================

    const user = await AdminUser.findOne({
      _id: id,
      isDeleted: false,
      role: {
        $in: ["agent", "staff"],
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Agent/Staff not found",
      });
    }

    // ==========================================
    // USERNAME DUPLICATE CHECK
    // ==========================================

    if (
      username !== undefined &&
      username.trim().toLowerCase() !== user.username
    ) {
      const existingUsername = await AdminUser.findOne({
        username: username.trim().toLowerCase(),
        _id: { $ne: id },
        isDeleted: false,
      });

      if (existingUsername) {
        return res.status(409).json({
          success: false,
          message: "Username already exists",
        });
      }
    }

    // ==========================================
    // EMAIL DUPLICATE CHECK
    // ==========================================

    if (
      email !== undefined &&
      email.trim().toLowerCase() !== user.email
    ) {
      const existingEmail = await AdminUser.findOne({
        email: email.trim().toLowerCase(),
        _id: { $ne: id },
        isDeleted: false,
      });

      if (existingEmail) {
        return res.status(409).json({
          success: false,
          message: "Email already exists",
        });
      }
    }

    // ==========================================
    // PHONE DUPLICATE CHECK
    // ==========================================

    if (
      phoneno !== undefined &&
      phoneno !== null &&
      phoneno.trim() !== "" &&
      phoneno.trim() !== user.phoneno
    ) {
      const existingPhone = await AdminUser.findOne({
        phoneno: phoneno.trim(),
        _id: { $ne: id },
        isDeleted: false,
      });

      if (existingPhone) {
        return res.status(409).json({
          success: false,
          message: "Phone number already exists",
        });
      }
    }

    // ==========================================
    // UPDATE FIELDS
    // ==========================================

    if (name !== undefined) {
      user.name = name.trim();
    }

    if (username !== undefined) {
      user.username = username.trim().toLowerCase();
    }

    if (email !== undefined) {
      user.email = email.trim().toLowerCase();
    }

    if (phoneno !== undefined) {
      user.phoneno =
        phoneno === null || phoneno.trim() === ""
          ? null
          : phoneno.trim();
    }

    if (role !== undefined) {
      user.role = role;
    }

    if (status !== undefined) {
      user.status = Boolean(status);
    }

    if (isEmailVerified !== undefined) {
      user.isEmailVerified = Boolean(isEmailVerified);
    }

    if (isPhoneVerified !== undefined) {
      user.isPhoneVerified = Boolean(isPhoneVerified);
    }

    if (profileImage !== undefined) {
      user.profileImage =
        profileImage === "" ? null : profileImage;
    }

    if (designation !== undefined) {
      user.designation =
        designation === "" ? null : designation.trim();
    }

    await user.save();

    // ==========================================
    // RETURN UPDATED USER
    // ==========================================

    const updatedUser = await AdminUser.findById(user._id)
      .select(
        "-password " +
        "-Decriptedpassword " +
        "-passwordResetToken " +
        "-passwordResetExpires " +
        "-loginAttempts " +
        "-lastLoginIP"
      )
      .populate("createdBy", "name username");

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("updateAdminUser:", error);

    if (error.code === 11000) {
      const duplicateField = Object.keys(
        error.keyPattern || {}
      )[0];

      return res.status(409).json({
        success: false,
        message: `${duplicateField || "Field"} already exists`,
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: Object.values(error.errors).map(
          (err) => err.message
        ),
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update user",
    });
  }
};