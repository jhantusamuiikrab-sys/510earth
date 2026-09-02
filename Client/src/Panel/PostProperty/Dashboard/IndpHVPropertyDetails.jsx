import React, { useState } from 'react';

const IndpHVPropertyDetails = ({ onPrevious, onNext }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 16) {
      setErrorMessage('Upload images : Min-4, Max-16');
      return;
    }
    setErrorMessage('');
    setSelectedFiles(files);
  };

  const handleRemove = () => {
    setSelectedFiles([]);
    setErrorMessage('');
  };

  const handleNextSubmit = (e) => {
    e.preventDefault();
    if (selectedFiles.length < 4 || selectedFiles.length > 16) {
      setErrorMessage('Upload images : Min-4, Max-16');
      return;
    }
    if (onNext) {
      onNext({ propertyImages: selectedFiles });
    }
  };

  return (
    <div style={styles.pageContainer}>
      {/* Top Navigation Bar */}
      <header style={styles.navbar}>
        <div style={styles.logoContainer}>
          <div style={styles.logoIcon}>🏢</div>
          <div>
            <div style={styles.logoText}>510 EARTH</div>
            <div style={styles.logoSubtext}>TOP PROPERTY | BEST DEALS</div>
          </div>
        </div>
        <div style={styles.navLinks}>
          <a href="#dashboard" style={styles.navLink}>DASHBOARD</a>
          <a href="#change-password" style={styles.navLink}>CHANGE PASSWORD</a>
          <button type="button" style={styles.signOutBtn}>SIGN OUT</button>
        </div>
      </header>

      {/* Stepper Progress Bar */}
      <div style={styles.stepperContainer}>
        <div style={styles.stepWrapper}>
          <div style={{ ...styles.stepCircle, ...styles.completedStep }}>1</div>
          <span style={styles.stepLabel}>BASIC DETAILS</span>
        </div>
        <div style={{ ...styles.stepLine, ...styles.completedLine }}></div>
        <div style={styles.stepWrapper}>
          <div style={{ ...styles.stepCircle, ...styles.completedStep }}>2</div>
          <span style={styles.stepLabel}>KEY FEATURES</span>
        </div>
        <div style={{ ...styles.stepLine, ...styles.completedLine }}></div>
        <div style={styles.stepWrapper}>
          <div style={{ ...styles.stepCircle, ...styles.activeStep }}>3</div>
          <span style={styles.stepLabel}>PROPERTY DETAILS</span>
        </div>
        <div style={styles.stepLine}></div>
        <div style={styles.stepWrapper}>
          <div style={styles.stepCircle}>4</div>
          <span style={styles.stepLabel}>OTHER INFORMATION</span>
        </div>
      </div>

      {/* Card Content */}
      <div style={styles.card}>
        <h2 style={styles.title}>INDEPENDENT HOUSE / VILLA</h2>
        <p style={styles.subtitle}>Property Details</p>

        <form onSubmit={handleNextSubmit}>
          <div style={styles.fieldGroup}>
            <label style={styles.fieldLabel}>Property Images</label>
            <div style={styles.fileInputWrapper}>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                style={styles.fileInput}
              />
            </div>
          </div>

          <div style={styles.buttonGroup}>
            <button
              type="button"
              onClick={handleRemove}
              style={styles.removeBtn}
            >
              Remove
            </button>
          </div>

          <div style={styles.infoMessage}>
            Upload images : Min-4, Max-16
          </div>

          <div style={styles.navigationButtons}>
            <button
              type="button"
              onClick={onPrevious}
              style={styles.actionBtn}
            >
              Previous
            </button>
            <button
              type="submit"
              style={styles.actionBtn}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Layout and UI styles
const styles = {
  pageContainer: {
    backgroundColor: '#ffffff',
    minHeight: '100vh',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 80px',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #f0f0f0',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  logoIcon: {
    fontSize: '32px',
  },
  logoText: {
    fontSize: '22px',
    fontWeight: '800',
    color: '#0f52ba',
    letterSpacing: '1px',
    lineHeight: '1',
  },
  logoSubtext: {
    fontSize: '9px',
    fontWeight: '700',
    color: '#0f52ba',
    marginTop: '3px',
    letterSpacing: '0.5px',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '30px',
  },
  navLink: {
    color: '#000000',
    textDecoration: 'none',
    fontWeight: '700',
    fontSize: '14px',
    letterSpacing: '0.5px',
  },
  signOutBtn: {
    backgroundColor: '#000000',
    color: '#ffffff',
    border: 'none',
    padding: '10px 24px',
    borderRadius: '6px',
    fontWeight: '700',
    fontSize: '13px',
    cursor: 'pointer',
    letterSpacing: '0.5px',
  },
  stepperContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '850px',
    margin: '40px auto 30px auto',
  },
  stepWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  stepCircle: {
    width: '28px',
    height: '28px',
    borderRadius: '4px',
    backgroundColor: '#0f52ba',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '13px',
  },
  completedStep: {
    backgroundColor: '#82c91e',
  },
  activeStep: {
    backgroundColor: '#82c91e',
  },
  stepLabel: {
    fontSize: '10px',
    color: '#495057',
    marginTop: '6px',
    fontWeight: '600',
  },
  stepLine: {
    flex: 1,
    height: '2px',
    backgroundColor: '#0f52ba',
    margin: '0 10px 16px 10px',
  },
  completedLine: {
    backgroundColor: '#82c91e',
  },
  card: {
    backgroundColor: '#ffffff',
    maxWidth: '920px',
    margin: '0 auto 60px auto',
    borderRadius: '6px',
    padding: '40px 50px 60px 50px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    border: '1px solid #eaeaea',
  },
  title: {
    color: '#0f52ba',
    textAlign: 'center',
    fontSize: '18px',
    fontWeight: '700',
    margin: '0 0 6px 0',
  },
  subtitle: {
    color: '#6c757d',
    textAlign: 'center',
    fontSize: '14px',
    marginBottom: '40px',
  },
  fieldGroup: {
    marginBottom: '15px',
  },
  fieldLabel: {
    display: 'block',
    fontSize: '15px',
    color: '#495057',
    marginBottom: '12px',
  },
  fileInputWrapper: {
    borderBottom: '1px solid #ced4da',
    paddingBottom: '8px',
  },
  fileInput: {
    fontSize: '14px',
    color: '#495057',
    cursor: 'pointer',
  },
  buttonGroup: {
    marginTop: '15px',
    marginBottom: '12px',
  },
  removeBtn: {
    backgroundColor: '#dc3545',
    color: '#ffffff',
    border: 'none',
    padding: '8px 22px',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  infoMessage: {
    color: '#dc3545',
    fontSize: '14px',
    marginBottom: '30px',
  },
  navigationButtons: {
    display: 'flex',
    gap: '12px',
  },
  actionBtn: {
    backgroundColor: '#82c91e',
    color: '#ffffff',
    border: 'none',
    padding: '10px 38px',
    borderRadius: '4px',
    fontSize: '15px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

export default IndpHVPropertyDetails;