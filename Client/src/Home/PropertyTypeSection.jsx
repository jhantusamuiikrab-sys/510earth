import React, { useState } from 'react';
// Import your custom layout stylesheet safely
import '../assets/Font/NewHome/style.css'; 
 import '../assets/Content/style.css';

const PropertyTypeSection = () => {
  // Manage current active tab via state ('residential', 'commercial', 'land')
  const [activeTab, setActiveTab] = useState('residential');

  // Organized data array for properties to keep the code clean and scalable
  const propertyTypes = [
    {
      id: 'residential',
      title: 'Residential',
      iconClass: 'fa-solid fa-house',
      image: 'images/type_img1.webp',
      delay: '0.1s',
      description: "Residential properties comprise houses for individuals, families, and groups of people. Whether you are looking for apartments, single or multifamily homes, condominiums or villas, as India’s top property sites, we have you covered. We offer our clients verified listings of luxury homes for sale."
    },
    {
      id: 'commercial',
      title: 'Commercial',
      iconClass: 'fas fa-building',
      image: '/images/type_img2.webp',
      delay: '0.2s',
      description: "Businesspersons invest more in these types of properties to run their businesses. Whether you want to establish shopping malls, office spaces, parking lots, or other properties in prime areas, 510earth has your back. We offer details of all commercial properties for sale in the prime locations of Kolkata."
    },
    {
      id: 'land',
      title: 'Land',
      iconClass: 'fa-solid fa-chart-area',
      image: '/images/type_img4.webp',
      delay: '0.4s',
      description: "It is the baseline for all property types and refers to undeveloped and vacant land. We help our clients buy or sell any land in your preferred location for residential and commercial purposes. You can further rezone it and increase the value of the property."
    }
  ];

  return (
    <section className="type_area py-5 bg-white">
      <div className="container">
        
        {/* Header Heading text */}
        <div className="row mb-4">
          <div className="col-md-12">
            <h3 className="fw-bold">
              What Type of Property Are You <span className="text-primary">Looking For?</span>
            </h3>
            <p className="type_para text-secondary" style={{ fontSize: '15px' }}>
              You can come across several types of real estate with unique purposes and utility. The main 
              categories we deal with include the following:
            </p>
          </div>
        </div>

        {/* Tab Navigation Header List */}
        <div className="row mb-4">
          <div className="col-md-12">
            <ul className="nav nav-tabs border-bottom" role="tablist">
              {propertyTypes.map((tab) => (
                <li 
                  key={tab.id} 
                  className="nav-item wow fadeInDown" 
                  data-wow-delay={tab.delay}
                  role="presentation"
                >
                  <button 
                    type="button"
                    role="tab"
                    onClick={() => setActiveTab(tab.id)}
                    className={`nav-link fw-bold px-4 py-2 border-0 ${
                      activeTab === tab.id ? 'active border-bottom border-primary text-primary' : 'text-secondary'
                    }`}
                    style={{
                      borderBottom: activeTab === tab.id ? '3px solid #007bff !important' : 'none',
                      background: 'transparent'
                    }}
                  >
                    <i className={`${tab.iconClass} me-2`}></i> 
                    {tab.title}
                  </button>
                </li>
              ))}
            </ul>

            {/* Tab Panes Body Container */}
            <div className="tab-content mt-4" id="myTabContent">
              {propertyTypes.map((item) => (
                <div 
                  key={item.id}
                  className={`tab-pane fade ${activeTab === item.id ? 'show active' : 'd-none'}`}
                  role="tabpanel"
                >
                  <div className="success_cont p-3 border rounded bg-light shadow-sm">
                    <div className="row g-4 align-items-center">
                      
                      {/* Left: Responsive Image display */}
                      <div className="col-md-5 d-flex">
                        <img 
                          src={item.image} 
                          alt="510Earth" 
                          className="img-fluid rounded w-100 object-fit-cover"
                          style={{ maxHeight: '300px' }}
                        />
                      </div>
                      
                      {/* Right: Info Text Panel */}
                      <div className="col-md-7 d-flex">
                        <div className="success_info py-2">
                          <h3 className="fw-bold text-dark mb-3">{item.title}</h3>
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