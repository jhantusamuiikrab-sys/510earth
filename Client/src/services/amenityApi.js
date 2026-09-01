import api from "../admin/utils/api";

export const getAmenities = async (
  params
) => {
  const response = await api.get(
    "/amenities",
    {
      params,
    }
  );
  return response.data;
};

export const getAmenityById = async (
  id
) => {
  const response = await api.get(
    `/amenities/${id}`
  );

  return response.data;
};

export const createAmenity = async (
  formData
) => {
  const response = await api.post(
    "/amenities",
    formData,    
  );
  return response.data;
};

export const updateAmenity = async (
  id,
  formData
) => {
  const response = await api.put(
    `/amenities/${id}`,
    formData,    
  );
  return response.data;
};

export const toggleAmenityStatus =
  async (id) => {
    const response = await api.patch(
      `/amenities/${id}/toggle-status`,
      {},
    );
    return response.data;
  };

export const deleteAmenity = async (
  id
) => {
  const response = await api.delete(
    `/amenities/${id}`,    
  );
  return response.data;
};