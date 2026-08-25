import React from 'react';

const AMENITIES_LIST = [
  "Lift", "24/7 Water Supply", "Car Parking/Reserved Parking",
  "Firefighting Systems", "Children's Play Area", "Patio or Balcony",
  "Gymnasium", "Intercom", "Club House",
  "Gated Access", "Swimming Pool", "Pet Friendly",
  "Pedestrian-Friendly /Walk-Score", "Game Room & Lounge", "Private Spa",
  "Power Backup", "Multipurpose Hall", "Cycling & Jogging Track",
  "Multipurpose Courts", "Security", "Flower Gardens",
  "Park", "Visitor Parking", "Rain Water Harvesting",
  "Vaastu Compliant", "Aerobics Room", "Earthquake Resistance",
  "Maintenance Staff", "CCTV Camera", "Golf Course",
  "Health Club With Steam /Jaccuzi", "Coffee Lounge & Restaurants", "WiFi in Common Area",
  "No. of Lift", "Forest Trails", "Indoor Badminton Courts",
  "Picnic Lawn", "Senior Citizen Zone", "Tennis Courts",
  "Theatre", "Hanging Pool", "Basket Ball",
  "Organic Farm", "Meditation Lawn", "Cricket Pitch",
  "Solar Water Panel", "Solar Hot Water", "Fitness Activity wall",
  "Temple", "Covered Fountain", "Badminton",
  "Mini Theatre", "Library", "Squash Court",
  "Fishing Pond", "Commercial Zone", "Meeting & Event Zone",
  "Amphitheatre"
];

const StepAmenities = ({ formData, setFormData, onNext, onPrev }) => {
  const handleCheckboxChange = (amenity) => {
    setFormData((prev) => {
      const currentAmenities = prev.amenities || [];
      const updatedAmenities = currentAmenities.includes(amenity)
        ? currentAmenities.filter((item) => item !== amenity)
        : [...currentAmenities, amenity];

      return {
        ...prev,
        amenities: updatedAmenities,
      };
    });
  };

  return (
    <div className="house_villa_card">
      {/* Header Banner */}
      <div className="house_header_banner">
        <h2>Amenities</h2>
      </div>

      <div className="house_body" style={{ padding: '20px' }}>
        {/* 3-Column Grid for Amenities */}
        <div 
          className="amenities_grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '14px 20px',
            marginBottom: '30px'
          }}
        >
          {AMENITIES_LIST.map((amenity) => {
            const isChecked = (formData.amenities || []).includes(amenity);
            return (
              <label 
                key={amenity} 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#333'
                }}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleCheckboxChange(amenity)}
                  style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                />
                {amenity}
              </label>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="action_buttons" style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
          <button type="button" className="btn_prev_green" onClick={onPrev}>
            &larr; Previous
          </button>
          <button type="button" className="btn_next_blue" onClick={onNext}>
            Next &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepAmenities;