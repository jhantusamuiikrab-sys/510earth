import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/Content/ReqMismatchApp.css';

const ReqMismatchApp = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

  const [filters, setFilters] = useState({
    fillDate: '',
    assignDate: '',
    mobileNo: '',
    rmmStatus: ''
  });

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

  useEffect(() => {
    fetchMismatchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMismatchData(filters);
  };

  // Handler to update RMM Status directly from the table row dropdown
  // const handleStatusChange = async (row, newStatus) => {
  //   const leadId = row._id || row.id || row.rmId;

  //   // Optimistically update UI
  //   setTableData((prevData) =>
  //     prevData.map((item) =>
  //       (item._id === row._id || item.id === row.id)
  //         ? { ...item, rmStatusName: newStatus }
  //         : item
  //     )
  //   );

  //   try {
  //     const response = await fetch(`${API_URL}/requirement-mismatch/${leadId}`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ rmStatusName: newStatus }),
  //     });

  //     const result = await response.json();

  //     if (!result.success) {
  //       alert(result.message || 'Failed to update status');
  //       fetchMismatchData(filters); // Revert back on error
  //     }
  //   } catch (err) {
  //     console.error('Error updating status:', err);
  //     alert('Network error while updating status');
  //     fetchMismatchData(filters);
  //   }
  // };

  const handleStatusChange = async (row, newStatus) => {
  // Map status names to IDs matching your backend defaults
  const statusMap = {
    'Pending': 1,
    'Not Possible': 2,
    'Searching': 3,
    'Completed': 4
  };

  const recordId = row._id || row.id || row.rmId || row.leadId;

  if (!recordId) {
    alert("Record ID is missing.");
    return;
  }

  // Optimistic UI Update
  setTableData((prevData) =>
    prevData.map((item) =>
      (item._id === row._id || item.rmId === row.rmId)
        ? { ...item, rmStatusName: newStatus, rmStatusId: statusMap[newStatus] || 1 }
        : item
    )
  );

  try {
    const response = await fetch(`${API_URL}/requirement-mismatch/${recordId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rmStatusName: newStatus,
        rmStatusId: statusMap[newStatus] || 1,
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      alert(result.message || 'Failed to update status');
      fetchMismatchData(filters); // Revert UI back on failure
    }
  } catch (err) {
    console.error('Error updating status:', err);
    alert('Network error while updating status');
    fetchMismatchData(filters); // Revert UI back on failure
  }
};

  const handleViewDetails = (row) => {
    const leadId = row._id || row.id || '1389';
    navigate(`/admin/req-mismatchApp/${leadId}`, { state: { leadData: row } });
  };

  const handleDownloadClick = (row) => {
    const leadId = row._id || row.id || '1388';
    navigate(`/admin/req-mismatchDownload/${leadId}`, { state: { leadData: row } });
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? dateString : date.toLocaleString();
  };

  return (
    <div className="app-container">
      <div className="main-wrapper">
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

        <main className="main-content">
          <div className="page-header">
            <span className="page-kicker">OVERVIEW</span>
            <h1>Req Mismatch App Form</h1>
            <p>Manage and track lead requirement mismatch applications efficiently.</p>
          </div>

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
                  <option value="Not Possible">Not Possible</option>
                  <option value="Searching">Searching</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="form-group button-group">
                <button type="submit" className="btn btn-primary">Search</button>
              </div>
            </form>
          </section>

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
                            {/* Interactive Dropdown matching the requested UI options */}
                            <select
                              value={row.rmStatusName || 'Pending'}
                              onChange={(e) => handleStatusChange(row, e.target.value)}
                              className="rmm-status-dropdown"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Not Possible">Not Possible</option>
                              <option value="Searching">Searching</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </td>
                          <td data-label="Actions">
                            <div className="action-buttons">
                              <button 
                                className="btn btn-sm btn-outline"
                                onClick={() => handleViewDetails(row)}
                              >
                                View
                              </button>
                              <button 
                                className="btn btn-sm btn-secondary"
                                onClick={() => handleDownloadClick(row)}
                              >
                                Download
                              </button>
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