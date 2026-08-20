import React, { useState } from 'react';
// Import your custom layout stylesheet safely
import '../../assets/Font/NewHome/style.css'; 
import '../../assets/Content/style.css';

const PropertyTypeSection = () => {
  // Manage current active tab via state ('residential', 'commercial', 'land')
  const [activeTab, setActiveTab] = useState('residential');

  // Organized data array for properties to keep the code clean and scalable
  const propertyTypes = [
    {
      id: 'residential',
      title: 'Residential',
      iconClass: 'fas fa-home fs-3 mb-2',
      image: '/images/type_img1.jpg', // Pointing directly to public/images/
      delay: '0.1s',
      description: "Residential properties comprise houses for individuals, families, and groups of people. Whether you are looking for apartments, single or multifamily homes, condominiums or villas, as India’s top property sites, we have you covered. We offer our clients verified listings of luxury homes for sale."
    },
    {
      id: 'commercial',
      title: 'Commercial',
      iconClass: 'fas fa-building fs-3 mb-2',
      image: '/images/type_img2.jpg', // Pointing directly to public/images/
      delay: '0.2s',
      description: "Businesspersons invest more in these types of properties to run their businesses. Whether you want to establish shopping malls, office spaces, parking lots, or other properties in prime areas, 510earth has your back. We offer details of all commercial properties for sale in the prime locations of Kolkata."
    },
    {
      id: 'land',
      title: 'Land',
      iconClass: 'fas fa-map fs-3 mb-2',
      image: '/images/type_img4.jpg', // Pointing directly to public/images/
      delay: '0.4s',
      description: "It is the baseline for all property types and refers to undeveloped and vacant land. We help our clients buy or sell any land in your preferred location for residential and commercial purposes. You can further rezone it and increase the value of the property."
    }
  ];

  return (
    <section className="type_area py-5 bg-white">
      {/* CSS Injection to add the pointing triangle arrow beneath the active block tab */}
      <style>{`
        .custom-tab-btn {
          position: relative;
          transition: all 0.3s ease;
          width: 100%;
          min-height: 125px;
        }
        .custom-tab-btn.active-card::after {
          content: '';
          position: absolute;
          bottom: -12px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 12px solid transparent;
          border-right: 12px solid transparent;
          border-top: 12px solid #3b91d4;
          z-index: 10;
        }
      `}</style>

      <div className="container">
        
        {/* Header Heading text - Fully Centered */}
        <div className="row mb-5 text-center">
          <div className="col-md-12">
            <h2 className="fw-bold text-dark mb-3" style={{ fontSize: '28px' }}>
              What Type of Property Are You <span style={{ color: '#3b91d4' }}>Looking For?</span>
            </h2>
            <p className="text-secondary mx-auto" style={{ fontSize: '15px', maxWidth: '900px' }}>
              You can come across several types of real estate with unique purposes and utility. The main 
              categories we deal with include the following:
            </p>
          </div>
        </div>

        {/* Tab Navigation Grid Row */}
        <div className="row g-4 justify-content-center mb-5">
          {propertyTypes.map((tab) => (
            <div className="col-6 col-md-3 text-center" key={tab.id}>
              <button
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`custom-tab-btn d-flex flex-column align-items-center justify-content-center border-0 rounded-3 p-4 shadow-sm ${
                  activeTab === tab.id ? 'active-card text-white' : 'text-dark'
                }`}
                style={{
                  backgroundColor: activeTab === tab.id ? '#3b91d4' : '#eef5fc',
                  cursor: 'pointer'
                }}
              >
                <i className={tab.iconClass} style={{ color: activeTab === tab.id ? '#ffffff' : '#000000' }}></i>
                <span className="fw-semibold" style={{ fontSize: '15px' }}>{tab.title}</span>
              </button>
            </div>
          ))}
        </div>

        {/* Tab Content Panel Display Block */}
        <div className="row justify-content-center">
          <div className="col-md-11">
            <div className="tab-content" id="myTabContent">
              {propertyTypes.map((item) => (
                <div 
                  key={item.id}
                  className={`tab-pane fade ${activeTab === item.id ? 'show active' : 'd-none'}`}
                  role="tabpanel"
                >
                  {/* Container card styled with extra large rounding and elegant shadow to match blueprint */}
                  <div className="p-4 bg-white shadow" style={{ borderRadius: '24px' }}>
                    <div className="row g-4 align-items-center">
                      
                      {/* Left Side: Property Display Image */}
                      <div className="col-md-5 d-flex">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="img-fluid w-100 object-fit-cover"
                          style={{ maxHeight: '290px', borderRadius: '18px' }}
                        />
                      </div>
                      
                      {/* Right Side: Typography Details */}
                      <div className="col-md-7 px-md-4 text-center text-md-start">
                        <div className="success_info py-2">
                          <h3 className="fw-bold text-dark mb-3" style={{ fontSize: '22px' }}>{item.title}</h3>
                          <p className="text-secondary lh-base mb-0" style={{ fontSize: '15px', textAlign: 'justify' }}>
                            {item.description}
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PropertyTypeSection;