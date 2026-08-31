import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "../../../../../assets/paneldesign/css/FlatApartmentOtherInfo.module.css";

const AMENITIES_LIST = [
  'Lift', '24/7 Water Supply', 'Car Parking/Reserved Parking',
  'Firefighting Systems', "Children's Play Area", 'Patio or Balcony',
  'Gymnasium', 'Intercom', 'Club House',
  'Gated Access', 'Swimming Pool', 'Pet Friendly',
  'Pedestrian-Friendly /Walk-Score', 'Game Room & Lounge', 'Private Spa',
  'Power Backup', 'Multipurpose Hall', 'Cycling & Jogging Track',
  'Multipurpose Courts', 'Security', 'Flower Gardens',
  'Park', 'Visitor Parking', 'Rain Water Harvesting',
  'Vaastu Compliant', 'Aerobics Room', 'Earthquake Resistance',
  'Maintenance Staff', 'CCTV Camera', 'Golf Course',
  'Health Club With Steam /Jacuzzi', 'Coffee Lounge & Restaurants', 'WiFi in Common Area',
  'No. of Lift', 'Forest Trails', 'Indoor Badminton Courts',
  'Picnic Lawn', 'Senior Citizen Zone', 'Tennis Courts',
  'Theatre', 'Hanging Pool', 'Basket Ball',
  'Organic Farm', 'Meditation Lawn', 'Cricket Pitch',
  'Solar Water Panel', 'Solar Hot Water', 'Fitness Activity wall',
  'Temple', 'Covered Fountain', 'Badminton',
  'Mini Theatre', 'Library', 'Squash Court',
  'Fishing Pond', 'Commercial Zone', 'Meeting & Event Zone',
  'Amphitheatre'
];

const DEFAULT_CHECKED = [
  'Lift', '24/7 Water Supply', 'Car Parking/Reserved Parking',
  'Firefighting Systems', "Children's Play Area", 'Gymnasium',
  'Intercom', 'Swimming Pool', 'Game Room & Lounge',
  'Power Backup', 'Multipurpose Hall', 'Cycling & Jogging Track',
  'Security', 'Flower Gardens', 'Park', 'Rain Water Harvesting',
  'Maintenance Staff', 'CCTV Camera', 'Earthquake Resistance'
];

