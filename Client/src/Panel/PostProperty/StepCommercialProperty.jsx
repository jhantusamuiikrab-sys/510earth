import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { 
  FaCity, FaBuilding, FaMapMarkerAlt, FaCompass, 
  FaCheck, FaRupeeSign, FaChartArea, FaCalculator, 
  FaLayerGroup, FaRecycle 
} from 'react-icons/fa';

// List of Suitable Businesses
const SUITABLE_BUSINESS_OPTIONS = [
  "ATM", "BAKERY", "BOUTIQUE",
  "CLINIC", "CLOTHES", "CLOUD KITCHEN",
  "COFFEE", "DENTAL CLINIC", "FAST FOOD",
  "FOOTWEAR", "GROCERY", "GYM",
  "JEWELLERY", "JUICE", "MEAT",
  "MEDICAL", "MOBILE", "PUB/BAR",
  "RESTAURANTS", "SALON/SPA", "STATIONERY",
  "SWEET", "TEA STALL", "OTHER BUSINESS TYPE"
];

// List of Loading / Unloading Facilities
const LOADING_FACILITY_OPTIONS = [
  "40 Ft Tailor",
  "32 Ft Tailor",
  "14 Tyre Truck",
  "12 Tyre Truck",
  "10 Tyre Truck",
  "6 Tyre Truck",
  "Pick Up Tempo"
];

