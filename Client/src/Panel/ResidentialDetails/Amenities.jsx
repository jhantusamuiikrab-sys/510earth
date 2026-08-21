import "../../assets/paneldesign/css/Amenities.css";

import React, { useState } from "react";
import { 
  Droplets, 
  Camera, 
  Zap, 
  Flame, 
  PhoneCall, 
  ArrowUpDown, 
  ShieldCheck, 
  Trees, 
  Car, 
  Dumbbell 
} from 'lucide-react';


const DEFAULT_AMENITIES = [
  { id: 1, name: '24/7 Water Supply', icon: <Droplets className="am-icon" /> },
  { id: 2, name: 'CCTV Camera', icon: <Camera className="am-icon" /> },
  { id: 3, name: 'Earthquake Resistance', icon: <Zap className="am-icon" /> },
  { id: 4, name: 'Firefighting Systems', icon: <Flame className="am-icon" /> },
  { id: 5, name: 'Intercom', icon: <PhoneCall className="am-icon" /> },
  { id: 6, name: 'Lift', icon: <ArrowUpDown className="am-icon" /> },
  { id: 7, name: '24/7 Security', icon: <ShieldCheck className="am-icon" /> },
  { id: 8, name: 'Children\'s Play Area', icon: <Trees className="am-icon" /> },
  { id: 9, name: 'Car Parking', icon: <Car className="am-icon" /> },
  { id: 10, name: 'Gymnasium', icon: <Dumbbell className="am-icon" /> },
];

function Amenities({ property }) {
  const [showMore, setShowMore] = useState(false);

  const amenitiesList = property?.amenities?.length > 0 
    ? property.amenities 
    : DEFAULT_AMENITIES;

  const initialAmenities = amenitiesList.slice(0, 6);
  const extraAmenities = amenitiesList.slice(6);

  return (
    <div className="am-wrapper">
      {/* Ribbon Banner (Placed outside section so clip-path won't chop it off) */}
      <div className="am-ribbon-wrapper">
        <div className="am-ribbon-ear-left"></div>
        <div className="am-ribbon-badge">
          <h3>AMENITIES</h3>
        </div>
        <div className="am-ribbon-ear-right"></div>
      </div>

      <section className={`am-section ${showMore ? 'am-is-open' : 'am-is-closed'}`}>
        {/* Blueprint Overlay */}
        <div className="am-grid-overlay"></div>

        <div className="am-container">
          {/* Always Visible Items */}
          <div className="am-items-grid">
            {initialAmenities.map((item, index) => (
              <div className="am-item" key={item.id || index}>
                <div className="am-icon-box">{item.icon}</div>
                <p className="am-item-name">{item.name || item.Name}</p>
              </div>
            ))}
          </div>

          {/* Smooth Keyframe Expandable Container */}
          {extraAmenities.length > 0 && (
            <div className={`am-expandable-wrapper ${showMore ? 'am-expand' : 'am-collapse'}`}>
              <div className="am-expandable-inner">
                <div className="am-items-grid am-extra-grid">
                  {extraAmenities.map((item, index) => (
                    <div className="am-item am-animated-item" key={item.id || index + 6}>
                      <div className="am-icon-box">{item.icon}</div>
                      <p className="am-item-name">{item.name || item.Name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Toggle Button */}
          {amenitiesList.length > 6 && (
            <div className="am-btn-wrapper">
              <button 
                type="button" 
                className="am-show-btn"
                onClick={() => setShowMore((prev) => !prev)}
              >
                {showMore ? 'SHOW LESS' : 'SHOW MORE'}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Amenities;