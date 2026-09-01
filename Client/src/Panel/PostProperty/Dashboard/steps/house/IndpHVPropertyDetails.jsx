import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

const IndpHVPropertyDetails = () => {
  const navigate = useNavigate();
  const { formData: contextData, updateFormData } = useOutletContext();

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // Pre-fill state if context has previous propertyDetails data
  useEffect(() => {
    if (contextData?.propertyDetails?.propertyImages) {
      setSelectedFiles(contextData.propertyDetails.propertyImages);
    }
  }, [contextData]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 16) {
      setErrorMessage("Upload images : Min-4, Max-16");
      return;
    }
    setErrorMessage("");
    setSelectedFiles(files);
  };

  const handleRemove = () => {
    setSelectedFiles([]);
    setErrorMessage("");
  };

  const handlePrevious = () => {
    const intent = contextData?.lookingTo || "sell";
    navigate(
      `/dashboard/upload/${intent}/residential/independent-house/villa/key-features`,
    );
  };

  const handleNextSubmit = (e) => {
    e.preventDefault();

    if (selectedFiles.length < 4 || selectedFiles.length > 16) {
      setErrorMessage("Upload images : Min-4, Max-16");
      return;
    }

    // 1. Save step 3 state to shared context
    updateFormData("propertyDetails", { propertyImages: selectedFiles });

    // 2. Navigate to Step 4 (Other Information)
    const intent = contextData?.lookingTo || "sell";
    navigate(
      `/dashboard/upload/${intent}/residential/independent-house/villa/other-information`,
    );
  };

  return (
    <div style={styles.pageContainer}>
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
            {selectedFiles.length > 0 && (
              <p style={styles.fileCountText}>
                {selectedFiles.length} file(s) selected
              </p>
            )}
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

          <div
            style={{
              ...styles.infoMessage,
              color: errorMessage ? "#d9534f" : "#6c757d",
            }}
          >
            {errorMessage || "Upload images : Min-4, Max-16"}
          </div>

          <div style={styles.navigationButtons}>
            <button
              type="button"
              onClick={handlePrevious}
              style={styles.actionBtn}
            >
              Previous
            </button>
            <button type="submit" style={styles.actionBtn}>
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
    backgroundColor: "#ffffff",
    minHeight: "100vh",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 80px",
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #f0f0f0",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  logoIcon: {
    fontSize: "32px",
  },
  logoText: {
    fontSize: "22px",
    fontWeight: "800",
    color: "#0f52ba",
    letterSpacing: "1px",
    lineHeight: "1",
  },
  logoSubtext: {
    fontSize: "9px",
    fontWeight: "700",
    color: "#0f52ba",
    marginTop: "3px",
    letterSpacing: "0.5px",
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "30px",
  },
  navLink: {
    color: "#000000",
    textDecoration: "none",
    fontWeight: "700",
    fontSize: "14px",
    letterSpacing: "0.5px",
  },
  signOutBtn: {
    backgroundColor: "#000000",
    color: "#ffffff",
    border: "none",
    padding: "10px 24px",
    borderRadius: "6px",
    fontWeight: "700",
    fontSize: "13px",
    cursor: "pointer",
    letterSpacing: "0.5px",
  },
  stepperContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "850px",
    margin: "40px auto 30px auto",
  },
  stepWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  stepCircle: {
    width: "28px",
    height: "28px",
    borderRadius: "4px",
    backgroundColor: "#0f52ba",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "13px",
  },
  completedStep: {
    backgroundColor: "#82c91e",
  },
  activeStep: {
    backgroundColor: "#82c91e",
  },
  stepLabel: {
    fontSize: "10px",
    color: "#495057",
    marginTop: "6px",
    fontWeight: "600",
  },
  stepLine: {
    flex: 1,
    height: "2px",
    backgroundColor: "#0f52ba",
    margin: "0 10px 16px 10px",
  },
  completedLine: {
    backgroundColor: "#82c91e",
  },
  card: {
    backgroundColor: "#ffffff",
    maxWidth: "920px",
    margin: "0 auto 60px auto",
    borderRadius: "6px",
    padding: "40px 50px 60px 50px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    border: "1px solid #eaeaea",
  },
  title: {
    color: "#0f52ba",
    textAlign: "center",
    fontSize: "18px",
    fontWeight: "700",
    margin: "0 0 6px 0",
  },
  subtitle: {
    color: "#6c757d",
    textAlign: "center",
    fontSize: "14px",
    marginBottom: "40px",
  },
  fieldGroup: {
    marginBottom: "15px",
  },
  fieldLabel: {
    display: "block",
    fontSize: "15px",
    color: "#495057",
    marginBottom: "12px",
  },
  fileInputWrapper: {
    borderBottom: "1px solid #ced4da",
    paddingBottom: "8px",
  },
  fileInput: {
    fontSize: "14px",
    color: "#495057",
    cursor: "pointer",
  },
  buttonGroup: {
    marginTop: "15px",
    marginBottom: "12px",
  },
  removeBtn: {
    backgroundColor: "#dc3545",
    color: "#ffffff",
    border: "none",
    padding: "8px 22px",
    borderRadius: "4px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
  },
  infoMessage: {
    color: "#dc3545",
    fontSize: "14px",
    marginBottom: "30px",
  },
  navigationButtons: {
    display: "flex",
    gap: "12px",
  },
  actionBtn: {
    backgroundColor: "#82c91e",
    color: "#ffffff",
    border: "none",
    padding: "10px 38px",
    borderRadius: "4px",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default IndpHVPropertyDetails;
