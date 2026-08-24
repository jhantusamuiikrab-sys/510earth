import React from "react";
import "../../../src/assets/content/style.css";
import "../../assets/Font/css_new/style.css";
const LandCoverBanner = ({ LandcvrimgBnr }) => {
  // Don't render the section if there are no banner images
  if (!LandcvrimgBnr || LandcvrimgBnr.length === 0) {
    return null;
  }

  return (
    <section className="slide_banner">
      <div className="slider_area before-sec">

        {LandcvrimgBnr.map((itm, index) => (
          <div className="slide" key={itm._id || index}>

            <div className="slide_img">
              <img
                src={`${itm.CVLandCvrImgName}`}
                alt=""
                data-lazy={`${itm.CVLandCvrImgName}`}
                className="full-image animated"
                data-animation-in="zoomInImage"
              />
            </div>

            <div className="ban-up">
              <div className="container">
                <div className="row">

                  <div className="col-sm-12 sec-prop">

                    <div className="propdetleft">
                      <ul className="sec-display">

                        <li className="">
                          <div className="prolftin">
                            <small>Location</small>
                            <span>{itm.CVPropertyLocation}</span>
                          </div>
                        </li>

                        <li className="">
                          <div className="prolftin">
                            <small>PRICE</small>
                            <span>{itm.CVPropertyPrice}</span>
                          </div>
                        </li>

                        <li className="sec-1pad">
                          <div className="prolftin">
                            <small>{itm.CVPropertyType}</small>
                            <span>{itm.CVPTypeDesc}</span>
                          </div>
                        </li>

                      </ul>
                    </div>

                    <div className="propdetright">

                      <a className="btn_area toggle Brocclick-me">
                        Download Brochure
                      </a>

                      <a
                        href="tel:+919073338396"
                        className="btn_area"
                      >
                        <i className="fa-solid fa-phone fa-shake"></i>{" "}
                        Call Now
                      </a>

                    </div>

                  </div>

                </div>
              </div>
            </div>

          </div>
        ))}

      </div>
    </section>
  );
};

export default LandCoverBanner;