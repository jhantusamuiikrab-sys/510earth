import "../../assets/paneldesign/css/ResidentialProperties.css";
import React, { useState, useEffect, useRef } from 'react';

const PROPERTIES_DATA = [
  {
    id: 1,
    title: 'JMC Hill View',
    location: 'SILIGURI, MATIGARA , SILIGURI',
    status: 'Ready to Move',
    statusType: 'ready',
    price: '₹ 34.65 Lakhs onwards',
    bhk: '2BHK, 2.5BHK',
    sqft: null,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'NS Alti Level',
    location: 'SILIGURI, CHAMPASARI , SILIGURI',
    status: 'Under Construction',
    statusType: 'construction',
    price: '₹ 46.59 Lakhs onwards',
    bhk: '2BHK, 3BHK',
    sqft: null,
    image: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    title: 'Fortune Heights',
    location: 'BARASAT , KOLKATA',
    status: 'Under Construction',
    statusType: 'construction',
    price: '₹ 47 Lakhs onwards',
    bhk: '2BHK, 3BHK, 4BHK, 2.5BHK',
    sqft: '847 - 1998 Sqft',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    title: 'Siddha Waterfront',
    location: 'BARRACKPORE , KOLKATA',
    status: 'Under Construction',
    statusType: 'construction',
    price: '₹ 36.5 Lakhs onwards',
    bhk: '2BHK, 3BHK',
    sqft: '806 - 1216 Sqft',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 5,
    title: 'Srijan Solus',
    location: 'MADHYAMGRAM , KOLKATA',
    status: 'Under Construction',
    statusType: 'construction',
    price: '₹ 63.27 Lakhs onwards',
    bhk: '3BHK',
    sqft: '1129 - 1315 Sqft',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 6,
    title: 'Godrej Prakriti Phase III',
    location: 'SODEPUR , KOLKATA',
    status: 'Under Construction',
    statusType: 'construction',
    price: '₹ 70 Lakhs onwards',
    bhk: '2BHK, 3BHK',
    sqft: null,
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80'
  }
];

function ResidentialProperties() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        // rootMargin offsets the trigger so it only fires when the block is near the center of the viewport
        rootMargin: '0px 0px -150px 0px',
        threshold: 0.2
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div className="srp-main-wrapper" ref={sectionRef}>
      <h2 className="srp-heading">Similar Residential Properties</h2>

      <div className="srp-grid">
        {PROPERTIES_DATA.map((item, index) => (
          <div
            key={item.id}
            className={`srp-card-container ${isVisible ? 'srp-animate-scroll' : ''}`}
            style={{ transitionDelay: isVisible ? `${index * 0.12}s` : '0s' }}
          >
            {/* Main Card */}
            <div className="srp-card">
              {/* Image Section */}
              <div className="srp-image-box">
                <img src={item.image} alt={item.title} className="srp-img" />
                <div className="srp-image-overlay">
                  <h3 className="srp-card-title">{item.title}</h3>
                  <p className="srp-card-location">
                    <span className="srp-pin-icon">📍</span> {item.location}
                  </p>
                </div>
                {/* Status Badge */}
                <div className={`srp-badge ${item.statusType === 'ready' ? 'srp-badge-ready' : 'srp-badge-construction'}`}>
                  {item.status}
                </div>
              </div>

              {/* Bottom Body Section */}
              <div className="srp-body">
                <div className="srp-row srp-row-top">
                  <span className="srp-price">{item.price}</span>
                  {item.sqft && <span className="srp-sqft">{item.sqft}</span>}
                </div>
                <div className="srp-row srp-row-bottom">
                  <span className="srp-bhk">{item.bhk}</span>
                  <button className="srp-btn-details">VIEW DETAILS</button>
                </div>
              </div>
            </div>

            {/* Bottom Curved Shadow */}
            <div className="srp-card-shadow"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResidentialProperties;
