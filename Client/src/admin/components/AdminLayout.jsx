import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { adminLogout } from "../../services/adminUserApi";
import "../../assets/paneldesign/css/admin.css";

const AdminLayout = () => {
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const handleLogout = async () => {
    try {
      await adminLogout();
    } catch (error) {
      console.error(error);
    } finally {
      localStorage.removeItem("adminUser");
      navigate("/admin/login", {
        replace: true,
      });
    }
  };

  return (
    <div className="admin-app">
      <AdminSidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        onLogout={handleLogout}
      />

      <div className="admin-main">
        <AdminHeader
          setMobileOpen={setMobileOpen}
        />

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;