import React from 'react';
import { Building2, Maximize2 } from 'lucide-react';
import "../../assets/paneldesign/css/SitePlan.css";


function SitePlan() {
  // Replace with your actual site plan image path
  const sitePlanImageUrl = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80";

  return (
    <div className="sp-main-wrapper">
      {/* Section Title */}
      <div className="sp-title-container">
        <h2 className="sp-heading">SITE PLAN</h2>
        <div className="sp-heading-underline-group">
          <div className="sp-blue-bar"></div>
        </div>
      </div>

      {/* Main Container Box */}
      <div className="sp-card-wrapper">
        {/* Dark Architectural Blueprint Frame */}
        <div className="sp-image-frame">
          <img 
            src={sitePlanImageUrl} 
            alt="Site Plan Layout" 
            className="sp-img" 
          />
          <span className="sp-blueprint-label">GROUND FLOOR PLAN</span>
        </div>

        {/* Bottom Property Highlights Bar */}
        <div className="sp-info-bar">
          <div className="sp-info-item">
            <Building2 className="sp-info-icon" />
            <span className="sp-info-text">Total Floors : B+G+11</span>
          </div>
          
          <div className="sp-info-divider"></div>

          <div className="sp-info-item">
            <Maximize2 className="sp-info-icon" />
            <span className="sp-info-text">Total Land Area : 37 Katha</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SitePlan;