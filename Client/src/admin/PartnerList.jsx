import React, { useState, useEffect } from 'react';
import styles from '../assets/Content/PartnerList.module.css';

const PartnerList = () => {
  const [partners, setPartners] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal & Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPartnerId, setEditingPartnerId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNo: '',
    alternateNo: '',
    address: '',
    stateName: '',
    cityName: '',
    businessType: '',
    size: '',
    userId: '',
    password: '',
    panNumber: '',
    adharNumber: '',
  });

  const API_BASE_URL = 'http://localhost:3000/api';

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/partners`);
      const data = await response.json();

      if (response.ok && data.success) {
        setPartners(data.data);
      } else {
        setError(data.message || 'Failed to fetch partners');
      }
    } catch (err) {
      console.error('Error fetching partners:', err);
      setError('Unable to connect to server.');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = (id) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this partner?')) {
      try {
        const response = await fetch(`${API_BASE_URL}/partners/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setPartners((prev) => prev.filter((p) => p._id !== id));
        } else {
          alert('Failed to delete partner.');
        }
      } catch (error) {
        console.error('Failed to delete partner:', error);
      }
    }
  };

  // Open Modal and populates partner details
  const handleDetail = (partner) => {
    setEditingPartnerId(partner._id);
    setFormData({
      name: partner.name || '',
      email: partner.email || '',
      contactNo: partner.contactNo || '',
      alternateNo: partner.alternateNo || '',
      address: partner.address || '',
      stateName: partner.stateName || '',
      cityName: partner.cityName || '',
      businessType: partner.businessType || '',
      size: partner.size || '',
      userId: partner.userId || '',
      password: partner.password || '',
      panNumber: partner.panNumber || '',
      adharNumber: partner.adharNumber || '',
    });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdatePartner = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/partners/${editingPartnerId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert('Partner updated successfully!');
        // Refresh local list state
        setPartners((prev) =>
          prev.map((p) => (p._id === editingPartnerId ? { ...p, ...formData } : p))
        );
        setIsModalOpen(false);
      } else {
        alert(data.message || 'Failed to update partner');
      }
    } catch (err) {
      console.error('Error updating partner:', err);
      alert('Error connecting to server.');
    }
  };

  const filteredPartners = partners.filter(
    (p) =>
      p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Registered Partners</h1>
        <div className={styles.searchBox}>
          <svg className={styles.searchIcon} width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Partner Name</th>
                <th>Email Address</th>
                <th>Contact No.</th>
                <th>Password</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '24px' }}>
                    Loading partners...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '24px', color: '#ef4444' }}>
                    {error}
                  </td>
                </tr>
              ) : filteredPartners.length > 0 ? (
                filteredPartners.map((partner) => (
                  <tr key={partner._id}>
                    <td data-label="Partner Name">
                      <strong>{partner.name}</strong>
                    </td>
                    <td data-label="Email Address">{partner.email}</td>
                    <td data-label="Contact No.">{partner.contactNo}</td>
                    <td data-label="Password">
                      <div className={styles.passwordCell}>
                        <span>
                          {visiblePasswords[partner._id]
                            ? partner.password
                            : '••••••••'}
                        </span>
                        <button
                          type="button"
                          className={styles.eyeButton}
                          onClick={() => togglePasswordVisibility(partner._id)}
                          title="Toggle Password"
                        >
                          <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td data-label="Actions">
                      <div className={styles.actionGroup}>
                        <button
                          className={`${styles.iconBtn} ${styles.detailBtn}`}
                          onClick={() => handleDetail(partner)}
                          title="View Details / Edit"
                        >
                          <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                          </svg>
                        </button>
                        <button
                          className={`${styles.iconBtn} ${styles.deleteBtn}`}
                          onClick={() => handleDelete(partner._id)}
                          title="Delete Partner"
                        >
                          <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '24px' }}>
                    No partners found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Partner Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Partner Details & Edit</h2>
              <button
                className={styles.closeBtn}
                onClick={() => setIsModalOpen(false)}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleUpdatePartner} className={styles.modalForm}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Contact No.</label>
                  <input
                    type="text"
                    name="contactNo"
                    value={formData.contactNo}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Alternate No.</label>
                  <input
                    type="text"
                    name="alternateNo"
                    value={formData.alternateNo}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroupFull}>
                  <label className={styles.label}>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>State</label>
                  <input
                    type="text"
                    name="stateName"
                    value={formData.stateName}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>City</label>
                  <input
                    type="text"
                    name="cityName"
                    value={formData.cityName}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Business Type</label>
                  <input
                    type="text"
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Size</label>
                  <input
                    type="text"
                    name="size"
                    value={formData.size}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>User ID</label>
                  <input
                    type="text"
                    name="userId"
                    value={formData.userId}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Password</label>
                  <input
                    type="text"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>PAN Number</label>
                  <input
                    type="text"
                    name="panNumber"
                    value={formData.panNumber}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Aadhaar Number</label>
                  <input
                    type="text"
                    name="adharNumber"
                    value={formData.adharNumber}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.saveBtn}>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartnerList;