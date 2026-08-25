import React from 'react';
import { 
  FaBuilding, 
  FaHome, 
  FaHandHoldingUsd, 
  FaKey, 
  FaCity, 
  FaMapMarkedAlt 
} from 'react-icons/fa';
import { MdOutlineSell } from 'react-icons/md';

const StepInitialDetails = ({ formData, setFormData, onNext, onPrev }) => {
  // Config arrays for easy rendering and icon mapping
  const intentOptions = [
    { label: 'Sell', icon: <FaBuilding />, bgClass: 'intent_sell' },
    { label: 'Resell', icon: <MdOutlineSell />, bgClass: 'intent_resell' },
    { label: 'Rent / Lease', icon: <FaHandHoldingUsd />, bgClass: 'intent_rentlease' },
    { label: 'PG', icon: <FaKey />, bgClass: 'intent_pg' },
  ];

  const typeOptions = [
    { label: 'Residential', icon: <FaHome />, bgClass: 'type_residential' },
    { label: 'Commercial', icon: <FaCity />, bgClass: 'type_commercial' },
    { label: 'Land/Plot', icon: <FaMapMarkedAlt />, bgClass: 'type_landplot' },
  ];

  const subCategoryOptions = [
    { label: 'Flat/Apartment', icon: <FaBuilding />, bgClass: 'sub_category' },
    { label: 'Independent House/Villa', icon: <FaHome />, bgClass: 'sub_category' },
  ];

  const handleIntentChange = (intent) => {
    setFormData((prev) => ({ ...prev, intent }));
  };

  const handleTypeChange = (propertyType) => {
    setFormData((prev) => ({
      ...prev,
      propertyType,
      subCategory: propertyType === 'Residential' ? prev.subCategory : '',
    }));
  };

  const handleSubCategoryChange = (subCategory) => {
    setFormData((prev) => ({ ...prev, subCategory }));
  };

  return (
    <div className="initial_details_card">
      <div className="initial_header">
        <h3>Initial Property Details</h3>
      </div>

      <div className="initial_body">
        {/* Section 1: Intent Selection */}
        <div className="section_group">
          <p className="section_title">I'm looking to</p>
          <div className="options_grid">
            {intentOptions.map((item) => (
              <label key={item.label} className="option_item">
                <div className={`icon_circle ${item.bgClass}`}>
                  {item.icon}
                </div>
                <input
                  type="radio"
                  name="intent"
                  checked={formData.intent === item.label}
                  onChange={() => handleIntentChange(item.label)}
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Section 2: Property Type Selection */}
        <div className="section_group">
          <p className="section_title">What kind of property do you have?</p>
          <div className="options_grid center_grid">
            {typeOptions.map((item) => (
              <label key={item.label} className="option_item">
                <div className={`icon_circle ${item.bgClass}`}>
                  {item.icon}
                </div>
                <input
                  type="radio"
                  name="propertyType"
                  checked={formData.propertyType === item.label}
                  onChange={() => handleTypeChange(item.label)}
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Section 3: Sub Category (Only for Residential) */}
        {formData.propertyType === 'Residential' && (
          <div className="section_group sub_category_group">
            <p className="section_title">Select sub category</p>
            <div className="options_grid center_grid">
              {subCategoryOptions.map((item) => (
                <label key={item.label} className="option_item">
                  <div className={`icon_circle ${item.bgClass}`}>
                    {item.icon}
                  </div>
                  <input
                    type="radio"
                    name="subCategory"
                    checked={formData.subCategory === item.label}
                    onChange={() => handleSubCategoryChange(item.label)}
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="action_buttons">
          <button type="button" className="btn_prev" onClick={onPrev}>
            &larr; Previous
          </button>
          <button type="button" className="btn_next" onClick={onNext}>
            Next &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepInitialDetails;