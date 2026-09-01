import api from "../admin/utils/api";

// =====================================================
// GET ALL NEARBY
// =====================================================

export const getNearbys = async (params = {}) => {
  const response = await api.get("/nearby", {
    params,
  });
  return response.data;
};

// =====================================================
// GET SINGLE NEARBY
// =====================================================

export const getNearbyById = async (id) => {
  const response = await api.get(
    `/nearby/${id}`
  );
  return response.data;
};

// =====================================================
// CREATE NEARBY
// =====================================================

export const createNearby = async (formData) => {
  const response = await api.post(
    "/nearby",
    formData
  );
  return response.data;
};

// =====================================================
// UPDATE NEARBY
// =====================================================

export const updateNearby = async (
  id,
  formData
) => {
  const response = await api.put(
    `/nearby/${id}`,
    formData
  );
  return response.data;
};

// =====================================================
// TOGGLE ACTIVE / INACTIVE
// =====================================================

export const toggleNearbyStatus = async (
  id
) => {
  const response = await api.patch(
    `/nearby/${id}/toggle-status`,
    {}
  );
  return response.data;
};

// =====================================================
// DELETE NEARBY
// =====================================================

export const deleteNearby = async (id) => {
  const response = await api.delete(
    `/nearby/${id}`
  );
  return response.data;
};

// =====================================================
// GET ACTIVE NEARBY
// Optional category filter
// =====================================================

export const getActiveNearbys = async (
 catagory = "all"
) => {
  const response = await api.get(
    "/nearby/active",
    {
      params: {
        catagory,
      },
    }
  );
  return response.data;
};