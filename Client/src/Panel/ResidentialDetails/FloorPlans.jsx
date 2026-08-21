import React, { useState } from 'react';
import { 
  Building2, 
  Car, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Maximize2 
} from 'lucide-react';

import "../../assets/paneldesign/css/FloorPlans.css";

const FLOOR_PLANS_DATA = {
  '2BHK': {
    title: 'DETAILS OF 2BHK',
    sizeRange: '1147 - 1164 Sq Ft',
    parkingTypes: ['Open Parking', 'Covered Parking', 'Mechanical Parking'],
    slides: [
      {
        id: 1,
        sqft: '1147 Sq Ft',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 2,
        sqft: '1164 Sq Ft',
        image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80'
      }
    ]
  },
  '3BHK': {
    title: 'DETAILS OF 3BHK',
    sizeRange: '1315 - 1598 Sq Ft',
    parkingTypes: ['Open Parking', 'Covered Parking', 'Mechanical Parking'],
    slides: [
      {
        id: 1,
        sqft: '1315 Sq Ft',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
      },
      {
        id: 2,
        sqft: '1598 Sq Ft',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
      }
    ]
  }
};

function FloorPlans() {
  const [activeTab, setActiveTab] = useState('2BHK');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [modalImage, setModalImage] = useState(null);

  const activeData = FLOOR_PLANS_DATA[activeTab];

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
    setCurrentSlideIndex(0);
  };

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % activeData.slides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prev) => 
      prev === 0 ? activeData.slides.length - 1 : prev - 1
    );
  };

  return (
    <div className="fp-main-wrapper">
      {/* Section Title */}
      <div className="fp-title-container">
        <h2 className="fp-heading">FLOOR PLANS</h2>
        <div className="fp-heading-underline-group">
          <div className="fp-blue-bar"></div>
        </div>
      </div>

      {/* Tabs */}
      <div className="fp-tabs-container">
        <button
          className={`fp-tab-btn ${activeTab === '2BHK' ? 'fp-tab-active' : ''}`}
          onClick={() => handleTabChange('2BHK')}
        >
          2BHK
        </button>
        <button
          className={`fp-tab-btn ${activeTab === '3BHK' ? 'fp-tab-active' : ''}`}
          onClick={() => handleTabChange('3BHK')}
        >
          3BHK
        </button>
      </div>

      {/* Details & Image Slider Block */}
      <div className="fp-content-card">
        {/* Left Column: Details */}
        <div className="fp-details-col">
          <h3 className="fp-details-title">{activeData.title}</h3>

          <div className="fp-info-row">
            <div className="fp-icon-box">
              <Building2 className="fp-icon-cyan" />
            </div>
            <div className="fp-info-text-group">
              <span className="fp-info-label">
                Size Range : <span className="fp-info-value">{activeData.sizeRange}</span>
              </span>
            </div>
          </div>

          <div className="fp-info-row fp-info-row-top-align">
            <div className="fp-icon-box">
              <Car className="fp-icon-cyan" />
            </div>
            <div className="fp-info-text-group">
              <span className="fp-info-label-bold">Available Parking</span>
              <ul className="fp-parking-list">
                {activeData.parkingTypes.map((item, idx) => (
                  <li key={idx}>● {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Image Slider */}
        <div className="fp-slider-col">
          <div className="fp-slider-frame">
            <div className="fp-slide-header">
              ({activeData.slides[currentSlideIndex].sqft})
            </div>

            <div 
              className="fp-image-container"
              onClick={() => setModalImage(activeData.slides[currentSlideIndex].image)}
            >
              <img 
                src={activeData.slides[currentSlideIndex].image} 
                alt={`${activeTab} Floor Plan`} 
                className="fp-slide-img" 
              />
              <div className="fp-image-hover-overlay">
                <Maximize2 className="fp-maximize-icon" />
                <span>Click to view full screen</span>
              </div>
            </div>

            {/* Slider Arrow Controls */}
            <button className="fp-arrow-btn fp-arrow-left" onClick={handlePrevSlide}>
              <ChevronLeft size={20} />
            </button>
            <button className="fp-arrow-btn fp-arrow-right" onClick={handleNextSlide}>
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Slider Pagination Dots */}
          <div className="fp-dots-container">
            {activeData.slides.map((_, idx) => (
              <span
                key={idx}
                className={`fp-dot ${idx === currentSlideIndex ? 'fp-dot-active' : ''}`}
                onClick={() => setCurrentSlideIndex(idx)}
              ></span>
            ))}
          </div>
        </div>
      </div>

      {/* Full-Screen Image Lightbox Modal */}
      {modalImage && (
        <div className="fp-modal-overlay" onClick={() => setModalImage(null)}>
          <div className="fp-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="fp-modal-close" onClick={() => setModalImage(null)}>
              <X size={28} />
            </button>
            <img src={modalImage} alt="Expanded Floor Plan" className="fp-modal-img" />
          </div>
        </div>
      )}
    </div>
  );
}

export default FloorPlans;