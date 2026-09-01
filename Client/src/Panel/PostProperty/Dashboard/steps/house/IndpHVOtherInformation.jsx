import React, { useState, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

const IndpHVOtherInformation = () => {
  const navigate = useNavigate();
  const { formData: contextData, updateFormData } = useOutletContext();

  const [formData, setFormData] = useState({
    airport: "",
    bank: "",
    busStop: "",
    college: "",
    hospital: "",
    kindergarten: "",
    landMark: "",
    mall: "",
    market: "",
    metro: "",
    nearByCircle: "",
    publicPark: "",
    railwayStation: "",
    school: "",
    techPark: "",
    temple: "",
    university: "",
    propertyAddress: "",
    propertyAge: "",
    ownership: "",
  });

  // Pre-fill form state if data already exists in parent context
  useEffect(() => {
    if (contextData?.otherInformation) {
      setFormData((prev) => ({
        ...prev,
        ...contextData.otherInformation,
      }));
    }
  }, [contextData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePrevious = () => {
    const intent = contextData?.lookingTo || "sell";
    navigate(
      `/dashboard/upload/${intent}/residential/independent-house/villa/property-details`,
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Persist Step 4 data into shared outlet context
    updateFormData("otherInformation", formData);

    // 2. Perform final form submission logic/API request using contextData + formData
    const finalPayload = {
      ...contextData,
      otherInformation: formData,
    };

    console.log("Final Payload Submitted:", finalPayload);

    // 3. Redirect user upon successful completion
    navigate("/dashboard");
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
          <div style={{ ...styles.stepCircle, ...styles.completedStep }}>3</div>
          <span style={styles.stepLabel}>PROPERTY DETAILS</span>
        </div>
        <div style={{ ...styles.stepLine, ...styles.completedLine }}></div>
        <div style={styles.stepWrapper}>
          <div style={{ ...styles.stepCircle, ...styles.activeStep }}>4</div>
          <span style={styles.stepLabel}>OTHER INFORMATION</span>
        </div>
      </div>

      {/* Main Container Card */}
      <div style={styles.card}>
        <h2 style={styles.title}>INDEPENDENT HOUSE / VILLA</h2>
        <p style={styles.subtitle}>Other Information</p>

        <form onSubmit={handleSubmit}>
          <h3 style={styles.sectionHeader}>Nearby</h3>

          {/* Nearby Distances Grid (3 Columns) */}
          <div style={styles.grid3}>
            {/* Row 1 */}
            <div style={styles.inputGroup}>
              <label style={styles.fieldLabel}>Airport</label>
              <input
                type="text"
                name="airport"
                placeholder="Enter Distance of Airport"
                value={formData.airport}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.fieldLabel}>Bank</label>
              <input
                type="text"
                name="bank"
                placeholder="Enter Distance of Bank"
                value={formData.bank}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.fieldLabel}>Bus Stop</label>
              <input
                type="text"
                name="busStop"
                placeholder="Enter Distance of Bus Stop"
                value={formData.busStop}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            {/* Row 2 */}
            <div style={styles.inputGroup}>
              <label style={styles.fieldLabel}>College</label>
              <input
                type="text"
                name="college"
                placeholder="Enter Distance of College"
                value={formData.college}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.fieldLabel}>Hospital</label>
              <input
                type="text"
                name="hospital"
                placeholder="Enter Distance of Hospital"
                value={formData.hospital}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.fieldLabel}>Kindergarten</label>
              <input
                type="text"
                name="kindergarten"
                placeholder="Enter Distance of Kindergarten"
                value={formData.kindergarten}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            {/* Row 3 */}
            <div style={styles.inputGroup}>
              <label style={styles.fieldLabel}>Land Mark</label>
              <input
                type="text"
                name="landMark"
                placeholder="Enter Distance of Land Mark"
                value={formData.landMark}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.fieldLabel}>Mall</label>
              <input
                type="text"
                name="mall"
                placeholder="Enter Distance of Mall"
                value={formData.mall}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.fieldLabel}>Market</label>
              <input
                type="text"
                name="market"
                placeholder="Enter Distance of Market"
                value={formData.market}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            {/* Row 4 */}
            <div style={styles.inputGroup}>
              <label style={styles.fieldLabel}>Metro</label>
              <input
                type="text"
                name="metro"
                placeholder="Enter Distance of Metro"
                value={formData.metro}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.fieldLabel}>Near By Circle</label>
              <input
                type="text"
                name="nearByCircle"
                placeholder="Enter Distance of Near By Circle"
                value={formData.nearByCircle}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.fieldLabel}>Public Park</label>
              <input
                type="text"
                name="publicPark"
                placeholder="Enter Distance of Public Park"
                value={formData.publicPark}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            {/* Row 5 */}
            <div style={styles.inputGroup}>
              <label style={styles.fieldLabel}>Railway Station</label>
              <input
                type="text"
                name="railwayStation"
                placeholder="Enter Distance of Railway Station"
                value={formData.railwayStation}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.fieldLabel}>School</label>
              <input
                type="text"
                name="school"
                placeholder="Enter Distance of School"
                value={formData.school}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.fieldLabel}>Tech Park</label>
              <input
                type="text"
                name="techPark"
                placeholder="Enter Distance of Tech Park"
                value={formData.techPark}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            {/* Row 6 */}
            <div style={styles.inputGroup}>
              <label style={styles.fieldLabel}>Temple</label>
              <input
                type="text"
                name="temple"
                placeholder="Enter Distance of Temple"
                value={formData.temple}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.fieldLabel}>University</label>
              <input
                type="text"
                name="university"
                placeholder="Enter Distance of University"
                value={formData.university}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div></div>
          </div>

          {/* Property Address Field */}
          <div style={styles.fullWidthGroup}>
            <input
              type="text"
              name="propertyAddress"
              placeholder="Property Address"
              value={formData.propertyAddress}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          {/* Select Property Age */}
          <div style={styles.fullWidthGroup}>
            <select
              name="propertyAge"
              value={formData.propertyAge}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="">--Select Property Age--</option>
              <option value="0-1 Year">0-1 Year</option>
              <option value="1-5 Years">1-5 Years</option>
              <option value="5-10 Years">5-10 Years</option>
              <option value="10+ Years">10+ Years</option>
            </select>
          </div>

          {/* Select Ownership */}
          <div style={styles.fullWidthGroup}>
            <select
              name="ownership"
              value={formData.ownership}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="">--Select Ownership--</option>
              <option value="Freehold">Freehold</option>
              <option value="Leasehold">Leasehold</option>
              <option value="Co-operative Society">Co-operative Society</option>
              <option value="Power of Attorney">Power of Attorney</option>
            </select>
          </div>

          {/* Buttons */}
          <div style={styles.actionButtons}>
            <button
              type="button"
              onClick={handlePrevious}
              style={styles.previousButton}
            >
              Previous
            </button>
            <button type="submit" style={styles.submitButton}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Styling Object matching overall theme specs
