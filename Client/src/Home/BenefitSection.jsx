import React from 'react';
// Import your custom styling file safely
import '../assets/Font/NewHome/style.css'; 

const BenefitSection = () => {
  // Organizing card data in an array keeps the markup clean and easy to scale
  const benefitsData = [
    {
      id: 1,
      icon: "/images/benefit_icon1.png",
      title: "Boost Visibility & Traffic",
      description: "Advertising flats for sale is often a tough job. Utilizing the help of a real estate agent is beneficial, as we have a list of buyers looking for residential properties. Whether there is a commercial or residential property, they have a complete list of buyers and builders within the locality. When sellers contact the agents for selling their properties, they can easily pull out a list of buyers looking for similar properties you are selling."
    },
    {
      id: 2,
      icon: "/images/benefit_icon2.png",
      title: "Protection",
      description: "Reputed and trusted real estate agents offer clients protection throughout the process. They follow their code of ethics that implicit trade. They oblige strict collaboration rules and laws to protect the profession and relationship between buyers and sellers."
    },
    {
      id: 3,
      icon: "/images/benefit_icon3.png",
      title: "Legal Documentation",
      description: "Everyone knows the documentation that goes on with purchasing real estate properties. Often the parties fall short of honoring all necessary legal documentation. Hiring a real estate broker is essential, as they have a command over all of the legal documentation necessary for a home transaction, relieving the parties of stress and worry."
    },
    {
      id: 4,
      icon: "/images/benefit_icon4.png",
      title: "Peace of Mind",
      description: "When dealing with reputed real estate companies in India, clients remain assured that they sell or buy the properties at a fair market rate. Brokers are knowledgeable about the real estate market, and their resources go beyond what clients accumulate through their research."
    }
  ];

  return (
    <section className="benefit_area py-5 bg-light">
      <div className="container">
        
        {/* Header Heading text */}
        <div className="row mb-4">
          <div className="col-md-12 text-center text-md-start">
            <h3 className="fw-bold mb-3">
              Benefits of Collaborating with Trusted <span className="text-primary">Real Estate Companies in India</span>
            </h3>
            <p className="bene_para text-white lh-base" style={{ fontSize: '15.5px' }}>
              Finding the right buyers and sellers is difficult, and it often takes months to seal a deal. 
              Hiring a trusted real estate consultant takes care of several problems and reduces your 
              involvement during the entire process. Explore how trusted and reputed real estate companies 
              help you achieve your dreams.
            </p>
          </div>
        </div>

        {/* Benefits Grid Layout */}
        <div className="row g-4">
          {benefitsData.map((benefit) => (
            <div className="col-md-6 d-flex" key={benefit.id}>
              <div 
                className="benefit_box w-100 p-4 rounded shadow-sm wow bounceIn"
                style={{ transition: 'transform 0.2s ease-in-out' }}
              >
                {/* Icon Wrapper */}
                <div className="mb-3 d-inline-block p-2 rounded"
                  style={{ 
                    backgroundColor: '#289cff', 
                    width: '60px', 
                    height: '60px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}
                  >
                  <img 
                    src={benefit.icon} 
                    alt={benefit.title} 
                    className="img-fluid" 
                    style={{ width: '45px', height: '45px', objectFit: 'contain' }}
                  />
                </div>
                
                {/* Card Title */}
                <h4 className="h5 fw-bold text-white mb-2">{benefit.title}</h4>
                
                {/* Card Body Text */}
                <p className="text-white mb-0 lh-base" style={{ fontSize: '14.5px', textAlign: 'justify' }}>
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BenefitSection;