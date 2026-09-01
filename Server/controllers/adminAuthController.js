import bcrypt from "bcryptjs";
import AdminUser from "../models/AdminUser.js";
import { generateToken } from "../utils/auth.js";

export const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    const user = await AdminUser.findOne({
      $or: [
        { username: username.toLowerCase() },
        { email: username.toLowerCase() },
        { phoneno: username },
      ],
      isDeleted: false,
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    if (!user.status) {
      return res.status(403).json({
        success: false,
        message: "Your account is inactive",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      user.loginAttempts += 1;
      await user.save();

      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    // Reset failed attempts
    user.loginAttempts = 0;
    user.lastLoginAt = new Date();

    if (req.ip) {
      user.lastLoginIP = req.ip;
    }

    await user.save();

    const token = generateToken(user);

    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production"
          ? "none"
          : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
        status: user.status,
        profileImage: user.profileImage,
        designation: user.designation,
      },
    });
  } catch (error) {
    console.error("adminLogin:", error);

    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};



export const adminLogout = async (req, res) => {
  try {
    res.clearCookie("adminToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production"
          ? "none"
          : "lax",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};