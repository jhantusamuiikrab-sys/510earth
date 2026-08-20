import React from 'react';
// Import Link from react-router-dom for your routing needs
import { Link } from 'react-router-dom';
// Import your custom styling stylesheet safely
import '../../assets/Font/NewHome/style.css'; 

const ServiceSection = () => {
  // Data array for clean, scalable rendering of your services
  const servicesData = [
    {
      id: 1,
      title: "Loan Assistance",
      description: "Do you have a tight budget and in requirement of a home right now? We offer expert financing assistance . Schedule an appointment to know more.",
      webp: "/images/icon1.webp",
      jpg: "/images/icon1.jpg",
      png: "/images/icon1.png",
      altText: "flats for sale",
      animationClass: "wow bounceInLeft"
    },
    {
      id: 2,
      title: "Property Tour",
      description: "We are more than glad to assist our prospective buyers to take an old fashioned show-and-tell along with the modern day virtual tours of the property to show them every inch of the property before they make a buying decision.",
      webp: "/images/icon2.webp",
      jpg: "/images/icon2.jpg",
      png: "/images/icon2.png",
      altText: "property-tour",
      animationClass: "wow bounceInRight"
    },
    {
      id: 3,
      title: "Legal Assistance",
      description: "We want our clients to know that buying a property includes taking possession of a unit. it is associated with documentation and complete legal procedures.",
      webp: "/images/icon3.webp",
      jpg: "/images/icon3.jpg",
      png: "/images/icon3.png",
      altText: "legal-assistance",
      animationClass: "wow bounceInRight"
    },
    {
      id: 4,
      title: "Consulting Services",
      description: "By Consulting a trustworthy brokerage service provider like us you are sure to make the right decision. We are committed to helping the buyer to find a property suited for his lifestyle.",
      webp: "/images/icon4.webp",
      jpg: "/images/icon4.jpg",
      png: "/images/icon4.png",
      altText: "consulting-services",
      animationClass: "wow bounceInLeft"
    }
  ];

  return (
    <section className="service_panel py-5" role="img" aria-label="real-estate-services">
      <div className="container">
        
        {/* Header Heading Area */}
        <div className="service_inner_hding text-center mb-5">
          <h2 className="fw-bold"> Our Services </h2>
          <p className="text-white mx-auto mt-2 fw-bold" style={{ maxWidth: '800px', fontSize: '15px', color: 'white' }}>
            510earth.com has something to offer to everyone. Nestle in the lap of luxury. 
            Contemporary residential & features. One look at our properties & you will know why 
            what do we mean by a richer life. You can see us ticking all the boxes below when it 
            come choosing our properties.
          </p>
        </div>
        
        {/* Services Layout Grid */}
        <div className="service_inner wow bounceIn">
          {/* ADJUSTMENT 1: Changed g-4 to g-3 to reduce vertical spacing between the rows */}
          <div className="row g-3">
            {servicesData.map((service) => (
              <div className="col-md-6" key={service.id}>
                {/* ADJUSTMENT 2: Changed p-4 to py-3 px-4 to make the individual blue sections shorter vertically */}
                <div className={`cont_text py-3 px-4 ${service.animationClass}`}>
                  
                  {/* Picture Icon Wrapper linked to Services page */}
                  <div className="icon_sec mb-2"> {/* Reduced bottom margin slightly */}
                    <Link to="/services">
                      <picture>
                        <source type="image/webp" srcSet={service.webp} />
                        <source type="image/jpeg" srcSet={service.jpg} />
                        <img src={service.png} alt={service.altText} className="img-fluid" style={{ maxWidth: '60px' }} />
                      </picture>
                    </Link>
                  </div>

                  <h3 className="h5 fw-bold text-dark mb-2">{service.title}</h3>
                  <p className="text-white mb-0 lh-base" style={{ fontSize: '15.5px' }}>
                    {service.description}
                  </p>
                  
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Action Button Row */}
          {/* ADJUSTMENT 3: Changed mt-5 to mt-4 to pull the "Know More" button closer to the cards */}
          <div className="row mt-4">
            <div className="col-md-12 text-center">
              <div className="service_btn">
                <Link to="/services" className="btn btn-warning px-5 py-2 fw-bold text-white shadow-sm">
                  Know More
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Structural Shadow Bottom Element */}
        <h4 className="text-center mt-4 mb-0">
          <picture>
            <source type="image/webp" srcSet="/images/btm_shadow.webp" />
            <source type="image/jpeg" srcSet="/images/btm_shadow.jpg" />
          </picture>
        </h4>

      </div>
    </section>
  );
};

export default ServiceSection;