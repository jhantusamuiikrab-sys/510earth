import React, { useState } from "react";
import "../src/assets/Font/css/style.css";
import "../src/assets/content/style.css";


function Partner() {
  // 1. Establish state hooks to track user input updates across form fields
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    stateId: "",
    cityId: "",
    contactNo: "",
    email: ""
  });

  // 2. Generic data updater binding keystroke modifications to state state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // 3. Prevent form reload behavior on transmission events
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted Successfully:", formData);
    // Integrate your API endpoints or service dispatch connections here
  };

  return (
    <>
      {/* SECTION 1: Welcome Header Title Bar Banner */}
      <section className="inner_page mrgn_tp inner_pad">
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <h1 className="text-uppercase">Partner with Us</h1>
              <p>
                Contact us to become the partner of the India’s fastest
                growing real estate company and get the lifetime opportunity
                to make dreams real for those who aspire to become the
                property owners. You can certainly expect good commission
                &amp; timely payment when you decide to become our partner. So
                do not wait to become our partner today.
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

      {/* SECTION 2: Dynamic Form Intake Section Block Layout */}
      <section
        className="about_top_panel partner_top_panel"
        role="img"
        aria-label="flats-for-sale"
      >
        <div className="container">
          <div className="row flex-row-reverse">
            
            {/* Context Left Column: Active Intake Registration Module */}
            <div className="col-md-5">
              <div className="partner-reg-form wow flipInY">
                
                {/* Fixed: Converted ASP.NET Razor BeginForm layout container block to clean semantic JSX HTML form element */}
                <form id="partnerForm" onSubmit={handleSubmit} encType="multipart/form-data">
                  <div className="row">
                    
                    <div className="col-md-12 text-center">
                      <h4>
                        Partner
                        <br />
                        Registration Form
                      </h4>
                    </div>

                    {/* Input Element 1: Full Name Text Input Field */}
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
                      <span id="NameError" />
                    </div>

                    {/* Input Element 2: Context Multi-line Textarea Block */}
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
                      <span id="AddressError" />
                    </div>

                    {/* Input Element 3: State Selection Dropdown Selector Control */}
                    <div className="col-md-12">
                      <label className="code_area">
                        State <span>*</span>
                      </label>
                      <select
                        name="stateId"
                        id="StateId"
                        className="form-control form_partner"
                        value={formData.stateId}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">--Select State--</option>
                        {/* Populate list options seamlessly via configuration mappings */}
                        <option value="1">West Bengal</option>
                        <option value="2">Maharashtra</option>
                      </select>
                      <span id="StateIdError" />
                    </div>

                    {/* Input Element 4: City Selection Multi-variant Option Controller */}
                    <div className="col-md-12">
                      <label className="code_area">
                        City <span>*</span>
                      </label>
                      <select
                        name="cityId"
                        id="CityId"
                        className="form-control select2"
                        style={{ display: "block" }}
                        value={formData.cityId}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">-Select City-</option>
                        <option value="kolkata">Kolkata</option>
                        <option value="mumbai">Mumbai</option>
                      </select>
                      <span id="CityIdError" />
                    </div>

                    {/* Input Element 5: Digits Verification Contact Interface */}
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
                      <span id="ContactError" style={{ color: "red" }} />
                    </div>

                    {/* Input Element 6: Formatted Electronic Mail Target Box */}
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
                      <span id="EmailError" />
                    </div>

                    {/* Actions Panel Group: Intake dispatch operation controls */}
                    <div className="col-md-12 text-center">
                      <button type="submit" className="btn btn-subscribe m_top_20">
                        Submit
                      </button>
                    </div>

                  </div>
                </form>

              </div>
            </div>
            
            {/* Context Right Column: Supplemental Structural Text Description Panel */}
            <div className="col-md-7">
              <h2>BENEFITS:</h2>
              <p>
                510earth.com is a high-class real estate developer and
                marketer, with full-fledged office and facilities in Kolkata.
                We intend to invite all real estate marketing partners and
                contractors to join hands with us. You may be working
                individually or as a firm, the company provides the same kind
                of benefits to all the partners. If you are interested then
                you can register us today to grow along with us.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: Supplemental Feature Matrix Overview Layout Block */}
      <section
        className="partner_mdl_panel"
        role="img"
        aria-label="india-top-property-sites"
      >
        <div className="container">
          <div className="row">
            
            <div className="col-md-12 text-center">
              <h3 className="text-uppercase why-choose"> Why Choose us</h3>
              <img src="/images/shadow.png" alt="Property Agents" />
            </div>

            <div className="col-md-4 why-choose-box">
              <img
                src="/images/sales.png"
                className="img-fluid wow bounceIn"
                alt="real-estate-sales"
              />
              <h2>Sales</h2>
              <p>
                We have an amazing sales graph. If you be our partner, you can
                also reap the benefit of the same and increase your company’s
                ROI. We are looking forward to work with you and together we
                can undoubtedly reach new heights and set new targets.
              </p>
            </div>

            <div className="col-md-4 why-choose-box">
              <img
                src="/images/support.png"
                className="img-fluid wow bounceIn"
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

            <div className="col-md-4 why-choose-box">
              <img
                src="/images/team.png"
                className="img-fluid wow bounceIn"
                alt="team-work-510earth"
              />
              <h2>Team</h2>
              <p>
                We have a unique team with exceptional team spirit, that is
                all set to work in any competitive environment. Our team is
                dynamic, well aware the industry best practices that will
                surly help you to reap the desired benefit to add to the
                revenue of your company.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

export default Partner;