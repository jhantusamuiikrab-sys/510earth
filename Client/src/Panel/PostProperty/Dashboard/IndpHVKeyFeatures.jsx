import React, { useState } from 'react';

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

const IndpHVKeyFeatures = ({ onPrevious, onNext }) => {
  const [caption, setCaption] = useState('');
  const [propertyOverview, setPropertyOverview] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState({});

  const handleAmenityChange = (amenity) => {
    setSelectedAmenities((prev) => ({
      ...prev,
      [amenity]: !prev[amenity],
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (onNext) {
      onNext({
        caption,
        propertyOverview,
        amenities: selectedAmenities,
      });
    }
  };

  return (
    <div style={styles.pageContainer}>
      {/* Stepper Navigation Bar */}
      <div style={styles.stepperContainer}>
        <div style={styles.stepWrapper}>
          <div style={styles.stepCircle}>1</div>
          <span style={styles.stepLabel}>BASIC DETAILS</span>
        </div>
        <div style={styles.stepLine}></div>
        <div style={styles.stepWrapper}>
          <div style={{ ...styles.stepCircle, ...styles.activeStep }}>2</div>
          <span style={styles.stepLabel}>KEY FEATURES</span>
        </div>
        <div style={styles.stepLine}></div>
        <div style={styles.stepWrapper}>
          <div style={styles.stepCircle}>3</div>
          <span style={styles.stepLabel}>PROPERTY DETAILS</span>
        </div>
        <div style={styles.stepLine}></div>
        <div style={styles.stepWrapper}>
          <div style={styles.stepCircle}>4</div>
          <span style={styles.stepLabel}>OTHER INFORMATION</span>
        </div>
      </div>

      {/* Main Container Card */}
      <div style={styles.card}>
        <h2 style={styles.title}>INDEPENDENT HOUSE / VILLA</h2>
        <p style={styles.subtitle}>Key Features</p>

        <form onSubmit={handleNext}>
          {/* Caption Input Field */}
          <div style={styles.fieldGroup}>
            <input
              type="text"
              placeholder="Enter Caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              style={styles.captionInput}
            />
          </div>

          {/* WYSIWYG Editor Mock Container */}
          <div style={styles.editorContainer}>
            {/* Toolbar */}
            <div style={styles.editorToolbar}>
              <button type="button" style={styles.toolBtn}>↶</button>
              <button type="button" style={styles.toolBtn}>↷</button>
              <div style={styles.divider}></div>
              <button type="button" style={{ ...styles.toolBtn, fontWeight: 'bold' }}>B</button>
              <button type="button" style={{ ...styles.toolBtn, fontStyle: 'italic' }}>I</button>
              <button type="button" style={{ ...styles.toolBtn, textDecoration: 'underline' }}>U</button>
              <button type="button" style={{ ...styles.toolBtn, textDecoration: 'line-through' }}>S</button>
              <div style={styles.divider}></div>
              <select style={styles.editorSelect} defaultValue="Helvetica">
                <option value="Helvetica">Helvetica</option>
                <option value="Arial">Arial</option>
              </select>
              <select style={styles.editorSelect} defaultValue="14px">
                <option value="14px">14px</option>
                <option value="16px">16px</option>
              </select>
              <select style={styles.editorSelect} defaultValue="Paragraph">
                <option value="Paragraph">Paragraph</option>
                <option value="Heading 1">Heading 1</option>
              </select>
              <div style={styles.divider}></div>
              <button type="button" style={styles.toolBtn}>≡</button>
              <button type="button" style={styles.toolBtn}>equiv</button>
              <button type="button" style={styles.toolBtn}>≢</button>
              <button type="button" style={styles.toolBtn}>⋮⋮</button>
            </div>

            {/* Text Area Body */}
            <textarea
              placeholder="Enter Property Overview"
              value={propertyOverview}
              onChange={(e) => setPropertyOverview(e.target.value)}
              style={styles.editorBody}
            />

            {/* Editor Footer Status Bar */}
            <div style={styles.editorFooter}>
              <span>P</span>
              <span>0 WORDS POWERED BY TINY</span>
            </div>
          </div>

          {/* Amenities Heading */}
          <h3 style={styles.amenitiesHeader}>Amenities</h3>

          {/* Amenities Grid (3 Columns) */}
          <div style={styles.amenitiesGrid}>
            {AMENITIES_LIST.map((amenity, index) => (
              <label key={index} style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={!!selectedAmenities[amenity]}
                  onChange={() => handleAmenityChange(amenity)}
                  style={styles.checkbox}
                />
                <span style={styles.checkboxText}>{amenity}</span>
              </label>
            ))}
          </div>

          {/* Form Action Controls */}
          <div style={styles.actionButtons}>
            <button
              type="button"
              onClick={onPrevious}
              style={styles.previousButton}
            >
              Previous
            </button>
            <button
              type="submit"
              style={styles.nextButton}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// CSS Styles matching design specifications
const styles = {
  pageContainer: {
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    padding: '30px 20px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  stepperContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '850px',
    margin: '0 auto 25px auto',
  },
  stepWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  stepCircle: {
    width: '32px',
    height: '32px',
    borderRadius: '4px',
    backgroundColor: '#0f52ba',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  activeStep: {
    backgroundColor: '#82c91e',
  },
  stepLabel: {
    fontSize: '10px',
    color: '#495057',
    marginTop: '6px',
    fontWeight: '600',
  },
  stepLine: {
    flex: 1,
    height: '2px',
    backgroundColor: '#0f52ba',
    margin: '0 10px 16px 10px',
  },
  card: {
    backgroundColor: '#ffffff',
    maxWidth: '920px',
    margin: '0 auto',
    borderRadius: '4px',
    padding: '40px 50px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
  },
  title: {
    color: '#0f52ba',
    textAlign: 'center',
    fontSize: '18px',
    fontWeight: '700',
    margin: '0 0 6px 0',
  },
  subtitle: {
    color: '#6c757d',
    textAlign: 'center',
    fontSize: '14px',
    marginBottom: '35px',
  },
  fieldGroup: {
    marginBottom: '25px',
  },
  captionInput: {
    width: '100%',
    border: 'none',
    borderBottom: '1px solid #ced4da',
    padding: '10px 0',
    fontSize: '15px',
    color: '#495057',
    outline: 'none',
  },
  editorContainer: {
    border: '1px solid #ced4da',
    borderRadius: '2px',
    marginBottom: '30px',
  },
  editorToolbar: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 12px',
    backgroundColor: '#f8f9fa',
    borderBottom: '1px solid #ced4da',
    flexWrap: 'wrap',
  },
  toolBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    color: '#495057',
    padding: '2px 6px',
  },
  divider: {
    width: '1px',
    height: '18px',
    backgroundColor: '#dee2e6',
    margin: '0 4px',
  },
  editorSelect: {
    border: 'none',
    backgroundColor: 'transparent',
    fontSize: '13px',
    color: '#495057',
    outline: 'none',
    cursor: 'pointer',
  },
  editorBody: {
    width: '100%',
    minHeight: '260px',
    border: 'none',
    padding: '16px',
    fontSize: '14px',
    color: '#495057',
    outline: 'none',
    resize: 'vertical',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  },
  editorFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '6px 12px',
    fontSize: '11px',
    color: '#adb5bd',
    borderTop: '1px solid #e9ecef',
    backgroundColor: '#ffffff',
  },
  amenitiesHeader: {
    fontSize: '16px',
    color: '#333333',
    fontWeight: '600',
    marginBottom: '20px',
  },
  amenitiesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '14px 24px',
    marginBottom: '35px',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  checkbox: {
    marginRight: '10px',
    cursor: 'pointer',
    accentColor: '#0f52ba',
  },
  checkboxText: {
    fontSize: '14px',
    color: '#495057',
  },
  actionButtons: {
    display: 'flex',
    gap: '15px',
    marginTop: '20px',
  },
  previousButton: {
    backgroundColor: '#82c91e',
    color: '#ffffff',
    border: 'none',
    padding: '10px 35px',
    borderRadius: '3px',
    fontSize: '15px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  nextButton: {
    backgroundColor: '#82c91e',
    color: '#ffffff',
    border: 'none',
    padding: '10px 45px',
    borderRadius: '3px',
    fontSize: '15px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

export default IndpHVKeyFeatures;