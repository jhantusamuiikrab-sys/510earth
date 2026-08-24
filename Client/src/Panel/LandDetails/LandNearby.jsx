import React from "react";
import "../../../src/assets/content/style.css";
import "../../assets/Font/css_new/style.css";
const LandNearby = ({ nearbies, mapimageTitle }) => {
  // Don't render the section if there is no nearby data
  if (!nearbies || nearbies.length === 0) {
    return null;
  }

  return (
    <section className="location-tap" id="NearBy">

      <div className="container">

        <div className="row">

          <div className="col-md-6">

            <div className="location-sec wow animate__fadeInLeft">

              <h2>Nearby Service</h2>

            </div>

            <div className="scroll scrollscreen">

              <div className="scrollscreen--content">

                <div className="row">

                  {nearbies.map((item, index) => {

                    const imagePath =
                      `/Images/LandPlotImages/LpIconImage/${item.Image}`;

                    return (
                      <div
                        className="col-lg-6 col-sm-12 d-flex"
                        key={item._id || index}
                      >

                        <div className="map-loc d-flex">

                          <div className="loc-img">

                            <img
                              src={imagePath}
                              alt={item.Name || "Nearby service"}
                            />

                          </div>

                          <div className="loc-txt">

                            <h3>
                              {item.Name} -
                            </h3>

                            <h4>
                              <i className="fa-solid fa-location-dot"></i>{" "}
                              {item.NearbyText}
                            </h4>

                          </div>

                        </div>

                      </div>
                    );
                  })}

                </div>

              </div>

            </div>

          </div>

          {/* Map */}
          <div className="col-md-6">

            {mapimageTitle && (
              <div className="map_area" id="location">

                <iframe
                  src={mapimageTitle}
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location Map"
                ></iframe>

              </div>
            )}

          </div>

        </div>

      </div>

    </section>
  );
};

export default LandNearby;