import React, { useState, useEffect } from 'react';
import { HiPencil, HiTrash } from 'react-icons/hi2';

const LeadSourcePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [leadSources, setLeadSources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const limit = 10;

  // Form & Modal States
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', status: 'Active' });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

  useEffect(() => {
    fetchLeadSources(currentPage, searchTerm);
  }, [currentPage]);

  const fetchLeadSources = async (page = 1, search = '') => {
    setLoading(true);
    setError('');
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        search: search.trim(),
      });

      const response = await fetch(`${API_URL}/lead-sources?${queryParams}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Could not load lead sources');
      }

      setLeadSources(data.data || []);

      if (data.pagination) {
        setTotalPages(data.pagination.totalPages || 1);
        setTotalCount(data.pagination.totalCount || 0);
        setCurrentPage(data.pagination.currentPage || 1);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message || 'Could not load lead sources');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchLeadSources(1, searchTerm);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (serverError) setServerError('');
    if (successMessage) setSuccessMessage('');
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Lead source name is required';
    }
    return newErrors;
  };

  const handleOpenCreateModal = () => {
    setEditingId(null);
    setFormData({ name: '', status: 'Active' });
    setFormErrors({});
    setServerError('');
    setSuccessMessage('');
    setShowModal(true);
  };

  const handleOpenEditModal = (source) => {
    setEditingId(source._id || source.id);
    setFormData({
      name: source.name || '',
      status: source.isActive === false ? 'Inactive' : 'Active',
    });
    setFormErrors({});
    setServerError('');
    setSuccessMessage('');
    setShowModal(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    setSuccessMessage('');

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        name: formData.name.trim(),
        isActive: formData.status === 'Active',
      };

      const url = editingId
        ? `${API_URL}/lead-sources/${editingId}`
        : `${API_URL}/lead-sources`;

      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `Failed to ${editingId ? 'update' : 'create'} lead source`);
      }

      setSuccessMessage(data.message || `Lead source ${editingId ? 'updated' : 'created'} successfully!`);
      fetchLeadSources(currentPage, searchTerm);

      setTimeout(() => {
        setShowModal(false);
      }, 1000);
    } catch (err) {
      setServerError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this lead source?')) return;
    try {
      const response = await fetch(`${API_URL}/lead-sources/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Error deleting item');
      }

      fetchLeadSources(currentPage, searchTerm);
    } catch (err) {
      console.error('Delete error:', err);
      alert(err.message || 'Error deleting item');
    }
  };

  return (
    <div style={customStyles.pageContainer}>
      {/* Header Bar */}
      <div style={customStyles.headerRow}>
        <h1 style={customStyles.pageHeading}>Lead Source Elements</h1>
        <button onClick={handleOpenCreateModal} style={customStyles.btnCreate}>
          + Create Lead Source
        </button>
      </div>

      {/* Search Filter Box */}
      <div style={customStyles.card}>
        <span style={customStyles.searchLabel}>Search</span>
        <form onSubmit={handleSearch} style={customStyles.searchForm}>
          <input
            type="text"
            placeholder="Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={customStyles.searchInput}
          />
          <button type="submit" style={customStyles.btnPrimary}>
            Search
          </button>
        </form>
      </div>

      {/* Lead Source Table View */}
      <div style={customStyles.tableCard}>
        <div style={customStyles.tableHeaderBar}>Lead Source Table</div>

        <div style={customStyles.tableWrapper}>
          {loading ? (
            <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>
          ) : error ? (
            <div style={{ padding: '20px', color: '#dc2626' }}>{error}</div>
          ) : (
            <>
              <table style={customStyles.table}>
                <thead>
                  <tr>
                    <th style={customStyles.th}>Name</th>
                    <th style={{ ...customStyles.th, textAlign: 'right', paddingRight: '28px' }}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {leadSources.length > 0 ? (
                    leadSources.map((source) => {
                      const itemId = source._id || source.id;
                      return (
                        <tr key={itemId} style={customStyles.tr}>
                          <td style={customStyles.td}>{source.name}</td>
                          <td style={customStyles.actionTd}>
                            <button
                              onClick={() => handleOpenEditModal(source)}
                              style={customStyles.iconBtn}
                              title="Edit"
                              aria-label="Edit"
                            >
                              <HiPencil size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(itemId)}
                              style={customStyles.iconBtn}
                              title="Delete"
                              aria-label="Delete"
                            >
                              <HiTrash size={18} />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="2" style={{ padding: '20px', textAlign: 'center' }}>
                        No lead sources found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Pagination Controls */}
              {totalPages > 0 && (
                <div style={customStyles.paginationContainer}>
                  <div style={customStyles.paginationInfo}>
                    Showing {leadSources.length > 0 ? (currentPage - 1) * limit + 1 : 0} to{' '}
                    {Math.min(currentPage * limit, totalCount)} of {totalCount} entries
                  </div>

                  <div style={customStyles.paginationControls}>
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      style={{
                        ...customStyles.pageBtn,
                        ...(currentPage === 1 ? customStyles.disabledPageBtn : {}),
                      }}
                    >
                      Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        style={{
                          ...customStyles.pageNumberBtn,
                          ...(currentPage === pageNum ? customStyles.activePageBtn : {}),
                        }}
                      >
                        {pageNum}
                      </button>
                    ))}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      style={{
                        ...customStyles.pageBtn,
                        ...(currentPage === totalPages ? customStyles.disabledPageBtn : {}),
                      }}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Create / Edit Modal Popup */}
      {showModal && (
        <div style={customStyles.modalOverlay}>
          <div style={customStyles.modalCard}>
            <h2 style={customStyles.modalTitle}>
              {editingId ? 'Edit Lead Source' : 'Create Lead Source'}
            </h2>

            {successMessage && <div style={customStyles.successAlert}>{successMessage}</div>}
            {serverError && <div style={customStyles.serverError}>{serverError}</div>}

            <form onSubmit={handleFormSubmit} style={customStyles.form}>
              <div style={customStyles.formGroup}>
                <label style={customStyles.label} htmlFor="name">
                  Source Name <span style={customStyles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="e.g. Website, Referral, LinkedIn"
                  disabled={submitting}
                  style={{
                    ...customStyles.input,
                    borderColor: formErrors.name ? '#e53e3e' : '#ccc',
                  }}
                  autoFocus
                />
                {formErrors.name && <span style={customStyles.errorText}>{formErrors.name}</span>}
              </div>

              <div style={customStyles.formGroup}>
                <label style={customStyles.label} htmlFor="status">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleFormChange}
                  disabled={submitting}
                  style={customStyles.select}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div style={customStyles.buttonGroup}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  disabled={submitting}
                  style={{ ...customStyles.button, ...customStyles.cancelButton }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    ...customStyles.button,
                    ...customStyles.submitButton,
                    opacity: submitting ? 0.7 : 1,
                  }}
                >
                  {submitting ? 'Saving...' : editingId ? 'Update Lead Source' : 'Save Lead Source'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const customStyles = {
  pageContainer: {
    padding: '24px 32px',
    backgroundColor: '#f4f6f9',
    minHeight: '100vh',
    fontFamily: "'Segoe UI', Roboto, sans-serif",
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  pageHeading: {
    fontSize: '28px',
    fontWeight: '400',
    color: '#1f2937',
    margin: 0,
  },
  btnCreate: {
    backgroundColor: '#1b2e4e',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 18px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '4px',
    padding: '20px 24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    border: '1px solid #e5e7eb',
    marginBottom: '24px',
  },
  searchLabel: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#111827',
    display: 'block',
    marginBottom: '12px',
  },
  searchForm: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  },
  searchInput: {
    width: '240px',
    padding: '8px 12px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #d1d5db',
    outline: 'none',
  },
  btnPrimary: {
    backgroundColor: '#1b2e4e',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 20px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  tableCard: {
    backgroundColor: '#ffffff',
    borderRadius: '4px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    border: '1px solid #e5e7eb',
    overflow: 'hidden',
  },
  tableHeaderBar: {
    backgroundColor: '#1b2e4e',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: '600',
    padding: '14px 20px',
  },
  tableWrapper: {
    width: '100%',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#111827',
    padding: '16px 20px',
    borderBottom: '1px solid #f3f4f6',
    textAlign: 'left',
  },
  tr: {
    borderBottom: '1px solid #f3f4f6',
  },
  td: {
    padding: '16px 20px',
    fontSize: '14px',
    color: '#374151',
  },
  actionTd: {
    padding: '16px 20px',
    textAlign: 'right',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
  },
  iconBtn: {
    background: 'transparent',
    border: 'none',
    color: '#6b7280',
    cursor: 'pointer',
    padding: '4px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    borderTop: '1px solid #e5e7eb',
    backgroundColor: '#ffffff',
  },
  paginationInfo: {
    fontSize: '14px',
    color: '#6b7280',
  },
  paginationControls: {
    display: 'flex',
    gap: '6px',
    alignItems: 'center',
  },
  pageBtn: {
    padding: '6px 12px',
    fontSize: '13px',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    backgroundColor: '#ffffff',
    color: '#374151',
    cursor: 'pointer',
  },
  disabledPageBtn: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  pageNumberBtn: {
    padding: '6px 12px',
    fontSize: '13px',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    backgroundColor: '#ffffff',
    color: '#374151',
    cursor: 'pointer',
  },
  activePageBtn: {
    backgroundColor: '#1b2e4e',
    color: '#ffffff',
    borderColor: '#1b2e4e',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalCard: {
    width: '100%',
    maxWidth: '480px',
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    backgroundColor: '#ffffff',
  },
  modalTitle: {
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
    backgroundColor: '#1b2e4e',
    color: '#ffffff',
  },
};

export default LeadSourcePage;