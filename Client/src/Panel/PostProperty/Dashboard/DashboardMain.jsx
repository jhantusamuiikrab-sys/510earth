import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";

function DashboardMain() {
  // Consolidated global state shared across sub-routes if needed
  const [formData, setFormData] = useState({
    mainIntent: "view",
    propertyType: "",
    uploadSelection: null,
    basicDetails: null,
    keyFeatures: null,
    propertyDetails: null,
    otherInfo: null,
  });

  const updateFormData = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="dashboard-main-layout">
      <Header />
      
      {/* Renders whatever child route matches the current path */}
      <Outlet context={{ formData, updateFormData }} />
    </div>
  );
}

export default DashboardMain;