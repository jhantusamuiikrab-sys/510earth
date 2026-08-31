import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../../assets/paneldesign/css/UploadNewProperty.module.css';

const UploadNewProperty = () => {
  const navigate = useNavigate();

  // Initialize state
  const [intent, setIntent] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [subCategory, setSubCategory] = useState('');

  // Handle Level 1 selection (Sell, Resell, Rent / Lease, PG)
  const handleIntentChange = (value) => {
    setIntent(value);
    // Reset dependent levels on change
    setPropertyType('');
    setSubCategory('');
  };

  // Handle Level 2 selection (Residential, Commercial, Land/Plot)
  const handlePropertyTypeChange = (value) => {
    setPropertyType(value);
    // Reset Level 3 on change
    setSubCategory('');
  };

  const handleNextClick = () => {
    if (!intent) {
      alert('Please select an option to proceed.');
      return;
    }

    // Direct routing based on subCategory selection
    if (subCategory === 'flat') {
      navigate('/dashboard/upload/sell/residential/flat-apartment/basic-details');
    } else if (subCategory === 'villa') {
      navigate('/dashboard/upload/house-villa-details');
    } else if (propertyType === 'commercial') {
      navigate('/dashboard/upload/commercial-details');
    } else if (propertyType === 'land') {
      navigate('/dashboard/upload/land-details');
    } else {
      // Fallback/default route if specific subcategory isn't selected
      navigate('/dashboard/upload/basic-details');
    }
  };

  // Display rules for step-by-step reveal:
  // Level 2 shows only if Sell or Resell is selected
  const showPropertyType = intent === 'sell' || intent === 'resell';

  // Level 3 shows only if Residential is selected under Sell or Resell
  const showSubCategory = showPropertyType && propertyType === 'residential';

  return (
    <div className={styles.uploadPropertyContainer}>
      <h1 className={styles.uploadPropertyTitle}>Upload New Property</h1>

      <div className={styles.uploadPropertyCard}>
        {/* LEVEL 1: I'm looking to */}
        <div className={styles.formRow}>
          <span className={styles.rowLabel}>I'm looking to</span>
          <div className={styles.radioOptions}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="intent"
                value="sell"
                checked={intent === 'sell'}
                onChange={() => handleIntentChange('sell')}
                className={styles.customRadio}
              />
              <span className={styles.radioText}>Sell</span>
            </label>

            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="intent"
                value="resell"
                checked={intent === 'resell'}
                onChange={() => handleIntentChange('resell')}
                className={styles.customRadio}
              />
              <span className={styles.radioText}>Resell</span>
            </label>

            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="intent"
                value="rent"
                checked={intent === 'rent'}
                onChange={() => handleIntentChange('rent')}
                className={styles.customRadio}
              />
              <span className={styles.radioText}>Rent / Lease</span>
            </label>

            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="intent"
                value="pg"
                checked={intent === 'pg'}
                onChange={() => handleIntentChange('pg')}
                className={styles.customRadio}
              />
              <span className={styles.radioText}>PG</span>
            </label>
          </div>
        </div>

        {/* LEVEL 2: Shows when Sell or Resell is clicked */}
        {showPropertyType && (
          <div className={styles.formRow}>
            <span className={styles.rowLabel}>What kind of property do you have?</span>
            <div className={styles.radioOptions}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="propertyType"
                  value="residential"
                  checked={propertyType === 'residential'}
                  onChange={() => handlePropertyTypeChange('residential')}
                  className={styles.customRadio}
                />
                <span className={styles.radioText}>Residential</span>
              </label>

              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="propertyType"
                  value="commercial"
                  checked={propertyType === 'commercial'}
                  onChange={() => handlePropertyTypeChange('commercial')}
                  className={styles.customRadio}
                />
                <span className={styles.radioText}>Commercial</span>
              </label>

              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="propertyType"
                  value="land"
                  checked={propertyType === 'land'}
                  onChange={() => handlePropertyTypeChange('land')}
                  className={styles.customRadio}
                />
                <span className={styles.radioText}>Land/Plot</span>
              </label>
            </div>
          </div>
        )}

        {/* LEVEL 3: Shows when Residential is clicked */}
        {showSubCategory && (
          <div className={styles.formRow}>
            <span className={styles.rowLabel}>Select sub category</span>
            <div className={styles.radioOptions}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="subCategory"
                  value="flat"
                  checked={subCategory === 'flat'}
                  onChange={() => setSubCategory('flat')}
                  className={styles.customRadio}
                />
                <span className={styles.radioText}>Flat/Apartment</span>
              </label>

              {/* Independent House/Villa only displays under Sell */}
              {intent === 'sell' && (
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="subCategory"
                    value="villa"
                    checked={subCategory === 'villa'}
                    onChange={() => setSubCategory('villa')}
                    className={styles.customRadio}
                  />
                  <span className={styles.radioText}>Independent House/Villa</span>
                </label>
              )}
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className={styles.btnContainer}>
          <button type="button" className={styles.nextBtn} onClick={handleNextClick}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadNewProperty;