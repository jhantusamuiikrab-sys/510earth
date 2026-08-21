import React from 'react';
import "../../assets/paneldesign/css/LocationMap.css";

function LocationMap() {
  // Replace this URL with your static map image path or dynamic Google Maps embed link
  const mapImageUrl = "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80";

  return (
    <div className="locmap-main-wrapper">
      {/* Section Heading */}
      <div className="locmap-title-container">
        <h2 className="locmap-heading">LOCATION MAP</h2>
        <div className="locmap-heading-underline-group">
          <div className="locmap-blue-bar"></div>
        </div>
      </div>

      {/* Map Container Frame */}
      <div className="locmap-card-wrapper">
        <div className="locmap-image-box">
          <img 
            src={mapImageUrl} 
            alt="Location Map" 
            className="locmap-img" 
          />
        </div>
      </div>
    </div>
  );
}

export default LocationMap;