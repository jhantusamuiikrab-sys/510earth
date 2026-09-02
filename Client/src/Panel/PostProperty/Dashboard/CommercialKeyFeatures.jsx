import React, { useState } from 'react';

const CommercialKeyFeatures = ({ onNextStep, onPrevStep, initialData }) => {
  const [formData, setFormData] = useState({
    superBuiltUpArea: initialData?.superBuiltUpArea || '',
    builtUpArea: initialData?.builtUpArea || '',
    carpetArea: initialData?.carpetArea || '',
    pricePerSqFt: initialData?.pricePerSqFt || '',
    totalPrice: initialData?.totalPrice || '',
    block: initialData?.block || '',
    entranceWidth: initialData?.entranceWidth || '',
    ceilingHeight: initialData?.ceilingHeight || '',
    typeOfFlooring: initialData?.typeOfFlooring || '',
    openParking: initialData?.openParking || false,
    coveredParking: initialData?.coveredParking || false,
    mechanicalParking: initialData?.mechanicalParking || false,
    caption: initialData?.caption || '',
    overview: initialData?.overview || '',
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
        Key Features
      </p>

      <form onSubmit={handleSubmit}>
        <div style={gridThreeColumnStyle}>
          <input type="text" name="superBuiltUpArea" placeholder="Super Built Up Area" value={formData.superBuiltUpArea} onChange={handleChange} style={inputStyle} />
          <input type="text" name="builtUpArea" placeholder="Built Up Area" value={formData.builtUpArea} onChange={handleChange} style={inputStyle} />
          <input type="text" name="carpetArea" placeholder="Carpet Area" value={formData.carpetArea} onChange={handleChange} style={inputStyle} />
        </div>

        <div style={gridThreeColumnStyle}>
          <input type="text" name="pricePerSqFt" placeholder="Price Per Sq ft" value={formData.pricePerSqFt} onChange={handleChange} style={inputStyle} />
          <input type="text" name="totalPrice" placeholder="Total Price" value={formData.totalPrice} onChange={handleChange} style={{ ...inputStyle, backgroundColor: '#f0f0f0' }} />
          <input type="text" name="block" placeholder="Block" value={formData.block} onChange={handleChange} style={inputStyle} />
        </div>

        <div style={{ ...gridThreeColumnStyle, marginBottom: '20px' }}>
          <input type="text" name="entranceWidth" placeholder="Entrance Width" value={formData.entranceWidth} onChange={handleChange} style={inputStyle} />
          <input type="text" name="ceilingHeight" placeholder="Ceiling Height" value={formData.ceilingHeight} onChange={handleChange} style={inputStyle} />
          <select name="typeOfFlooring" value={formData.typeOfFlooring} onChange={handleChange} style={inputStyle}>
            <option value="">--Type Of Flooring--</option>
            <option value="Marble">Marble</option>
            <option value="Tiles">Tiles</option>
            <option value="Bare Shell">Bare Shell</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '30px', margin: '20px 0 25px 0' }}>
          <label style={checkboxLabelStyle}>
            <input type="checkbox" name="openParking" checked={formData.openParking} onChange={handleChange} />
            Open Parking
          </label>
          <label style={checkboxLabelStyle}>
            <input type="checkbox" name="coveredParking" checked={formData.coveredParking} onChange={handleChange} />
            Covered Parking
          </label>
          <label style={checkboxLabelStyle}>
            <input type="checkbox" name="mechanicalParking" checked={formData.mechanicalParking} onChange={handleChange} />
            Mechanical Parking
          </label>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <input type="text" name="caption" placeholder="Enter Caption" value={formData.caption} onChange={handleChange} style={inputStyle} />
        </div>

        <div style={{ marginBottom: '25px' }}>
          <div style={editorToolbarStyle}>
            <button type="button" style={editorBtnStyle}>↩</button>
            <button type="button" style={editorBtnStyle}>↪</button>
            <button type="button" style={{ ...editorBtnStyle, fontWeight: 'bold' }}>B</button>
            <button type="button" style={{ ...editorBtnStyle, fontStyle: 'italic' }}>I</button>
            <button type="button" style={{ ...editorBtnStyle, textDecoration: 'underline' }}>U</button>
          </div>
          <textarea
            name="overview"
            placeholder="Enter Property Overview"
            value={formData.overview}
            onChange={handleChange}
            rows={5}
            style={textareaStyle}
          />
        </div>

        <div style={{ display: 'flex', gap: '15px' }}>
          <button type="button" onClick={onPrevStep} style={actionBtnStyle}>
            Previous
          </button>
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

const gridThreeColumnStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gap: '20px',
  marginBottom: '15px',
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
};

const textareaStyle = {
  width: '100%',
  border: '1px solid #ccc',
  borderTop: 'none',
  padding: '12px',
  fontSize: '13px',
  boxSizing: 'border-box',
  outline: 'none',
};

const checkboxLabelStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '13px',
  color: '#333',
  cursor: 'pointer',
};

const editorToolbarStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '8px 12px',
  backgroundColor: '#f5f5f5',
  border: '1px solid #ccc',
};

const editorBtnStyle = {
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  fontSize: '14px',
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

export default CommercialKeyFeatures;