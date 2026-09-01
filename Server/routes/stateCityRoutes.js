import express from "express";

import {
  importStateCities,
  getStates,
  getCitiesByState,
} from "../controllers/stateCityController.js";

const StateCityrouter = express.Router();

// =====================================================
// IMPORT STATES + CITIES
// POST /api/csc/import
// =====================================================

StateCityrouter.post(
  "/import",
  importStateCities
);

// =====================================================
// GET ALL STATES
// GET /api/csc/states
// =====================================================

StateCityrouter.get(
  "/states",
  getStates
);

// =====================================================
// GET CITIES BY STATE
// GET /api/csc/cities?state=West%20Bengal
// =====================================================

StateCityrouter.get(
  "/cities",
  getCitiesByState
);

export default StateCityrouter;