import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";


import "../../../src/assets/content/style.css";

import propertyPlaceholder from "../../../src/assets/paneldesign/images/DTC-Downtown-Cover-Image.png";
import listingImage from "../../../src/assets/paneldesign/images/DTC-Downtown-Listing-Image.png";

const PropertyHero = ({ property }) => {

  if (!property) {
    return (
      <div>
        Loading property details...
      </div>
    );
  }

  return (
    <section className="residntl_detl_banner mrgn_tp">

      {/* =========================================
          COVER IMAGE
      ========================================== */}

      <img
        src={propertyPlaceholder}
        alt="DTC Downtown"
        title="DTC Downtown"
      />


      <div className="container">

        <div className="row">

          <div className="col-sm-12">

            {/* =========================================
                PROPERTY NAME
            ========================================== */}

            <h2>
              DTC Downtown
            </h2>


            {/* =========================================
                CAPTION
            ========================================== */}

            <p>
              Luxury Living Awaits You at DTC Downtown!
            </p>


            {/* =========================================
                LOCATION
            ========================================== */}

            <p className="project-location">

              <FaMapMarkerAlt />

              <span className="text-capitalize">
                Rajarhat
              </span>

            </p>


            {/* =========================================
                UNDER CONSTRUCTION
            ========================================== */}

            <div className="project_box">

              <div className="project-status">
                Under Construction
              </div>

              <div className="possession_pad">

                <div className="possession_date">

                  <span>
                    Possession Date
                    <br />
                    2028-Jan
                  </span>

                </div>

              </div>

            </div>


            {/* =========================================
                LISTING IMAGE
            ========================================== */}

            <div className="cover-profilech">

              <img
                src={listingImage}
                alt="DTC Downtown"
                title="DTC Downtown"
              />

            </div>


          </div>

        </div>

      </div>

    </section>
  );
};

export default PropertyHero;