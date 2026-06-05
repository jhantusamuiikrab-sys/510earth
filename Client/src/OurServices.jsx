import { useEffect } from "react";
import "../src/style/OurServices.css";

const Services = () => {
  const services = [
    {
      title: "Property Management",
      image: "/images/service_pic1.jpg",
      text: "The rented and leased property requires careful management to ensure that all units get occupied at a time. Therefore, we at 510earth consider the tenants’ rights and instill the following agreement on the contract, including rent payments. We understand that the flats for sale require detailed marketing and implementing home staging strategies to ensure that they move and make faster ROI. Our company plays a crucial role in the property management services, which precisely include searching for tenant, payment, collection and taking care of property professionally as and when needed by the customer.",
    },
    {
      title: "Residential Properties",
      image: "/images/service_pic4.jpg",
      text: "Residential properties include homes and apartments and zoned specifically for living. It includes standalone single-family dwellings to large, multi-apartment buildings. We understand that buying a property is once in a lifetime decision. As leading real estate consultants in Kolkata, we have seasoned in-house experts who will guide you to select the best luxurious apartments, exotic villas, and beautiful bungalows across Kolkata. We have a list of buyers inquiring about apartments and residential properties across the megacity and help investors and builders to sell their properties.",
    },
    {
      title: "Commercial Properties",
      image: "/images/service_pic5.jpg",
      text: "Business executives are always searching for commercial properties for establishing office spaces, retail spaces, shopping complexes, hotels, and health care facilities. As a prominent and leading commercial property dealer in India, 510earth understands your requirements. Our experts are well aware of the different locations in the city. They will help you choose a suitable one from the wide array of commercial properties across the megacity, keeping in mind your requirements. With our lists of commercial property buyers in the city, we help investors and buyers purchase and sell them at the best rates.",
    },
    {
      title: "Land Consultancy",
      image: "/images/service_pic2.jpg",
      text: "At 510earth, we work closely with a range of land experts on key issues, including planning, legal requirements, environmental considerations, and sustainable issues. It helps us offer complete land consultancy service from conception to completion and ensure we can achieve the best possible deals for our clients. We provide expert advice on all matters concerning land issues that includes land court, land acquisition, land survey to name a few. Get valuable services like plot survey, land investment consultancy etc. Our wide network and excellent connections with sub-brokers in specific regions give us a strong edge in land information.",
    },
    {
      title: "Advisory Services",
      image: "/images/service_pic3.jpg",
      text: "Our experts have the industry specific knowledge to troubleshoot land related queries across the fields of residential, commercial as well as industrial properties. We have a big network to offer real estate consultancy services. Our in-depth market knowledge, unbiased advisory, extensive network, and high-level loyalty and transparency helped us emerge as one of the prominent real estate consultants in India. We strive to customize our advice to comply with commercial, tax, and legal requirements. Since our inception, we have completed numerous major transactions in various real estate sectors.",
    },
  ];

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
        threshold: 0.1, // Triggers slightly earlier for side elements
        rootMargin: "0px 0px -30px 0px"
      }
    );

    // Dynamic selector picks up both animation types automatically!
    const elementsToAnimate = document.querySelectorAll(".animate-3d-image, .animate-right-left");
    elementsToAnimate.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>

      <section className="inner_page inner_pad">

        <div className="container">
          <h1>SERVICES</h1>

          <p>
            Buyers and sellers need a common platform to initiate home purchases
            and sales. 510earth.com is a fast-growing real estate brokerage
            company displaying the best properties in the megacity of Kolkata.
            As one of the prominent real estate services in India, our primary
            service comprises helping our clients with the complicated process
            of buying and selling properties.
          </p>

          <div className="text-center m_top_30 perspective-wrapper">
            <img
              src="/images/service_top_pic.jpg"
              className="img-fluid mainImg animate-3d-image"
              alt="real-estate-services"
            />
          </div>
        </div>
      </section>

      <section className="service_top">
        <div className="container">
          <div className="row">
            <div className="offset-md-2 col-md-10">
              {services.map((item, index) => (
                <div key={index} className="service_top_inner hvr-sink">
                  <div className="service_left">
                    <img
                      src={item.image}
                      className="img-fluid animate-right-left" // Updated for horizontal effect
                      alt={item.title}
                    />
                  </div>

                  <div className="service_right">
                    <h2>{item.title}</h2>
                    <p>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="banner service_bottom">
        <div className="container">
          <div className="row">
            <div className="col-md-6 d-flex">
              <div className="service_bottom_inner">
                <div className="text-center mb-3" style={{ overflow: "hidden" }}>
                  <img
                    src="/images/service_bot_pic1.jpg"
                    className="img-fluid " // Updated for horizontal effect
                    alt="Valuations"
                  />
                </div>

                <h2>Valuations</h2>

                <p>
                  We provide asset valuation services pertaining to land. It is
                  a vital service where you can trust on our name and
                  credibility. At 510earth, we offer valuations guided by Red
                  Book valuation Standards. We offer our services locally on a
                  one-off or recurring basis. We support our valuation services
                  through strong research and the use of technology to make the
                  process more efficient and ensure adherence to quality
                  standards and timelines. We leverage our regional connectivity
                  to produce accurate and timely cross-border valuations and
                  advice upon request in special situations.
                </p>
              </div>
            </div>

            <div className="col-md-6 d-flex">
              <div className="service_bottom_inner">
                <div className="text-center mb-3" style={{ overflow: "hidden" }}>
                  <img
                    src="/images/service_bot_pic2.jpg"
                    className="img-fluid" // Updated for horizontal effect
                    alt="Financial Advocacy"
                  />
                </div>

                <h2>Financial Advocacy</h2>

                <p>
                  We believe in building personal relationship especially when
                  it comes to your home and financial securities related to it.
                  We have been associated with fulfilling the homeownership
                  dreams with our touch of security and protection. Our real
                  estate practice covers various aspects of investment,
                  commencing from conducting title due diligence of the target
                  property. We regularly engage with clients in selling and
                  purchasing an immovable property of all categories, from
                  commercial to residential and agriculture. Furthermore, our
                  team is competent in handling and counseling certain
                  governmental and other compliances regarding the target
                  property.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;