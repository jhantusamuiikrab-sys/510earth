import React, { useState } from "react";

import "../../../src/assets/Font/css/style.css";
import "../../../src/assets/content/style.css";
import "../../assets/paneldesign/css/Amenities.css";


const testAmenities = [
  {
    _id: 1,
    Name: "24/7 Water Supply",
    Image: "637370611025675969_a19.png"
  },
  {
    _id: 2,
    Name: "Amphitheatre",
    Image: "637314420455464097_a2.png"
  },
  {
    _id: 3,
    Name: "Car Parking/ Reserved Parking",
    Image: "637370613500050864_a16.png"
  },
  {
    _id: 4,
    Name: "CCTV Camera",
    Image: "637370627064425762_a35.png"
  },
  {
    _id: 5,
    Name: "Children's Play Area",
    Image: "637370613995832356_a13.png"
  },
  {
    _id: 6,
    Name: "Club House",
    Image: "637370618070051024_a28.png"
  },
  {
    _id: 7,
    Name: "Coffee Lounge & Restaurants",
    Image: "637370627787707732_a38.png"
  },
  {
    _id: 8,
    Name: "Covered Fountain",
    Image: "637370609876457154_a1.png"
  },

  // Add all remaining amenities from your API here
];


const getAmenityImage = (imageName) => {
  return new URL(
    `../../assets/paneldesign/images/Amenity/${imageName}`,
    import.meta.url
  ).href;
};


const Amenities = ({ property }) => {

  const [showMore, setShowMore] = useState(false);

  const amenities =
    property?.amenities?.length > 0
      ? property.amenities
      : testAmenities;


  /*
   * Keep API order.
   * DO NOT sort alphabetically because the reference
   * follows the supplied amenity order.
   */
  const sortedAmenities = [...amenities];


  const visibleAmenities = showMore
    ? sortedAmenities
    : sortedAmenities.slice(0, 6);


  return (
    <section
      className={`amenities_area ${
        showMore ? "amenities_expanded" : ""
      }`}
      id="amenities"
    >

      {/* Background */}
      <div className="amenities_overlay"></div>


      <div className="container amenities_content">

        {/* ==========================================
            AMENITIES HEADING
        ========================================== */}

        <div className="aminitiens-holder">

          <div className="aminitiens-holder-box">

            <h3>AMENITIES</h3>

          </div>

        </div>


        {/* ==========================================
            AMENITIES GRID
        ========================================== */}

        <div className="amenities_grid">

          {visibleAmenities.map((item, index) => (

            <div
              className="amenity_item"
              key={item._id || index}
            >

              <div className="ame_box">

                <div className="amenity_icon">

                  <img
                    src={getAmenityImage(item.Image)}
                    alt={item.Name}
                  />

                </div>

                <p>{item.Name}</p>

              </div>

            </div>

          ))}

        </div>


        {/* ==========================================
            SHOW MORE / SHOW LESS
        ========================================== */}

        {sortedAmenities.length > 6 && (

          <button
            type="button"
            className="amenities_show_btn"
            onClick={() => setShowMore((prev) => !prev)}
            aria-expanded={showMore}
          >

            {showMore ? "SHOW LESS" : "SHOW MORE"}

          </button>

        )}

      </div>

    </section>
  );
};


export default Amenities;