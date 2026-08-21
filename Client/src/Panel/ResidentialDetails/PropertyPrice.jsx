import React from "react";

import "../../../src/assets/Font/css/style.css";
import "../../../src/assets/content/style.css";

const PropertyPrice = ({ property }) => {

  if (!property) {
    return null;
  }

  return (
    <section className="price_area">

      <div className="container">

        <div className="row justify-content-center">

          {/* 2 BHK */}
          <div className="col-md-4 col-6 col-pad-right">
            <div className="price_btn">
              2BHK : <span>65 Lakhs</span> Onwards*
            </div>
          </div>

          {/* 3 BHK */}
          <div className="col-md-4 col-6 col-pad-right">
            <div className="price_btn">
              3BHK : <span>75 Lakhs</span> Onwards*
            </div>
          </div>

          {/* 4 BHK */}
          <div className="col-md-4 col-6 col-pad-right">
            <div className="price_btn">
              4BHK : <span>1.3 Cr</span> Onwards*
            </div>
          </div>

          {/* E-BROCHURE */}
          {/* {property.EBrocher &&
            property.EBrocher.trim() !== "" && (

              <div className="col-md-12">

                <a
                  href="#"
                  id="click-me"
                  className="download_btn"
                >
                  Download E-Brochure{" "}
                  <i className="fas fa-download"></i>
                </a>

              </div>

            )} */}

            <div className="col-md-12">
  <a
    href="#"
    id="click-me"
    className="download_btn"
  >
    Download E-Brochure{" "}
    <i className="fas fa-download"></i>
  </a>
</div>

        </div>

      </div>

    </section>
  );
};

export default PropertyPrice;