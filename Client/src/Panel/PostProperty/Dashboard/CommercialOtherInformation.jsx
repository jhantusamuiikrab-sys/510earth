import React, { useState } from 'react';

export default function CommercialOtherInformation({ onPrevious, onSubmit }) {
  const [formData, setFormData] = useState({
    propertyAddress: '',
    numberOfTowers: '',
    openSpace: '',
    projectSize: '',
    propertyAge: '',
    washRoomType: '',
    washroom: '',
    noOfMeetingRoom: '',
    conferenceRoom: '',
    receptionArea: '',
    noOfCabin: '',
    minNoOfSeat: '',
    maxNoOfSeat: '',
    pantryType: '',
    furnishedType: '',
    totalNoOfFloorInBuilding: '',
    yourFloorNo: '',
    ownership: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <h3 style={styles.title}>COMMERCIAL PROPERTY</h3>
      <p style={styles.subtitle}>Other Information</p>

      {/* Form Form Grid */}
      <form onSubmit={handleSubmit}>
        <div style={styles.grid}>
          {/* Row 1 */}
          <div style={styles.fieldGroup}>
            <input
              type="text"
              name="propertyAddress"
              placeholder="Property Address"
              value={formData.propertyAddress}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.fieldGroup}>
            <input
              type="text"
              name="numberOfTowers"
              placeholder="Number of Towers"
              value={formData.numberOfTowers}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.fieldGroup}>
            <input
              type="text"
              name="openSpace"
              placeholder="Open Space"
              value={formData.openSpace}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          {/* Row 2 */}
          <div style={styles.fieldGroup}>
            <input
              type="text"
              name="projectSize"
              placeholder="Project Size"
              value={formData.projectSize}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.fieldGroup}>
            <select
              name="propertyAge"
              value={formData.propertyAge}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="">--Select Property Age--</option>
              <option value="0-1">0-1 Years</option>
              <option value="1-5">1-5 Years</option>
              <option value="5-10">5-10 Years</option>
              <option value="10+">10+ Years</option>
            </select>
          </div>
          <div style={styles.fieldGroup}>
            <select
              name="washRoomType"
              value={formData.washRoomType}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="">--Select Wash Room Type--</option>
              <option value="private">Private</option>
              <option value="shared">Shared</option>
            </select>
          </div>

          {/* Row 3 */}
          <div style={styles.fieldGroup}>
            <select
              name="washroom"
              value={formData.washroom}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="">--Select Washroom--</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div style={styles.fieldGroup}>
            <select
              name="noOfMeetingRoom"
              value={formData.noOfMeetingRoom}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="">--Select No Of Meeting Room--</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3+">3+</option>
            </select>
          </div>
          <div style={styles.fieldGroup}>
            <select
              name="conferenceRoom"
              value={formData.conferenceRoom}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="">--Select Conference Room--</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          {/* Row 4 */}
          <div style={styles.fieldGroup}>
            <select
              name="receptionArea"
              value={formData.receptionArea}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="">--Select Reception Area--</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div style={styles.fieldGroup}>
            <select
              name="noOfCabin"
              value={formData.noOfCabin}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="">--Select No Of Cabin--</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3+">3+</option>
            </select>
          </div>
          <div style={styles.fieldGroup}>
            <input
              type="text"
              name="minNoOfSeat"
              placeholder="Min No Of Seat"
              value={formData.minNoOfSeat}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          {/* Row 5 */}
          <div style={styles.fieldGroup}>
            <input
              type="text"
              name="maxNoOfSeat"
              placeholder="Max No Of Seat"
              value={formData.maxNoOfSeat}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.fieldGroup}>
            <select
              name="pantryType"
              value={formData.pantryType}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="">--Select Pantry Type--</option>
              <option value="dry">Dry</option>
              <option value="wet">Wet</option>
              <option value="none">None</option>
            </select>
          </div>
          <div style={styles.fieldGroup}>
            <select
              name="furnishedType"
              value={formData.furnishedType}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="">--Select Furnished Type--</option>
              <option value="furnished">Furnished</option>
              <option value="semi-furnished">Semi-Furnished</option>
              <option value="unfurnished">Unfurnished</option>
            </select>
          </div>

          {/* Row 6 */}
          <div style={styles.fieldGroup}>
            <input
              type="text"
              name="totalNoOfFloorInBuilding"
              placeholder="Total No Of Floor in Building"
              value={formData.totalNoOfFloorInBuilding}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.fieldGroup}>
            <input
              type="text"
              name="yourFloorNo"
              placeholder="Your Floor No"
              value={formData.yourFloorNo}
              onChange={handleChange}
              style={styles.input}
            />
          </div>
          <div style={styles.fieldGroup}>
            <select
              name="ownership"
              value={formData.ownership}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="">--Select Ownership--</option>
              <option value="freehold">Freehold</option>
              <option value="leasehold">Leasehold</option>
              <option value="cooperative">Co-operative Society</option>
              <option value="powerOfAttorney">Power of Attorney</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div style={styles.buttonGroup}>
          <button
            type="button"
            onClick={onPrevious}
            style={{ ...styles.button, backgroundColor: '#8cc63f' }}
          >
            Previous
          </button>
          <button
            type="submit"
            style={{ ...styles.button, backgroundColor: '#8cc63f' }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '30px 20px',
    backgroundColor: '#fff',
    fontFamily: 'Segoe UI, Roboto, Helvetica, Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    color: '#1a5b8c',
    marginBottom: '4px',
    fontSize: '18px',
    fontWeight: '600',
    letterSpacing: '0.5px',
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginTop: '0',
    marginBottom: '30px',
    fontSize: '13px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '25px 20px',
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    width: '100%',
    border: 'none',
    borderBottom: '1px solid #ccc',
    padding: '8px 0',
    fontSize: '13px',
    color: '#333',
    outline: 'none',
    boxSizing: 'border-box',
  },
  select: {
    width: '100%',
    border: 'none',
    borderBottom: '1px solid #ccc',
    padding: '8px 0',
    fontSize: '13px',
    color: '#555',
    backgroundColor: 'transparent',
    outline: 'none',
    cursor: 'pointer',
    boxSizing: 'border-box',
  },
  buttonGroup: {
    display: 'flex',
    gap: '15px',
    marginTop: '35px',
  },
  button: {
    color: '#fff',
    border: 'none',
    padding: '8px 24px',
    borderRadius: '4px',
    fontWeight: '600',
    fontSize: '14px',
    cursor: 'pointer',
  },
};