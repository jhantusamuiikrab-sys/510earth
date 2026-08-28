import React, { useState } from "react";
import "../../../assets/paneldesign/css/PanelDashboardContent.css";

const DashboardContent = ({ selectedOption, onOptionChange, onNext }) => {
  return (
    <main className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>

      <div className="dashboard-card">
        <div className="options-group">
          <span className="label-text">I'm looking to</span>

          <label className="radio-label">
            <input
              type="radio"
              name="dashboardOption"
              value="view"
              checked={selectedOption === "view"}
              onChange={() => onOptionChange("view")}
              className="custom-radio"
            />
            <span className="radio-text">View Your Property</span>
          </label>

          <label className="radio-label">
            <input
              type="radio"
              name="dashboardOption"
              value="upload"
              checked={selectedOption === "upload"}
              onChange={() => onOptionChange("upload")}
              className="custom-radio"
            />
            <span className="radio-text">Upload New Property</span>
          </label>

          <label className="radio-label">
            <input
              type="radio"
              name="dashboardOption"
              value="leads"
              checked={selectedOption === "leads"}
              onChange={() => onOptionChange("leads")}
              className="custom-radio"
            />
            <span className="radio-text">View Leads</span>
          </label>
        </div>

        {/* Triggers navigation to Step 2 */}
        <button className="next-btn" onClick={onNext}>
          Next
        </button>
      </div>
    </main>
  );
};

export default DashboardContent;
