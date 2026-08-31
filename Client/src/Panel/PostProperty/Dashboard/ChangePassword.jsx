import React, { useState } from 'react';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validation checks
  const hasLowercase = /[a-z]/.test(formData.newPassword);
  const hasUppercase = /[A-Z]/.test(formData.newPassword);
  const hasNumber = /[0-9]/.test(formData.newPassword);
  const hasMinLength = formData.newPassword.length >= 8;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert('New Password and Confirm Password do not match!');
      return;
    }
    if (!hasLowercase || !hasUppercase || !hasNumber || !hasMinLength) {
      alert('Password does not meet the required criteria.');
      return;
    }
    console.log('Password Reset Submitted:', formData);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>

      {/* Main Content Container */}
      <main style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px', color: '#222' }}>
          Change Password
        </h1>

        <div
          style={{
            backgroundColor: '#f4f4f4',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            padding: '30px',
          }}
        >
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginTop: 0, marginBottom: '25px', color: '#333' }}>
            Reset Password
          </h2>

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', gap: '40px', marginBottom: '25px' }}>
              {/* Form Input Fields */}
              <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', alignItems: 'center' }}>
                  <label style={{ fontSize: '14px', color: '#333' }}>Enter Old Password</label>
                  <input
                    type="password"
                    name="oldPassword"
                    placeholder="Old password"
                    value={formData.oldPassword}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', alignItems: 'center' }}>
                  <label style={{ fontSize: '14px', color: '#333' }}>Enter New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="Enter new Password"
                    value={formData.newPassword}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', alignItems: 'center' }}>
                  <label style={{ fontSize: '14px', color: '#333' }}>Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Validation Rules Card */}
              <div
                style={{
                  flex: '1',
                  backgroundColor: '#eaeaea',
                  padding: '20px 25px',
                  borderRadius: '4px',
                }}
              >
                <h3 style={{ margin: '0 0 15px 0', fontSize: '20px', fontWeight: 'bold', color: '#222' }}>
                  Password must contain the following:
                </h3>
                <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <li style={{ color: hasLowercase ? 'green' : 'red', fontWeight: 'bold', fontSize: '14px' }}>
                    {hasLowercase ? '✓' : '✕'} A <span style={{ color: 'red' }}>lowercase</span> letter
                  </li>
                  <li style={{ color: hasUppercase ? 'green' : 'red', fontWeight: 'bold', fontSize: '14px' }}>
                    {hasUppercase ? '✓' : '✕'} A <span style={{ color: 'red' }}>capital (uppercase)</span> letter
                  </li>
                  <li style={{ color: hasNumber ? 'green' : 'red', fontWeight: 'bold', fontSize: '14px' }}>
                    {hasNumber ? '✓' : '✕'} A <span style={{ color: 'red' }}>number</span>
                  </li>
                  <li style={{ color: hasMinLength ? 'green' : 'red', fontWeight: 'bold', fontSize: '14px' }}>
                    {hasMinLength ? '✓' : '✕'} Minimum <span style={{ color: 'red' }}>8 characters</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Reset Button */}
            <button
              type="submit"
              style={{
                width: '100%',
                backgroundColor: '#4caf50',
                color: '#fff',
                padding: '12px',
                border: 'none',
                borderRadius: '4px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              Reset Password
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

const inputStyle = {
  padding: '10px 12px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  fontSize: '14px',
  width: '100%',
  boxSizing: 'border-box',
  outline: 'none',
  backgroundColor: '#fff',
};

export default ChangePassword;