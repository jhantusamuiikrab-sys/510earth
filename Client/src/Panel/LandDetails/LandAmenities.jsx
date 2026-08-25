import React from "react";
import "../../assets/paneldesign/css/LandAminities.css";

const LandAmenities = ({ amineties }) => {
  if (!amineties || amineties.length === 0) {
    return null;
  }

  const sortedAmenities = [...amineties].sort((a, b) =>
    (a.Name || "").localeCompare(b.Name || "")
  );

  return (
    <section className="amenities_area" id="amenities">
      <div className="container">
        
        {/* Section Heading */}
        <div className="row">
          <div className="col-12">
            <h2 className="amenities_title text-center">Additional Amenities</h2>
          </div>
        </div>

        {/* 6-Column Grid Layout */}
        <div className="row g-3 justify-content-center">
          {sortedAmenities.map((item, index) => {
            const imagePath = `/Images/LandPlotImages/LpIconImage/${item.Image}`;

            return (
              <div
                className="col-6 col-sm-4 col-md-3 col-lg-2 d-flex"
                key={item._id || index}
              >
                {/* Add "active" class to highlight specific cards like Gym */}
                <div className={`ame_box ${item.Name === "Gym" ? "active" : ""}`}>
                  <div className="ame_icon_wrapper">
                    <img
                      src={imagePath}
                      alt={item.Name || "Amenity"}
                    />
                  </div>
                  <p className="ame_text">{item.Name}</p>
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