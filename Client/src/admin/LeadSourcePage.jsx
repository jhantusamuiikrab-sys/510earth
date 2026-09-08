import React, { useState } from 'react';

const LeadSourcePage = () => {
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
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    if (serverError) setServerError('');
    if (successMessage) setSuccessMessage('');
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Lead source name is required';
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
      const payload = {
        name: formData.name.trim(),
        isActive: formData.status === 'Active',
      };

      const response = await fetch(`${API_URL}/lead-sources`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create lead source');
      }

      setSuccessMessage(data.message || 'Lead source created successfully!');
      setFormData({ name: '', status: 'Active' });
    } catch (error) {
      setServerError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.pageContainer}>
      {/* Top Navigation / Breadcrumb Header */}
      <div style={styles.header}>
        <button 
          onClick={() => window.history.back()} 
          style={styles.backButton}
        >
          ← Back to Lead Sources
        </button>
        <h1 style={styles.pageTitle}>Add New Lead Source</h1>
        <p style={styles.pageSubtitle}>
          Create a new entry point to track incoming customer inquiries.
        </p>
      </div>

      {/* Main Form Box */}
      <div style={styles.card}>
        {successMessage && <div style={styles.successAlert}>{successMessage}</div>}
        {serverError && <div style={styles.serverError}>{serverError}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="name">
              Lead Source Name <span style={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Website Form, Referral, Facebook Ads"
              disabled={loading}
              style={{
                ...styles.input,
                borderColor: errors.name ? '#e53e3e' : '#cbd5e1',
              }}
            />
            {errors.name && <span style={styles.errorText}>{errors.name}</span>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="status">
              Initial Status
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
            <button
              type="button"
              onClick={() => window.history.back()}
              disabled={loading}
              style={{ ...styles.button, ...styles.cancelButton }}
            >
              Cancel
            </button>
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
    </div>
  );
};

const styles = {
  pageContainer: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '32px 16px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  header: {
    marginBottom: '24px',
  },
  backButton: {
    background: 'none',
    border: 'none',
    color: '#0070f3',
    fontWeight: '600',
    fontSize: '14px',
    cursor: 'pointer',
    padding: 0,
    marginBottom: '12px',
  },
  pageTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#0f172a',
    margin: 0,
  },
  pageSubtitle: {
    fontSize: '14px',
    color: '#64748b',
    margin: '6px 0 0 0',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '32px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    border: '1px solid #e2e8f0',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#334155',
  },
  required: {
    color: '#e53e3e',
  },
  input: {
    padding: '12px',
    fontSize: '14px',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    outline: 'none',
  },
  select: {
    padding: '12px',
    fontSize: '14px',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    outline: 'none',
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: '12px',
    color: '#e53e3e',
  },
  serverError: {
    marginBottom: '20px',
    padding: '12px',
    borderRadius: '6px',
    backgroundColor: '#fef2f2',
    color: '#991b1b',
    fontSize: '14px',
  },
  successAlert: {
    marginBottom: '20px',
    padding: '12px',
    borderRadius: '6px',
    backgroundColor: '#f0fdf4',
    color: '#166534',
    fontSize: '14px',
    fontWeight: '600',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '12px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: '600',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
  },
  cancelButton: {
    backgroundColor: '#f1f5f9',
    color: '#475569',
  },
  submitButton: {
    backgroundColor: '#0070f3',
    color: '#ffffff',
  },
};

export default LeadSourcePage;