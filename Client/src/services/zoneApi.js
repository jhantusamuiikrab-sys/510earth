import api from "../admin/utils/api";

const API_URL = "/zones";

// =====================================================
// GET ZONES
// =====================================================

export const getZones = async ({
  search = "",
  status = "all",
  category = "all",
} = {}) => {
  const response = await api.get(API_URL, {
    params: {
      search,
      status,
      category,
    },
  });

  return response.data;
};

// =====================================================
// GET SINGLE ZONE
// =====================================================

export const getZoneById = async (id) => {
  const response = await api.get(
    `${API_URL}/${id}`
  );

  return response.data;
};

// =====================================================
// CREATE ZONE
// =====================================================

export const createZone = async (data) => {
  const response = await api.post(
    API_URL,
    data
  );

  return response.data;
};

// =====================================================
// UPDATE ZONE
// =====================================================

export const updateZone = async (
  id,
  data
) => {
  const response = await api.put(
    `${API_URL}/${id}`,
    data
  );

  return response.data;
};

// =====================================================
// TOGGLE STATUS
// =====================================================

export const toggleZoneStatus = async (
  id
) => {
  const response = await api.patch(
    `${API_URL}/${id}/toggle-status`
  );

  return response.data;
};

// =====================================================
// DELETE ZONE
// =====================================================

export const deleteZone = async (id) => {
  const response = await api.delete(
    `${API_URL}/${id}`
  );

  return response.data;
};