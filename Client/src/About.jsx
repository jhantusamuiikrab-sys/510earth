import React, { useEffect, useRef, useState } from "react";
import "../src/assets/Font/css/style.css";
import "../src/assets/content/style.css";
import "../src/style/About.css";
function About() {
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [isParaOneVisible, setIsParaOneVisible] = useState(false);
  const [isParaTwoVisible, setIsParaTwoVisible] = useState(false);
  const [isImgVisible, setIsImgVisible] = useState(false);
  const [isiconOne, setIconOne] = useState(false);
  const [isiconTwo, setIconTwo] = useState(false);
  const imgRef = useRef(null);
  const paraOneRef = useRef(null);
  const paraTwoRef = useRef(null);
  const iconOneRef = useRef(null);
  const iconTwoRef = useRef(null);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === imgRef.current) {
            setIsImgVisible(entry.isIntersecting);
          }
          if (entry.target === paraOneRef.current) {
            setIsParaOneVisible(entry.isIntersecting);
          }
          if (entry.target === paraTwoRef.current) {
            setIsParaTwoVisible(entry.isIntersecting);
          }
          if (entry.target === iconOneRef.current) {
            setIconOne(entry.isIntersecting);
          }
          if (entry.target === iconTwoRef.current) {
            setIconTwo(entry.isIntersecting);
          }
        });
      },
      { threshold: 0.25 },
    );

    if (imgRef.current) observer.observe(imgRef.current);
    if (paraOneRef.current) observer.observe(paraOneRef.current);
    if (paraTwoRef.current) observer.observe(paraTwoRef.current);
    if (iconOneRef.current) observer.observe(iconOneRef.current);
    if (iconTwoRef.current) observer.observe(iconTwoRef.current);

    return () => observer.disconnect();
  }, []);
  // 2. Global listener to detect external clicks
  useEffect(() => {
    const handleOutsideClick = (event) => {
      // If the sidebar is open and the clicked element is NOT inside the sidebar container
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarActive(false);
      }
    };

    // Attach listener only when the sidebar is actually active to optimize performance
    if (isSidebarActive) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    // Clean up the event listener when component updates or unmounts
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isSidebarActive]); // Runs whenever the sidebar state updates

  const handleSidebarToggle = () => {
    setIsSidebarActive(!isSidebarActive);
  };

  const handleSendEnquiry = (e) => {
    e.preventDefault();

    console.log("Enquiry sent via React state mechanics");
  };
  return (
    <>
      <>
        <div
          className={`sidebar-contact ${isSidebarActive ? "active" : ""}`}
          ref={sidebarRef}
        >
          <div
            className={`toggle ${isSidebarActive ? "active" : ""}`}
            onClick={handleSidebarToggle}
          >
            <span>ENQUIRE NOW</span>
          </div>
          <h4>Interested in enquiring about Properties?</h4>
          <div className="scroll">
            <form onSubmit={handleSendEnquiry} className="enquiry-form">
              {/* NAME FIELD */}
              <label htmlFor="CustomerName">
                Name <span className="text-danger">*</span>
              </label>
              <div className="custom-input-group m_bottom_10">
                <div className="input-icon-block">
                  <i className="fas fa-user"></i>
                </div>
                <input
                  className="form-control custom-input"
                  id="CustomerName"
                  name="CustomerName"
                  placeholder="Full name"
                  type="text"
                />
              </div>
              <span id="NameError" className="error-text"></span>

              {/* EMAIL FIELD */}
              <label htmlFor="Email">Email Address</label>
              <div className="custom-input-group m_bottom_10">
                <div className="input-icon-block">
                  <i className="fas fa-envelope-open"></i>
                </div>
                <input
                  className="form-control custom-input"
                  id="Email"
                  name="Email"
                  placeholder="Email Id"
                  type="email"
                />
              </div>
              <span id="EmailError" className="error-text"></span>

              {/* COUNTRY FIELD */}
              <label htmlFor="Country">Country</label>
              <div className="custom-input-group m_bottom_10">
                <div className="input-icon-block">
                  <i className="fab fa-font-awesome-flag"></i>
                </div>
                <div className="country-display-wrapper">
                  <img
                    src="https://flagcdn.com/w20/in.png"
                    alt="India Flag"
                    className="flag-img"
                  />
                  <span className="country-text">India (भारत)</span>
                  <i className="fas fa-caret-down dropdown-arrow"></i>
                </div>
                <input
                  type="hidden"
                  name="IsdCode"
                  id="IsdCode"
                  defaultValue="+91"
                />
              </div>
              <span id="CountryError" className="error-text"></span>

              {/* PHONE NUMBER FIELD */}
              <label htmlFor="ContactNumber">
                Phone No <span className="text-danger">*</span>
              </label>
              <div className="custom-input-group m_bottom_10">
                <div className="input-icon-block">
                  <i className="fas fa-phone-volume"></i>
                </div>
                <div className="phone-input-combined">
                  <input
                    className="form-control prefix-input"
                    id="ISDCode"
                    name="ISDCode"
                    defaultValue="+91"
                    readOnly
                  />
                  <input
                    className="form-control number-input"
                    id="ContactNumber"
                    name="ContactNumber"
                    placeholder="Phone No"
                    maxLength="10"
                    minLength="10"
                    type="text"
                  />
                </div>
              </div>
              <span id="ContactError" className="error-text"></span>

              {/* MESSAGE FIELD */}
              <label htmlFor="Message">
                Message <span className="text-danger">*</span>
              </label>
              <div className="custom-input-group m_bottom_10 alignment-stretch">
                <div className="input-icon-block textarea-icon-block">
                  <i className="fas fa-comments"></i>
                </div>
                <textarea
                  className="form-control custom-textarea"
                  id="Message"
                  name="Message"
                  placeholder="Message..."
                  rows="3"
                ></textarea>
              </div>
              <span id="MessageError" className="error-text"></span>

              {/* HIDDEN META DATA */}
              <input
                id="PropertyId"
                name="PropertyId"
                type="hidden"
                defaultValue="0"
              />
              <input
                id="PropertyName"
                name="PropertyName"
                type="hidden"
                defaultValue="Contact 510earth"
              />

              {/* SUBMIT BUTTON */}
              <button type="submit" className="btn-submit-enquiry">
                Enquiry
              </button>
            </form>

            <div className="text-center">
              {/* BOOTSTRAP 5 MODAL TOGGLERS DATA ATTRIBUTES */}
              <a
                href="#"
                className="text-primary m_top_10 d-inline-block"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Read Disclaimer
              </a>
            </div>
          </div>
        </div>
        <section className="inner_page mrgn_tp inner_pad">
          <div className="container">
            <h1>ABOUT US</h1>
            <p>
              We are one of the most dynamic and admired organizations in the
              Real Estate in India. 510 earth is among India's leading real
              estate firms that has been helping customers across India to
              achieve their dream reality space for commercial real estate
              broker and residential purposes under one roof. It was founded in
              2020 with the vision to offer dream real estate. 510 earth is a
              youth organisation of Teesta Networks Pvt Ltd with over 100
              affiliates across India. It is also one of the few Indian startups
              that has succeeded across India. We are one of the real estate
              consultant companies that provide exceptional value to property
              owners and Customers. 510 earth analyses the business to determine
              the optimal approach for every brand we represent such as flats
              for sale. We are a pioneer in shaping skylines and lifestyles
              across India, developing vibrant communities that have redefined
              real estate development services. We focus on developing
              residential and commercial projects all over India. We are
              changing people's perception of quality in the Indian real estate
              sector.
            </p>
            <p>
              Since our founding in 2020, we have delivered world-class real
              estate projects, including commercial, residential, IT parks, and
              retail spaces, featuring superior design, materials, engineering,
              and architecture and also worked as real estate consultant.{" "}
            </p>
          </div>
        </section>
        <section
          className="about_top_panel"
          role="img"
          aria-label="flats-for-sale"
        >
          <div className="container">
            <div className="row">
              <div className="col-md-5">
                {/* The container that detects visibility and runs the flip animation */}
                <div
                  ref={imgRef}
                  className={`abut_left_pic about-image ${
                    isImgVisible ? "visible" : ""
                  }`}
                >
                  <img
                    src="/images/about_pic.jpg"
                    className="img-fluid"
                    alt="real-estate-consultant"
                  />
                </div>
              </div>
              <div className="col-md-7">
                <h2>WHAT WE ARE</h2>
                <p>
                  <strong>
                    510earth is a well-known real estate consultancy in India,
                    which operates as a brand of Teesta Networks, specializing
                    in residential, commercial, and land/plot transactions.
                    510earth collaborates with reputed builders, and they offer
                    top-quality services &amp; help our clients get the most
                    favourable deals.
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          className="about_mdl_panel"
          role="img"
          aria-label="real-estate-companies-in-india"
        >
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="mission_left">
                  <img
                    src="/images/abt_icon2.png"
                    className={`iconOne ${isiconOne ? "active" : ""}`}
                    alt="510earth-mission"
                    ref={iconOneRef}
                  />
                  <h2>Our Mission</h2>
                  <p>
                    Our mission is to engage in issues that are of concern to
                    individuals, families and communities through an
                    uncompromising commitment to create outstanding living, work
                    and leisure environments.
                  </p>
                  <div
                    className={`abt_para_box animation ${isParaOneVisible ? "active" : ""}`}
                    ref={paraOneRef}
                  >
                    <p>
                      We are not in the real estate business but in the business
                      of happiness. 510 earth aims to offer sustainable real
                      estate solutions to our people, clients, and communities.
                      As real estate broker, we always try to provide our
                      customers with the best and most long-lasting space. 510
                      earth always puts our clients at the next centre of the
                      real estate industry, and We trust in carrying out
                      enterprise with transparency and integrity. We
                      consistently deliver superior value to our customers,
                      employees, and business partners in all our endeavours to
                      becomeone of the most respected and commercial real estate
                      broker. As a real estate agent, we always focus on
                      developing and delivering unique, integrated lifestyles
                      and work environments with a focus on quality
                      architecture, strong project execution, and a
                      client-centric approach. It aims to create an "integrated
                      master-planned community" that includes a residential
                      project and one or more community facilities such as
                      retail and commercial developments, schools, hospitals,
                      etc., within the same development to live and work with
                      happiness and positivity.{" "}
                    </p>
                  </div>
                </div>
              </div>
              {/*<div class="col-md-2 d-none d-sm-none d-md-block"> <img src="~/Front/images/line.png" class="img-fluid wow bounceIn" alt="top real estate companies in Kolkata"></div>*/}
              <div className="col-md-12">
                <div className="mission_right">
                  <img
                    src="/images/abt_icon1.png"
                    className={`iconTwo ${isiconTwo ? "active" : ""}`}
                    alt="510earth-vision"
                    ref={iconTwoRef}
                  />
                  <h2>Our Vision</h2>
                  <p>
                    Our mission is to engage in issues that are of concern to
                    individuals, families and communities through an
                    uncompromising commitment to create outstanding living, work
                    and leisure environments.
                  </p>
                  <div
                    className={`abt_para_box second_animation ${isParaTwoVisible ? "active" : ""}`}
                    ref={paraTwoRef}
                  >
                    <ul>
                      <li>
                        To be an ethical and growth-oriented company that
                        pursues customer satisfaction by delivering
                        best-in-class projects with uncompromising quality
                        standards through innovation and speed.{" "}
                      </li>
                      <li>
                        As real estate consultant, we adhere to the highest
                        standards of business ethics and best practices in all
                        areas.{" "}
                      </li>
                      <li>
                        As a real estate broker, we are here to set new
                        standards regarding customer satisfaction, employee
                        motivation, and business partner relationships.
                      </li>
                      <li>
                        And to be a commercial real estate broker, we resolve to
                        help disadvantaged segments of society.{" "}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          className="about_bottom_panel inner_page"
          role="img"
          aria-label="dreams-come-true-510earth"
        >
          <div className="container-fluid">
            <div className="row">
              <div className="offset-md-0 offset-lg-7 col-lg-5 offset-xl-5 col-xl-7">
                <div className="about_btm_inner">
                  <h1>
                    YOUR DREAM <br />
                    OUR COMMITMENT
                  </h1>
                  <p>
                    <strong>
                      We provide value added services to customers in fulfilling
                      their dreams of becoming homeowners.
                    </strong>
                  </p>
                  <p>
                    It is a moment of pure joy and bliss when you can fulfill
                    your dreams of becoming the homeowner. Our dream is to see
                    happy homeowners and we constantly strive hard to achieve
                    the same.
                  </p>
                  <a href="/Contact">Contact Us</a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div
          className="modal fade bd-example-modal-lg"
          id="exampleModal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header bg-gradient-success text-white">
                <h5 className="modal-title" id="exampleModalLabel">
                  Disclaimer
                </h5>
                {/* CHANGED: data-dismiss="modal" to data-bs-dismiss="modal" */}
                <button
                  type="button"
                  className="btn-close text-white"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "24px",
                    color: "#fff",
                  }}
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <p className="modal_text">
                  The data (based on the search query performed), on the
                  webpages of 510earth.com has been made available for
                  informational purposes only and no representation or warranty
                  is expressly or impliedly given as to its accuracy. Any
                  investment decisions that you take should not be based relying
                  solely on the information that is available on the website
                  510earth.com or downloaded from it. Nothing contained herein
                  shall be deemed to constitute legal advice, solicitation,
                  invitation to acquire by the developer/builder or any other
                  entity.
                </p>
                <p className="modal_text">
                  You are advised to visit the relevant HIRA / RERA website
                  directly to know more about the project and check all the
                  information before taking any decision based on the contents
                  displayed on the website 510earth.com. If you have any
                  question or want to share feedback, feel free to write to us
                  at 510earthdotcom@gmail.com. Trademarks belong to the
                  respective owners.Please note, that we will not be accepting
                  any bookings or allotments based on the images, material,
                  stock photography, projections, details, descriptions that are
                  currently available and/or displayed on the Website. We advise
                  you to contact our Support Team for further information.
                </p>
              </div>
              <div className="modal-footer">
                {/* CHANGED: data-dismiss="modal" to data-bs-dismiss="modal" */}
                <button
                  type="button"
                  className="btn btn-success"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default About;
