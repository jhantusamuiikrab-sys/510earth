import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

const CommercialKeyFeatures = () => {
  const navigate = useNavigate();
  const { formData: contextData, updateFormData } = useOutletContext();

  const [formData, setFormData] = useState({
    superBuiltUpArea: "",
    builtUpArea: "",
    carpetArea: "",
    pricePerSqFt: "",
    totalPrice: "",
    block: "",
    entranceWidth: "",
    ceilingHeight: "",
    typeOfFlooring: "",
    openParking: false,
    coveredParking: false,
    mechanicalParking: false,
    caption: "",
    overview: "",
  });

  // Pre-fill local state if context contains saved keyFeatures data
  useEffect(() => {
    if (contextData?.keyFeatures) {
      setFormData((prev) => ({
        ...prev,
        ...contextData.keyFeatures,
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

  const handlePrevious = () => {
    const intent = contextData?.lookingTo || "sell";
    navigate(`/dashboard/upload/${intent}/commercial/basic-details`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Save Step 2 state to shared context
    updateFormData("keyFeatures", formData);

    // 2. Navigate to Step 3 (Property Details / Other Info)
    const intent = contextData?.lookingTo || "sell";
    navigate(`/dashboard/upload/${intent}/commercial/property-details`);
  };

  return (
    <div style={styles.card}>
      <div style={styles.headerGroup}>
        <h2 style={styles.title}>COMMERCIAL PROPERTY</h2>
        <p style={styles.subtitle}>Key Features</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={styles.gridContainer}>
          {/* Row 1 */}
          <div style={styles.fieldWrapper}>
            <label style={styles.label}>Super Built Up Area (sq ft)</label>
            <input
              type="number"
              name="superBuiltUpArea"
              placeholder="e.g. 2500"
              value={formData.superBuiltUpArea}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.fieldWrapper}>
            <label style={styles.label}>Built Up Area (sq ft)</label>
            <input
              type="number"
              name="builtUpArea"
              placeholder="e.g. 2000"
              value={formData.builtUpArea}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.fieldWrapper}>
            <label style={styles.label}>Carpet Area (sq ft)</label>
            <input
              type="number"
              name="carpetArea"
              placeholder="e.g. 1750"
              value={formData.carpetArea}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          {/* Row 2 */}
          <div style={styles.fieldWrapper}>
            <label style={styles.label}>Price Per Sq Ft</label>
            <input
              type="number"
              name="pricePerSqFt"
              placeholder="e.g. 6000"
              value={formData.pricePerSqFt}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.fieldWrapper}>
            <label style={styles.label}>Total Price (INR)</label>
            <input
              type="number"
              name="totalPrice"
              placeholder="Calculated price"
              value={formData.totalPrice}
              onChange={handleChange}
              style={{ ...styles.input, backgroundColor: "#f1f5f9" }}
            />
          </div>

          <div style={styles.fieldWrapper}>
            <label style={styles.label}>Block / Tower</label>
            <input
              type="text"
              name="block"
              placeholder="e.g. Tower A"
              value={formData.block}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          {/* Row 3 */}
          <div style={styles.fieldWrapper}>
            <label style={styles.label}>Entrance Width (ft)</label>
            <input
              type="text"
              name="entranceWidth"
              placeholder="e.g. 12 ft"
              value={formData.entranceWidth}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.fieldWrapper}>
            <label style={styles.label}>Ceiling Height (ft)</label>
            <input
              type="text"
              name="ceilingHeight"
              placeholder="e.g. 10 ft"
              value={formData.ceilingHeight}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.fieldWrapper}>
            <label style={styles.label}>Type of Flooring</label>
            <select
              name="typeOfFlooring"
              value={formData.typeOfFlooring}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="">--Select Flooring--</option>
              <option value="Marble">Marble</option>
              <option value="Tiles">Tiles</option>
              <option value="Bare Shell">Bare Shell</option>
            </select>
          </div>
        </div>

        {/* Parking Checkboxes */}
        <div style={styles.checkboxGroupSection}>
          <span style={styles.checkboxGroupTitle}>Parking Facilities</span>
          <div style={styles.checkboxRow}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="openParking"
                checked={formData.openParking}
                onChange={handleChange}
                style={styles.checkbox}
              />
              Open Parking
            </label>

            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="coveredParking"
                checked={formData.coveredParking}
                onChange={handleChange}
                style={styles.checkbox}
              />
              Covered Parking
            </label>

            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="mechanicalParking"
                checked={formData.mechanicalParking}
                onChange={handleChange}
                style={styles.checkbox}
              />
              Mechanical Parking
            </label>
          </div>
        </div>

        {/* Caption */}
        <div style={styles.fieldWrapper}>
          <label style={styles.label}>Caption</label>
          <input
            type="text"
            name="caption"
            placeholder="e.g. Prime commercial office space ready for quick possession"
            value={formData.caption}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        {/* Rich Text / Overview */}
        <div style={{ ...styles.fieldWrapper, marginTop: "20px" }}>
          <label style={styles.label}>Property Overview</label>
          <div style={styles.editorContainer}>
            <div style={styles.editorToolbar}>
              <button type="button" style={styles.editorBtn}>↩</button>
              <button type="button" style={styles.editorBtn}>↪</button>
              <div style={styles.toolbarDivider} />
              <button type="button" style={{ ...styles.editorBtn, fontWeight: "700" }}>B</button>
              <button type="button" style={{ ...styles.editorBtn, fontStyle: "italic" }}>I</button>
              <button type="button" style={{ ...styles.editorBtn, textDecoration: "underline" }}>U</button>
            </div>
            <textarea
              name="overview"
              placeholder="Enter comprehensive property highlights, location advantages, nearby hubs..."
              value={formData.overview}
              onChange={handleChange}
              rows={5}
              style={styles.textarea}
            />
          </div>
        </div>

        {/* Actions */}
        <div style={styles.buttonContainer}>
          <button
            type="button"
            onClick={handlePrevious}
            style={styles.secondaryBtn}
          >
            ← Previous
          </button>
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
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "20px",
    marginBottom: "24px",
  },
  fieldWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
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
  checkboxGroupSection: {
    backgroundColor: "#f8fafc",
    border: "1px dashed #cbd5e1",
    borderRadius: "8px",
    padding: "16px 20px",
    marginBottom: "24px",
  },
  checkboxGroupTitle: {
    display: "block",
    fontSize: "13px",
    fontWeight: "600",
    color: "#334155",
    marginBottom: "12px",
  },
  checkboxRow: {
    display: "flex",
    flexWrap: "wrap",
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
    userSelect: "none",
  },
  checkbox: {
    width: "16px",
    height: "16px",
    accentColor: "#8cc63f",
    cursor: "pointer",
  },
  editorContainer: {
    borderRadius: "6px",
    border: "1.5px solid #e2e8f0",
    overflow: "hidden",
    backgroundColor: "#ffffff",
  },
  editorToolbar: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 12px",
    backgroundColor: "#f1f5f9",
    borderBottom: "1px solid #e2e8f0",
  },
  toolbarDivider: {
    width: "1px",
    height: "16px",
    backgroundColor: "#cbd5e1",
    margin: "0 4px",
  },
  editorBtn: {
    border: "none",
    background: "transparent",
    color: "#475569",
    cursor: "pointer",
    fontSize: "14px",
    padding: "4px 8px",
    borderRadius: "4px",
  },
  textarea: {
    width: "100%",
    padding: "12px 14px",
    fontSize: "14px",
    color: "#1e293b",
    border: "none",
    outline: "none",
    boxSizing: "border-box",
    resize: "vertical",
    fontFamily: "inherit",
    lineHeight: "1.5",
  },
  buttonContainer: {
    marginTop: "36px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  secondaryBtn: {
    backgroundColor: "#ffffff",
    color: "#475569",
    border: "1.5px solid #cbd5e1",
    padding: "12px 28px",
    borderRadius: "6px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
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

export default CommercialKeyFeatures;