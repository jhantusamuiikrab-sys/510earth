import React from "react";
import "../../../src/assets/content/style.css";
import "../../assets/Font/css_new/style.css";

const LandFloorPlans = ({ LfpTempModel, LpABTempModel }) => {
  if (!LfpTempModel || LfpTempModel.length === 0) {
    return null;
  }

  return (
    <section className="tabs tabs2" id="floorplans">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h3 className="wow fadeInUp animated">Floor Plans</h3>

            {/* Main Description */}
            {LpABTempModel?.floorMainDes && (
              <h4 className="wow fadeInUp animated">
                {LpABTempModel.floorMainDes}
              </h4>
            )}

            {/* Dynamic Radio Buttons */}
            {LfpTempModel.map((item, index) => (
              <input
                key={`radio-${index}`}
                type="radio"
                id={`plan-${index + 1}`}
                name="tabs2"
                className="tabs__input"
                defaultChecked={index === 0}
              />
            ))}

            {/* Tab Labels */}
            <div className="tabs__labels">
              {LfpTempModel.map((item, index) => (
                <label
                  key={`label-${index}`}
                  htmlFor={`plan-${index + 1}`}
                  className="tabs__label"
                >
                  {item.FloorPlanKatha}
                </label>
              ))}
            </div>

            {/* Tab Content */}
            <div className="tabs__content">
              {LfpTempModel.map((floorPlan, index) => (
                <div
                  className="tabs__panel"
                  id={`tab-panel-${index + 1}`}
                  key={`panel-${index}`}
                >
                  <div className="row">
                    {/* Ground Floor */}
                    <div className="col-md-6 mb-4">
                      <h3>Ground Floor</h3>
                      {floorPlan.FloorPlanGroundDes && (
                        <p>{floorPlan.FloorPlanGroundDes}</p>
                      )}

                      <div className="floor-card">
                        <div className="floor-slider">
                          {floorPlan.FloorPlanGroundImgs?.map((img, imgIndex) => (
                            <div className="floor-slide" key={`ground-slide-${imgIndex}`}>
                              <a href={img} className="floor_a">
                                <img
                                  src={img}
                                  alt={`Ground Floor Plan ${imgIndex + 1}`}
                                />
                              </a>
                            </div>
                          ))}
                        </div>

                        {/* Pagination Dots */}
                        {floorPlan.FloorPlanGroundImgs?.length > 1 && (
                          <div className="slider-dots">
                            {floorPlan.FloorPlanGroundImgs.map((_, dotIdx) => (
                              <span
                                key={`ground-dot-${dotIdx}`}
                                className={`dot ${dotIdx === 0 ? "active" : ""}`}
                              />
                            ))}
                          </div>
                        )}

                        <span className="floor-card-title">GROUND FLOOR PLAN</span>
                      </div>
                    </div>

                    {/* First Floor */}
                    <div className="col-md-6 mb-4">
                      <h3>First Floor</h3>
                      {floorPlan.FloorPlanFirstDes && (
                        <p>{floorPlan.FloorPlanFirstDes}</p>
                      )}

                      <div className="floor-card">
                        <div className="floor-slider">
                          {floorPlan.FloorPlanFirstImgs?.map((img, imgIndex) => (
                            <div className="floor-slide" key={`first-slide-${imgIndex}`}>
                              <a href={img} className="floor_a">
                                <img
                                  src={img}
                                  alt={`First Floor Plan ${imgIndex + 1}`}
                                />
                              </a>
                            </div>
                          ))}
                        </div>

                        {/* Pagination Dots */}
                        {floorPlan.FloorPlanFirstImgs?.length > 1 && (
                          <div className="slider-dots">
                            {floorPlan.FloorPlanFirstImgs.map((_, dotIdx) => (
                              <span
                                key={`first-dot-${dotIdx}`}
                                className={`dot ${dotIdx === 0 ? "active" : ""}`}
                              />
                            ))}
                          </div>
                        )}

                        <span className="floor-card-title">FIRST FLOOR PLAN</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandFloorPlans;