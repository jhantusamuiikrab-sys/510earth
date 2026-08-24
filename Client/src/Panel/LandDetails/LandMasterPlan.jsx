import React from "react";
import "../../../src/assets/content/style.css";
import "../../assets/Font/css_new/style.css";
const LandMasterPlan = ({
  MasterPlanImage,
  LandMPImgAltTxt,
  LandMPImgTitle,
  LpMSTempModel,
}) => {
  // Same as:
  // !string.IsNullOrEmpty(Model.MasterPlanImage)

  if (!MasterPlanImage) {
    return null;
  }

  const imagePath = `${MasterPlanImage}`;

  return (
    <section className="about-box" id="layout">
      <div className="container">
        <div className="row">

          {/* Left: Master Plan Image with LightGallery */}
          <div className="col-lg-6 lightgallery">
            <div
              className="box-area2 wow fadeInRight"
              data-src={imagePath}
            >
              <a href={imagePath} className="port_wrap">
                <img
                  src={imagePath}
                  alt={LandMPImgAltTxt || ""}
                  title={LandMPImgTitle || ""}
                  className="img-fluid rounded shadow-sm"
                />
              </a>
            </div>
          </div>

          {/* Right: Master Plan Description */}
          {LpMSTempModel && (
            <div className="col-lg-6 sec-ab">
              <div className="box-about wow zoomIn animated">

                <h2>
                  PROJECT NAME:- {LpMSTempModel.MstProjectName}
                </h2>

                <h4>
                  COMPANY NAME:- {LpMSTempModel.MstComapanyName}
                </h4>

                <h3>
                  {LpMSTempModel.MstDes}
                </h3>

              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default LandMasterPlan;