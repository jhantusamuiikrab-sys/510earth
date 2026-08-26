import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { 
  FaMapMarkerAlt, FaCity, FaBuilding, FaCheck, FaRupeeSign, 
  FaCompass, FaChartArea, FaAnchor, FaBed, FaBath, 
  FaCouch, FaLayerGroup, FaHome, FaCalculator, FaRecycle
} from 'react-icons/fa';

const StepIndependentHouseVilla = ({ formData, setFormData, onNext, onPrev }) => {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear specific field error when user updates input
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

  const isParkingChecked = Boolean(
    formData.openParking || formData.coveredParking || formData.mechanicalParking
  );

  // Validation handler checking all 13 required fields
  const handleNextSubmit = () => {
    const newErrors = {};

    if (!formData.propertyName || !formData.propertyName.trim()) {
      newErrors.propertyName = 'Please enter Property Name.';
    }
    if (!formData.state) {
      newErrors.state = 'Please select State.';
    }
    if (!formData.city) {
      newErrors.city = 'Please select City.';
    }
    if (!formData.location || !formData.location.trim()) {
      newErrors.location = 'Please enter Property Location.';
    }
    if (!formData.projectStatus) {
      newErrors.projectStatus = 'Please select Project Status.';
    }
    if (formData.projectStatus === 'Under Construction' && !formData.possessionDate) {
      newErrors.possessionDate = 'Possession Date is required.';
    }
    if (!formData.price) {
      newErrors.price = 'Please enter Price (in INR).';
    }
    if (!formData.carpetArea) {
      newErrors.carpetArea = 'Please enter Carpet Area.';
    }
    if (!formData.areaUnit) {
      newErrors.areaUnit = 'Please select Area Unit.';
    }
    if (!formData.totalPrice) {
      newErrors.totalPrice = 'Please enter Total Price.';
    }
    if (!formData.bedrooms) {
      newErrors.bedrooms = 'Please select No Of Bed Room.';
    }
    if (!formData.bathrooms) {
      newErrors.bathrooms = 'Please select No Of Bath Room.';
    }
    if (!formData.furnishedType) {
      newErrors.furnishedType = 'Please select Furnished Type.';
    }
    if (!formData.totalFloors) {
      newErrors.totalFloors = 'Please select Total Number Of Floor.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onNext();
  };

  return (
    <div className="house_villa_card">
      <div className="house_header_banner">
        <h2>Independent House / Villa</h2>
      </div>

      <div className="house_body">

        {/* Row 1: Property Name & State */}
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
        </div>

        {/* Row 2: City & Property Location */}
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
            {errors.city && <span className="error_text">{errors.city}</span>}
          </div>

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
        </div>

        {/* Row 3: Project Status & Project Facing */}
        <div className="form_row">
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
                {errors.possessionDate && (
                  <span className="error_text">{errors.possessionDate}</span>
                )}
              </div>
            )}
          </div>

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
        </div>

        {/* Price & Negotiable */}
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
            {errors.price && <span className="error_text">{errors.price}</span>}
          </div>

          <div className="form_group checkbox_inline_group">
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

        {/* Row 4: Plot Area & Area Unit */}
        <div className="form_row">
          <div className="form_group">
            <label>Plot Area</label>
            <div className="input_with_icon">
              <span className="icon_box"><FaChartArea /></span>
              <input
                type="number"
                name="plotArea"
                placeholder="Plot Area"
                value={formData.plotArea || ''}
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
                <option value="Katha">Katha</option>
              </select>
            </div>
            {errors.areaUnit && <span className="error_text">{errors.areaUnit}</span>}
          </div>
        </div>

        {/* Row 5: Total Price & Built Up Area */}
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
            {errors.totalPrice && <span className="error_text">{errors.totalPrice}</span>}
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

        {/* Row 6: Carpet Area & Bedrooms */}
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
              <span className="icon_box"><FaBuilding /></span>
              <select name="bedrooms" value={formData.bedrooms || ''} onChange={handleChange}>
                <option value="">--No Of Bed Room--</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5+">5+</option>
              </select>
            </div>
            {errors.bedrooms && <span className="error_text">{errors.bedrooms}</span>}
          </div>
        </div>

        {/* Row 7: Bathrooms & Balconies */}
        <div className="form_row">
          <div className="form_group">
            <label>No Of Bath Room</label>
            <div className="input_with_icon">
              <span className="icon_box"><FaCheck /></span>
              <select name="bathrooms" value={formData.bathrooms || ''} onChange={handleChange}>
                <option value="">--No Of Bath Room--</option>
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
              <select name="balconies" value={formData.balconies || ''} onChange={handleChange}>
                <option value="">--No Of Balcony--</option>
                {[...Array(10).keys()].map((i) => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Row 8: Furnished Type & Total Number Of Floor */}
        <div className="form_row">
          <div className="form_group">
            <label>Furnished Type</label>
            <div className="input_with_icon">
              <span className="icon_box"><FaRecycle /></span>
              <select name="furnishedType" value={formData.furnishedType || ''} onChange={handleChange}>
                <option value="">--Select Furnished Type--</option>
                <option value="Unfurnished">Unfurnished</option>
                <option value="Semi-Furnished">Semi-Furnished</option>
                <option value="Furnished">Furnished</option>
              </select>
            </div>
            {errors.furnishedType && <span className="error_text">{errors.furnishedType}</span>}
          </div>

          <div className="form_group">
            <label>Total Number Of Floor</label>
            <div className="input_with_icon">
              <span className="icon_box"><FaBuilding /></span>
              <select name="totalFloors" value={formData.totalFloors || ''} onChange={handleChange}>
                <option value="">--Total Number Of Floor--</option>
                {[...Array(20).keys()].map((i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>
            {errors.totalFloors && <span className="error_text">{errors.totalFloors}</span>}
          </div>
        </div>

        {/* Row 9: Flooring Type & Room Feature Checkboxes */}
        <div className="form_row">
          <div className="form_group">
            <label>Type Of Flooring</label>
            <div className="input_with_icon">
              <span className="icon_box"><FaHome /></span>
              <select name="flooringType" value={formData.flooringType || 'Marble'} onChange={handleChange}>
                <option value="Marble">Marble</option>
                <option value="Vitrified Tiles">Vitrified Tiles</option>
                <option value="Wooden">Wooden</option>
                <option value="Granite">Granite</option>
              </select>
            </div>
          </div>

          <div className="form_group checkbox_grid_group">
            <label className="checkbox_label">
              <input
                type="checkbox"
                name="servantRoom"
                checked={formData.servantRoom || false}
                onChange={handleChange}
              />
              Servant Room
            </label>

            <label className="checkbox_label">
              <input
                type="checkbox"
                name="pujaRoom"
                checked={formData.pujaRoom || false}
                onChange={handleChange}
              />
              Puja Room
            </label>
          </div>
        </div>

        {/* Room Feature Checkboxes Row 2 */}
        <div className="checkbox_row_grid">
          <label className="checkbox_label">
            <input
              type="checkbox"
              name="studyRoom"
              checked={formData.studyRoom || false}
              onChange={handleChange}
            />
            Study Room
          </label>

          <label className="checkbox_label">
            <input
              type="checkbox"
              name="storeRoom"
              checked={formData.storeRoom || false}
              onChange={handleChange}
            />
            Store Room
          </label>
        </div>

        {/* Parking Checkboxes Section */}
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

          {/* Dynamic Parking Count Input */}
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

        {/* Navigation Buttons */}
        <div className="action_buttons">
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

export default StepIndependentHouseVilla;