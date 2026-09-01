import StateCity from "../models/StateCity.js";

// =====================================================
// IMPORT STATES + CITIES
// =====================================================

export const importStateCities = async (req, res) => {
  try {
    const data = req.body;

    if (!Array.isArray(data)) {
      return res.status(400).json({
        success: false,
        message: "Data must be an array.",
      });
    }

    let imported = 0;
    let updated = 0;

    for (const item of data) {
      if (
        !item.state ||
        !Array.isArray(item.cities)
      ) {
        continue;
      }

      const stateName =
        item.state.trim();

      const cities = [
        ...new Set(
          item.cities
            .map((city) =>
              String(city).trim()
            )
            .filter(Boolean)
        ),
      ];

      const existing =
        await StateCity.findOne({
          StateName: stateName,
        });

      if (existing) {
        existing.Cities = cities;

        await existing.save();

        updated++;
      } else {
        await StateCity.create({
          StateName: stateName,
          Cities: cities,
          IsActive: true,
        });

        imported++;
      }
    }

    return res.status(200).json({
      success: true,
      message:
        "State and city data imported successfully.",
      imported,
      updated,
      total: imported + updated,
    });
  } catch (error) {
    console.error(
      "Import state city error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to import state and city data.",
      error: error.message,
    });
  }
};

// =====================================================
// GET STATES
// =====================================================

export const getStates = async (req, res) => {
  try {
    const states =
      await StateCity.find({
        IsActive: true,
      })
        .select("_id StateName")
        .sort({
          StateName: 1,
        })
        .lean();

    return res.status(200).json({
      success: true,
      data: states,
    });
  } catch (error) {
    console.error(
      "Get states error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch states.",
    });
  }
};

// =====================================================
// GET CITIES BY STATE
// =====================================================

export const getCitiesByState = async (
  req,
  res
) => {
  try {
    const { state } = req.query;

    if (!state) {
      return res.status(400).json({
        success: false,
        message: "State is required.",
      });
    }

    const stateData =
      await StateCity.findOne({
        StateName: {
          $regex: `^${state.trim()}$`,
          $options: "i",
        },

        IsActive: true,
      })
        .select("StateName Cities")
        .lean();

    if (!stateData) {
      return res.status(404).json({
        success: false,
        message:
          "State not found.",
        data: [],
      });
    }

    const cities =
      [...stateData.Cities].sort(
        (a, b) =>
          a.localeCompare(b)
      );

    return res.status(200).json({
      success: true,
      state:
        stateData.StateName,
      data: cities,
    });
  } catch (error) {
    console.error(
      "Get cities by state error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch cities.",
    });
  }
};