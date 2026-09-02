import api from "../admin/utils/api";

export const bookedLead = async (data) => {
  const response = await api.post("booked-leads/create", data);
  return response.data;
};