import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import styles from '../assets/Content/PartnerList.module.css';

const PartnerList = () => {
  const [partners, setPartners] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State & City
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

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

  // API URLs
  const SERVER_URL =
    import.meta.env.VITE_SERVER_URL ||
    'http://localhost:3000';

  const API_URL =
    import.meta.env.VITE_API_URL ||
    'http://localhost:3000/api';

  const CSC_API = `${API_URL}/csc`;

  // ============================================================
  // FETCH PARTNERS
  // ============================================================

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_URL}/partners`);
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

  // ============================================================
  // EXPORT TO EXCEL
  // ============================================================

  const exportToExcel = () => {
    if (!filteredPartners.length) return;

    // Clean and structure data for export
    const exportData = filteredPartners.map((partner, index) => ({
      'SL NO': index + 1,
      'Partner Name': partner.name || '',
      'Email Address': partner.email || '',
      'Contact No': partner.contactNo || '',
      'Alternate No': partner.alternateNo || '',
      'Address': partner.address || '',
      'State': partner.stateName || '',
      'City': partner.cityName || '',
      'Business Type': partner.businessType || '',
      'Size': partner.size || '',
      'User ID': partner.userId || '',
      'PAN Number': partner.panNumber || '',
      'Aadhaar Number': partner.adharNumber || '',
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Partners');

    // Download file
    XLSX.writeFile(workbook, 'Partner_List.xlsx');
  };

  // ============================================================
  // FETCH STATES
  // ============================================================

  useEffect(() => {
    const fetchStates = async () => {
      try {
        setLoadingStates(true);

        const response = await fetch(`${CSC_API}/states`);
        const result = await response.json();

        if (response.ok && result.success) {
          setStates(Array.isArray(result.data) ? result.data : []);
        } else {
          setStates([]);
        }
      } catch (error) {
        console.error('Error fetching states:', error);
        setStates([]);
      } finally {
        setLoadingStates(false);
      }
    };

    fetchStates();
  }, [CSC_API]);

  // ============================================================
  // HELPER - GET STATE NAME & ID
  // ============================================================

  const getStateName = (state) => {
    if (!state) return '';
    if (typeof state === 'string') return state;
    return (
      state.stateName ||
      state.StateName ||
      state.state_name ||
      state.name ||
      state.Name ||
      state.state ||
      state.State ||
      ''
    );
  };

  const getStateId = (state, index) => {
    if (!state) return index;
    if (typeof state === 'string') return state;
    return (
      state._id ||
      state.id ||
      state.stateId ||
      state.StateId ||
      getStateName(state) ||
      index
    );
  };

  // ============================================================
  // HELPER - GET CITY NAME & ID
  // ============================================================

  const getCityName = (city) => {
    if (!city) return '';
    if (typeof city === 'string') return city;
    return (
      city.cityName ||
      city.CityName ||
      city.city_name ||
      city.name ||
      city.Name ||
      city.city ||
      city.City ||
      ''
    );
  };

  const getCityId = (city, index) => {
    if (!city) return index;
    if (typeof city === 'string') return city;
    return (
      city._id ||
      city.id ||
      city.cityId ||
      city.CityId ||
      getCityName(city) ||
      index
    );
  };

  // ============================================================
  // FETCH CITIES WHEN STATE CHANGES
  // ============================================================

  useEffect(() => {
    if (!formData.stateName) {
      setCities([]);
      return;
    }

    const fetchCities = async () => {
      try {
        setLoadingCities(true);

        const response = await fetch(
          `${CSC_API}/cities?state=${encodeURIComponent(
            formData.stateName
          )}`
        );

        const result = await response.json();

        if (response.ok && result.success) {
          setCities(
            Array.isArray(result.data)
              ? result.data
              : []
          );
        } else {
          setCities([]);
        }
      } catch (error) {
        console.error('Error fetching cities:', error);
        setCities([]);
      } finally {
        setLoadingCities(false);
      }
    };

    fetchCities();
  }, [formData.stateName, CSC_API]);

  // ============================================================
  // PASSWORD VISIBILITY
  // ============================================================

  const togglePasswordVisibility = (id) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // ============================================================
  // DELETE PARTNER
  // ============================================================

  const handleDelete = async (id) => {
    if (
      window.confirm(
        'Are you sure you want to delete this partner?'
      )
    ) {
      try {
        const response = await fetch(
          `${API_URL}/partners/${id}`,
          {
            method: 'DELETE',
          }
        );

        if (response.ok) {
          setPartners((prev) =>
            prev.filter((p) => p._id !== id)
          );
        } else {
          alert('Failed to delete partner.');
        }
      } catch (error) {
        console.error(
          'Failed to delete partner:',
          error
        );
      }
    }
  };

  // ============================================================
  // OPEN EDIT MODAL
  // ============================================================

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

  // ============================================================
  // HANDLE FORM INPUT
  // ============================================================

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      if (name === 'stateName') {
        return {
          ...prevData,
          stateName: value,
          cityName: '',
        };
      }

      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  // ============================================================
  // UPDATE PARTNER
  // ============================================================

  const handleUpdatePartner = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${API_URL}/partners/${editingPartnerId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        alert('Partner updated successfully!');

        setPartners((prev) =>
          prev.map((p) =>
            p._id === editingPartnerId
              ? { ...p, ...formData }
              : p
          )
        );

        setIsModalOpen(false);
      } else {
        alert(
          data.message ||
            'Failed to update partner'
        );
      }
    } catch (err) {
      console.error(
        'Error updating partner:',
        err
      );
      alert('Error connecting to server.');
    }
  };

  // ============================================================
  // SEARCH
  // ============================================================

  const filteredPartners = partners.filter(
    (p) =>
      p.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      p.email
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  // ============================================================
  // JSX
  // ============================================================

  return (
    <div className={styles.container}>

      {/* HEADER WITH DOWNLOAD BUTTON */}
      <div className={styles.header}>
        <h1 className={styles.title}>
          Partner Elements
        </h1>

        <div className={styles.headerRight}>
          <div className={styles.searchBox}>
            <svg
              className={styles.searchIcon}
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>

            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
            />
          </div>

          <button
            className={styles.downloadBtn}
            onClick={exportToExcel}
            title="Download Excel"
          >
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </button>
        </div>
      </div>

      {/* PARTNER TABLE */}
      <div className={styles.tableCard}>
        <div className={styles.tableHeaderBar}>
          <h2 className={styles.tableTitle}>Partner Table</h2>
        </div>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>SL NO</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>CONTACT NUMBER</th>
                <th>STATE</th>
                <th>USER ID</th>
                <th>PASSWORD</th>
                <th style={{ textAlign: 'center' }}>
                  ACTIONS
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="8"
                    style={{
                      textAlign: 'center',
                      padding: '24px',
                    }}
                  >
                    Loading partners...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td
                    colSpan="8"
                    style={{
                      textAlign: 'center',
                      padding: '24px',
                      color: '#ef4444',
                    }}
                  >
                    {error}
                  </td>
                </tr>
              ) : filteredPartners.length > 0 ? (
                filteredPartners.map((partner, index) => (
                  <tr key={partner._id}>
                    <td data-label="SL NO">{index + 1}</td>

                    <td data-label="NAME">
                      <strong>
                        {partner.name}
                      </strong>
                    </td>

                    <td data-label="EMAIL">
                      {partner.email}
                    </td>

                    <td data-label="CONTACT NUMBER">
                      {partner.contactNo}
                    </td>

                    <td data-label="STATE">
                      {partner.stateName}
                    </td>

                    <td data-label="USER ID">
                      {partner.userId}
                    </td>

                    <td data-label="PASSWORD">
                      <div className={styles.passwordCell}>
                        <span>
                          {visiblePasswords[partner._id]
                            ? partner.password
                            : '••••••••'}
                        </span>

                        <button
                          type="button"
                          className={styles.eyeButton}
                          onClick={() =>
                            togglePasswordVisibility(partner._id)
                          }
                          title="Toggle Password"
                        >
                          <svg
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                          </svg>
                        </button>
                      </div>
                    </td>

                    <td data-label="ACTIONS">
                      <div className={styles.actionGroup}>
                        <button
                          className={`${styles.iconBtn} ${styles.detailBtn}`}
                          onClick={() => handleDetail(partner)}
                          title="View Details / Edit"
                        >
                          <svg
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                          </svg>
                        </button>

                        <button
                          className={`${styles.iconBtn} ${styles.deleteBtn}`}
                          onClick={() => handleDelete(partner._id)}
                          title="Delete Partner"
                        >
                          <svg
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                            <path
                              fillRule="evenodd"
                              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    style={{
                      textAlign: 'center',
                      padding: '24px',
                    }}
                  >
                    No partners found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT PARTNER MODAL */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>
                Partner Details & Edit
              </h2>
              <button
                className={styles.closeBtn}
                onClick={() => setIsModalOpen(false)}
              >
                &times;
              </button>
            </div>

            <form
              onSubmit={handleUpdatePartner}
              className={styles.modalForm}
            >
              <div className={styles.formGrid}>

                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Full Name
                  </label>
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
                  <label className={styles.label}>
                    Email Address
                  </label>
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
                  <label className={styles.label}>
                    Contact No.
                  </label>
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
                  <label className={styles.label}>
                    Alternate No.
                  </label>
                  <input
                    type="text"
                    name="alternateNo"
                    value={formData.alternateNo}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroupFull}>
                  <label className={styles.label}>
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    State
                  </label>
                  <select
                    name="stateName"
                    value={formData.stateName}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  >
                    <option value="">
                      {loadingStates
                        ? 'Loading states...'
                        : 'Select State'}
                    </option>
                    {states.map((state, index) => {
                      const stateName = getStateName(state);
                      const stateId = getStateId(state, index);
                      if (!stateName) return null;
                      return (
                        <option key={stateId} value={stateName}>
                          {stateName}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    City
                  </label>
                  <select
                    name="cityName"
                    value={formData.cityName}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                    disabled={!formData.stateName || loadingCities}
                  >
                    <option value="">
                      {loadingCities
                        ? 'Loading cities...'
                        : !formData.stateName
                        ? 'Select State First'
                        : 'Select City'}
                    </option>
                    {cities.map((city, index) => {
                      const cityName = getCityName(city);
                      const cityId = getCityId(city, index);
                      if (!cityName) return null;
                      return (
                        <option key={cityId} value={cityName}>
                          {cityName}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Business Type
                  </label>
                  <input
                    type="text"
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Size
                  </label>
                  <input
                    type="text"
                    name="size"
                    value={formData.size}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    User ID
                  </label>
                  <input
                    type="text"
                    name="userId"
                    value={formData.userId}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Password
                  </label>
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
                  <label className={styles.label}>
                    PAN Number
                  </label>
                  <input
                    type="text"
                    name="panNumber"
                    value={formData.panNumber}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Aadhaar Number
                  </label>
                  <input
                    type="text"
                    name="adharNumber"
                    value={formData.adharNumber}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                </div>

              </div>

              <div className={styles.modalFooter}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={styles.submitBtn}
                >
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