import React from 'react';
import styles from '../../assets/paneldesign/css/FilterSidebar.module.css';

export function FilterSidebar({ filters, setFilters }) {
  const bedroomOptions = ['1BHK', '2BHK', '3BHK', '4BHK', '5BHK', '6BHK', '7BHK', '8BHK', '9BHK', '10BHK'];
  const statusOptions = ['Under Construction', 'Ready to Move', 'Resale'];

  const handlePriceChange = (e) => {
    setFilters((prev) => ({ ...prev, priceRange: [0, Number(e.target.value)] }));
  };

  const handleAreaChange = (e) => {
    setFilters((prev) => ({ ...prev, areaRange: [0, Number(e.target.value)] }));
  };

  const handleBhkToggle = (bhk) => {
    setFilters((prev) => {
      const bedrooms = prev.bedrooms || [];
      const updated = bedrooms.includes(bhk)
        ? bedrooms.filter((item) => item !== bhk)
        : [...bedrooms, bhk];
      return { ...prev, bedrooms: updated };
    });
  };

  const handleStatusToggle = (status) => {
    setFilters((prev) => {
      const constructionStatus = prev.constructionStatus || [];
      const updated = constructionStatus.includes(status)
        ? constructionStatus.filter((item) => item !== status)
        : [...constructionStatus, status];
      return { ...prev, constructionStatus: updated };
    });
  };

  return (
    <aside className={styles.sidebarContainer}>
      {/* Price Range */}
      <div className={styles.filterGroup}>
        <h3 className={styles.sectionTitle}>Price Range</h3>
        <div className={styles.sliderWrapper}>
          <input 
            type="range" 
            min="0" 
            max="50000000"
            step="500000"
            value={filters.priceRange?.[1] ?? 50000000} 
            onChange={handlePriceChange}
            className={styles.rangeInput} 
          />
        </div>
        <div className={styles.rangeValues}>
          <div className={styles.rangeBox}>
            <span className={styles.unitLabel}>Rs</span>
            <input type="number" value={filters.priceRange?.[0] ?? 0} className={styles.numberInput} readOnly />
          </div>
          <div className={styles.rangeBox}>
            <span className={styles.unitLabel}>Rs</span>
            <input type="number" value={filters.priceRange?.[1] ?? 50000000} className={styles.numberInput} readOnly />
          </div>
        </div>
      </div>

      {/* Bedrooms */}
      <div className={styles.filterGroup}>
        <h3 className={styles.sectionTitle}>No of Bed Rooms</h3>
        <div className={styles.checkboxGrid}>
          {bedroomOptions.map((bhk) => (
            <label key={bhk} className={styles.checkboxLabel}>
              <input 
                type="checkbox" 
                checked={filters.bedrooms?.includes(bhk) || false}
                onChange={() => handleBhkToggle(bhk)}
                className={styles.checkboxInput} 
              />
              {bhk}
            </label>
          ))}
        </div>
      </div>

      {/* Area Range */}
      <div className={styles.filterGroup}>
        <h3 className={styles.sectionTitle}>Area</h3>
        <div className={styles.sliderWrapper}>
          <input 
            type="range" 
            min="0" 
            max="15000"
            step="500"
            value={filters.areaRange?.[1] ?? 15000}
            onChange={handleAreaChange} 
            className={styles.rangeInput} 
          />
        </div>
        <div className={styles.rangeValues}>
          <div className={styles.rangeBox}>
            <span className={styles.unitLabel}>Sq.Ft.</span>
            <input type="number" value={filters.areaRange?.[0] ?? 0} className={styles.numberInput} readOnly />
          </div>
          <div className={styles.rangeBox}>
            <span className={styles.unitLabel}>Sq.Ft.</span>
            <input type="number" value={filters.areaRange?.[1] ?? 15000} className={styles.numberInput} readOnly />
          </div>
        </div>
      </div>

      {/* Construction Status */}
      <div className={styles.filterGroup}>
        <h3 className={styles.sectionTitle}>Construction Status</h3>
        <div className={styles.checkboxStack}>
          {statusOptions.map((status) => (
            <label key={status} className={styles.checkboxLabel}>
              <input 
                type="checkbox" 
                checked={filters.constructionStatus?.includes(status) || false}
                onChange={() => handleStatusToggle(status)}
                className={styles.checkboxInput} 
              />
              {status}
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}