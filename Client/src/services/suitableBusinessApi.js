import api from "../admin/utils/api";

export const getSuitableBusinesses = async (
  params = {}
) => {
  const response = await api.get(
    "/suitablebusiness",
    {
      params,
    }
  );

  return response.data;
};

export const getSuitableBusinessById = async (
  id
) => {
  const response = await api.get(
    `/suitablebusiness/${id}`
  );

  return response.data;
};

export const createSuitableBusiness = async (
  formData
) => {
  const response = await api.post(
    "/suitablebusiness",
    formData
  );

  return response.data;
};

export const updateSuitableBusiness = async (
  id,
  formData
) => {
  const response = await api.put(
    `/suitablebusiness/${id}`,
    formData
  );

  return response.data;
};

export const toggleSuitableBusinessStatus =
  async (id) => {
    const response = await api.patch(
      `/suitablebusiness/${id}/status`
    );

    return response.data;
  };

export const deleteSuitableBusiness = async (
  id
) => {
  const response = await api.delete(
    `/suitablebusiness/${id}`
  );

  return response.data;
};