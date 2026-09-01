import jwt from "jsonwebtoken";
import AdminUser from "../models/AdminUser.js";

export const adminAuthMiddleware = async (req, res, next) => {
  try {
    let token = req.cookies?.adminToken;
    
    // Optional Authorization header support
    if (!token && req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await AdminUser.findOne({
      _id: decoded.id,
      isDeleted: false,
    }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.status) {
      return res.status(403).json({
        success: false,
        message: "Your account is inactive",
      });
    }

    req.adminUser = user;

    next();
  } catch (error) {
    console.error("adminAuthMiddleware:", error);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};