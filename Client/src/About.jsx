import React, { useEffect, useRef, useState } from "react";
import "../src/assets/Font/css/style.css";
import "../src/assets/content/style.css";
import "../src/style/About.css";

function About() {
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  
  // Visibility States for Scroll Animations
  const [visibility, setVisibility] = useState({
    img: false,
    paraOne: false,
    paraTwo: false,
    iconOne: false,
    iconTwo: false,
  });

  // Form State Control
  const [formData, setFormData] = useState({
    CustomerName: "",
    Email: "",
    ContactNumber: "",
    Message: "",
  });

  // DOM Node References
  const sidebarRef = useRef(null);
  const targetsRef = useRef({});

  // Dynamic Ref Multi-Assigner function
  const setTargetRef = (key) => (el) => {
    if (el) targetsRef.current[key] = el;
  };

  // 1. Unified Single IntersectionObserver Context
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const name = entry.target.getAttribute("data-anim-id");
          if (name) {
            setVisibility((prev) => ({
              ...prev,
              [name]: entry.isIntersecting,
            }));
          }
        });
      },
      { threshold: 0.20 } // Slightly lowered for faster mobile triggering
    );

    Object.values(targetsRef.current).forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // 2. Global Outside Click Event Handler (Closes Sidebar)
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarActive(false);
      }
    };

    if (isSidebarActive) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isSidebarActive]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendEnquiry = (e) => {
    e.preventDefault();
    console.log("Enquiry sent securely via state workflow:", formData);
  };

  return (
    <div className="about-component-wrapper">
      {/* SIDEBAR CONTACT PANEL */}
      <div
        className={`sidebar-contact ${isSidebarActive ? "active" : ""}`}
        ref={sidebarRef}
      >
        <div
          className={`toggle ${isSidebarActive ? "active" : ""}`}
          onClick={() => setIsSidebarActive(!isSidebarActive)}
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
            <div className="custom-input-group">
              <div className="input-icon-block">
                <i className="fas fa-user"></i>
              </div>
              <input
                className="form-control custom-input"
                id="CustomerName"
                name="CustomerName"
                placeholder="Full name"
                type="text"
                value={formData.CustomerName}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* EMAIL FIELD */}
            <label htmlFor="Email">Email Address</label>
            <div className="custom-input-group">
              <div className="input-icon-block">
                <i className="fas fa-envelope-open"></i>
              </div>
              <input
                className="form-control custom-input"
                id="Email"
                name="Email"
                placeholder="Email Id"
                type="email"
                value={formData.Email}
                onChange={handleInputChange}
              />
            </div>

            {/* COUNTRY FIELD */}
            <label htmlFor="Country">Country</label>
            <div className="custom-input-group">
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
              <input type="hidden" name="IsdCode" defaultValue="+91" />
            </div>

            {/* PHONE NUMBER FIELD */}
            <label htmlFor="ContactNumber">
              Phone No <span className="text-danger">*</span>
            </label>
            <div className="custom-input-group">
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
                  type="tel"
                  value={formData.ContactNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* MESSAGE FIELD */}
            <label htmlFor="Message">
              Message <span className="text-danger">*</span>
            </label>
            <div className="custom-input-group alignment-stretch">
              <div className="input-icon-block textarea-icon-block">
                <i className="fas fa-comments"></i>
              </div>
              <textarea
                className="form-control custom-textarea"
                id="Message"
                name="Message"
                placeholder="Message..."
                rows="3"
                value={formData.Message}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>

            {/* HIDDEN META DATA */}
            <input type="hidden" name="PropertyId" defaultValue="0" />
            <input type="hidden" name="PropertyName" defaultValue="Contact 510earth" />

            <button type="submit" className="btn-submit-enquiry">
              Enquiry
            </button>
          </form>

          <div className="text-center">
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

      {/* CORE PRESENTATION BODY */}
      <section className="inner_page inner_pad">
        <div className="container">
          <h1>ABOUT US</h1>
          <p>
            We are one of the most dynamic and admired organizations in the Real Estate in India. 
            510 earth is among India's leading real estate firms that has been helping customers 
            across India to achieve their dream reality space...
          </p>
          <p>
            Since our founding in 2020, we have delivered world-class real estate projects, 
            including commercial, residential, IT parks, and retail spaces...
          </p>
        </div>
      </section>

      <section className="about_top_panel" role="img" aria-label="flats-for-sale ">
        <div className="container ">
          <div className="row">
            <div className="col-md-5">
              <div
                ref={setTargetRef("img")}
                data-anim-id="img"
                className={`abut_left_pic about-image ${visibility.img ? "visible" : ""}`}
              >
                <img src="/images/about_pic.jpg" className="img-fluid" alt="real-estate-consultant" />
              </div>
            </div>
            <div className="col-md-7">
              <h2>WHAT WE ARE</h2>
              <p>
                <strong>
                  510earth is a well-known real estate consultancy in India, operating as a brand of Teesta Networks...
                </strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about_mdl_panel" role="img" aria-label="real-estate-companies-in-india">
        <div className="container">
          <div className="row">
            {/* MISSION SECTION */}
            <div className="col-md-12 m_bottom_30">
              <div className="mission_left">
                <img
                  src="/images/abt_icon2.png"
                  className={`iconOne ${visibility.iconOne ? "active" : ""}`}
                  alt="510earth-mission"
                  ref={setTargetRef("iconOne")}
                  data-anim-id="iconOne"
                />
                <h2>Our Mission</h2>
                <p>
                  Our mission is to engage in issues that are of concern to individuals, families and communities...
                </p>
                <div
                  className={`abt_para_box animation ${visibility.paraOne ? "active" : ""}`}
                  ref={setTargetRef("paraOne")}
                  data-anim-id="paraOne"
                >
                  <p>We are not in the real estate business but in the business of happiness...</p>
                </div>
              </div>
            </div>

            {/* VISION SECTION */}
            <div className="col-md-12">
              <div className="mission_right">
                <img
                  src="/images/abt_icon1.png"
                  className={`iconTwo ${visibility.iconTwo ? "active" : ""}`}
                  alt="510earth-vision"
                  ref={setTargetRef("iconTwo")}
                  data-anim-id="iconTwo"
                />
                <h2>Our Vision</h2>
                <p>
                  Our vision framework targets delivering premier class residential projects globally...
                </p>
                <div
                  className={`abt_para_box second_animation ${visibility.paraTwo ? "active" : ""}`}
                  ref={setTargetRef("paraTwo")}
                  data-anim-id="paraTwo"
                >
                  <ul>
                    <li>To be an ethical and growth-oriented company...</li>
                    <li>As real estate consultant, we adhere to the highest standards...</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about_bottom_panel inner_page" role="img" aria-label="dreams-come-true-510earth">
        <div className="container-fluid">
          <div className="row">
            <div className="offset-md-0 offset-lg-7 col-lg-5 offset-xl-5 col-xl-7">
              <div className="about_btm_inner">
                <h1>YOUR DREAM <br /> OUR COMMITMENT</h1>
                <a href="/Contact">Contact Us</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOOTSTRAP 5 DISCLOSURE MODAL */}
      <div className="modal fade bd-example-modal-lg" id="exampleModal" tabIndex={-1} role="dialog" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header bg-gradient-success text-white">
              <h5 className="modal-title">Disclaimer</h5>
              <button type="button" className="btn-close text-white" data-bs-dismiss="modal" aria-label="Close" style={{ background: "none", border: "none", fontSize: "24px", color: "#fff" }}>
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <p className="modal_text">The data on the webpages of 510earth.com has been made available for informational purposes only...</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-success" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;