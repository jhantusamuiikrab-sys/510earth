import React, { useState } from 'react';

const CommercialBasicDetails = ({ onNextStep, initialData }) => {
  const [formData, setFormData] = useState({
    propertyType: initialData?.propertyType || '',
    state: initialData?.state || '',
    city: initialData?.city || '',
    propertyName: initialData?.propertyName || '',
    googleMapLocation: initialData?.googleMapLocation || '',
    projectFacing: initialData?.projectFacing || '',
    projectStatus: initialData?.projectStatus || '',
    price: initialData?.price || '',
    negotiable: initialData?.negotiable || false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNextStep(formData);
  };

  return (
    <div style={cardStyle}>
      <h2 style={{ textAlign: 'center', color: '#1565c0', fontSize: '18px', fontWeight: 'bold', margin: '0 0 5px 0' }}>
        COMMERCIAL PROPERTY
      </h2>
      <p style={{ textAlign: 'center', color: '#666', fontSize: '13px', marginTop: 0, marginBottom: '25px' }}>
        Basic Details
      </p>

      <form onSubmit={handleSubmit}>
        <div style={gridTwoColumnStyle}>
          <select name="propertyType" value={formData.propertyType} onChange={handleChange} style={inputStyle} required>
            <option value="">--Select Property Type--</option>
            <option value="Office">Office</option>
            <option value="Retail">Retail</option>
            <option value="Industrial">Industrial</option>
          </select>

          <select name="state" value={formData.state} onChange={handleChange} style={inputStyle} required>
            <option value="">--Select State--</option>
            <option value="West Bengal">West Bengal</option>
          </select>

          <select name="city" value={formData.city} onChange={handleChange} style={inputStyle} required>
            <option value="">--Select City--</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Howrah">Howrah</option>
          </select>

          <input type="text" name="propertyName" placeholder="Property Name" value={formData.propertyName} onChange={handleChange} style={inputStyle} required />

          <input type="text" name="googleMapLocation" placeholder="Google Map Location" value={formData.googleMapLocation} onChange={handleChange} style={inputStyle} />

          <select name="projectFacing" value={formData.projectFacing} onChange={handleChange} style={inputStyle}>
            <option value="">--Select Project Facing--</option>
            <option value="East">East</option>
            <option value="West">West</option>
            <option value="North">North</option>
            <option value="South">South</option>
          </select>

          <select name="projectStatus" value={formData.projectStatus} onChange={handleChange} style={inputStyle}>
            <option value="">--Select Project Status--</option>
            <option value="Ready to Move">Ready to Move</option>
            <option value="Under Construction">Under Construction</option>
          </select>

          <div style={{ gridColumn: 'span 2', display: 'flex', gap: '20px', alignItems: 'center' }}>
            <input type="text" name="price" placeholder="Price(in INR)" value={formData.price} onChange={handleChange} style={{ ...inputStyle, flex: 1 }} />
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
              Negotiable <input type="checkbox" name="negotiable" checked={formData.negotiable} onChange={handleChange} />
            </label>
          </div>
        </div>

        <div style={{ marginTop: '25px' }}>
          <button type="submit" style={actionBtnStyle}>
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

const cardStyle = {
  backgroundColor: '#fff',
  borderRadius: '4px',
  padding: '30px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  border: '1px solid #e8e8e8',
};

const gridTwoColumnStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '20px',
};

const inputStyle = {
  width: '100%',
  padding: '8px 0',
  border: 'none',
  borderBottom: '1px solid #ccc',
  fontSize: '13px',
  outline: 'none',
  boxSizing: 'border-box',
  backgroundColor: 'transparent',
  color: '#333',
};

const actionBtnStyle = {
  backgroundColor: '#8bc34a',
  color: '#fff',
  border: 'none',
  padding: '10px 35px',
  borderRadius: '4px',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontSize: '14px',
};

export default CommercialBasicDetails;