import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Added hook import
import '../assets/Content/ReqMismatchApp.css';

const ReqMismatchApp = () => {
  const navigate = useNavigate(); // 2. Initialized navigate hook
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

  // Filter Form State
  const [filters, setFilters] = useState({
    fillDate: '',
    assignDate: '',
    mobileNo: '',
    rmmStatus: ''
  });

  // 1. Fetch API Data Function
  const fetchMismatchData = async (searchParams = {}) => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams();
      if (searchParams.mobileNo) queryParams.append('mobileNo', searchParams.mobileNo);
      if (searchParams.rmmStatus) queryParams.append('rmmStatus', searchParams.rmmStatus);
      if (searchParams.fillDate) queryParams.append('fillDate', searchParams.fillDate);
      if (searchParams.assignDate) queryParams.append('assignDate', searchParams.assignDate);

      const response = await fetch(`${API_URL}/requirement-mismatch?${queryParams.toString()}`);
      const result = await response.json();

      if (result.success) {
        setTableData(result.data || []);
      } else {
        setError(result.message || "Failed to fetch data.");
      }
    } catch (err) {
      console.error("API Fetch Error:", err);
      setError("Network error. Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  // 2. Initial load
  useEffect(() => {
    fetchMismatchData();
  }, []);

  // 3. Handle Form Filter Inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMismatchData(filters);
  };

  // 4. Navigation Handler
  const handleViewDetails = (row) => {
  const leadId = row._id || row.id || '1389';
  navigate(`/admin/req-mismatchApp/${leadId}`, { state: { leadData: row } });
};

  // Helper to format MongoDB ISO dates to readable local strings
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? dateString : date.toLocaleString();
  };

  return (
    <div className="app-container">
      <div className="main-wrapper">
        {/* Header */}
        <header className="header">
          <button className="mobile-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            ☰
          </button>
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Search leads, phone numbers..." />
          </div>
          <div className="user-profile">
            <div className="avatar">AB</div>
            <div className="user-info">
              <span className="user-name">Abhisek TestDevlp</span>
              <span className="user-role">Agent</span>
            </div>
          </div>
        </header>

        {/* Page Body */}
        <main className="main-content">
          <div className="page-header">
            <span className="page-kicker">OVERVIEW</span>
            <h1>Req Mismatch App Form</h1>
            <p>Manage and track lead requirement mismatch applications efficiently.</p>
          </div>

          {/* Metric Cards */}
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-icon">📑</span>
                <span className="badge badge-success">+12.5%</span>
              </div>
              <div className="metric-value">{tableData.length}</div>
              <div className="metric-label">Total Leads</div>
            </div>
            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-icon">⏳</span>
                <span className="badge badge-warning">Active</span>
              </div>
              <div className="metric-value">
                {tableData.filter((item) => (item.rmStatusName || '').toLowerCase() === 'pending').length}
              </div>
              <div className="metric-label">Pending Reviews</div>
            </div>
            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-icon">✅</span>
                <span className="badge badge-success">+14.4%</span>
              </div>
              <div className="metric-value">
                {tableData.filter((item) => (item.rmStatusName || '').toLowerCase() === 'completed').length}
              </div>
              <div className="metric-label">Resolved Requests</div>
            </div>
          </div>

          {/* Filter Section */}
          <section className="card-panel">
            <h3 className="panel-title">Filter Requirement Mismatch Leads</h3>
            <form onSubmit={handleSearch} className="filter-grid">
              <div className="form-group">
                <label>Req Mismatch Fill Date</label>
                <input 
                  type="date" 
                  name="fillDate" 
                  value={filters.fillDate} 
                  onChange={handleInputChange} 
                  className="form-input" 
                />
              </div>
              <div className="form-group">
                <label>Req Mismatch Assign Date</label>
                <input 
                  type="date" 
                  name="assignDate" 
                  value={filters.assignDate} 
                  onChange={handleInputChange} 
                  className="form-input" 
                />
              </div>
              <div className="form-group">
                <label>Mobile No</label>
                <input 
                  type="text" 
                  name="mobileNo" 
                  value={filters.mobileNo} 
                  onChange={handleInputChange} 
                  className="form-input" 
                  placeholder="Enter mobile number" 
                />
              </div>
              <div className="form-group">
                <label>RMM Status</label>
                <select 
                  name="rmmStatus" 
                  value={filters.rmmStatus} 
                  onChange={handleInputChange} 
                  className="form-input"
                >
                  <option value="">Select Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="form-group button-group">
                <button type="submit" className="btn btn-primary">Search</button>
              </div>
            </form>
          </section>

          {/* Data Table */}
          <section className="card-panel">
            {loading ? (
              <div style={{ textAlign: 'center', padding: '20px' }}>Loading mismatch records...</div>
            ) : error ? (
              <div style={{ color: 'red', textAlign: 'center', padding: '20px' }}>{error}</div>
            ) : (
              <div className="table-responsive">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Created On</th>
                      <th>Assign On</th>
                      <th>Customer Name</th>
                      <th>Phone No</th>
                      <th>Type</th>
                      <th>RMM Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.length > 0 ? (
                      tableData.map((row) => (
                        <tr key={row._id || row.id}>
                          <td data-label="Created On">{formatDate(row.createdAt || row.createdOn)}</td>
                          <td data-label="Assign On">{formatDate(row.assignOn)}</td>
                          <td data-label="Customer Name" className="font-semibold">
                            {row.customerName || row.name || '-'}
                          </td>
                          <td data-label="Phone No">{row.phoneNumber || row.phoneNo || '-'}</td>
                          <td data-label="Type">
                            <span className="chip">{row.type || row.propertyType || '-'}</span>
                          </td>
                          <td data-label="RMM Status">
                            <span className={`status-badge status-${(row.rmStatusName || 'pending').toLowerCase()}`}>
                              {row.rmStatusName || 'Pending'}
                            </span>
                          </td>
                          <td data-label="Actions">
                            <div className="action-buttons">
                              <button 
                                className="btn btn-sm btn-outline"
                                onClick={() => handleViewDetails(row)}
                              >
                                View
                              </button>
                              <button className="btn btn-sm btn-secondary">Download</button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>
                          No records found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </main>
      </div>     
    </div>
  );
};

export default ReqMismatchApp;