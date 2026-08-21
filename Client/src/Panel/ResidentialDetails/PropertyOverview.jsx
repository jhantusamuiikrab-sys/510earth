import React, { useState } from "react";
import "../../assets/paneldesign/css/PropertyOverview.css";

const PropertyOverview = ({ property }) => {
  const [showMore, setShowMore] = useState(false);

  if (!property) {
    return null;
  }

  return (
    <section className="overview_box" id="overview">
      <div className="container">
        <div className="row">
          {/* HEADING */}
          <div className="col-md-12">
            <h2 className="head">Overview</h2>
            <div className="central-border"></div>
          </div>

          {/* OVERVIEW CONTENT */}
          <div className="col-md-12">
            <div className="overview_area">
              {/* ALWAYS VISIBLE CONTENT */}
              <p>
                <strong>
                  Where Luxury Meets Convenience in the Heart of Rajarhat
                </strong>
              </p>

              <p>
                <strong>
                  ✔️ Premium G+29 High-Rise Residential Towers
                  <br />
                  ✔️ 6 Elegant Towers Across 10 Acres
                  <br />
                  ✔️ Massive 72% Open Green Space
                  <br />
                  ✔️ Excellent Connectivity via Rajarhat–Airport 6-Lane Road
                  <br />
                  ✔️ Just 12 km from Netaji Subhas Chandra Bose International Airport
                  <br />
                  ✔️ Close to Eco Space, Tata Medical Center & City Centre 2
                  <br />
                  ✔️ Luxury Clubhouse with Premium Lifestyle Amenities
                  <br />
                  ✔️ 24×7 Security with CCTV Surveillance
                  <br />
                  ✔️ Perfect for Families, Professionals & Investors
                  <br />
                  ✔️ Modern Architecture with Earthquake-Resistant Design
                </strong>
              </p>

              {/* SMOOTH EXPANDABLE CONTAINER */}
              <div
                id="overview_collapse"
                className={`overview_expandable ${showMore ? "is-expanded" : "is-collapsed"}`}
              >
                <div className="overview_expandable_inner">
                  <p>
                    <strong>Overview</strong>
                  </p>

                  <p>
                    <strong>
                      DTC Downtown is a landmark premium residential township
                      located in the fast-growing neighbourhood of Rajarhat,
                      Kolkata. Spread across 10 acres with an impressive 72%
                      open space, the project features 6 iconic G+29 towers
                      designed to offer a luxurious and peaceful lifestyle.
                    </strong>
                  </p>

                  <p>
                    <strong>
                      Strategically located near the 6-lane Rajarhat to Airport
                      Road, DTC Downtown provides excellent connectivity to New
                      Town, Eco Space, Tata Medical Center, City Centre 2,
                      Netaji Subhas Chandra Bose International Airport, and
                      major educational institutions.
                    </strong>
                  </p>

                  <p>
                    <strong>
                      Residents enjoy a wide range of thoughtfully designed
                      lifestyle amenities, including a grand clubhouse,
                      swimming pool, health club, indoor sports, landscaped
                      gardens, jogging track, meditation lawn, amphitheatre,
                      mini theatre, and children's play areas. Combining
                      premium living, modern comforts, and a prime location,
                      DTC Downtown is an excellent choice for both homebuyers
                      and long-term investors.
                    </strong>
                  </p>
                </div>
              </div>
            </div>

            {/* READ MORE / READ LESS BUTTON */}
            <div className="text-right">
              <a
                className="overview_btn"
                role="button"
                aria-expanded={showMore}
                aria-controls="overview_collapse"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? "Read Less..." : "Read More..."}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyOverview;