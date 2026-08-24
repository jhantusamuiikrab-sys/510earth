import React, { useState } from "react";
import "../../../src/assets/content/style.css";
import "../../assets/Font/css_new/style.css";

const LandElevation = ({ LOETempModel, LpABTempModel }) => {
  const [activeTab, setActiveTab] = useState(0);

  if (!LOETempModel || LOETempModel.length === 0) {
    return null;
  }

  const currentElevation = LOETempModel[activeTab] || LOETempModel[0];

  return (
    <section className="tabs-section py-5" id="elevation">
      <div className="container">
        {/* Title & Main Description */}
        <div className="text-center mb-4">
          <h2 className="elevation-title">Our Elevation</h2>
          {LpABTempModel?.elevationMainDes && (
            <p className="elevation-subtext">{LpABTempModel.elevationMainDes}</p>
          )}
        </div>

        {/* Dynamic Tab Navigation */}
        <div className="elevation-tabs-header mb-4">
          {LOETempModel.map((elevation, index) => (
            <button
              key={`tab-${index}`}
              className={`elevation-tab-btn ${activeTab === index ? "active" : ""}`}
              onClick={() => setActiveTab(index)}
            >
              {elevation.LOEKatha}
            </button>
          ))}
        </div>

        {/* Active Tab Panel - 2 Cards Layout */}
        <div className="elevation-content">
          <div className="row g-4 justify-content-center">
            {/* Image 1 / Ground Floor */}
            {currentElevation?.LOEGroundImgs?.[0] && (
              <div className="col-md-6">
                <div className="elevation-card">
                  <img
                    src={currentElevation.LOEGroundImgs[0]}
                    alt={`${currentElevation.LOEKatha} Night/Ground View`}
                    className="img-fluid elevation-img"
                  />
                  {currentElevation.LOEGroundDes && (
                    <p className="elevation-desc">{currentElevation.LOEGroundDes}</p>
                  )}
                </div>
              </div>
            )}

            {/* Image 2 / First Floor */}
            {currentElevation?.LOEFirstImgs?.[0] && (
              <div className="col-md-6">
                <div className="elevation-card">
                  <img
                    src={currentElevation.LOEFirstImgs[0]}
                    alt={`${currentElevation.LOEKatha} Day/First View`}
                    className="img-fluid elevation-img"
                  />
                  {currentElevation.LOEFirstDes && (
                    <p className="elevation-desc">{currentElevation.LOEFirstDes}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandElevation;