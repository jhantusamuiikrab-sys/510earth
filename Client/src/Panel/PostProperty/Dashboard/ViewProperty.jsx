import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import "../../../assets/paneldesign/css/PanelDashboardViewProperty.css";

const ViewProperty = () => {
  const navigate = useNavigate();
  const outletContext = useOutletContext();

  // Fallback local state if outlet context isn't supplied
  const [selectedProperty, setSelectedProperty] = useState("");

  // Get current property value from router context or fallback local state
  const currentProperty =
    outletContext?.formData?.propertyType || selectedProperty;

  const handlePropertyChange = (value) => {
    if (outletContext?.updateFormData) {
      outletContext.updateFormData("propertyType", value);
    } else {
      setSelectedProperty(value);
    }
  };

  const handleGo = () => {
    if (!currentProperty) {
      alert("Please select a property type.");
      return;
    }

    if (currentProperty === "flat-apartment") {
      navigate("/dashboard/flat-apartment-list");
    }
    if (currentProperty === "independent-house-villa") {
      navigate("/dashboard/independent-house/vila-list");
    }
    if (currentProperty === "commercial") {
      navigate("/dashboard/commercial-property-list");
    }
    // Navigate to other routes when available (e.g., /dashboard/commercial-list)
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <div className="view-property-container">
      <h2 className="view-property-title">View Your Property</h2>

      <div className="view-property-card">
        <div className="property-options-group">
          <label className="property-radio-label">
            <input
              type="radio"
              name="propertyType"
              value="flat-apartment"
              checked={currentProperty === "flat-apartment"}
              onChange={(e) => handlePropertyChange(e.target.value)}
              className="custom-radio"
            />
            <span className="radio-text">Flat/Apartment</span>
          </label>

          <label className="property-radio-label">
            <input
              type="radio"
              name="propertyType"
              value="independent-house-villa"
              checked={currentProperty === "independent-house-villa"}
              onChange={(e) => handlePropertyChange(e.target.value)}
              className="custom-radio"
            />
            <span className="radio-text">Independent House / Villa</span>
          </label>

          <label className="property-radio-label">
            <input
              type="radio"
              name="propertyType"
              value="commercial"
              checked={currentProperty === "commercial"}
              onChange={(e) => handlePropertyChange(e.target.value)}
              className="custom-radio"
            />
            <span className="radio-text">Commercial</span>
          </label>

          <label className="property-radio-label">
            <input
              type="radio"
              name="propertyType"
              value="land-plot"
              checked={currentProperty === "land-plot"}
              onChange={(e) => handlePropertyChange(e.target.value)}
              className="custom-radio"
            />
            <span className="radio-text">Land / Plot</span>
          </label>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <button
            type="button"
            className="go-btn"
            style={{ backgroundColor: "#64748b" }}
            onClick={handleBack}
          >
            Back
          </button>
          <button type="button" className="go-btn" onClick={handleGo}>
            Go
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewProperty;