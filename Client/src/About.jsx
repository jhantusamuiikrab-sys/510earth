import React from "react";
import "../src/assets/Font/css/style.css";
import "../src/assets/content/style.css";
function About() {
  return (
    <>
      <>
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
                <div className="abut_left_pic wow flipInY">
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
                    className="img-fluid wow bounceIn"
                    alt="510earth-mission"
                  />
                  <h2>Our Mission</h2>
                  <p>
                    Our mission is to engage in issues that are of concern to
                    individuals, families and communities through an
                    uncompromising commitment to create outstanding living, work
                    and leisure environments.
                  </p>
                  <div className="abt_para_box wow bounceInLeft animated">
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
                    className="img-fluid wow bounceIn"
                    alt="510earth-vision"
                  />
                  <h2>Our Vision</h2>
                  <p>
                    Our mission is to engage in issues that are of concern to
                    individuals, families and communities through an
                    uncompromising commitment to create outstanding living, work
                    and leisure environments.
                  </p>
                  <div className="abt_para_box wow bounceInRight animated">
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
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <p className="modal_text">
                  {" "}
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
                </p>{" "}
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
                <button
                  type="button"
                  className="btn btn-success"
                  data-dismiss="modal"
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
