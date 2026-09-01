import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

const CommercialBasicDetails = () => {
  const navigate = useNavigate();
  const { formData: contextData, updateFormData } = useOutletContext();

  const [formData, setFormData] = useState({
    propertyType: "",
    state: "",
    city: "",
    propertyName: "",
    googleMapLocation: "",
    projectFacing: "",
    projectStatus: "",
    price: "",
    negotiable: false,
  });

  // Pre-fill state if context already has saved basicDetails data
  useEffect(() => {
    if (contextData?.basicDetails) {
      setFormData((prev) => ({
        ...prev,
        ...contextData.basicDetails,
      }));
    }
  }, [contextData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Save Step 1 state to shared context
    updateFormData("basicDetails", formData);

    // 2. Navigate to Step 2 (Key Features)
    const intent = contextData?.lookingTo || "sell";
    navigate(`/dashboard/upload/${intent}/commercial/key-features`);
  };

  return (
    <div style={styles.card}>
      <div style={styles.headerGroup}>
        <h2 style={styles.title}>COMMERCIAL PROPERTY</h2>
        <p style={styles.subtitle}>Basic Details</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={styles.gridContainer}>
          <div style={styles.fieldWrapper}>
            <label style={styles.label}>Property Type *</label>
            <select
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              style={styles.select}
              required
            >
              <option value="">--Select Property Type--</option>
              <option value="Office">Office</option>
              <option value="Retail">Retail</option>
              <option value="Industrial">Industrial</option>
            </select>
          </div>

          <div style={styles.fieldWrapper}>
            <label style={styles.label}>State *</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              style={styles.select}
              required
            >
              <option value="">--Select State--</option>
              <option value="West Bengal">West Bengal</option>
            </select>
          </div>

          <div style={styles.fieldWrapper}>
            <label style={styles.label}>City *</label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              style={styles.select}
              required
            >
              <option value="">--Select City--</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Howrah">Howrah</option>
            </select>
          </div>

          <div style={styles.fieldWrapper}>
            <label style={styles.label}>Property Name *</label>
            <input
              type="text"
              name="propertyName"
              placeholder="e.g. IT Park Hub"
              value={formData.propertyName}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.fieldWrapper}>
            <label style={styles.label}>Google Map Location</label>
            <input
              type="text"
              name="googleMapLocation"
              placeholder="Paste map link or address"
              value={formData.googleMapLocation}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.fieldWrapper}>
            <label style={styles.label}>Project Facing</label>
            <select
              name="projectFacing"
              value={formData.projectFacing}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="">--Select Project Facing--</option>
              <option value="East">East</option>
              <option value="West">West</option>
              <option value="North">North</option>
              <option value="South">South</option>
            </select>
          </div>

          <div style={styles.fieldWrapper}>
            <label style={styles.label}>Project Status</label>
            <select
              name="projectStatus"
              value={formData.projectStatus}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="">--Select Project Status--</option>
              <option value="Ready to Move">Ready to Move</option>
              <option value="Under Construction">Under Construction</option>
            </select>
          </div>

          {/* Pricing Row */}
          <div style={styles.fullWidthField}>
            <div style={styles.priceRow}>
              <div style={{ flex: 1 }}>
                <label style={styles.label}>Price (in INR)</label>
                <input
                  type="number"
                  name="price"
                  placeholder="e.g. 5000000"
                  value={formData.price}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="negotiable"
                  checked={formData.negotiable}
                  onChange={handleChange}
                  style={styles.checkbox}
                />
                Price Negotiable
              </label>
            </div>
          </div>
        </div>

        <div style={styles.buttonContainer}>
          <button type="submit" style={styles.actionBtn}>
            Next Step →
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: "#ffffff",
    maxWidth: "850px",
    margin: "20px auto",
    borderRadius: "10px",
    padding: "40px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)",
    border: "1px solid #eef2f6",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  headerGroup: {
    textAlign: "center",
    marginBottom: "32px",
  },
  title: {
    color: "#0f172a",
    fontSize: "20px",
    fontWeight: "700",
    letterSpacing: "0.5px",
    margin: "0 0 6px 0",
  },
  subtitle: {
    color: "#64748b",
    fontSize: "14px",
    margin: 0,
    fontWeight: "500",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "24px 20px",
  },
  fieldWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  fullWidthField: {
    gridColumn: "1 / -1",
    marginTop: "8px",
  },
  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#334155",
  },
  input: {
    width: "100%",
    padding: "10px 14px",
    fontSize: "14px",
    color: "#1e293b",
    backgroundColor: "#f8fafc",
    border: "1.5px solid #e2e8f0",
    borderRadius: "6px",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s ease, background-color 0.2s ease",
  },
  select: {
    width: "100%",
    padding: "10px 14px",
    fontSize: "14px",
    color: "#1e293b",
    backgroundColor: "#f8fafc",
    border: "1.5px solid #e2e8f0",
    borderRadius: "6px",
    outline: "none",
    boxSizing: "border-box",
    cursor: "pointer",
    transition: "border-color 0.2s ease, background-color 0.2s ease",
  },
  priceRow: {
    display: "flex",
    alignItems: "flex-end",
    gap: "24px",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#475569",
    cursor: "pointer",
    paddingBottom: "10px",
    userSelect: "none",
  },
  checkbox: {
    width: "16px",
    height: "16px",
    accentColor: "#8cc63f",
    cursor: "pointer",
  },
  buttonContainer: {
    marginTop: "36px",
    display: "flex",
    justifyContent: "flex-end",
  },
  actionBtn: {
    backgroundColor: "#8cc63f",
    color: "#ffffff",
    border: "none",
    padding: "12px 36px",
    borderRadius: "6px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(140, 198, 63, 0.3)",
    transition: "transform 0.1s ease, background-color 0.2s ease",
  },
};

export default CommercialBasicDetails;