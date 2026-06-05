import ContactForm from "./ContactForm";
// import EnquirySidebar from "../components/EnquirySidebar";
import "../src/assets/Font/css/style.css";
import "../src/assets/content/style.css";

const Contact = () => {
  return (
    <>
      {/* <EnquirySidebar /> */}

      <section className="inner_page  inner_pad">
        <div className="contact_page">
          <div className="container">
            <h1>CONTACT</h1>

            <p>
              510 earth is one of the one of the real estate companies in india that offer 100% genuine real estateand also acts as real estate agent. We provide real estate services in Kolkata and across pan India. Real estate brokers/agents, buyers, , and sellers can use this portal. We deal in residential, commercial, and land properties. You can also choose our premium package to promote the property on our portal. 510 earth offers various services, including property management, land consultancy, and advisory services.
            </p>

            <div className="row">
              <div className="col-md-7">
                <div class="cntat_form">
                <ContactForm />
                </div>
              </div>

              <div className="col-md-5">
  <div className="contct_right_panel wow fadeIn hvr-float">
    <h2>Corporate Office</h2>
    <h3>
      Municipal Premises No. 540, 1st floor, Block-GD, Plot No-50,
      P.O-East Kolkata Township, P.S- Kasba, District South 24 Parganas,
      Rajdanga Main Road (near GST Bhawan), Kolkata-700107
    </h3>
  </div>

  <div className="text-center m_top_30">
    <div>
      <img src="/images/call.png" className="img-fluid" alt="Call" />
    </div>

    <h4 className="m_top_5">
      <a href="tel:+918016082014" className="hvr-sink">
        +91-8016082014
      </a>
    </h4>

    <h4 className="m_top_5">
      <a href="tel:+919073338396" className="hvr-sink">
        +91-9073338396
      </a>
    </h4>
  </div>
</div>

<div className="col-md-12">
  <h5>Branch Offices</h5>

  <div className="row">
    <div className="col-md-4 wow fadeIn hvr-float">
      <div className="address_panel">
        <h6>Bangalore Office</h6>
        <p>
          No. 14, Unity Building,
          Wood Street opposite to Karnataka Bank,
          Ashok Nagar, Bangalore-560025
        </p>
      </div>

      <div className="text-center m_top_30">
        <div>
          <img src="/images/call.png" className="img-fluid" alt="Call" />
        </div>

        <h4 className="m_top_5">
          <a href="tel:+919073900414" className="hvr-sink">
            +91-9073900414
          </a>
        </h4>
      </div>
    </div>

    <div className="col-md-4 wow fadeIn hvr-float">
      <div className="address_panel">
        <h6>Kolkata Office</h6>
        <p>
          Municipal Premises No. 540, 1st floor, Block-GD, Plot No-50,
          P.O-East Kolkata Township, P.S- Kasba, District South 24 Parganas,
          Rajdanga Main Road (near GST Bhawan), Kolkata-700107
        </p>
      </div>

      <div className="text-center m_top_30">
        <div>
          <img src="/images/call.png" className="img-fluid" alt="Call" />
        </div>

        <h4 className="m_top_5">
          <a href="tel:+918016082014" className="hvr-sink">
            +91-8016082014
          </a>
        </h4>
      </div>
    </div>

    <div className="col-md-4 wow fadeIn hvr-float">
      <div className="address_panel">
        <h6>Siliguri Office</h6>
        <p>
          2nd Floor, Strong Enclave, Iskcon Mandir Road,
          Siliguri-734001, West Bengal,
          <br />
          India
        </p>
      </div>

      <div className="text-center m_top_30">
        <div>
          <img src="/images/call.png" className="img-fluid" alt="Call" />
        </div>

        <h4 className="m_top_5">
          <a href="tel:+919932040000" className="hvr-sink">
            +91-9932040000
          </a>
        </h4>
      </div>
    </div>
  </div>
</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;