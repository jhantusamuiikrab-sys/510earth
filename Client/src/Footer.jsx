// Fixed: Capitalized Link import statement
import { Link } from "react-router-dom";

const Footer = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
  };

  return (
    <>
      {/* 1. NEWSLETTER: Background spans 100% full screen */}
      <section className="newsletter">
        <div className="container">
          <div className="row">
            <div className="col-md-5 col-sm-12 col-12">
              <h2>Newsletter Subscription</h2>
              <p>
                Join our Subscribers list to get the latest news, updates
                delivered directly in your inbox
              </p>
            </div>
            <div className="col-md-7 col-sm-12 col-12">
              <div className="news_input">
                <form id="testform" onSubmit={handleSubscribe}>
                  <input
                    type="text"
                    placeholder="Email Address"
                    className="form-control"
                  />
                  <button type="submit" className="btn btn-primary news_btn">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN FOOTER: Background spans 100% full screen */}
      <footer role="img" aria-label="india-top-property-sites">
        <div className="container">
          <div className="row">
            {/* Column 1: Logo & Address */}
            <div className="col-md-4">
              <Link to="/">
                <picture>
                  <source type="image/webp" srcSet="/images/ftr_logo.webp" />
                  <source type="image/jpeg" srcSet="/images/ftr_logo.png" />
                  <img
                    src="/images/ftr_logo.png"
                    className="img-fluid"
                    alt="510earth"
                  />
                </picture>
              </Link>

              <h6 className="text-white text-uppercase m_bottom_10 m_top_20">
                <i className="fa fa-map-marker" aria-hidden="true"></i>
                <strong> Office Address </strong>
              </h6>
              <p className="text-white">
                364, Shantipally, Rajdanga, Kasba, South 24 Parganas,
                Kolkata-700107
              </p>
              <h6 className="text-white text-uppercase m_bottom_10 m_top_20">
                <i className="fa fa-phone" aria-hidden="true"></i> Contact No -{" "}
                <a href="tel:+919073338396" className="text-white">
                  +91-9073338396{" "}
                </a>
              </h6>
            </div>

            {/* Column 2: Social Media handles */}
            <div className="col-md-4">
              <h5 className="m_bottom_10">
                <span>Follow</span> Us
              </h5>
              <a
                href="https://www.facebook.com/510earthrealestate/"
                className="hvr-bob"
                target="_blank"
                title="https://www.facebook.com/510earthrealestate/"
                aria-label="Facebook"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://x.com/510earthrealtor"
                className="hvr-bob"
                target="_blank"
                title="https://x.com/510earthrealtor"
                aria-label="Twitter"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-2x fa-x-twitter"></i>
              </a>
              <a
                href="https://www.linkedin.com/company/510earthrealestate"
                className="hvr-bob"
                target="_blank"
                title="https://www.linkedin.com/company/510earth-realtor"
                aria-label="Linkedin"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a
                href="https://www.instagram.com/510earthrealestate"
                className="hvr-bob"
                target="_blank"
                title="https://www.instagram.com/510earthrealtor"
                aria-label="Instagram"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram inst_clr"></i>
              </a>
              <a
                href="https://www.youtube.com/@510earthrealestate"
                className="hvr-bob"
                target="_blank"
                title="https://www.youtube.com/@510earthrealestate"
                aria-label="Youtube"
                rel="noopener noreferrer"
              >
                <i className="fab fa-youtube"></i>
              </a>
            </div>

            {/* Column 3: Navigation Hyperlinks */}
            <div className="col-md-4">
              <h5 className="m_bottom_10">
                <span>Our</span> Links
              </h5>
              <div className="row">
                <div className="col-sm-7">
                  <ul className="list-unstyled">
                    <li>
                      <Link to="/" className="hvr-float">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link to="/properties/apartment" className="hvr-float">
                        Apartment
                      </Link>
                    </li>
                    <li>
                      <Link to="/properties/villa" className="hvr-float">
                        Independent House / Villa
                      </Link>
                    </li>
                    <li>
                      <Link to="/properties/commercial" className="hvr-float">
                        Commercial Properties
                      </Link>
                    </li>
                    <li>
                      <Link to="/properties/land" className="hvr-float">
                        Land / Plot
                      </Link>
                    </li>
                    <li>
                      <Link to="/partner" className="hvr-float">
                        Partner
                      </Link>
                    </li>
                    <li>
                      <Link to="/property-management" className="hvr-float">
                        Property Management
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="col-sm-5">
                  <ul className="list-unstyled">
                    <li>
                      <Link to="/services" className="hvr-float">
                        Services
                      </Link>
                    </li>
                    <li>
                      <Link to="/about" className="hvr-float">
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link to="/contact" className="hvr-float">
                        Contact Us
                      </Link>
                    </li>
                    <li>
                      <Link to="/privacy" className="hvr-float">
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link to="/terms" className="hvr-float">
                        Terms of Use
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Disclaimer text blocks */}
            <div className="col-md-12 m_top_20 disclamer-text">
              <p className="m_bottom_12">
                <span>
                  <strong>Disclaimer : </strong>
                </span>{" "}
                All the information displayed on the website is for
                informational purposes only. 510earth.com makes no
                representations and warranties of any kind, whether expressed or
                implied, for the Services and in relation to the accuracy or
                quality of any information transmitted or obtained at
                510earth.com. You are hereby strongly advised to verify all
                information including visiting the relevant RERA website before
                taking any decision based on the contents displayed on the
                website.
              </p>
              <p>
                510earth.com makes no portrayals and warranties of any sort,
                regardless of whether communicated or inferred, for the Services
                and according to the precision or nature of any data sent or
                acquired at 510earth.com. You are thus strongly encouraged to
                verify all information including visiting the relevant RERA site
                prior to taking any choice dependent on the substance showed on
                the site.
              </p>
              <p className="text-center">
                WB RERA Registration number - WBRERA/A/SOU/2023/000185{" "}
              </p>
              <p className="text-center">
                Maharashtra RERA Registration number - A52100043083{" "}
              </p>
            </div>

            {/* Copyright bar */}
            <div className="col-md-12">
              <div className="bot_ftr">
                <p>
                  Copyright &copy; {new Date().getFullYear()}{" "}
                  <a href="#" className="text-decoration-none">
                    <b>Teesta Networks</b>
                  </a>{" "}
                  All Rights Reserved
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
