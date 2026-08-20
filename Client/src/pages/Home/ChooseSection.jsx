import React from 'react';
// Import your custom styling file safely
import '../../assets/Font/NewHome/style.css'; 
import '../../assets/Content/style.css';


const ChooseSection = () => {
  // Organizing features dynamically makes it much shorter and cleaner to render
  const features = [
    {
      id: 1,
      icon: "/images/choose_icon1.png",
      title: "Integrity & Trust",
      description: "Trust is the most important factor. Therefore, we strive to understand our client’s needs, demands and preferences. We deliver our services to all our customers consistently and transparently at each stage. We believe in being loyal to our customers and following the same throughout the process. We take no hidden costs, offer timely deliveries, and promise quality construction on any project. Integrity and trust building helped us build long-lasting relationships."
    },
    {
      id: 2,
      icon: "/images/choose_icon2.png",
      title: "Knowledge & Expertise",
      description: "Buying a property, whether residential or commercial, is the largest investment most people make in their lifetime. We understand it, and therefore as experienced agents, offer our clients with tools required during the most complicated and stressful endeavor. Being a prominent local real estate consultant, we know about the neighborhood's local development and the ins and outs. We understand and respect our client's requirements and never force them to invest unnecessarily."
    },
    {
      id: 3,
      icon: "/images/choose_icon3.png",
      title: "Shortlisted Projects over a Wide Coverage",
      description: "Our experts interact with our customers to understand their requirements, taste, and preferences. We shortlist the properties keeping our customers in mind, and discuss the pros and cons of each property in detail with them. We cover the entire region of Kolkata. With a network of developers in East, West, South, and Central Kolkata, we help our customers with a wide variety of options from which you can choose a property that suits your financial and personal requirements."
    },
    {
      id: 4,
      icon: "/images/choose_icon4.png",
      title: "Commitment & Compassion",
      description: "Clients experience several doubts and queries about buying and selling properties. As one of India's leading real estate companies, our team works hard with complete dedication to addressing the needs of our clients. We commit to hearing our clients' doubts and queries and supporting them at every stage. Our commitment helped our clients gain confidence in us, helping us develop a rich and satisfied client base."
    }
  ];

  return (
    <section className="choose_area">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            
            {/* Header Content */}
            <h3 className="fw-bold mb-2 ">
              Why Choose 510earth as Your <span className="text-white">Real Estate Agent?</span>
            </h3>
            <p className="choose_para text-white mb-4 pb-2" style={{ fontSize: '16px' }}>
              Investing in real estate is a significant commitment. Here is why our clients chose us as the best-trusted real estate broker.
            </p>

            {/* Features Stacking List */}
            <div className="d-flex flex-column gap-4">
              {features.map((item) => (
                <div 
                  key={item.id}
                  className="choose_box wow fadeInLeft animated animated" 
                  style={{ visibility: 'visible', animationName: 'fadeInLeft' }}
                >
                  {/* Title & Icon Header Flex Container */}
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <span 
                      className="rounded-circle d-flex align-items-center justify-content-center shadow-sm" 
                      style={{ 
                        backgroundColor: '#2471a3', 
                        width: '55px', 
                        height: '55px', 
                        flexShrink: 0 
                      }}
                    >
                      <img 
                        src={item.icon} 
                        alt={item.title} 
                        className="img-fluid" 
                        style={{ maxHeight: '28px' }}
                      />
                    </span> 
                    <h4 className="h5 fw-bold mb-0 text-white">{item.title}</h4>
                  </div>
                  
                  {/* Feature Body Text Description */}
                  <p className="text-white mb-0 lh-base" style={{ fontSize: '14.5px', textAlign: 'justify' }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ChooseSection;