const styles = {
  pageContainer: {
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
    padding: "30px 20px",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  stepperContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "850px",
    margin: "0 auto 25px auto",
  },
  stepWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  stepCircle: {
    width: "32px",
    height: "32px",
    borderRadius: "4px",
    backgroundColor: "#0f52ba",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "14px",
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
    margin: "0 auto 40px auto",
    borderRadius: "4px",
    padding: "40px 50px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
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
    marginBottom: "35px",
  },
  sectionHeader: {
    fontSize: "15px",
    color: "#333333",
    fontWeight: "600",
    marginBottom: "25px",
  },
  grid3: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "25px",
    marginBottom: "35px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
  },
  fieldLabel: {
    fontSize: "14px",
    color: "#333333",
    marginBottom: "6px",
  },
  input: {
    width: "100%",
    border: "none",
    borderBottom: "1px solid #ced4da",
    padding: "8px 0",
    fontSize: "14px",
    color: "#495057",
    outline: "none",
    backgroundColor: "transparent",
  },
  select: {
    width: "100%",
    border: "none",
    borderBottom: "1px solid #ced4da",
    padding: "8px 0",
    fontSize: "14px",
    color: "#6c757d",
    backgroundColor: "transparent",
    outline: "none",
  },
  fullWidthGroup: {
    marginBottom: "30px",
  },
  actionButtons: {
    display: "flex",
    gap: "15px",
    marginTop: "35px",
  },
  previousButton: {
    backgroundColor: "#82c91e",
    color: "#ffffff",
    border: "none",
    padding: "10px 35px",
    borderRadius: "3px",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  submitButton: {
    backgroundColor: "#82c91e",
    color: "#ffffff",
    border: "none",
    padding: "10px 40px",
    borderRadius: "3px",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default IndpHVOtherInformation;
