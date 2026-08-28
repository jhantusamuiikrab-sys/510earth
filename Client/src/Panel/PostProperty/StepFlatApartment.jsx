import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { 
  FaMapMarkerAlt, FaCity, FaBuilding, FaCheck, FaRupeeSign, 
  FaCompass, FaChartArea, FaAnchor, FaBed, FaBath, 
  FaCouch, FaLayerGroup, FaHome, FaCalendarAlt
} from 'react-icons/fa';

const StepFlatApartment = ({ formData, setFormData, onNext, onPrev }) => {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      };

      // Reset count values if a checkbox is unchecked
      if (type === 'checkbox' && !checked) {
        if (name === 'openParking') updated.noOfOpenParking = '';
        if (name === 'coveredParking') updated.noOfCoveredParking = '';
        if (name === 'mechanicalParking') updated.noOfMechanicalParking = '';
      }

      return updated;
    });

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      possessionDate: date,
    }));
    if (errors.possessionDate) {
      setErrors((prev) => ({ ...prev, possessionDate: '' }));
    }
  };

  const handleNextSubmit = () => {
    const newErrors = {};

    if (!formData.state) newErrors.state = "Please select State.";
    if (!formData.city) newErrors.city = "Please select City.";
    if (!formData.location || !formData.location.trim()) {
      newErrors.location = "Please enter Property Location.";
    }
    if (!formData.projectStatus) newErrors.projectStatus = "Please select Project Status.";
    if (formData.projectStatus === 'Under Construction' && !formData.possessionDate) {
      newErrors.possessionDate = "Possession Date is required.";
    }
    if (!formData.price) newErrors.price = "Please enter Price (in INR).";
    if (!formData.bhk) newErrors.bhk = "Please select BHK.";

    // Validate dependent fields only if BHK is selected
    if (formData.bhk) {
      if (!formData.carpetArea) newErrors.carpetArea = "Please enter Carpet Area.";
      if (!formData.areaUnit) newErrors.areaUnit = "Please select Area Unit.";
      if (!formData.bedrooms) newErrors.bedrooms = "Please select No Of Bed Room.";
      if (!formData.bathrooms) newErrors.bathrooms = "Please select No Of Bath Room.";
      if (!formData.furnishedType) newErrors.furnishedType = "Please select Furnished Type.";
      if (!formData.totalFloors) newErrors.totalFloors = "Please select Total Number Of Floor.";
      if (!formData.yourFloorNo || !formData.yourFloorNo.toString().trim()) {
        newErrors.yourFloorNo = "Please enter Your Floor No.";
      }
      if (!formData.propertyAge) newErrors.propertyAge = "Please select Property Age.";
      if (!formData.propertyName || !formData.propertyName.trim()) {
        newErrors.propertyName = "Please enter Property Name.";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onNext();
  };

  return (
    <div className="flat_apartment_card">
      <div className="flat_header_banner">
        <h2>Flat / Apartment</h2>
      </div>

      <div className="flat_body">

        {/* 1. State & 2. City */}
        <div className="form_row">
          <div className="form_group">
            <label>State</label>
            <div className="input_with_icon">
              <span className="icon_box"><FaCity /></span>
              <select name="state" value={formData.state || ''} onChange={handleChange}>
                <option value="">--Select State--</option>
                <option value="WEST BENGAL">WEST BENGAL</option>
              </select>
            </div>
            {errors.state && <span className="error_text">{errors.state}</span>}
          </div>

          <div className="form_group">
            <label>City</label>
            <div className="input_with_icon">
              <span className="icon_box"><FaBuilding /></span>
              <select name="city" value={formData.city || ''} onChange={handleChange}>
                <option value="">--Select City--</option>
                <option value="Kolkata">Kolkata</option>
              </select>
            </div>
            {errors.city && <span className="error_text">{errors.city}</span>}
          </div>
        </div>

        {/* 3. Location */}
        <div className="form_row">
          <div className="form_group">
            <label>Enter property Location</label>
            <div className="input_with_icon">
              <span className="icon_box"><FaMapMarkerAlt /></span>
              <input
                type="text"
                name="location"
                placeholder="Enter property Location"
                value={formData.location || ''}
                onChange={handleChange}
              />
            </div>
            {errors.location && <span className="error_text">{errors.location}</span>}
          </div>

          {/* 4. Project Status */}
          <div className="form_group">
            <label>Project Status</label>
            <div className="input_with_icon">
              <span className="icon_box"><FaCheck /></span>
              <select name="projectStatus" value={formData.projectStatus || ''} onChange={handleChange}>
                <option value="">--Select Status--</option>
                <option value="Under Construction">Under Construction</option>
                <option value="Ready to Move">Ready to Move</option>
              </select>
            </div>
            {errors.projectStatus && <span className="error_text">{errors.projectStatus}</span>}

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
                {errors.possessionDate && <span className="error_text">{errors.possessionDate}</span>}
              </div>
            )}
          </div>
        </div>

        {/* 5. Price (in INR) & 6. Select BHK */}
        <div className="form_row">
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
            {errors.price && <span className="error_text">{errors.price}</span>}
          </div>

          <div className="form_group">
            <label>Select BHK</label>
            <div className="input_with_icon">
              <span className="icon_box"><FaHome /></span>
              <select name="bhk" value={formData.bhk || ''} onChange={handleChange}>
                <option value="">--Select BHK--</option>
                <option value="1BHK">1BHK</option>
                <option value="2BHK">2BHK</option>
                <option value="3BHK">3BHK</option>
                <option value="4BHK">4BHK</option>
              </select>
            </div>
            {errors.bhk && <span className="error_text">{errors.bhk}</span>}
          </div>
        </div>

        <div className="center_checkbox">
          <label>
            <input
              type="checkbox"
              name="negotiable"
              checked={formData.negotiable || false}
              onChange={handleChange}
            />
            Negotiable
          </label>
        </div>

        {/* Separate Parking Options (Shown by Default) */}
        <div className="parking_section" style={{ marginTop: '20px', marginBottom: '20px' }}>
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)', 
              gap: '20px',
              alignItems: 'start' 
            }}
          >
            {/* 1. Open Parking */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: '500' }}>
                <input
                  type="checkbox"
                  name="openParking"
                  checked={formData.openParking || false}
                  onChange={handleChange}
                />
                Open Parking
              </label>

              {formData.openParking && (
                <input
                  type="number"
                  name="noOfOpenParking"
                  placeholder="No Of Parking"
                  value={formData.noOfOpenParking || ''}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    outline: 'none',
                    backgroundColor: '#f9fafb'
                  }}
                />
              )}
            </div>

            {/* 2. Covered Parking */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: '500' }}>
                <input
                  type="checkbox"
                  name="coveredParking"
                  checked={formData.coveredParking || false}
                  onChange={handleChange}
                />
                Covered Parking
              </label>

              {formData.coveredParking && (
                <input
                  type="number"
                  name="noOfCoveredParking"
                  placeholder="No Of Parking"
                  value={formData.noOfCoveredParking || ''}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    outline: 'none',
                    backgroundColor: '#f9fafb'
                  }}
                />
              )}
            </div>

            {/* 3. Mechanical Parking */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: '500' }}>
                <input
                  type="checkbox"
                  name="mechanicalParking"
                  checked={formData.mechanicalParking || false}
                  onChange={handleChange}
                />
                Mechanical Parking
              </label>

              {formData.mechanicalParking && (
                <input
                  type="number"
                  name="noOfMechanicalParking"
                  placeholder="No Of Parking"
                  value={formData.noOfMechanicalParking || ''}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    outline: 'none',
                    backgroundColor: '#f9fafb'
                  }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Dependent fields display ONLY when BHK is selected */}
        {formData.bhk && (
          <>
            {/* Property Name & Project Facing */}
            <div className="form_row">
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
                {errors.propertyName && <span className="error_text">{errors.propertyName}</span>}
              </div>

              <div className="form_group">
                <label>Project Facing</label>
                <div className="input_with_icon">
                  <span className="icon_box"><FaCompass /></span>
                  <select name="facing" value={formData.facing || 'North'} onChange={handleChange}>
                    <option value="North">North</option>
                    <option value="South">South</option>
                    <option value="East">East</option>
                    <option value="West">West</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Super Built Up Area & Select Area Unit */}
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
                <label>Select Area Unit</label>
                <div className="input_with_icon">
                  <span className="icon_box"><FaAnchor /></span>
                  <select name="areaUnit" value={formData.areaUnit || ''} onChange={handleChange}>
                    <option value="">--Select Area Unit--</option>
                    <option value="Sq.Ft.">Sq.Ft.</option>
                    <option value="Sq.M.">Sq.M.</option>
                  </select>
                </div>
                {errors.areaUnit && <span className="error_text">{errors.areaUnit}</span>}
              </div>
            </div>

            {/* Carpet Area & No Of Bed Room */}
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
                {errors.carpetArea && <span className="error_text">{errors.carpetArea}</span>}
              </div>

              <div className="form_group">
                <label>No Of Bed Room</label>
                <div className="input_with_icon">
                  <span className="icon_box"><FaBed /></span>
                  <select name="bedrooms" value={formData.bedrooms || ''} onChange={handleChange}>
                    <option value="">--Select Bedrooms--</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>
                {errors.bedrooms && <span className="error_text">{errors.bedrooms}</span>}
              </div>
            </div>

            {/* No Of Bath Room & No Of Balcony */}
            <div className="form_row">
              <div className="form_group">
                <label>No Of Bath Room</label>
                <div className="input_with_icon">
                  <span className="icon_box"><FaBath /></span>
                  <select name="bathrooms" value={formData.bathrooms || ''} onChange={handleChange}>
                    <option value="">--Select Bathrooms--</option>
                    {[...Array(10).keys()].map((i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </div>
                {errors.bathrooms && <span className="error_text">{errors.bathrooms}</span>}
              </div>

              <div className="form_group">
                <label>No Of Balcony</label>
                <div className="input_with_icon">
                  <span className="icon_box"><FaCompass /></span>
                  <select name="balconies" value={formData.balconies || '0'} onChange={handleChange}>
                    {[...Array(15).keys()].map((i) => (
                      <option key={i} value={i}>{i}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Furnished Type & Total Number Of Floor */}
            <div className="form_row">
              <div className="form_group">
                <label>Furnished Type</label>
                <div className="input_with_icon">
                  <span className="icon_box"><FaCouch /></span>
                  <select name="furnishedType" value={formData.furnishedType || ''} onChange={handleChange}>
                    <option value="">--Select Furnished Type--</option>
                    <option value="Unfurnished">Unfurnished</option>
                    <option value="Semi-Furnished">Semi-Furnished</option>
                    <option value="Fully-Furnished">Fully-Furnished</option>
                  </select>
                </div>
                {errors.furnishedType && <span className="error_text">{errors.furnishedType}</span>}
              </div>

              <div className="form_group">
                <label>Total Number Of Floor</label>
                <div className="input_with_icon">
                  <span className="icon_box"><FaBuilding /></span>
                  <select name="totalFloors" value={formData.totalFloors || ''} onChange={handleChange}>
                    <option value="">--Select Total Floors--</option>
                    {[...Array(50).keys()].map((i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </div>
                {errors.totalFloors && <span className="error_text">{errors.totalFloors}</span>}
              </div>
            </div>

            {/* Your Floor No & Select Property Age */}
            <div className="form_row">
              <div className="form_group">
                <label>Your Floor No</label>
                <div className="input_with_icon">
                  <span className="icon_box"><FaHome /></span>
                  <input
                    type="text"
                    name="yourFloorNo"
                    placeholder="Your Floor No"
                    value={formData.yourFloorNo || ''}
                    onChange={handleChange}
                  />
                </div>
                {errors.yourFloorNo && <span className="error_text">{errors.yourFloorNo}</span>}
              </div>

              <div className="form_group">
                <label>Select Property Age</label>
                <div className="input_with_icon">
                  <span className="icon_box"><FaCalendarAlt /></span>
                  <select name="propertyAge" value={formData.propertyAge || ''} onChange={handleChange}>
                    <option value="">--Select Property Age--</option>
                    <option value="0-1 Years">0-1 Years</option>
                    <option value="1-5 Years">1-5 Years</option>
                    <option value="5-10 Years">5-10 Years</option>
                    <option value="10+ Years">10+ Years</option>
                  </select>
                </div>
                {errors.propertyAge && <span className="error_text">{errors.propertyAge}</span>}
              </div>
            </div>
          </>
        )}

        {/* Action Buttons */}
        <div className="action_buttons mt-4">
          <button type="button" className="btn_prev_green" onClick={onPrev}>
            &larr; Previous
          </button>
          <button type="button" className="btn_next_blue" onClick={handleNextSubmit}>
            Next &rarr;
          </button>
        </div>

      </div>
    </div>
  );
};

export default StepFlatApartment;