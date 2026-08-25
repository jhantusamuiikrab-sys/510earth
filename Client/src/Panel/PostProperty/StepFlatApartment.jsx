import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { 
  FaMapMarkerAlt, FaCity, FaBuilding, FaCheck, FaRupeeSign, 
  FaCompass, FaChartArea, FaAnchor, FaBed, FaBath, 
  FaCouch, FaLayerGroup, FaHome, FaCar
} from 'react-icons/fa';

const StepFlatApartment = ({ formData, setFormData, onNext, onPrev }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle month/year selection for Possession Date
  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      possessionDate: date,
    }));
  };

  // Check if any parking option is ticked
  const isParkingChecked = Boolean(
    formData.openParking || formData.coveredParking || formData.mechanicalParking
  );

  return (
    <div className="flat_apartment_card">
      {/* Top Heading Banner */}
      <div className="flat_header_banner">
        <h2>Flat / Apartment</h2>
      </div>

      <div className="flat_body">

        {/* Row 1: State & City */}
        <div className="form_row">
          <div className="form_group">
            <label>State</label>
            <div className="input_with_icon">
              <span className="icon_box"><FaCity /></span>
              <select name="state" value={formData.state || 'WEST BENGAL'} onChange={handleChange}>
                <option value="WEST BENGAL">WEST BENGAL</option>
              </select>
            </div>
          </div>

          <div className="form_group">
            <label>City</label>
            <div className="input_with_icon">
              <span className="icon_box"><FaBuilding /></span>
              <select name="city" value={formData.city || 'Kolkata'} onChange={handleChange}>
                <option value="Kolkata">Kolkata</option>
              </select>
            </div>
          </div>
        </div>

        {/* Row 2: Property Name & Location */}
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
          </div>
        </div>

        {/* Row 3: Project Status & BHK */}
        <div className="form_row">
          <div className="form_group">
            <label>Project Status</label>
            <div className="input_with_icon">
              <span className="icon_box"><FaCheck /></span>
              <select name="projectStatus" value={formData.projectStatus || 'Under Construction'} onChange={handleChange}>
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
                  <span className="error_text">Possioson Date required</span>
                )}
              </div>
            )}
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
          </div>
        </div>

        {/* Row 4: Price & Project Facing */}
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

        {/* Negotiable Checkbox */}
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

        {/* DYNAMIC SECTION: BHK Specific Fields */}
        {formData.bhk && (
          <div className="dynamic_bhk_fields">
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
              </div>

              <div className="form_group">
                <label>No Of Bed Room</label>
                <div className="input_with_icon">
                  <span className="icon_box"><FaBed /></span>
                  <select name="bedrooms" value={formData.bedrooms || '2'} onChange={handleChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>
              </div>
            </div>

            {/* No Of Bath Room & No Of Balcony */}
            <div className="form_row">
              <div className="form_group">
                <label>No Of Bath Room</label>
                <div className="input_with_icon">
                  <span className="icon_box"><FaBath /></span>
                  <select name="bathrooms" value={formData.bathrooms || '8'} onChange={handleChange}>
                    {[...Array(10).keys()].map((i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form_group">
                <label>No Of Balcony</label>
                <div className="input_with_icon">
                  <span className="icon_box"><FaCompass /></span>
                  <select name="balconies" value={formData.balconies || '12'} onChange={handleChange}>
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
                  <select name="furnishedType" value={formData.furnishedType || 'Unfurnished'} onChange={handleChange}>
                    <option value="Unfurnished">Unfurnished</option>
                    <option value="Semi-Furnished">Semi-Furnished</option>
                    <option value="Fully-Furnished">Fully-Furnished</option>
                  </select>
                </div>
              </div>

              <div className="form_group">
                <label>Total Number Of Floor</label>
                <div className="input_with_icon">
                  <span className="icon_box"><FaBuilding /></span>
                  <select name="totalFloors" value={formData.totalFloors || '7'} onChange={handleChange}>
                    {[...Array(50).keys()].map((i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Your Floor No */}
            <div className="form_row">
              <div className="form_group col_half">
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
              </div>
            </div>
          </div>
        )}

        {/* ALWAYS VISIBLE: Parking Options */}
        <div className="parking_section">
          <div className="checkbox_row">
            <label>
              <input
                type="checkbox"
                name="openParking"
                checked={formData.openParking || false}
                onChange={handleChange}
              />
              Open Parking
            </label>

            <label>
              <input
                type="checkbox"
                name="coveredParking"
                checked={formData.coveredParking || false}
                onChange={handleChange}
              />
              Covered Parking
            </label>

            <label>
              <input
                type="checkbox"
                name="mechanicalParking"
                checked={formData.mechanicalParking || false}
                onChange={handleChange}
              />
              Mechanical Parking
            </label>
          </div>

          {/* DYNAMIC PARKING FIELD: Opens when any parking box is checked */}
          {isParkingChecked && (
            <div className="parking_input_container">
              <input
                type="number"
                name="noOfParking"
                placeholder="No Of Parking"
                value={formData.noOfParking || ''}
                onChange={handleChange}
                className="parking_input"
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

export default StepFlatApartment;