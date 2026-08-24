import React, { useEffect, useRef, useState } from "react";

import "../../../src/assets/Font/css_new/style.css";
import "../../../src/assets/content/style.css";
import "../../assets/paneldesign/css/PropertyGallery.css";


// ==========================================
// TEST GALLERY DATA
// ==========================================
// Only filenames are stored here.
//
// Later this can come directly from API:
// property.GalleryName
// ==========================================

const testGalleryImages = [
  "gallery1.png",
  "gallery2.png",
  "gallery3.png",
  "gallery4.png",
  "gallery5.png",
  "gallery6.png"
];


// ==========================================
// GET GALLERY IMAGE PATH
// ==========================================

const getGalleryImage = (imageName) => {

  if (!imageName) {
    return "";
  }

  // If API later returns a complete URL
  if (
    imageName.startsWith("http://") ||
    imageName.startsWith("https://") ||
    imageName.startsWith("/")
  ) {
    return imageName;
  }

  // Local images inside src/assets
  return new URL(
    `../../assets/paneldesign/images/${imageName}`,
    import.meta.url
  ).href;
};


const PropertyGallery = ({ property }) => {

  // ==========================================
  // GALLERY DATA
  // ==========================================

  const galleryImages =
    property?.GalleryName?.length > 0
      ? property.GalleryName
      : testGalleryImages;


  // ==========================================
  // SLIDER
  // ==========================================

  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleImages = 4;


  // ==========================================
  // LIGHTBOX
  // ==========================================

  const [selectedImage, setSelectedImage] = useState(null);


  // ==========================================
  // SCROLL ANIMATION
  // ==========================================

  const galleryRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);


  // ==========================================
  // INTERSECTION OBSERVER
  // ==========================================

  useEffect(() => {

    const observer = new IntersectionObserver(
      ([entry]) => {

        if (entry.isIntersecting) {

          setIsVisible(true);

        }

      },
      {
        threshold: 0.2
      }
    );


    if (galleryRef.current) {

      observer.observe(galleryRef.current);

    }


    return () => {

      if (galleryRef.current) {

        observer.unobserve(galleryRef.current);

      }

    };

  }, []);


  // ==========================================
  // NEXT SLIDE
  // ==========================================

  const handleNext = () => {

    setCurrentIndex((prev) => {

      const maxIndex =
        Math.max(
          galleryImages.length - visibleImages,
          0
        );


      if (prev >= maxIndex) {

        return 0;

      }


      return prev + 1;

    });

  };


  // ==========================================
  // PREVIOUS SLIDE
  // ==========================================

  const handlePrevious = () => {

    setCurrentIndex((prev) => {

      const maxIndex =
        Math.max(
          galleryImages.length - visibleImages,
          0
        );


      if (prev <= 0) {

        return maxIndex;

      }


      return prev - 1;

    });

  };


  // ==========================================
  // OPEN LIGHTBOX
  // ==========================================

  const openLightbox = (index) => {

    setSelectedImage(index);

  };


  // ==========================================
  // CLOSE LIGHTBOX
  // ==========================================

  const closeLightbox = () => {

    setSelectedImage(null);

  };


  // ==========================================
  // LIGHTBOX NEXT
  // ==========================================

  const handleLightboxNext = (event) => {

    event.stopPropagation();


    setSelectedImage((prev) => {

      if (
        prev ===
        galleryImages.length - 1
      ) {

        return 0;

      }


      return prev + 1;

    });

  };


  // ==========================================
  // LIGHTBOX PREVIOUS
  // ==========================================

  const handleLightboxPrevious = (event) => {

    event.stopPropagation();


    setSelectedImage((prev) => {

      if (prev === 0) {

        return galleryImages.length - 1;

      }


      return prev - 1;

    });

  };


  // ==========================================
  // KEYBOARD CONTROLS
  // ==========================================

  useEffect(() => {

    const handleKeyDown = (event) => {

      if (selectedImage === null) {

        return;

      }


      // ESC

      if (event.key === "Escape") {

        setSelectedImage(null);

      }


      // RIGHT

      if (event.key === "ArrowRight") {

        setSelectedImage((prev) => {

          if (
            prev ===
            galleryImages.length - 1
          ) {

            return 0;

          }


          return prev + 1;

        });

      }


      // LEFT

      if (event.key === "ArrowLeft") {

        setSelectedImage((prev) => {

          if (prev === 0) {

            return galleryImages.length - 1;

          }


          return prev - 1;

        });

      }

    };


    document.addEventListener(
      "keydown",
      handleKeyDown
    );


    return () => {

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

    };

  }, [
    selectedImage,
    galleryImages.length
  ]);


  // ==========================================
  // LOCK BODY SCROLL
  // ==========================================

  useEffect(() => {

    if (selectedImage !== null) {

      document.body.style.overflow = "hidden";

    }
    else {

      document.body.style.overflow = "";

    }


    return () => {

      document.body.style.overflow = "";

    };

  }, [selectedImage]);


  // ==========================================
  // VISIBLE IMAGES
  // ==========================================

  const visibleGallery =
    galleryImages.slice(
      currentIndex,
      currentIndex + visibleImages
    );


  // ==========================================
  // NO IMAGES
  // ==========================================

  if (!galleryImages.length) {

    return null;

  }


  return (
    <>

      {/* ==========================================
          GALLERY SECTION
      ========================================== */}

      <section
        className={`gallery_area ${
          isVisible
            ? "gallery_visible"
            : ""
        }`}
        id="gallery"
        ref={galleryRef}
      >

        <div className="container">


          {/* ==========================================
              HEADER
          ========================================== */}

          <div className="row">

            <div className="col-md-12">

              <h2 className="head">
                Gallery
              </h2>

              <div className="central-border"></div>

            </div>

          </div>


          {/* ==========================================
              SLIDER
          ========================================== */}

          <div className="row">

            <div className="col-md-12">

              <div className="gallery_slide text-center gal_box">


                {/* ==========================================
                    LEFT ARROW
                ========================================== */}

                {galleryImages.length > visibleImages && (

                  <button
                    type="button"
                    className="gallery_arrow gallery_arrow_left"
                    onClick={handlePrevious}
                    aria-label="Previous images"
                  >

                    ❮

                  </button>

                )}


                {/* ==========================================
                    IMAGES
                ========================================== */}

                <div className="gallery_images">

                  {visibleGallery.map(
                    (image, index) => {

                      const actualIndex =
                        currentIndex + index;


                      return (

                        <div
                          className={`gallerylight_box gallery_item ${
                            isVisible
                              ? "gallery_item_visible"
                              : ""
                          }`}
                          key={
                            `${image}-${actualIndex}`
                          }
                          style={{
                            transitionDelay:
                              `${index * 100}ms`
                          }}
                        >

                          {/* ==========================================
                              IMAGE WRAPPER
                          ========================================== */}

                          <div
                            className="gallery_image_wrapper"
                            onClick={() =>
                              openLightbox(
                                actualIndex
                              )
                            }
                          >

                            <img
                              className="img-responsive"
                              src={getGalleryImage(
                                image
                              )}
                              alt={`Gallery ${
                                actualIndex + 1
                              }`}
                            />


                            {/* ==========================================
                                MAGNIFY OVERLAY
                            ========================================== */}

                            <div className="gallery_zoom_overlay">

                              <span className="gallery_zoom_icon">

                                <span className="magnifying_glass">

                                  <span className="magnify_plus">
                                    +
                                  </span>

                                </span>

                              </span>

                            </div>

                          </div>

                        </div>

                      );

                    }
                  )}

                </div>


                {/* ==========================================
                    RIGHT ARROW
                ========================================== */}

                {galleryImages.length > visibleImages && (

                  <button
                    type="button"
                    className="gallery_arrow gallery_arrow_right"
                    onClick={handleNext}
                    aria-label="Next images"
                  >

                    ❯

                  </button>

                )}

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ==========================================
          LIGHTBOX
      ========================================== */}

      {selectedImage !== null && (

        <div
          className="gallery_lightbox"
          onClick={closeLightbox}
        >


          {/* ==========================================
              CLOSE
          ========================================== */}

          <button
            type="button"
            className="gallery_lightbox_close"
            onClick={closeLightbox}
            aria-label="Close gallery"
          >

            ×

          </button>


          {/* ==========================================
              PREVIOUS
          ========================================== */}

          <button
            type="button"
            className="gallery_lightbox_arrow gallery_lightbox_previous"
            onClick={
              handleLightboxPrevious
            }
            aria-label="Previous image"
          >

            ❮

          </button>


          {/* ==========================================
              IMAGE
          ========================================== */}

          <div
            className="gallery_lightbox_content"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <img
              src={getGalleryImage(
                galleryImages[
                  selectedImage
                ]
              )}
              alt={`Gallery ${
                selectedImage + 1
              }`}
            />


            {/* ==========================================
                COUNTER
            ========================================== */}

            <div className="gallery_image_counter">

              {selectedImage + 1}
              {" / "}
              {galleryImages.length}

            </div>

          </div>


          {/* ==========================================
              NEXT
          ========================================== */}

          <button
            type="button"
            className="gallery_lightbox_arrow gallery_lightbox_next"
            onClick={
              handleLightboxNext
            }
            aria-label="Next image"
          >

            ❯

          </button>

        </div>

      )}

    </>
  );

};


export default PropertyGallery;