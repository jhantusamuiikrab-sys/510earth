import React, { useState, useEffect } from 'react';
import styles from '../../assets/paneldesign/css/BrochureForm.module.css';

function BrochureForm({ propertyName = "JMC Hill View", onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    country: 'India',
    phone: '',
    email: '',
    message: '',
  });

  // Close modal when pressing Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    if (onClose) onClose();
  };
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        
        {/* Header Section */}
        <div className={styles.header}>
          <div className={styles.logoContainer}>
            <div className={styles.logoText}>
              <span className={styles.logoTitle}>510 EARTH</span>
              <span className={styles.logoSubtitle}>TOP PROPERTY | BEST DEALS</span>
            </div>
          </div>
          <div className={styles.headerText}>
            Are you interested<br />about {propertyName}?
          </div>
          <button className={styles.closeButton} onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className={styles.body}>
          
          {/* Features / Icons */}
          <div className={styles.featuresRow}>
            <div className={styles.featureItem}>
              <svg className={styles.featureIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>Instant Call Back</span>
            </div>
            <div className={styles.featureItem}>
              <svg className={styles.featureIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="1" y="3" width="15" height="13" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
              <span>Free Site Visit</span>
            </div>
            <div className={styles.featureItem}>
              <svg className={styles.featureIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                <path d="M12 6v12" />
              </svg>
              <span>Best Price</span>
            </div>
          </div>

          <div className={styles.offerTitle}>
            Register Here And Avail <span className={styles.highlightText}>The Best Offers!!</span>
          </div>

          {/* Form */}
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGrid}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className={styles.inputField}
                required
              />
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className={styles.selectField}
              >
                <option value="India">India</option>
                <option value="UAE">UAE</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
              </select>
            </div>

            <div className={styles.formGrid}>
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className={styles.inputField}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={styles.inputField}
                required
              />
            </div>

            <input
              type="text"
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              className={styles.inputField}
            />

            <div className={styles.submitBtnContainer}>
              <button type="submit" className={styles.submitBtn}>
                SUBMIT & DOWNLOAD
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}

export default BrochureForm;