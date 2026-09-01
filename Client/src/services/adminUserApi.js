import api from "../admin/utils/api";

// ===============================
// LOGIN
// ===============================

export const adminLogin = async (data) => {
  const response = await api.post("/admin/login", data);
  return response.data;
};

// ===============================
// LOGOUT
// ===============================

export const adminLogout = async () => {
  const response = await api.post("/admin/logout");
  return response.data;
};

// ===============================
// GET USERS
// ===============================

export const getAdminUsers = async (params = {}) => {
  const response = await api.get("/admin/users", {
    params,
  });  
  return response.data;
};

// ===============================
// CREATE USER
// ===============================

export const createAdminUser = async (data) => {
  const response = await api.post(
    "/admin/users",
    data
  );

  return response.data;
};

// ===============================
// TOGGLE STATUS
// ===============================

export const toggleAdminUserStatus = async (
  userId
) => {
  const response = await api.patch(
    `/admin/users/${userId}/toggle-status`
  );

  return response.data;
};

// ===============================
// DELETE USER
// ===============================

export const deleteAdminUser = async (userId) => {
  const response = await api.delete(
    `/admin/users/${userId}`
  );

  return response.data;
};

// ===============================
// RESET PASSWORD
// ===============================

export const resetUserPassword = async (
  userId,
  data
) => {
  const response = await api.patch(
    `/admin/users/${userId}/reset-password`,
    data
  );  
  return response.data;
};

// ===============================
// CHANGE PASSWORD
// ===============================

export const changeAdminPassword = async (data) => {
  const response = await api.patch(
    "/admin/change-password",
    data
  );
  return response.data;
};

// Get single admin user
export const getAdminUserById = async (id) => {
  const response = await api.get(
    `/admin/users/${id}`,    
  );
  return response.data;
};

// Update admin user
export const updateAdminUser = async (id, data) => {
  const response = await api.put(
    `/admin/users/${id}`,
    data
  );
  return response.data;
};

