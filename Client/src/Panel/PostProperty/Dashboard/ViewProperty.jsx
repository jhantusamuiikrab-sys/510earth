import React from "react";
import "../../../assets/paneldesign/css/PanelDashboardViewProperty.css";

const ViewProperty = ({ selectedProperty, onPropertyChange, onGo, onBack }) => {
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
              checked={selectedProperty === "flat-apartment"}
              onChange={(e) => onPropertyChange(e.target.value)}
              className="custom-radio"
            />
            <span className="radio-text">Flat/Apartment</span>
          </label>

          <label className="property-radio-label">
            <input
              type="radio"
              name="propertyType"
              value="independent-house-villa"
              checked={selectedProperty === "independent-house-villa"}
              onChange={(e) => onPropertyChange(e.target.value)}
              className="custom-radio"
            />
            <span className="radio-text">Independent House / Villa</span>
          </label>

          <label className="property-radio-label">
            <input
              type="radio"
              name="propertyType"
              value="commercial"
              checked={selectedProperty === "commercial"}
              onChange={(e) => onPropertyChange(e.target.value)}
              className="custom-radio"
            />
            <span className="radio-text">Commercial</span>
          </label>

          <label className="property-radio-label">
            <input
              type="radio"
              name="propertyType"
              value="land-plot"
              checked={selectedProperty === "land-plot"}
              onChange={(e) => onPropertyChange(e.target.value)}
              className="custom-radio"
            />
            <span className="radio-text">Land / Plot</span>
          </label>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          {onBack && (
            <button
              className="go-btn"
              style={{ backgroundColor: "#64748b" }}
              onClick={onBack}
            >
              Back
            </button>
          )}
          <button className="go-btn" onClick={onGo}>
            Go
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewProperty;