const StepCommercialProperty = ({ formData, setFormData, onNext, onPrev }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      possessionDate: date,
    }));
  };

  // Handles selecting/unselecting checkboxes in the Suitable Business section
  const handleBusinessCheckbox = (businessName) => {
    setFormData((prev) => {
      const currentBusinesses = prev.suitableBusinesses || [];
      const updated = currentBusinesses.includes(businessName)
        ? currentBusinesses.filter((item) => item !== businessName)
        : [...currentBusinesses, businessName];

      return { ...prev, suitableBusinesses: updated };
    });
  };

  // Handles selecting/unselecting checkboxes in Loading / Unloading Facility section
  const handleLoadingFacilityCheckbox = (facility) => {
    setFormData((prev) => {
      const currentFacilities = prev.loadingFacilities || [];
      const updated = currentFacilities.includes(facility)
        ? currentFacilities.filter((item) => item !== facility)
        : [...currentFacilities, facility];

      return { ...prev, loadingFacilities: updated };
    });
  };

  const isParkingChecked = Boolean(
    formData.openParking || formData.coveredParking || formData.mechanicalParking
  );

  // Condition checks for dynamic sections
  const isRetailSelected = 
    formData.commercialType === "Retail Space/Shop" || 
    formData.commercialType === "Showroom";

  const isWarehouseSelected = formData.commercialType === "Warehouse / Godown";

  return (
    <div className="house_villa_card">
      {/* Header Banner */}
      <div className="house_header_banner">
        <h2>Commercial Property</h2>
      </div>

      <div className="house_body">

        {/* Row 1: Select Property Type & State */}
        <div className="form_row">
          <div className="form_group">
            <label>Select Property Type</label>
            <div className="input_with_icon">
              <span className="icon_box"><FaCity /></span>
              <select name="commercialType" value={formData.commercialType || ''} onChange={handleChange}>
                <option value="">--Select Property Type--</option>
                <option value="Retail Space/Shop">Retail Space/Shop</option>
                <option value="Shop / Showroom">Shop / Showroom</option>
                <option value="Office Space">Office Space</option>
                <option value="Warehouse / Godown">Warehouse / Godown</option>
                <option value="Industrial Building">Industrial Building</option>
              </select>
            </div>
          </div>

          <div className="form_group">
            <label>State</label>
            <div className="input_with_icon">
              <span className="icon_box"><FaCity /></span>
              <select name="state" value={formData.state || ''} onChange={handleChange}>
                <option value="">--Select State--</option>
                <option value="WEST BENGAL">WEST BENGAL</option>
              </select>
            </div>
          </div>
        </div>

        {/* Row 2: City & Property Name */}
        <div className="form_row">
          <div className="form_group">
            <label>City</label>
            <div className="input_with_icon">
              <span className="icon_box"><FaBuilding /></span>
              <select name="city" value={formData.city || ''} onChange={handleChange}>
                <option value="">--Select City--</option>
                <option value="Kolkata">Kolkata</option>
              </select>
            </div>
          </div>

          <div className="form_group">
            <label>Property Name</label>
            <div className="input_with_icon">
              <span className="icon_box"><FaBuilding /></span>
              <input
                type="text"
                name="propertyName"
                placeholder="Property Name"
                value={formData.propertyName || ''}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Row 3: Location & Select Located In */}
        <div className="form_row">
          <div className="form_group">
            <label>Enter property Location</label>
            <div className="input_with_icon">
              <span className="icon_box"><FaMapMarkerAlt /></span>
              <input
                type="text"
                name="location"
                placeholder="Google Map Location"
                value={formData.location || ''}
                onChange={handleChange}
              />
            </div>
          </div>

          {!isWarehouseSelected && (
            <div className="form_group">
              <label>Select Located In</label>
              <div className="input_with_icon">
                <span className="icon_box"><FaBuilding /></span>
                <select name="locatedIn" value={formData.locatedIn || ''} onChange={handleChange}>
                  <option value="">--Select Located In--</option>
                  <option value="Mall">Mall</option>
                  <option value="Commercial Complex">Commercial Complex</option>
                  <option value="Standalone Building">Standalone Building</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Conditionally Rendered Suitable Business Section */}
        {isRetailSelected && (
          <div className="suitable_business_container" style={{ margin: '20px 0' }}>
            <div className="house_header_banner" style={{ marginBottom: '15px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', textAlign: 'center' }}>Suitable Business</h3>
            </div>

            <div 
              className="suitable_business_grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '12px 20px',
                padding: '0 10px'
              }}
            >
              {SUITABLE_BUSINESS_OPTIONS.map((business) => {
                const isChecked = (formData.suitableBusinesses || []).includes(business);
                return (
                  <label key={business} className="checkbox_label" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' }}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleBusinessCheckbox(business)}
                    />
                    {business}
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {/* Conditionally Rendered Loading / Unloading Facility Section */}
        {isWarehouseSelected && (
          <div className="loading_facility_container" style={{ margin: '20px 0' }}>
            <div className="house_header_banner" style={{ marginBottom: '15px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', textAlign: 'center' }}>Loading / Unloading Facility For</h3>
            </div>

            <div 
              className="loading_facility_grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px 20px',
                padding: '0 10px'
              }}
            >
              {LOADING_FACILITY_OPTIONS.map((facility) => {
                const isChecked = (formData.loadingFacilities || []).includes(facility);
                return (
                  <label key={facility} className="checkbox_label" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' }}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleLoadingFacilityCheckbox(facility)}
                    />
                    {facility}
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {/* Row 4: Project Facing & Project Status */}
        <div className="form_row align_center_row">
          <div className="form_group">
            <label>Project Facing</label>
            <div className="input_with_icon">
              <span className="icon_box"><FaCompass /></span>
              <select name="facing" value={formData.facing || ''} onChange={handleChange}>
                <option value="">--Select Project Facing--</option>
                <option value="North">North</option>
                <option value="South">South</option>
                <option value="East">East</option>
                <option value="West">West</option>
              </select>
            </div>
          </div>

          <div className="form_group">
            <label>Project Status</label>
            <div className="input_with_icon">
              <span className="icon_box"><FaCheck /></span>
              <select name="projectStatus" value={formData.projectStatus || ''} onChange={handleChange}>
                <option value="">--Select Project Status--</option>
                <option value="Under Construction">Under Construction</option>
                <option value="Ready to Move">Ready to Move</option>
              </select>
            </div>

            {formData.projectStatus === 'Under Construction' && (
              <div className="possession_wrapper">
                <DatePicker
                  selected={formData.possessionDate}
                  onChange={handleDateChange}
                  dateFormat="MM/yyyy"
                  showMonthYearPicker
                  placeholderText="Possession Date"
                  className="plain_input"
                />
                {!formData.possessionDate && (
                  <span className="error_text">Possession Date required</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Row 5: Price & Negotiable */}
        <div className="form_row align_center_row">
          <div className="form_group">
            <label>Price (in INR)</label>
            <div className="input_with_icon">
              <span className="icon_box"><FaRupeeSign /></span>
              <input
                type="number"
                name="price"
                placeholder="Price(in INR)"
                value={formData.price || ''}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form_group" style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '10px' }}>
            <label className="checkbox_label">
              <input
                type="checkbox"
                name="negotiable"
                checked={formData.negotiable || false}
                onChange={handleChange}
              />
              Negotiable
            </label>
          </div>
        </div>

        {/* Row 6: Super Built Up Area & Built Up Area */}
        <div className="form_row">
          <div className="form_group">
            <label>Super Built Up Area</label>
            <div className="input_with_icon">
              <span className="icon_box"><FaChartArea /></span>
              <input
                type="number"
                name="superBuiltUpArea"
                placeholder="Super Built Up Area"
                value={formData.superBuiltUpArea || ''}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form_group">
            <label>Built Up Area</label>
            <div className="input_with_icon">
              <span className="icon_box"><FaCalculator /></span>
              <input
                type="number"
                name="builtUpArea"
                placeholder="Built Up Area"
                value={formData.builtUpArea || ''}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Row 7: Carpet Area & Price Per Sq ft */}
        <div className="form_row">
          <div className="form_group">
            <label>Carpet Area</label>
            <div className="input_with_icon">
              <span className="icon_box"><FaLayerGroup /></span>
              <input
                type="number"
                name="carpetArea"
                placeholder="Carpet Area"
                value={formData.carpetArea || ''}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form_group">
            <label>Price Per Sq ft</label>
            <div className="input_with_icon">
              <span className="icon_box"><FaRupeeSign /></span>
              <input
                type="number"
                name="pricePerSqFt"
                placeholder="Price Per Sq ft"
                value={formData.pricePerSqFt || ''}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Row 8: Total Price & Block */}
        <div className="form_row">
          <div className="form_group">
            <label>Total Price</label>
            <div className="input_with_icon">
              <span className="icon_box"><FaRupeeSign /></span>
              <input
                type="number"
                name="totalPrice"
                placeholder="Total Price"
                value={formData.totalPrice || ''}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form_group">
            <label>Block</label>
            <div className="input_with_icon">
              <span className="icon_box"><FaBuilding /></span>
              <input
                type="text"
                name="block"
                placeholder="Block"
                value={formData.block || ''}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Row 9: Entrance Width & Ceiling Height */}
        <div className="form_row">
          <div className="form_group">
            <label>Entrance Width</label>
            <div className="input_with_icon">
              <span className="icon_box"><FaCheck /></span>
              <input
                type="text"
                name="entranceWidth"
                placeholder="Entrance Width"
                value={formData.entranceWidth || ''}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form_group">
            <label>Ceiling Height</label>
            <div className="input_with_icon">
              <span className="icon_box"><FaCompass /></span>
              <input
                type="text"
                name="ceilingHeight"
                placeholder="Ceiling Height"
                value={formData.ceilingHeight || ''}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Row 10: Furnished Type */}
        <div className="form_row">
          <div className="form_group">
            <label>Furnished Type</label>
            <div className="input_with_icon">
              <span className="icon_box"><FaRecycle /></span>
              <select name="furnishedType" value={formData.furnishedType || ''} onChange={handleChange}>
                <option value="">--Type Of Flooring--</option>
                <option value="Unfurnished">Unfurnished</option>
                <option value="Semi-Furnished">Semi-Furnished</option>
                <option value="Fully Furnished">Fully Furnished</option>
              </select>
            </div>
          </div>
          <div className="form_group"></div>
        </div>

        {/* Parking Checkboxes */}
        <div className="parking_section">
          <div className="checkbox_row_parking">
            <label className="checkbox_label">
              <input
                type="checkbox"
                name="openParking"
                checked={formData.openParking || false}
                onChange={handleChange}
              />
              Open Parking
            </label>

            <label className="checkbox_label">
              <input
                type="checkbox"
                name="coveredParking"
                checked={formData.coveredParking || false}
                onChange={handleChange}
              />
              Covered Parking
            </label>

            <label className="checkbox_label">
              <input
                type="checkbox"
                name="mechanicalParking"
                checked={formData.mechanicalParking || false}
                onChange={handleChange}
              />
              Mechanical Parking
            </label>
          </div>

          {isParkingChecked && (
            <div className="parking_input_container">
              <input
                type="number"
                name="noOfParking"
                placeholder="No Of Parking"
                value={formData.noOfParking || ''}
                onChange={handleChange}
                className="plain_input"
              />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="action_buttons">
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

export default StepCommercialProperty;