import React, { useState } from 'react';

const CreateLeadSource = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    status: 'Active',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear field-level error
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    // Clear global messages
    if (serverError) setServerError('');
    if (successMessage) setSuccessMessage('');
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Lead source name is required';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    setSuccessMessage('');

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      // Map UI state to backend schema fields
      const payload = {
        name: formData.name.trim(),
        isActive: formData.status === 'Active',
      };

      const response = await fetch(`${API_URL}/lead-sources`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create lead source');
      }

      // Display success message
      setSuccessMessage(data.message || 'Lead source created successfully!');

      // Reset form fields
      setFormData({ name: '', status: 'Active' });

      // Notify parent component if callback prop exists
      if (typeof onSave === 'function') {
        setTimeout(() => {
          onSave(data.data);
        }, 1200);
      }
    } catch (error) {
      setServerError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Create Lead Source</h2>

      {/* Success Alert Banner */}
      {successMessage && <div style={styles.successAlert}>{successMessage}</div>}

      {/* Error Alert Banner */}
      {serverError && <div style={styles.serverError}>{serverError}</div>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="name">
            Source Name <span style={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Website, Referral, LinkedIn"
            disabled={loading}
            style={{
              ...styles.input,
              borderColor: errors.name ? '#e53e3e' : '#ccc',
            }}
          />
          {errors.name && <span style={styles.errorText}>{errors.name}</span>}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="status">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            disabled={loading}
            style={styles.select}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div style={styles.buttonGroup}>
          {typeof onCancel === 'function' && (
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              style={{ ...styles.button, ...styles.cancelButton }}
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              ...styles.submitButton,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Saving...' : 'Save Lead Source'}
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '500px',
    margin: '20px auto',
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    marginTop: 0,
    marginBottom: '20px',
    fontSize: '20px',
    color: '#333333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#4a5568',
  },
  required: {
    color: '#e53e3e',
  },
  input: {
    padding: '10px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    outline: 'none',
  },
  select: {
    padding: '10px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    outline: 'none',
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: '12px',
    color: '#e53e3e',
  },
  serverError: {
    marginBottom: '16px',
    padding: '10px',
    borderRadius: '4px',
    backgroundColor: '#fed7d7',
    color: '#9b2c2c',
    fontSize: '14px',
  },
  successAlert: {
    marginBottom: '16px',
    padding: '10px',
    borderRadius: '4px',
    backgroundColor: '#c6f6d5',
    color: '#22543d',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '12px',
  },
  button: {
    padding: '10px 16px',
    fontSize: '14px',
    fontWeight: 'bold',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
  },
  cancelButton: {
    backgroundColor: '#e2e8f0',
    color: '#4a5568',
  },
  submitButton: {
    backgroundColor: '#3182ce',
    color: '#ffffff',
  },
};

export default CreateLeadSource;