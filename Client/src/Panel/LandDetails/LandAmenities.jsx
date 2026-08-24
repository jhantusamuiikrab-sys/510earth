import React from "react";
import "../../../src/assets/content/style.css";
import "../../assets/Font/css_new/style.css";
const LandAmenities = ({ amineties }) => {
  if (!amineties || amineties.length === 0) {
    return null;
  }

  // Same as:
  // Model.amineties.OrderBy(x => x.Name)

  const sortedAmenities = [...amineties].sort((a, b) =>
    (a.Name || "").localeCompare(b.Name || "")
  );

  return (
    <section className="amenities_area" id="amenities">
      <div className="container">

        <div className="row">
          <div className="col-md-12">

            <div className="aminitiens-holder">

              <div className="aminitiens-holder-box">
                <h3>Additional Amenities</h3>
              </div>

              <div className="aminitiens-holder-down"></div>

            </div>

          </div>
        </div>

        <div className="row">

          {sortedAmenities.map((item, index) => {

            const imagePath =
              `/Images/LandPlotImages/LpIconImage/${item.Image}`;

            return (
              <div
                className="col-6 col-md-2 d-flex"
                key={item._id || index}
              >
                <div className="ame_box wow zoomIn animated">

                  <img
                    src={imagePath}
                    alt={item.Name || "Amenity"}
                  />

                  <p>
                    {item.Name}
                  </p>

                </div>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default LandAmenities;