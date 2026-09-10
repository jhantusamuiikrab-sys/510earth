import React, { useState, useEffect } from "react";
import "../../src/assets/content/style.css";
import "../../src/style/Partner.css";

function Partner() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  const SERVER_URL =
  import.meta.env.VITE_SERVER_URL ||
  "http://localhost:3000";

const API_URL = import.meta.env.VITE_API_URL ||
  "http://localhost:3000/api";

  const CSC_API = `${API_URL}/csc`;

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    stateName: "",
    cityName: "",
    contactNo: "",
    email: "",
  });

  // 1. Fetch States on Component Mount
  useEffect(() => {
    const fetchStates = async () => {
      setLoadingStates(true);
      try {
        const response = await fetch(`${CSC_API}/states`);
        const result = await response.json();
        if (response.ok && result.success) {
          setStates(result.data);
        } else {
          console.error("Failed to load states:", result.message);
        }
      } catch (error) {
        console.error("Error fetching states:", error);
      } finally {
        setLoadingStates(false);
      }
    };

    fetchStates();
  }, []);

  // 2. Fetch Cities whenever selected State changes
  useEffect(() => {
    if (!formData.stateName) {
      setCities([]);
      return;
    }

    const fetchCities = async () => {
      setLoadingCities(true);
      try {
        const response = await fetch(
          `${CSC_API}/cities?state=${encodeURIComponent(
            formData.stateName
          )}`
        );
        const result = await response.json();
        if (response.ok && result.success) {
          setCities(result.data);
        } else {
          setCities([]);
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
        setCities([]);
      } finally {
        setLoadingCities(false);
      }
    };

    fetchCities();
  }, [formData.stateName]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      // Clear out selected city if the user updates the selected state
      if (name === "stateName") {
        return {
          ...prevData,
          [name]: value,
          cityName: "",
        };
      }

      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/partners/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Registration successful!");
        setFormData({
          name: "",
          address: "",
          stateName: "",
          cityName: "",
          contactNo: "",
          email: "",
        });
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Failed to connect to the server.");
    }
  };

  // IntersectionObserver for animation triggers
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -4px 0px",
      }
    );

    const elementsToAnimate = document.querySelectorAll(
      ".animate-3d-form, .animate-right-left"
    );
    elementsToAnimate.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* SECTION 1: Welcome Header */}
      <section className="inner_page inner_pad">
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <h1 className="text-uppercase">Partner with Us</h1>
              <p>
                Contact us to become the partner of the India’s fastest growing
                real estate company and get the lifetime opportunity to make
                dreams real for those who aspire to become the property owners.
                You can certainly expect good commission &amp; timely payment
                when you decide to become our partner. So do not wait to become
                our partner today.
              </p>
              <a
                href="/PartnerPanel/login"
                className="btn btn-partner-login m_top_20"
              >
                Login as partner
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Dynamic Form Intake Section */}
      <section
        className="about_top_panel partner_top_panel"
        role="img"
        aria-label="flats-for-sale"
        style={{ overflow: "visible" }}
      >
        <div className="container">
          <div className="row flex-row-reverse perspective-wrapper">
            <div className="col-md-5">
              <div className="partner-reg-form animate-3d-form">
                <form id="partnerForm" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-12 text-center">
                      <h4>
                        Partner
                        <br />
                        Registration Form
                      </h4>
                    </div>

                    <div className="col-md-12">
                      <label className="code_area">
                        Name <span>*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="CustomerName"
                        placeholder="Name"
                        className="form-control form_partner"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="col-md-12">
                      <label className="code_area">
                        Address <span>*</span>
                      </label>
                      <textarea
                        name="address"
                        id="Address"
                        placeholder="Address"
                        className="form-control form_partner"
                        autoComplete="off"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    {/* State Dropdown */}
                    <div className="col-md-12">
                      <label className="code_area">
                        State <span>*</span>
                      </label>
                      <select
                        name="stateName"
                        id="StateId"
                        className="form-control form_partner"
                        value={formData.stateName}
                        onChange={handleInputChange}
                        required
                        disabled={loadingStates}
                      >
                        <option value="">
                          {loadingStates ? "Loading states..." : "--Select State--"}
                        </option>
                        {states.map((st) => (
                          <option key={st._id} value={st.StateName}>
                            {st.StateName}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* City Dropdown */}
                    <div className="col-md-12">
                      <label className="code_area">
                        City <span>*</span>
                      </label>
                      <select
                        name="cityName"
                        id="CityId"
                        className="form-control form_partner"
                        value={formData.cityName}
                        onChange={handleInputChange}
                        required
                        disabled={!formData.stateName || loadingCities}
                      >
                        <option value="">
                          {!formData.stateName
                            ? "--Select State First--"
                            : loadingCities
                            ? "Loading cities..."
                            : "--Select City--"}
                        </option>
                        {cities.map((city, index) => (
                          <option key={index} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-12">
                      <label className="code_area">
                        Phone No <span>*</span>
                      </label>
                      <input
                        type="tel"
                        name="contactNo"
                        id="ContactNo"
                        placeholder="Contact Number"
                        maxLength="10"
                        className="form-control form_partner"
                        autoComplete="off"
                        value={formData.contactNo}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="col-md-12">
                      <label className="code_area">
                        Email Id <span>*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="Email"
                        placeholder="Email"
                        className="form-control form_partner"
                        autoComplete="off"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="col-md-12 text-center">
                      <button
                        type="submit"
                        className="btn btn-subscribe m_top_20"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="col-md-7">
              <h2>BENEFITS:</h2>
              <p>
                510earth.com is a high-class real estate developer and marketer,
                with full-fledged office and facilities in Kolkata. We intend to
                invite all real estate marketing partners and contractors to
                join hands with us. You may be working individually or as a
                firm, the company provides the same kind of benefits to all the
                partners. If you are interested then you can register us today
                to grow along with us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Icons Feature Matrix */}
      <section
        className="partner_mdl_panel"
        role="img"
        aria-label="india-top-property-sites"
      >
        <div className="container" style={{ overflow: "hidden" }}>
          <div className="row">
            <div className="col-md-12 text-center">
              <h3 className="text-uppercase why-choose"> Why Choose us</h3>
              <img src="/images/shadow.png" alt="Property Agents" />
            </div>

            <div className="col-md-4 why-choose-box animate-right-left">
              <img
                src="/images/sales.png"
                className="img-fluid"
                alt="real-estate-sales"
              />
              <h2>Sales</h2>
              <p>
                We have an amazing sales graph. If you be our partner, you can
                also reap the benefit of the same and increase your company’s
                ROI. We are looking forward to work with you and together we can
                undoubtedly reach new heights and set new targets.
              </p>
            </div>

            <div className="col-md-4 why-choose-box animate-right-left">
              <img
                src="/images/support.png"
                className="img-fluid"
                alt="real-estate-consultant"
              />
              <h2>Amazing Support</h2>
              <p>
                We have an unparallel support system that is there to support,
                guide you &amp; to provide you insight of every business step
                you take. The idea is to get benefited from the business
                practices to get closer to meeting the business goals.
              </p>
            </div>

            <div className="col-md-4 why-choose-box animate-right-left">
              <img
                src="/images/team.png"
                className="img-fluid"
                alt="team-work-510earth"
              />
              <h2>Team</h2>
              <p>
                We have a unique team with exceptional team spirit, that is all
                set to work in any competitive environment. Our team is dynamic,
                well aware the industry best practices that will surly help you
                to reap the desired benefit to add to the revenue of your
                company.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Partner;