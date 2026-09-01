import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../../assets/paneldesign/css/UploadNewProperty.module.css';

const UploadNewProperty = () => {
  const navigate = useNavigate();

  // State
  const [intent, setIntent] = useState(''); // 'sell' | 'resell' | 'rent' | 'pg'
  const [propertyType, setPropertyType] = useState(''); // 'residential' | 'commercial' | 'land'
  const [subCategory, setSubCategory] = useState(''); // 'flat' | 'villa'

  const handleIntentChange = (value) => {
    setIntent(value);
    setPropertyType('');
    setSubCategory('');
  };

  const handlePropertyTypeChange = (value) => {
    setPropertyType(value);
    setSubCategory('');
  };

  const handleNextClick = () => {
    if (!intent) {
      alert('Please select an option to proceed.');
      return;
    }

    // 1. Flat / Apartment Flow (Handles both Sell & Resell)
    if (subCategory === 'flat') {
      navigate(`/dashboard/upload/${intent}/residential/flat-apartment/basic-details`);
      return;
    }

    // 2. Independent House / Villa Flow
    if (subCategory === 'villa') {
      navigate(`/dashboard/upload/${intent}/residential/independent-house/villa/basic-details`);
      return;
    }

    // 3. Commercial Flow
    if (propertyType === 'commercial') {
      navigate(`/dashboard/upload/${intent}/commercial/basic-details`);
      return;
    }

    // 4. Land / Plot Flow
    if (propertyType === 'land') {
      navigate(`/dashboard/upload/${intent}/land/basic-details`);
      return;
    }

    // Fallback default
    navigate('/dashboard/upload/basic-details');
  };

  const showPropertyType = intent === 'sell' || intent === 'resell';
  const showSubCategory = showPropertyType && propertyType === 'residential';

  return (
    <div className={styles.uploadPropertyContainer}>
      <h1 className={styles.uploadPropertyTitle}>Upload New Property</h1>

      <div className={styles.uploadPropertyCard}>
        {/* LEVEL 1: Intent */}
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
                // onChange={() => handleIntentChange('rent')}
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
                // onChange={() => handleIntentChange('pg')}
                className={styles.customRadio}
              />
              <span className={styles.radioText}>PG</span>
            </label>
          </div>
        </div>

        {/* LEVEL 2: Property Category */}
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

        {/* LEVEL 3: Subcategory */}
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