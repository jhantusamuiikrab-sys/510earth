import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Login from "../Login";
import AdminLayout from "../components/AdminLayout";
import Dashboard from "../Dashboard";
import AdminUsers from "../users/AdminUsers";
import CreateUser from "../users/CreateUser";
import ChangePassword from "../users/ChangePassword";
import ViewUser from "../users/ViewUser";
import EditUser from "../users/EditUser";

import PropertyEntry from "../PropertyEntry";

import NearbyManagement from "../nearby/NearbyManagement";
import AmenityManagement from "../amenity/AmenityManagement";
import SuitableBusiness from "../SuitableBusiness";
import ZoneManagement from "../ZoneManagement";
import BookedLeadForm from "../BookedLeadForm";
import ReqMismatchForm from "../ReqMismatchForm";
import ReqMismatchApp from "../ReqMismatchApp";
import ReqMismatchDetailsPage from "../ReqMismatchDetailsPage";
import BookedLeadFormView from "../BookedLeadFormView";




const ProtectedRoute = ({ children }) => {
  const adminUser = localStorage.getItem("adminUser");

  if (!adminUser) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

const AdminRoutes = () => {
  return (
    <Routes>
      {/* ADMIN LOGIN */}
      <Route path="login" element={<Login />} />
      
      {/* ADMIN LAYOUT */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />

        <Route path="dashboard" element={<Dashboard />} />

        <Route path="users" element={<AdminUsers />} />

        <Route path="users/create" element={<CreateUser />} />

        <Route path="change-password" element={<ChangePassword />} />

        <Route path="users/:id" element={<ViewUser />} />

        <Route path="users/:id/edit" element={<EditUser />} />

        <Route path="Flat-Apartment" element={<PropertyEntry />} />

        <Route path="nearby" element={<NearbyManagement />} />

        <Route path="amenities" element={<AmenityManagement />} />

        <Route path="zones" element={<ZoneManagement />} />

        <Route path="suitablebusiness" element={<SuitableBusiness />} />
        <Route
          path="req-mismatch"
          element={<ReqMismatchForm />}
        />

        <Route
          path="req-mismatchApp"
          element={<ReqMismatchApp />}
        />
        <Route path="req-mismatchApp/:id" element={<ReqMismatchDetailsPage />} />

        <Route path="bookedleadform" element={<BookedLeadForm />} />
        <Route path="bookedleadformview" element={<BookedLeadFormView />} />

      </Route>

      {/* DEFAULT ADMIN ROUTE */}
      <Route path="*" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  );
};

export default AdminRoutes;
