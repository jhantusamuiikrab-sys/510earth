import express from "express";

import {
  createZone,
  getZones,
  getZoneById,
  updateZone,
  toggleZoneStatus,
  activateZone,
  deactivateZone,
  deleteZone,
} from "../controllers/zoneController.js";

const zonerouter = express.Router();

// =====================================================
// ZONE CRUD
// =====================================================

zonerouter.post("/", createZone);

zonerouter.get("/", getZones);

zonerouter.get("/:id", getZoneById);

zonerouter.put("/:id", updateZone);

// =====================================================
// STATUS
// =====================================================

zonerouter.patch("/:id/toggle-status", toggleZoneStatus);

zonerouter.patch("/:id/activate", activateZone);

zonerouter.patch("/:id/deactivate", deactivateZone);

// =====================================================
// DELETE
// =====================================================

zonerouter.delete("/:id", deleteZone);

export default zonerouter;