const FlatApartmentPropertyDetails = () => {
  const navigate = useNavigate();

  const [amenities, setAmenities] = useState(() => {
    const initial = {};
    AMENITIES_LIST.forEach((item) => {
      initial[item] = DEFAULT_CHECKED.includes(item);
    });
    return initial;
  });

  const [nearby, setNearby] = useState({
    airport: '22.2Kms - Dum Dum Airport',
    bank: '1Kms - SBI, HDFC, ICICI Bank',
    busStop: '100 Metres Chanditala Bus Stop',
    college: '1Kms - New Alipore College',
    hospital: '1.8Kms - RSV Hospital, 2.2Kms - B.P Podda',
    kindergarten: 'BLOSSOM KINDERGARTEN SCHOOL : 2.5KM',
    landmark: '2Kms - Chandi Mandir',
    mall: '3.8 Kms - South City Mall',
    market: '800 Metres - Senhati Bazaar',
    metro: '2.2 Kms - Rabindra Sarobar Metro Station',
    nearByCircle: 'BISWABANGLA GATE - 22.9KM',
    publicPark: 'PADMA PUKUR PARK : 1.8KM',
    railwayStation: '1.5 Kms - New Alipore Railway Station',
    school: '3.5 Kms - Laxmipath Singhania, 2.2 Kms M',
    techPark: 'SOFTWARE TECHNOLOGY PARKS OF INDIA :',
    temple: 'KALI TEMPLE : 0.08KM',
    university: 'MAHATMA GANDHI UNIVERSITY : 1.8KM'
  });

  const handleAmenityChange = (name) => {
    setAmenities((prev) => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const handleNearbyChange = (e) => {
    const { name, value } = e.target;
    setNearby((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePrev = () => {
    // Route back to Step 2
    navigate('/dashboard/upload/key-features');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedAmenities = Object.keys(amenities).filter((key) => amenities[key]);
    
    // Route forward to Step 4 (Other Information)
    navigate('/dashboard/upload/other-information', {
      state: { amenities: selectedAmenities, nearby }
    });
  };

  return (
    <div className={styles.container}>
      {/* 4-Step Progress Indicator */}
      <div className={styles.stepperContainer}>
        <div className={styles.stepLine}></div>

        <div className={styles.stepWrapper}>
          <div className={`${styles.stepNumber} ${styles.active}`}>1</div>
          <span className={styles.stepLabel}>Basic Details</span>
        </div>

        <div className={styles.stepWrapper}>
          <div className={`${styles.stepNumber} ${styles.active}`}>2</div>
          <span className={styles.stepLabel}>Key Features</span>
        </div>

        <div className={styles.stepWrapper}>
          <div className={`${styles.stepNumber} ${styles.active}`}>3</div>
          <span className={styles.stepLabel}>Property Details</span>
        </div>

        <div className={styles.stepWrapper}>
          <div className={styles.stepNumber}>4</div>
          <span className={styles.stepLabel}>Other Information</span>
        </div>
      </div>

      {/* Main Form Card */}
      <div className={styles.card}>
        <div className={styles.titleHeader}>
          <h2 className={styles.mainTitle}>FLAT / APARTMENT</h2>
          <p className={styles.subTitle}>Property Details</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.formSection}>
          {/* Amenities Grid */}
          <div>
            <h3 className={styles.sectionHeader}>Amenities</h3>
            <div className={styles.amenitiesGrid}>
              {AMENITIES_LIST.map((item) => (
                <label key={item} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={amenities[item] || false}
                    onChange={() => handleAmenityChange(item)}
                    className={styles.checkboxInput}
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>

          {/* Nearby Section */}
          <div>
            <h3 className={styles.sectionHeader}>Nearby</h3>
            <div className={styles.nearbyGrid}>
              <div className={styles.inputFieldGroup}>
                <label className={styles.fieldLabel}>Airport</label>
                <input
                  type="text"
                  name="airport"
                  value={nearby.airport}
                  onChange={handleNearbyChange}
                  className={styles.underlinedInput}
                />
              </div>

              <div className={styles.inputFieldGroup}>
                <label className={styles.fieldLabel}>Bank</label>
                <input
                  type="text"
                  name="bank"
                  value={nearby.bank}
                  onChange={handleNearbyChange}
                  className={styles.underlinedInput}
                />
              </div>

              <div className={styles.inputFieldGroup}>
                <label className={styles.fieldLabel}>Bus Stop</label>
                <input
                  type="text"
                  name="busStop"
                  value={nearby.busStop}
                  onChange={handleNearbyChange}
                  className={styles.underlinedInput}
                />
              </div>

              <div className={styles.inputFieldGroup}>
                <label className={styles.fieldLabel}>College</label>
                <input
                  type="text"
                  name="college"
                  value={nearby.college}
                  onChange={handleNearbyChange}
                  className={styles.underlinedInput}
                />
              </div>

              <div className={styles.inputFieldGroup}>
                <label className={styles.fieldLabel}>Hospital</label>
                <input
                  type="text"
                  name="hospital"
                  value={nearby.hospital}
                  onChange={handleNearbyChange}
                  className={styles.underlinedInput}
                />
              </div>

              <div className={styles.inputFieldGroup}>
                <label className={styles.fieldLabel}>Kindergarten</label>
                <input
                  type="text"
                  name="kindergarten"
                  value={nearby.kindergarten}
                  onChange={handleNearbyChange}
                  className={styles.underlinedInput}
                />
              </div>

              <div className={styles.inputFieldGroup}>
                <label className={styles.fieldLabel}>Land Mark</label>
                <input
                  type="text"
                  name="landmark"
                  value={nearby.landmark}
                  onChange={handleNearbyChange}
                  className={styles.underlinedInput}
                />
              </div>

              <div className={styles.inputFieldGroup}>
                <label className={styles.fieldLabel}>Mall</label>
                <input
                  type="text"
                  name="mall"
                  value={nearby.mall}
                  onChange={handleNearbyChange}
                  className={styles.underlinedInput}
                />
              </div>

              <div className={styles.inputFieldGroup}>
                <label className={styles.fieldLabel}>Market</label>
                <input
                  type="text"
                  name="market"
                  value={nearby.market}
                  onChange={handleNearbyChange}
                  className={styles.underlinedInput}
                />
              </div>

              <div className={styles.inputFieldGroup}>
                <label className={styles.fieldLabel}>Metro</label>
                <input
                  type="text"
                  name="metro"
                  value={nearby.metro}
                  onChange={handleNearbyChange}
                  className={styles.underlinedInput}
                />
              </div>

              <div className={styles.inputFieldGroup}>
                <label className={styles.fieldLabel}>Near By Circle</label>
                <input
                  type="text"
                  name="nearByCircle"
                  value={nearby.nearByCircle}
                  onChange={handleNearbyChange}
                  className={styles.underlinedInput}
                />
              </div>

              <div className={styles.inputFieldGroup}>
                <label className={styles.fieldLabel}>Public Park</label>
                <input
                  type="text"
                  name="publicPark"
                  value={nearby.publicPark}
                  onChange={handleNearbyChange}
                  className={styles.underlinedInput}
                />
              </div>

              <div className={styles.inputFieldGroup}>
                <label className={styles.fieldLabel}>Railway Station</label>
                <input
                  type="text"
                  name="railwayStation"
                  value={nearby.railwayStation}
                  onChange={handleNearbyChange}
                  className={styles.underlinedInput}
                />
              </div>

              <div className={styles.inputFieldGroup}>
                <label className={styles.fieldLabel}>School</label>
                <input
                  type="text"
                  name="school"
                  value={nearby.school}
                  onChange={handleNearbyChange}
                  className={styles.underlinedInput}
                />
              </div>

              <div className={styles.inputFieldGroup}>
                <label className={styles.fieldLabel}>Tech Park</label>
                <input
                  type="text"
                  name="techPark"
                  value={nearby.techPark}
                  onChange={handleNearbyChange}
                  className={styles.underlinedInput}
                />
              </div>

              <div className={styles.inputFieldGroup}>
                <label className={styles.fieldLabel}>Temple</label>
                <input
                  type="text"
                  name="temple"
                  value={nearby.temple}
                  onChange={handleNearbyChange}
                  className={styles.underlinedInput}
                />
              </div>

              <div className={styles.inputFieldGroup}>
                <label className={styles.fieldLabel}>University</label>
                <input
                  type="text"
                  name="university"
                  value={nearby.university}
                  onChange={handleNearbyChange}
                  className={styles.underlinedInput}
                />
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className={styles.buttonGroup}>
            <button type="button" onClick={handlePrev} className={styles.prevBtn}>
              Previous
            </button>
            <button type="submit" className={styles.nextBtn}>
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FlatApartmentPropertyDetails;