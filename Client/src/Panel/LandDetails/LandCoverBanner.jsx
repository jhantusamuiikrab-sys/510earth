import React, { useEffect, useState } from "react";

import "../../../src/assets/content/style.css";
import "../../assets/Font/css_new/style.css";
import BrochureForm from "../ResidentialDetails/BrochureForm";

const LandCoverBanner = ({ LandcvrimgBnr = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // ==========================================
  // IF NO DATA
  // ==========================================

  if (!LandcvrimgBnr || LandcvrimgBnr.length === 0) {
    return null;
  }

  // ==========================================
  // NEXT SLIDE
  // ==========================================

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === LandcvrimgBnr.length - 1 ? 0 : prev + 1,
    );
  };

  // ==========================================
  // PREVIOUS SLIDE
  // ==========================================

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? LandcvrimgBnr.length - 1 : prev - 1,
    );
  };

  // ==========================================
  // AUTO SLIDE
  // ==========================================

  useEffect(() => {
    if (LandcvrimgBnr.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === LandcvrimgBnr.length - 1 ? 0 : prev + 1,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [LandcvrimgBnr.length]);

  // ==========================================
  // CURRENT PROPERTY
  // ==========================================

  const currentProperty = LandcvrimgBnr[currentSlide];

  const handleOpenModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <section className="slide_banner">
      {/* ==========================================
          SLIDER AREA
      ========================================== */}

      <div className="slider_area before-sec">
        {/* ==========================================
            SLIDES
        ========================================== */}

        {LandcvrimgBnr.map((itm, index) => (
          <div
            className="slide"
            key={itm._id || index}
            style={{
              display: index === currentSlide ? "block" : "none",
            }}
          >
            {/* ==========================================
                BANNER IMAGE
            ========================================== */}

            <div className="slide_img">
              <img
                src={itm.CVLandCvrImgName}
                alt={
                  itm.CVPropertyLocation
                    ? `Land property in ${itm.CVPropertyLocation}`
                    : "Land Property"
                }
                data-lazy={itm.CVLandCvrImgName}
                className="full-image animated"
                data-animation-in="zoomInImage"
              />
            </div>

            {/* ==========================================
                PROPERTY INFORMATION
            ========================================== */}

            <div className="ban-up">
              <div className="container">
                <div className="row">
                  <div className="col-sm-12 sec-prop">
                    {/* ==========================================
                        LEFT PROPERTY DETAILS
                    ========================================== */}

                    <div className="propdetleft">
                      <ul className="sec-display">
                        {/* LOCATION */}

                        <li>
                          <div className="prolftin">
                            <small>Location</small>

                            <span>{itm.CVPropertyLocation || "-"}</span>
                          </div>
                        </li>

                        {/* PRICE */}

                        <li>
                          <div className="prolftin">
                            <small>PRICE</small>

                            <span>{itm.CVPropertyPrice || "-"}</span>
                          </div>
                        </li>

                        {/* PROPERTY TYPE */}

                        <li className="sec-1pad">
                          <div className="prolftin">
                            <small>
                              {itm.CVPropertyType || "Property Type"}
                            </small>

                            <span>{itm.CVPTypeDesc || "-"}</span>
                          </div>
                        </li>
                      </ul>
                    </div>

                    {/* ==========================================
                        RIGHT BUTTONS
                    ========================================== */}

                    <div className="propdetright">
                      {/* BROCHURE */}

                      <button
                        type="button"
                        className="btn_area Brocclick-me"
                        onClick={handleOpenModal}
                      >
                        Download Brochure
                      </button>

                      {/* CALL NOW */}

                      <a href="tel:+919073338396" className="btn_area">
                        <i className="fa-solid fa-phone fa-shake"></i> Call Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* ==========================================
            PREVIOUS BUTTON
        ========================================== */}

        {LandcvrimgBnr.length > 1 && (
          <button
            type="button"
            className="slick-arrow slick-prev"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
        )}

        {/* ==========================================
            NEXT BUTTON
        ========================================== */}

        {LandcvrimgBnr.length > 1 && (
          <button
            type="button"
            className="slick-arrow slick-next"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        )}
      </div>

      {/* ==========================================
          DOT NAVIGATION
      ========================================== */}

      {LandcvrimgBnr.length > 1 && (
        <div
          className="land-banner-dots"
          style={{
            position: "absolute",
            bottom: "30px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "8px",
            zIndex: 5,
          }}
        >
          {LandcvrimgBnr.map((itm, index) => (
            <button
              key={itm._id || index}
              type="button"
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                border: "none",
                padding: 0,
                cursor: "pointer",
                background: currentSlide === index ? "#ff9d00" : "#ffffff",
                opacity: currentSlide === index ? 1 : 0.6,
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      )}
      {/* Modal Popup */}
      {isModalOpen && (
        <BrochureForm
          // propertyName={property?.name}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
};

export default LandCoverBanner;
