import React, { useEffect, useState } from "react";
import "../../../src/assets/content/style.css";
import "../../assets/Font/css_new/style.css";

const LandAbout = ({
  Aboutlst,
  LpABTempModel,
  LandAPImgAltTxt,
  LandAPImgTitle,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!Aboutlst || Aboutlst.length === 0) {
    return null;
  }

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === Aboutlst.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Aboutlst.length - 1 : prev - 1
    );
  };

  // Optional automatic sliding
  useEffect(() => {
    if (Aboutlst.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === Aboutlst.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [Aboutlst.length]);

  return (
    <section className="about-box" id="overview">
      <div className="container">
        <div className="row">

          {/* About Content */}
          {LpABTempModel && (
            <div className="col-lg-6 sec-ab">
              <div className="box-about wow zoomIn animated">

                <h2>{LpABTempModel.AbProjectName}</h2>

                <h4>{LpABTempModel.AbComapanyName}</h4>

                <h3>{LpABTempModel.AbDes}</h3>

              </div>
            </div>
          )}

          {/* About Image Slider */}
          <div className="col-lg-6">
            <div className="about-image-slider">

              {/* Previous Button */}
              {Aboutlst.length > 1 && (
                <button
                  type="button"
                  className="about-slider-arrow about-prev"
                  onClick={prevSlide}
                  aria-label="Previous image"
                >
                  &#10094;
                </button>
              )}

              {/* Slider Window */}
              <div className="about-slider-window">
                <div
                  className="about-slider-track"
                  style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                  }}
                >
                  {Aboutlst.map((img, index) => {
                    const imagePath = `${img}`;

                    return (
                      <div
                        className="about-slide"
                        key={index}
                      >
                        <a
                          href={imagePath}
                          className="lightbox-trigger"
                        >
                          <img
                            src={imagePath}
                            alt={LandAPImgAltTxt || ""}
                            title={LandAPImgTitle || ""}
                          />
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Next Button */}
              {Aboutlst.length > 1 && (
                <button
                  type="button"
                  className="about-slider-arrow about-next"
                  onClick={nextSlide}
                  aria-label="Next image"
                >
                  &#10095;
                </button>
              )}

              {/* Dots */}
              {Aboutlst.length > 1 && (
                <div className="about-slider-dots">
                  {Aboutlst.map((_, index) => (
                    <button
                      type="button"
                      key={index}
                      className={`about-dot ${
                        currentIndex === index ? "active" : ""
                      }`}
                      onClick={() => setCurrentIndex(index)}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LandAbout;