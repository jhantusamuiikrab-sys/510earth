import express from "express";

import {
  adminLogin,
  adminLogout,
} from "../controllers/adminAuthController.js";

import {
  createAdminUser,
  toggleAdminUserStatus,
  deleteAdminUser,
  resetUserPassword,
  changePassword,
  getAdminUsers,
  getAdminUserById,
  updateAdminUser,
} from "../controllers/adminUserController.js";

import { adminAuthMiddleware } from "../middleware/adminAuthMiddleware.js";

import { allowRoles } from "../middleware/adminRoleMiddleware.js";

const adminrouter = express.Router();

// ==========================================
// AUTH
// ==========================================

adminrouter.post(
  "/login",
  adminLogin
);

adminrouter.post(
  "/logout",
  adminAuthMiddleware,
  adminLogout
);

// ==========================================
// USERS
// ==========================================

adminrouter.get(
  "/users",
  adminAuthMiddleware,
  allowRoles("admin"),
  getAdminUsers
);

// Create Agent / Staff
adminrouter.post(
  "/users",
  adminAuthMiddleware,
  allowRoles("admin"),
  createAdminUser
);

// Activate / Deactivate
adminrouter.patch(
  "/users/:userId/toggle-status",
  adminAuthMiddleware,
  allowRoles("admin"),
  toggleAdminUserStatus
);

// Soft delete
adminrouter.delete(
  "/users/:userId",
  adminAuthMiddleware,
  allowRoles("admin"),
  deleteAdminUser
);

// Admin resets another user's password
adminrouter.patch(
  "/users/:userId/reset-password",
  adminAuthMiddleware,
  allowRoles("admin"),
  resetUserPassword
);

// Logged-in user changes own password
adminrouter.patch(
  "/change-password",
  adminAuthMiddleware,
  changePassword
);

adminrouter.get(
  "/users/:id",
  adminAuthMiddleware,
  getAdminUserById
);

adminrouter.put(
  "/users/:id",
  adminAuthMiddleware,
  updateAdminUser
);

export default adminrouter;