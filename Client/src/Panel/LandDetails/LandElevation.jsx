import React from "react";
import "../../../src/assets/content/style.css";
import "../../assets/Font/css_new/style.css";
const LandElevation = ({
  LOETempModel,
  LpABTempModel,
}) => {
  // Same as:
  // Model.LOETempModel != null && Model.LOETempModel.Any()

  if (!LOETempModel || LOETempModel.length === 0) {
    return null;
  }

  return (
    <section className="tabs" id="elivation">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">

            <h3 className="wow fadeInUp animated">
              Our Elevation
            </h3>

            {/* Elevation Main Description */}
            {LpABTempModel?.elevationMainDes && (
              <h4 className="wow fadeInUp animated">
                {LpABTempModel.elevationMainDes}
              </h4>
            )}

            {/* Generate input radios dynamically */}
            {LOETempModel.map((elevation, index) => (
              <input
                key={`radio-${index}`}
                type="radio"
                id={`tab-${index + 1}`}
                name="tabs"
                className="tabs__input"
                defaultChecked={index === 0}
              />
            ))}

            {/* Generate tab labels dynamically */}
            <div className="tabs__labels">
              {LOETempModel.map((elevation, index) => (
                <label
                  key={`label-${index}`}
                  htmlFor={`tab-${index + 1}`}
                  className="tabs__label"
                >
                  {elevation.LOEKatha}
                </label>
              ))}
            </div>

            {/* Generate tab content dynamically */}
            <div className="tabs__content">

              {LOETempModel.map((elevation, index) => (
                <div
                  className="tabs__panel"
                  id={`tab-panel-${index + 1}`}
                  key={`panel-${index}`}
                >

                  {/* Elevation Images - Horizontal Scroll */}
<div className="elevation-image-scroll">

  <div className="lightgallery elevation-gallery">

    {/* Ground Floor Images */}
    {elevation.LOEGroundImgs &&
      elevation.LOEGroundImgs.length > 0 &&
      elevation.LOEGroundImgs.map((img, imgIndex) => {
        const imagePath = `${img}`;

        return (
          <div
            className="elevation-slide"
            data-src={imagePath}
            key={`ground-${imgIndex}`}
          >
            <a
              href={imagePath}
              className="tabs__panel-image"
            >
              <img
                src={imagePath}
                alt="Ground Floor Elevation"
              />
            </a>
          </div>
        );
      })}

    {/* First Floor Images */}
    {elevation.LOEFirstImgs &&
      elevation.LOEFirstImgs.length > 0 &&
      elevation.LOEFirstImgs.map((img, imgIndex) => {
        const imagePath = `${img}`;

        return (
          <div
            className="elevation-slide"
            data-src={imagePath}
            key={`first-${imgIndex}`}
          >
            <a
              href={imagePath}
              className="tabs__panel-image"
            >
              <img
                src={imagePath}
                alt="First Floor Elevation"
              />
            </a>
          </div>
        );
      })}

  </div>

</div>

                  {/* Descriptions */}
                  <div className="row mt-3">

                    {/* Ground Floor Description */}
                    <div className="col-md-6">
                      {elevation.LOEGroundDes && (
                        <>
                          <h5>Ground Floor Description</h5>
                          <p>{elevation.LOEGroundDes}</p>
                        </>
                      )}
                    </div>

                    {/* First Floor Description */}
                    <div className="col-md-6">
                      {elevation.LOEFirstDes && (
                        <>
                          <h5>First Floor Description</h5>
                          <p>{elevation.LOEFirstDes}</p>
                        </>
                      )}
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

export default LandElevation;