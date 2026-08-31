import React, { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import styles from '../../../../../assets/paneldesign/css/FlatApartmentBasicDetails.module.css';

// Helper function to convert numeric price to Indian English words
const convertPriceToWords = (price) => {
  const num = parseInt(price, 10);
  if (isNaN(num) || num <= 0) return '';
  if (num >= 10000000) {
    return `${(num / 10000000).toFixed(2)} Crore`;
  }
  if (num >= 100000) {
    return `${(num / 100000).toFixed(2)} Lakh`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(2)} Thousand`;
  }
  return `${num}`;
};

const FlatApartmentBasicDetails = () => {
  const navigate = useNavigate();
  // Access global multi-step context
  const { formData: globalFormData, updateFormData } = useOutletContext();

  // Initialize local state with context value if returning from a previous step
  const [formData, setFormData] = useState({
    state: globalFormData?.basicDetails?.state || '',
    city: globalFormData?.basicDetails?.city || '',
    propertyName: globalFormData?.basicDetails?.propertyName || '',
    location: globalFormData?.basicDetails?.location || '',
    projectStatus: globalFormData?.basicDetails?.projectStatus || '',
    possessionDate: globalFormData?.basicDetails?.possessionDate || '',
    projectFacing: globalFormData?.basicDetails?.projectFacing || '',
    price: globalFormData?.basicDetails?.price || '',
    isNegotiable: globalFormData?.basicDetails?.isNegotiable || false,
    bhk: globalFormData?.basicDetails?.bhk || '',
    // Additional fields triggered by BHK selection
    superBuiltUpArea: globalFormData?.basicDetails?.superBuiltUpArea || '',
    areaUnit: globalFormData?.basicDetails?.areaUnit || '',
    carpetArea: globalFormData?.basicDetails?.carpetArea || '',
    noOfBedrooms: globalFormData?.basicDetails?.noOfBedrooms || '',
    noOfBathrooms: globalFormData?.basicDetails?.noOfBathrooms || '',
    noOfBalconies: globalFormData?.basicDetails?.noOfBalconies || '',
    furnishedType: globalFormData?.basicDetails?.furnishedType || '',
    totalFloors: globalFormData?.basicDetails?.totalFloors || '',
    yourFloorNo: globalFormData?.basicDetails?.yourFloorNo || '',
    // Parking selections & counts
    openParking: globalFormData?.basicDetails?.openParking || false,
    openParkingCount: globalFormData?.basicDetails?.openParkingCount || '',
    coveredParking: globalFormData?.basicDetails?.coveredParking || false,
    coveredParkingCount: globalFormData?.basicDetails?.coveredParkingCount || '',
    mechanicalParking: globalFormData?.basicDetails?.mechanicalParking || false,
    mechanicalParkingCount: globalFormData?.basicDetails?.mechanicalParkingCount || '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Persist current step's form data in the shared layout state
    updateFormData('basicDetails', formData);

    // Direct routing to Step 2 (Key Features) under nested path
    navigate('/dashboard/upload/flat-apartment/key-features');
  };

  return (
    <div className={styles.container}>
      {/* 4-Step Progress Tracker */}
      <div className={styles.stepperContainer}>
        <div className={styles.stepLine}></div>
        
        <div className={styles.stepWrapper}>
          <div className={`${styles.stepNumber} ${styles.active}`}>1</div>
          <span className={styles.stepLabel}>Basic Details</span>
        </div>

        <div className={styles.stepWrapper}>
          <div className={styles.stepNumber}>2</div>
          <span className={styles.stepLabel}>Key Features</span>
        </div>

        <div className={styles.stepWrapper}>
          <div className={styles.stepNumber}>3</div>
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
          <p className={styles.subTitle}>Basic Details</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.formGrid}>
          {/* Row 1: State & City */}
          <div className={styles.rowTwoCol}>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className={styles.underlinedSelect}
            >
              <option value="">--Select State--</option>
              <option value="WEST BENGAL">WEST BENGAL</option>
              <option value="MAHARASHTRA">MAHARASHTRA</option>
              <option value="KARNATAKA">KARNATAKA</option>
            </select>

            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={styles.underlinedSelect}
            >
              <option value="">--Select City--</option>
              <option value="South Andaman">South Andaman</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Howrah">Howrah</option>
            </select>
          </div>

          {/* Row 2: Property Name & Location */}
          <div className={styles.rowTwoCol}>
            <input
              type="text"
              name="propertyName"
              placeholder="Property Name"
              value={formData.propertyName}
              onChange={handleChange}
              className={styles.underlinedInput}
            />
            <input
              type="text"
              name="location"
              placeholder="Enter property Location"
              value={formData.location}
              onChange={handleChange}
              className={styles.underlinedInput}
            />
          </div>

          {/* Row 3: Status, Possession Date (if applicable), Facing */}
          <div className={formData.projectStatus === 'Under Construction' ? styles.rowThreeCol : styles.rowTwoCol}>
            <select
              name="projectStatus"
              value={formData.projectStatus}
              onChange={handleChange}
              className={styles.underlinedSelect}
            >
              <option value="">--Select Project Status--</option>
              <option value="Ready to Move">Ready to Move</option>
              <option value="Under Construction">Under Construction</option>
            </select>

            {formData.projectStatus === 'Under Construction' && (
              <input
                type="text"
                name="possessionDate"
                placeholder="July-2026"
                value={formData.possessionDate}
                onChange={handleChange}
                className={styles.underlinedInput}
              />
            )}

            <select
              name="projectFacing"
              value={formData.projectFacing}
              onChange={handleChange}
              className={styles.underlinedSelect}
            >
              <option value="">--Select Project Facing--</option>
              <option value="East">East</option>
              <option value="West">West</option>
              <option value="North">North</option>
              <option value="South">South</option>
            </select>
          </div>

          {/* Row 4: Price with Word Conversion & Negotiable */}
          <div className={styles.priceRow}>
            <div style={{ flex: 1 }}>
              <input
                type="number"
                name="price"
                placeholder="Price(in INR)"
                value={formData.price}
                onChange={handleChange}
                className={styles.underlinedInput}
              />
              {formData.price && (
                <div className={styles.priceInWords}>
                  {convertPriceToWords(formData.price)}
                </div>
              )}
            </div>

            <label className={styles.checkboxInline}>
              Negotiable
              <input
                type="checkbox"
                name="isNegotiable"
                checked={formData.isNegotiable}
                onChange={handleChange}
              />
            </label>
          </div>

          {/* Row 5: BHK Trigger Select */}
          <div className={styles.rowTwoCol}>
            <select
              name="bhk"
              value={formData.bhk}
              onChange={handleChange}
              className={styles.underlinedSelect}
            >
              <option value="">--Select BHK--</option>
              <option value="1BHK">1BHK</option>
              <option value="2BHK">2BHK</option>
              <option value="3BHK">3BHK</option>
              <option value="4BHK">4BHK</option>
              <option value="4.5BHK">4.5BHK</option>
            </select>
          </div>

          {/* DYNAMIC LEVEL: Reveals once BHK is selected */}
          {formData.bhk && (
            <>
              {/* Row 6: Area Calculations */}
              <div className={styles.rowThreeCol}>
                <input
                  type="text"
                  name="superBuiltUpArea"
                  placeholder="Super Built Up Area"
                  value={formData.superBuiltUpArea}
                  onChange={handleChange}
                  className={styles.underlinedInput}
                />
                <select
                  name="areaUnit"
                  value={formData.areaUnit}
                  onChange={handleChange}
                  className={styles.underlinedSelect}
                >
                  <option value="">--Select Area Unit--</option>
                  <option value="Sq-ft">Sq-ft</option>
                  <option value="Sq-yrd">Sq-yrd</option>
                  <option value="Sq-m">Sq-m</option>
                </select>
                <input
                  type="text"
                  name="carpetArea"
                  placeholder="Carpet Area"
                  value={formData.carpetArea}
                  onChange={handleChange}
                  className={styles.underlinedInput}
                />
              </div>

              {/* Row 7: Room Specifications */}
              <div className={styles.rowThreeCol}>
                <select
                  name="noOfBedrooms"
                  value={formData.noOfBedrooms}
                  onChange={handleChange}
                  className={styles.underlinedSelect}
                >
                  <option value="">--No Of Bed Room--</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>

                <select
                  name="noOfBathrooms"
                  value={formData.noOfBathrooms}
                  onChange={handleChange}
                  className={styles.underlinedSelect}
                >
                  <option value="">--No Of Bath Room--</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>

                <select
                  name="noOfBalconies"
                  value={formData.noOfBalconies}
                  onChange={handleChange}
                  className={styles.underlinedSelect}
                >
                  <option value="">--No Of Balcony--</option>
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>

              {/* Row 8: Furnishing & Floor Details */}
              <div className={styles.rowThreeCol}>
                <select
                  name="furnishedType"
                  value={formData.furnishedType}
                  onChange={handleChange}
                  className={styles.underlinedSelect}
                >
                  <option value="">--Furnished Type--</option>
                  <option value="Unfurnished">Unfurnished</option>
                  <option value="Semi-Furnished">Semi-Furnished</option>
                  <option value="Fully Furnished">Fully Furnished</option>
                </select>

                <select
                  name="totalFloors"
                  value={formData.totalFloors}
                  onChange={handleChange}
                  className={styles.underlinedSelect}
                >
                  <option value="">--Total Number Of Floor--</option>
                  {[...Array(30)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  name="yourFloorNo"
                  placeholder="Your Floor No"
                  value={formData.yourFloorNo}
                  onChange={handleChange}
                  className={styles.underlinedInput}
                />
              </div>
            </>
          )}

          {/* Row 9: Parking Checkboxes with Conditional Inputs */}
          <div className={styles.parkingGrid}>
            <div className={styles.parkingColumn}>
              <label className={styles.checkboxInline}>
                <input
                  type="checkbox"
                  name="openParking"
                  checked={formData.openParking}
                  onChange={handleChange}
                />
                Open Parking
              </label>
              {formData.openParking && (
                <input
                  type="number"
                  name="openParkingCount"
                  placeholder="No Of Parking"
                  value={formData.openParkingCount}
                  onChange={handleChange}
                  className={styles.underlinedInput}
                />
              )}
            </div>

            <div className={styles.parkingColumn}>
              <label className={styles.checkboxInline}>
                <input
                  type="checkbox"
                  name="coveredParking"
                  checked={formData.coveredParking}
                  onChange={handleChange}
                />
                Covered Parking
              </label>
              {formData.coveredParking && (
                <input
                  type="number"
                  name="coveredParkingCount"
                  placeholder="No Of Parking"
                  value={formData.coveredParkingCount}
                  onChange={handleChange}
                  className={styles.underlinedInput}
                />
              )}
            </div>

            <div className={styles.parkingColumn}>
              <label className={styles.checkboxInline}>
                <input
                  type="checkbox"
                  name="mechanicalParking"
                  checked={formData.mechanicalParking}
                  onChange={handleChange}
                />
                Mechanical Parking
              </label>
              {formData.mechanicalParking && (
                <input
                  type="number"
                  name="mechanicalParkingCount"
                  placeholder="No Of Parking"
                  value={formData.mechanicalParkingCount}
                  onChange={handleChange}
                  className={styles.underlinedInput}
                />
              )}
            </div>
          </div>

          {/* Next Step Button */}
          <button type="submit" className={styles.nextBtn}>
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default FlatApartmentBasicDetails;