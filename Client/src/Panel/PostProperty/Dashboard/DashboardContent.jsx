import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import "../../../assets/paneldesign/css/PanelDashboardContent.css";

const DashboardContent = () => {
  const navigate = useNavigate();
  // Retrieve shared context safely (if available)
  const outletContext = useOutletContext();

  // Local state fallbacks if context isn't passed
  const [selectedOption, setSelectedOption] = useState("view");

  // Read current option from outlet context or local state
  const currentOption = outletContext?.formData?.mainIntent || selectedOption;

  const handleOptionChange = (value) => {
    if (outletContext?.updateFormData) {
      outletContext.updateFormData("mainIntent", value);
    } else {
      setSelectedOption(value);
    }
  };

  const handleNext = () => {
    if (currentOption === "view") {
      navigate("/dashboard/view-property");
    } else if (currentOption === "upload") {
      navigate("/dashboard/upload");
    } else if (currentOption === "leads") {
      navigate("/dashboard/leads");
    }
  };

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
              checked={currentOption === "view"}
              onChange={() => handleOptionChange("view")}
              className="custom-radio"
            />
            <span className="radio-text">View Your Property</span>
          </label>

          <label className="radio-label">
            <input
              type="radio"
              name="dashboardOption"
              value="upload"
              checked={currentOption === "upload"}
              onChange={() => handleOptionChange("upload")}
              className="custom-radio"
            />
            <span className="radio-text">Upload New Property</span>
          </label>

          <label className="radio-label">
            <input
              type="radio"
              name="dashboardOption"
              value="leads"
              checked={currentOption === "leads"}
              onChange={() => handleOptionChange("leads")}
              className="custom-radio"
            />
            <span className="radio-text">View Leads</span>
          </label>
        </div>

        {/* Triggers route navigation */}
        <button className="next-btn" onClick={handleNext}>
          Next
        </button>
      </div>
    </main>
  );
};

export default DashboardContent;