import React, { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

const IndpHVBasicDetails = () => {
  const navigate = useNavigate();
  const { formData: contextData, updateFormData } = useOutletContext();

  const [formData, setFormData] = useState({
    state: '',
    city: '',
    propertyName: '',
    location: '',
    projectStatus: '',
    projectFacing: '',
    price: '',
    isNegotiable: false,
    plotArea: '',
    areaUnit: '',
    totalPrice: '',
    builtUpArea: '',
    carpetArea: '',
    noOfBedrooms: '',
    noOfBathrooms: '',
    noOfBalcony: '',
    furnishedType: '',
    totalFloors: '',
    typeOfFlooring: '',
    servantRoom: false,
    pujaRoom: false,
    studyRoom: false,
    storeRoom: false,
    openParking: false,
    coveredParking: false,
    mechanicalParking: false,
  });

  // Pre-fill state if context has previous basicDetails
  useEffect(() => {
    if (contextData?.basicDetails && Object.keys(contextData.basicDetails).length > 0) {
      setFormData((prev) => ({ ...prev, ...contextData.basicDetails }));
    }
  }, [contextData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Save state to shared UploadContextLayout context
    updateFormData('basicDetails', formData);

    // 2. Determine base intent (sell or resell)
    const intent = contextData?.lookingTo || 'sell';

    // 3. Navigate to Step 2 (Key Features)
    navigate(`/dashboard/upload/${intent}/residential/independent-house/villa/key-features`);
  };

  return (
    <div style={styles.pageContainer}>
      {/* Step Stepper Navigation */}
      <div style={styles.stepperContainer}>
        <div style={styles.stepWrapper}>
          <div style={{ ...styles.stepCircle, ...styles.activeStep }}>1</div>
          <span style={styles.stepLabel}>BASIC DETAILS</span>
        </div>
        <div style={styles.stepLine}></div>
        <div style={styles.stepWrapper}>
          <div style={styles.stepCircle}>2</div>
          <span style={styles.stepLabel}>KEY FEATURES</span>
        </div>
        <div style={styles.stepLine}></div>
        <div style={styles.stepWrapper}>
          <div style={styles.stepCircle}>3</div>
          <span style={styles.stepLabel}>PROPERTY DETAILS</span>
        </div>
        <div style={styles.stepLine}></div>
        <div style={styles.stepWrapper}>
          <div style={styles.stepCircle}>4</div>
          <span style={styles.stepLabel}>OTHER INFORMATION</span>
        </div>
      </div>

      {/* Main Card Form */}
      <div style={styles.card}>
        <h2 style={styles.title}>INDEPENDENT HOUSE / VILLA</h2>
        <p style={styles.subtitle}>Basic Details</p>

        <form onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div style={styles.row}>
            <div style={styles.col}>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                style={styles.select}
              >
                <option value="">--Select State--</option>
                <option value="West Bengal">West Bengal</option>
              </select>
            </div>
            <div style={styles.col}>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                style={styles.select}
              >
                <option value="">--Select City--</option>
                <option value="Kolkata">Kolkata</option>
              </select>
            </div>
          </div>

          {/* Row 2 */}
          <div style={styles.row}>
            <div style={styles.col}>
              <input
                type="text"
                name="propertyName"
                placeholder="Property Name"
                value={formData.propertyName}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.col}>
              <input
                type="text"
                name="location"
                placeholder="Enter property Location"
                value={formData.location}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
          </div>

          {/* Row 3 */}
          <div style={styles.row}>
            <div style={styles.col}>
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
            <div style={styles.col}>
              <select
                name="projectFacing"
                value={formData.projectFacing}
                onChange={handleChange}
                style={styles.select}
              >
                <option value="">--Select Project Facing--</option>
                <option value="North">North</option>
                <option value="South">South</option>
                <option value="East">East</option>
                <option value="West">West</option>
              </select>
            </div>
          </div>

          {/* Row 4 */}
          <div style={styles.row}>
            <div style={styles.col}>
              <input
                type="number"
                name="price"
                placeholder="Price(in INR)"
                value={formData.price}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={{ ...styles.col, display: 'flex', alignItems: 'center' }}>
              <label style={styles.checkboxLabel}>
                Negotiable
                <input
                  type="checkbox"
                  name="isNegotiable"
                  checked={formData.isNegotiable}
                  onChange={handleChange}
                  style={styles.checkboxInline}
                />
              </label>
            </div>
          </div>

          {/* Row 5 */}
          <div style={styles.rowGrid3}>
            <div>
              <input
                type="text"
                name="plotArea"
                placeholder="Plot Area"
                value={formData.plotArea}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div>
              <select
                name="areaUnit"
                value={formData.areaUnit}
                onChange={handleChange}
                style={styles.select}
              >
                <option value="">--Select Area Unit--</option>
                <option value="Sq. Ft.">Sq. Ft.</option>
                <option value="Sq. Yd.">Sq. Yd.</option>
                <option value="Katha">Katha</option>
              </select>
            </div>
            <div>
              <input
                type="text"
                name="totalPrice"
                placeholder="Total Price"
                value={formData.totalPrice}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
          </div>

          {/* Row 6 */}
          <div style={styles.rowGrid3}>
            <div>
              <input
                type="text"
                name="builtUpArea"
                placeholder="Built Up Area"
                value={formData.builtUpArea}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div>
              <input
                type="text"
                name="carpetArea"
                placeholder="Carpet Area"
                value={formData.carpetArea}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div>
              <select
                name="noOfBedrooms"
                value={formData.noOfBedrooms}
                onChange={handleChange}
                style={styles.select}
              >
                <option value="">--No Of Bed Room--</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4+">4+</option>
              </select>
            </div>
          </div>

          {/* Row 7 */}
          <div style={styles.rowGrid3}>
            <div>
              <select
                name="noOfBathrooms"
                value={formData.noOfBathrooms}
                onChange={handleChange}
                style={styles.select}
              >
                <option value="">--No Of Bath Room--</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            <div>
              <select
                name="noOfBalcony"
                value={formData.noOfBalcony}
                onChange={handleChange}
                style={styles.select}
              >
                <option value="">--No Of Balcony--</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            <div>
              <select
                name="furnishedType"
                value={formData.furnishedType}
                onChange={handleChange}
                style={styles.select}
              >
                <option value="">--Furnished Type--</option>
                <option value="Furnished">Furnished</option>
                <option value="Semi-Furnished">Semi-Furnished</option>
                <option value="Unfurnished">Unfurnished</option>
              </select>
            </div>
          </div>

          {/* Row 8 */}
          <div style={styles.rowGrid3}>
            <div>
              <select
                name="totalFloors"
                value={formData.totalFloors}
                onChange={handleChange}
                style={styles.select}
              >
                <option value="">--Total Number Of Floor--</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            <div>
              <select
                name="typeOfFlooring"
                value={formData.typeOfFlooring}
                onChange={handleChange}
                style={styles.select}
              >
                <option value="">--Type Of Flooring--</option>
                <option value="Marble">Marble</option>
                <option value="Vitrified Tiles">Vitrified Tiles</option>
                <option value="Wooden">Wooden</option>
              </select>
            </div>
            <div></div>
          </div>

          {/* Checkbox Grid - Row 1 */}
          <div style={styles.checkboxGrid}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="servantRoom"
                checked={formData.servantRoom}
                onChange={handleChange}
                style={styles.checkbox}
              />
              Servant Room
            </label>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="pujaRoom"
                checked={formData.pujaRoom}
                onChange={handleChange}
                style={styles.checkbox}
              />
              Puja Room
            </label>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="studyRoom"
                checked={formData.studyRoom}
                onChange={handleChange}
                style={styles.checkbox}
              />
              Study Room
            </label>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="storeRoom"
                checked={formData.storeRoom}
                onChange={handleChange}
                style={styles.checkbox}
              />
              Store Room
            </label>
          </div>

          {/* Checkbox Grid - Row 2 */}
          <div style={styles.checkboxGrid}>
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

          {/* Submit Button */}
          <div style={{ marginTop: '30px' }}>
            <button type="submit" style={styles.nextButton}>
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    padding: '30px 20px',
    fontFamily: 'Arial, sans-serif',
  },
  stepperContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '850px',
    margin: '0 auto 25px auto',
  },
  stepWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  stepCircle: {
    width: '32px',
    height: '32px',
    borderRadius: '4px',
    backgroundColor: '#0f52ba',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '14px',
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
    margin: '0 10px',
    marginBottom: '16px',
  },
  card: {
    backgroundColor: '#ffffff',
    maxWidth: '920px',
    margin: '0 auto',
    borderRadius: '4px',
    padding: '40px 50px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
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
    marginBottom: '35px',
  },
  row: {
    display: 'flex',
    gap: '25px',
    marginBottom: '28px',
  },
  col: {
    flex: 1,
  },
  rowGrid3: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '25px',
    marginBottom: '28px',
  },
  input: {
    width: '100%',
    border: 'none',
    borderBottom: '1px solid #ced4da',
    padding: '8px 0',
    fontSize: '14px',
    color: '#495057',
    outline: 'none',
  },
  select: {
    width: '100%',
    border: 'none',
    borderBottom: '1px solid #ced4da',
    padding: '8px 0',
    fontSize: '14px',
    color: '#6c757d',
    backgroundColor: 'transparent',
    outline: 'none',
  },
  checkboxGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '15px',
    marginBottom: '18px',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    color: '#333',
    cursor: 'pointer',
  },
  checkbox: {
    marginRight: '8px',
    cursor: 'pointer',
  },
  checkboxInline: {
    marginLeft: '8px',
    cursor: 'pointer',
  },
  nextButton: {
    backgroundColor: '#82c91e',
    color: '#ffffff',
    border: 'none',
    padding: '10px 45px',
    borderRadius: '3px',
    fontSize: '15px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

export default IndpHVBasicDetails;