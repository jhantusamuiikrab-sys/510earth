import React, { useState, useEffect } from 'react';
import { Plus, Power, ChevronDown, Check } from 'lucide-react';
import styles from '../assets/Content/Campaign.module.css';

// Base API URL matching your express router
const API_BASE_URL = 'http://localhost:3000/api/campaigns';

// export default function Campaign() {
//   const [campaigns, setCampaigns] = useState([]);
//   const [propertyTypes, setPropertyTypes] = useState([]);
//   const [propertyNames, setPropertyNames] = useState([]);
  
//   const [loading, setLoading] = useState(true);
//   const [loadingTypes, setLoadingTypes] = useState(false);
//   const [loadingNames, setLoadingNames] = useState(false);
//   const [error, setError] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Form State
//   const [formData, setFormData] = useState({
//     addId: '',
//     formId: '',
//     campaignName: '',
//     propertyType: '',
//     propertyName: '',
//   });

//   // Fetch campaigns and property types on mount
//   useEffect(() => {
//     fetchCampaigns();
//     fetchPropertyTypes();
//   }, []);

export default function Campaign() {
  // 1. Initialize states with mock data directly
  const [campaigns, setCampaigns] = useState([
    {
      id: '1',
      addId: 'AD-99203',
      campaignName: 'Summer Residential Promo',
      formId: 'FORM-8812',
      propertyType: 'Residential',
      propertyName: 'Green Valley Apartments',
      setupOn: '2026-09-10',
      status: 'Active'
    },
    {
      id: '2',
      addId: 'AD-44102',
      campaignName: 'Commercial Hub Launch',
      formId: 'FORM-1029',
      propertyType: 'Commercial',
      propertyName: '510 Earth Tower',
      setupOn: '2026-09-12',
      status: 'Inactive'
    }
  ]);

  const [propertyTypes, setPropertyTypes] = useState(['Residential', 'Commercial', 'Industrial', 'Plot']);
  const [propertyNames, setPropertyNames] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [loadingTypes, setLoadingTypes] = useState(false);
  const [loadingNames, setLoadingNames] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    addId: '',
    formId: '',
    campaignName: '',
    propertyType: '',
    propertyName: '',
  });

  // 2. Mock dependent dropdown selection without API calls
  useEffect(() => {
    if (formData.propertyType === 'Residential') {
      setPropertyNames(['Green Valley Apartments', 'Skyline Residency', 'Palm Heights']);
    } else if (formData.propertyType === 'Commercial') {
      setPropertyNames(['510 Earth Tower', 'Central Business Hub', 'Metro Plaza']);
    } else if (formData.propertyType) {
      setPropertyNames(['Sample Property A', 'Sample Property B']);
    } else {
      setPropertyNames([]);
    }
  }, [formData.propertyType]);

  // Fetch Property Names whenever propertyType changes
  useEffect(() => {
    if (formData.propertyType) {
      fetchPropertyNames(formData.propertyType);
    } else {
      setPropertyNames([]);
    }
  }, [formData.propertyType]);

  // GET API Request: Fetch Campaigns
  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(API_BASE_URL);
      if (!response.ok) throw new Error('Failed to fetch campaigns from server');
      const data = await response.json();
      setCampaigns(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // GET API Request: Fetch Property Types for dropdown
  const fetchPropertyTypes = async () => {
    try {
      setLoadingTypes(true);
      // Calls CampaignRouter.get('/properties/types')
      const response = await fetch(`${API_BASE_URL}/properties/types`);
      if (!response.ok) throw new Error('Failed to fetch property types');
      const data = await response.json();
      setPropertyTypes(data);
    } catch (err) {
      console.error('Error fetching property types:', err);
    } finally {
      setLoadingTypes(false);
    }
  };

  // GET API Request: Fetch Property Names filtered by Property Type
 const fetchPropertyNames = async (type) => {
  try {
    setLoadingNames(true);
    // Updated endpoint to match Express router path '/properties/names'
    const response = await fetch(`${API_BASE_URL}/properties/names?type=${encodeURIComponent(type)}`);
    if (!response.ok) throw new Error('Failed to fetch property names');
    const data = await response.json();
    setPropertyNames(data);
  } catch (err) {
    console.error('Error fetching property names:', err);
  } finally {
    setLoadingNames(false);
  }
};

  // Input Handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Reset propertyName when user changes propertyType
    if (name === 'propertyType') {
      setFormData((prev) => ({
        ...prev,
        propertyType: value,
        propertyName: '',
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // POST API Request
  // const handleAddSetup = async (e) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);

  //   try {
  //     const response = await fetch(`${API_BASE_URL}/create`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     const result = await response.json();

  //     if (!response.ok) {
  //       throw new Error(result.message || 'Failed to save campaign setup');
  //     }

  //     alert('Campaign created successfully!');

  //     // Reload table list & reset form
  //     await fetchCampaigns();
  //     setFormData({
  //       addId: '',
  //       formId: '',
  //       campaignName: '',
  //       propertyType: '',
  //       propertyName: '',
  //     });
  //     setPropertyNames([]);
  //   } catch (err) {
  //     alert(err.message || 'Something went wrong while saving setup.');
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const handleAddSetup = (e) => {
    e.preventDefault();
    
    const newEntry = {
      id: Date.now().toString(),
      ...formData,
      setupOn: new Date().toISOString().split('T')[0],
      status: 'Active'
    };

    setCampaigns((prev) => [newEntry, ...prev]);
    
    setFormData({
      addId: '',
      formId: '',
      campaignName: '',
      propertyType: '',
      propertyName: '',
    });
    setPropertyNames([]);
    alert('Mock campaign added to table UI!');
  };

  return (
    <div className={styles.campaignContainer}>
      {/* PAGE HEADER */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>All Facebook Lead Campaigns</h1>
          <p className={styles.pageSubtitle}>
            Configure and manage your property lead integration forms
          </p>
        </div>
      </div>

      {/* FORM CARD */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.cardIcon}>
            <Plus size={18} />
          </div>
          <div>
            <h2 className={styles.cardTitle}>Add New Lead Setup</h2>
            <p className={styles.cardSubtitle}>
              Link your Facebook Ad & Form IDs to a property
            </p>
          </div>
        </div>

        <form className={styles.formGrid} onSubmit={handleAddSetup}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Add ID</label>
            <input
              type="text"
              name="addId"
              value={formData.addId}
              onChange={handleInputChange}
              placeholder="Please Enter Add ID"
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Form ID</label>
            <input
              type="text"
              name="formId"
              value={formData.formId}
              onChange={handleInputChange}
              placeholder="Please Enter Form ID"
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Campaign Name</label>
            <input
              type="text"
              name="campaignName"
              value={formData.campaignName}
              onChange={handleInputChange}
              placeholder="Please Enter Campaign Name"
              className={styles.input}
              required
            />
          </div>

          {/* PROPERTY TYPE SELECT */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Property Type</label>
            <div className={styles.selectWrapper}>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleInputChange}
                className={styles.select}
                required
              >
                <option value="">
                  {loadingTypes ? 'Loading types...' : 'Select Property Type'}
                </option>
                {propertyTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className={styles.selectIcon} />
            </div>
          </div>

          {/* PROPERTY NAME SELECT (DEPENDS ON PROPERTY TYPE) */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Property Name</label>
            <div className={styles.selectWrapper}>
              <select
                name="propertyName"
                value={formData.propertyName}
                onChange={handleInputChange}
                className={styles.select}
                disabled={!formData.propertyType || loadingNames}
                required
              >
                <option value="">
                  {!formData.propertyType
                    ? 'First select Property Type'
                    : loadingNames
                    ? 'Loading properties...'
                    : 'Select Property Name'}
                </option>
                {propertyNames.map((prop, index) => (
                  <option key={index} value={prop}>
                    {prop}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className={styles.selectIcon} />
            </div>
          </div>

          <div className={styles.submitBtnContainer}>
            <button
              type="submit"
              className={styles.btnAdd}
              disabled={isSubmitting}
            >
              <Check size={16} />
              <span>{isSubmitting ? 'Adding...' : 'Add Setup'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* TABLE / MOBILE CARDS VIEW */}
      <div className={styles.tableCard}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            Loading table data...
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
            Error fetching data: {error}
          </div>
        ) : campaigns.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            No records found
          </div>
        ) : (
          <>
            {/* DESKTOP TABLE */}
            <div className={styles.tableResponsive}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th style={{ width: '60px', textAlign: 'center' }}>#Sr</th>
                    <th>Add ID</th>
                    <th>Campaign Name</th>
                    <th>Form ID</th>
                    <th>Property Type</th>
                    <th>Property Name</th>
                    <th>Setup On</th>
                    <th style={{ textAlign: 'center' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((item, index) => (
                    <tr key={item.id || index}>
                      <td className={styles.tdCenter}>
                        <span className={styles.srBadge}>{index + 1}</span>
                      </td>
                      <td className={styles.fontMono}>{item.addId}</td>
                      <td className={styles.fontWeight600}>
                        {item.campaignName}
                      </td>
                      <td className={styles.fontMono}>{item.formId}</td>
                      <td>
                        <span className={styles.tagBadge}>
                          {item.propertyType}
                        </span>
                      </td>
                      <td>{item.propertyName}</td>
                      <td className={styles.tdDate}>{item.setupOn}</td>
                      <td className={styles.tdCenter}>
                        <button className={styles.btnOff}>
                          <Power size={13} />
                          <span>{item.status}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* MOBILE CARDS */}
            <div className={styles.mobileCards}>
              {campaigns.map((item, index) => (
                <div key={item.id || index} className={styles.mobileCard}>
                  <div className={styles.mobileCardHeader}>
                    <span className={styles.srBadge}>#{index + 1}</span>
                    <span className={styles.tagBadge}>{item.propertyType}</span>
                  </div>

                  <div className={styles.mobileCardBody}>
                    <div className={styles.mobileField}>
                      <span className={styles.mobileLabel}>Campaign Name</span>
                      <span className={styles.mobileValueBold}>
                        {item.campaignName}
                      </span>
                    </div>

                    <div className={styles.mobileGrid2}>
                      <div className={styles.mobileField}>
                        <span className={styles.mobileLabel}>Property</span>
                        <span className={styles.mobileValue}>
                          {item.propertyName}
                        </span>
                      </div>
                      <div className={styles.mobileField}>
                        <span className={styles.mobileLabel}>Setup On</span>
                        <span className={styles.mobileValue}>
                          {item.setupOn}
                        </span>
                      </div>
                    </div>

                    <div className={styles.mobileGrid2}>
                      <div className={styles.mobileField}>
                        <span className={styles.mobileLabel}>Add ID</span>
                        <span className={styles.fontMono}>{item.addId}</span>
                      </div>
                      <div className={styles.mobileField}>
                        <span className={styles.mobileLabel}>Form ID</span>
                        <span className={styles.fontMono}>{item.formId}</span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.mobileCardFooter}>
                    <button className={styles.btnOff}>
                      <Power size={13} />
                      <span>{item.status}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}