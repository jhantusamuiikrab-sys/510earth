import React from "react";
import "../../../src/assets/content/style.css";
import "../../assets/Font/css_new/style.css";
const LandFloorPlans = ({
  LfpTempModel,
  LpABTempModel,
}) => {
  // Same as:
  // Model.LfpTempModel != null && Model.LfpTempModel.Any()

  if (!LfpTempModel || LfpTempModel.length === 0) {
    return null;
  }

  return (
    <section className="tabs tabs2" id="floorplans">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">

            <h3 className="wow fadeInUp animated">
              Floor Plans
            </h3>

            {/* Floor Plan Main Description */}
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

            {/* Dynamic Tab Labels */}
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

            {/* Dynamic Tab Content */}
            <div className="tabs__content">

              {LfpTempModel.map((floorPlan, index) => (
                <div
                  className="tabs__panel"
                  id={`tab-panel-${index + 1}`}
                  key={`panel-${index}`}
                >

                  <div className="row">

                    {/* Ground Floor */}
                    <div className="col-md-6">

                      <h3>Ground Floor</h3>

                      {floorPlan.FloorPlanGroundDes && (
                        <h4>
                          {floorPlan.FloorPlanGroundDes}
                        </h4>
                      )}

                      <div className="tabs__panel-image">
                        <div className="floor-area1">

                          {floorPlan.FloorPlanGroundImgs &&
                            floorPlan.FloorPlanGroundImgs.length > 0 &&
                            floorPlan.FloorPlanGroundImgs.map(
                              (img, imgIndex) => {

                                const imagePath =
                                  `${img}`;

                                return (
                                  <div
                                    className="lightgallery"
                                    data-src={imagePath}
                                    key={`ground-${imgIndex}`}
                                  >
                                    <a
                                      href={imagePath}
                                      className="floor_a"
                                    >
                                      <img
                                        src={imagePath}
                                        alt="Ground Floor Image"
                                        className="img-fluid mb-3"
                                      />
                                    </a>
                                  </div>
                                );
                              }
                            )}

                        </div>
                      </div>

                    </div>

                    {/* First Floor */}
                    <div className="col-md-6">

                      <h3>First Floor</h3>

                      {floorPlan.FloorPlanFirstDes && (
                        <h4>
                          {floorPlan.FloorPlanFirstDes}
                        </h4>
                      )}

                      <div className="tabs__panel-image">
                        <div className="floor-area1">

                          {floorPlan.FloorPlanFirstImgs &&
                            floorPlan.FloorPlanFirstImgs.length > 0 &&
                            floorPlan.FloorPlanFirstImgs.map(
                              (img, imgIndex) => {

                                const imagePath =
                                  `${img}`;

                                return (
                                  <div
                                    className="lightgallery"
                                    data-src={imagePath}
                                    key={`first-${imgIndex}`}
                                  >
                                    <a
                                      href={imagePath}
                                      className="floor_a"
                                    >
                                      <img
                                        src={imagePath}
                                        alt="First Floor Image"
                                        className="img-fluid mb-3"
                                      />
                                    </a>
                                  </div>
                                );
                              }
                            )}

                        </div>
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