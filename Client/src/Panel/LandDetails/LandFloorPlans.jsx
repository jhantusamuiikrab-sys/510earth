import React, { useState, useEffect } from "react";
import "../../assets/paneldesign/css/LandFloorplan.css";

const LandFloorPlans = ({ LfpTempModel, LpABTempModel }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [groundSlideIdx, setGroundSlideIdx] = useState(0);
  const [firstSlideIdx, setFirstSlideIdx] = useState(0);

  if (!LfpTempModel || LfpTempModel.length === 0) {
    return null;
  }

  const currentPlan = LfpTempModel[activeTab] || LfpTempModel[0];
  const groundImgs = currentPlan?.FloorPlanGroundImgs || [];
  const firstImgs = currentPlan?.FloorPlanFirstImgs || [];

  // Auto-scroll Ground Floor images
  useEffect(() => {
    if (groundImgs.length <= 1) return;

    const interval = setInterval(() => {
      setGroundSlideIdx((prevIdx) => (prevIdx + 1) % groundImgs.length);
    }, 3000); // Scrolls every 3 seconds

    return () => clearInterval(interval);
  }, [groundImgs, activeTab]);

  // Auto-scroll First Floor images
  useEffect(() => {
    if (firstImgs.length <= 1) return;

    const interval = setInterval(() => {
      setFirstSlideIdx((prevIdx) => (prevIdx + 1) % firstImgs.length);
    }, 3000); // Scrolls every 3 seconds

    return () => clearInterval(interval);
  }, [firstImgs, activeTab]);

  return (
    <section className="floor_plans_area py-5" id="floorplans">
      <div className="container">
        
        {/* Navigation Tabs */}
        <div className="tabs_nav_wrapper mb-5">
          <ul className="nav nav-tabs justify-content-center border-0">
            {LfpTempModel.map((item, index) => (
              <li className="nav-item" key={`tab-${index}`}>
                <button
                  className={`nav-link ${activeTab === index ? "active" : ""}`}
                  onClick={() => {
                    setActiveTab(index);
                    setGroundSlideIdx(0);
                    setFirstSlideIdx(0);
                  }}
                >
                  {item.FloorPlanKatha}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Tab Panel Content */}
        <div className="row g-4">
          
          {/* Ground Floor Column */}
          <div className="col-md-6 text-center">
            <h3 className="floor_title">Ground Floor</h3>
            <p className="floor_description">
              {currentPlan.FloorPlanGroundDes ||
                "Our Group is renowned to have delivered all its projects before time. Trust is thus imprinted in the minds of our customers forever"}
            </p>

            <div className="floor_card position-relative overflow-hidden">
              {groundImgs.length > 0 && (
                <img
                  src={groundImgs[groundSlideIdx]}
                  alt="Ground Floor Plan"
                  className="img-fluid floor_image"
                />
              )}

              {/* Slider Dots Overlay */}
              {groundImgs.length > 1 && (
                <div className="slider_dots">
                  {groundImgs.map((_, idx) => (
                    <span
                      key={`g-dot-${idx}`}
                      className={`dot ${groundSlideIdx === idx ? "active" : ""}`}
                      onClick={() => setGroundSlideIdx(idx)}
                    />
                  ))}
                </div>
              )}

              <span className="floor_card_label">GROUND FLOOR PLAN</span>
            </div>
          </div>

          {/* First Floor Column */}
          <div className="col-md-6 text-center">
            <h3 className="floor_title">First Floor</h3>
            <p className="floor_description">
              {currentPlan.FloorPlanFirstDes ||
                "Our Group is renowned to have delivered all its projects before time. Trust is thus imprinted in the minds of our customers forever"}
            </p>

            <div className="floor_card position-relative overflow-hidden">
              {firstImgs.length > 0 && (
                <img
                  src={firstImgs[firstSlideIdx]}
                  alt="First Floor Plan"
                  className="img-fluid floor_image"
                />
              )}

              {/* Slider Dots Overlay */}
              {firstImgs.length > 1 && (
                <div className="slider_dots">
                  {firstImgs.map((_, idx) => (
                    <span
                      key={`f-dot-${idx}`}
                      className={`dot ${firstSlideIdx === idx ? "active" : ""}`}
                      onClick={() => setFirstSlideIdx(idx)}
                    />
                  ))}
                </div>
              )}

              <span className="floor_card_label">FIRST FLOOR PLAN</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default LandFloorPlans;