import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/Content/ReqMismatchApp.css';

const ReqMismatchApp = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Notification Modal State
  const [selectedLeadNotifications, setSelectedLeadNotifications] = useState(null);
  const [showNotificationModal, setShowNotificationModal] = useState(false);

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

  const handleStatusChange = async (row, newStatus) => {
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rmStatusName: newStatus,
          rmStatusId: statusMap[newStatus] || 1,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        alert(result.message || 'Failed to update status');
        fetchMismatchData(filters);
      }
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Network error while updating status');
      fetchMismatchData(filters);
    }
  };

  // Open Notification Modal
  const handleNotificationClick = (row) => {
    if (!row.notificationCount || row.notificationCount === 0) {
      alert("No unread notifications for this lead.");
      return;
    }

    setSelectedLeadNotifications(row);
    setShowNotificationModal(true);
  };

  // Close Notification Modal and Mark Read in Backend
  const handleCloseAndMarkRead = async () => {
    if (!selectedLeadNotifications) return;

    const targetId = selectedLeadNotifications.leadId || selectedLeadNotifications.rmId || selectedLeadNotifications._id;

    try {
      // Optimistic UI Update: Clear notification count for this lead immediately
      setTableData((prev) =>
        prev.map((item) =>
          (item._id === selectedLeadNotifications._id || item.rmId === selectedLeadNotifications.rmId)
            ? { ...item, notificationCount: 0, hasNotification: false, unreadComments: [], unreadLinks: [] }
            : item
        )
      );

      // Call Backend API to update ReadingFlag in MongoDB
      await fetch(`${API_URL}/req-mismatchLink/${targetId}/mark-read`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (err) {
      console.error("Error marking notifications as read:", err);
    } finally {
      setShowNotificationModal(false);
      setSelectedLeadNotifications(null);
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
          </div>

          <section className="card-panel">
            <h3 className="panel-title">Filter Requirement Mismatch Leads</h3>
            <form onSubmit={handleSearch} className="filter-grid">
              <div className="form-group">
                <label>Req Mismatch Fill Date</label>
                <input type="date" name="fillDate" value={filters.fillDate} onChange={handleInputChange} className="form-input" />
              </div>
              <div className="form-group">
                <label>Req Mismatch Assign Date</label>
                <input type="date" name="assignDate" value={filters.assignDate} onChange={handleInputChange} className="form-input" />
              </div>
              <div className="form-group">
                <label>Mobile No</label>
                <input type="text" name="mobileNo" value={filters.mobileNo} onChange={handleInputChange} className="form-input" placeholder="Enter mobile number" />
              </div>
              <div className="form-group">
                <label>RMM Status</label>
                <select name="rmmStatus" value={filters.rmmStatus} onChange={handleInputChange} className="form-input">
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
                      <th style={{ textAlign: 'center' }}>Notification</th>
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
                          <td data-label="Notification" style={{ textAlign: 'center' }}>
                            <button
                              type="button"
                              className="notification-bell-btn"
                              title={row.notificationCount > 0 ? `${row.notificationCount} unread updates` : 'No unread notifications'}
                              onClick={() => handleNotificationClick(row)}
                              style={{
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '18px',
                                padding: '4px 8px',
                                borderRadius: '50%',
                                position: 'relative',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              🔔
                              {row.notificationCount > 0 && (
                                <span
                                  style={{
                                    position: 'absolute',
                                    top: '-2px',
                                    right: '-2px',
                                    backgroundColor: '#ff4d4f',
                                    color: '#ffffff',
                                    borderRadius: '50%',
                                    fontSize: '11px',
                                    fontWeight: 'bold',
                                    padding: '2px 5px',
                                    minWidth: '16px',
                                    height: '16px',
                                    lineHeight: '12px',
                                    textAlign: 'center',
                                    boxShadow: '0 0 2px rgba(0,0,0,0.3)'
                                  }}
                                >
                                  {row.notificationCount}
                                </span>
                              )}
                            </button>
                          </td>
                          <td data-label="Actions">
                            <div className="action-buttons">
                              <button className="btn btn-sm btn-outline" onClick={() => handleViewDetails(row)}>
                                View
                              </button>
                              <button className="btn btn-sm btn-secondary" onClick={() => handleDownloadClick(row)}>
                                Download
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" style={{ textAlign: 'center', padding: '20px' }}>
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

      {/* Unread Notifications Popup Modal */}
      {showNotificationModal && selectedLeadNotifications && (
        <div className="rm-modal-overlay">
          <div className="rm-modal-container" style={{ maxWidth: '600px' }}>
            <div className="rm-modal-header">
              <h3>Unread Updates: {selectedLeadNotifications.customerName || 'Customer'}</h3>
              <button className="rm-modal-close" onClick={handleCloseAndMarkRead}>&times;</button>
            </div>
            <div className="rm-modal-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {/* Unread Comments */}
              {selectedLeadNotifications.unreadComments && selectedLeadNotifications.unreadComments.length > 0 && (
                <div style={{ marginBottom: '16px' }}>
                  <h4 style={{ margin: '0 0 8px 0', color: '#1890ff' }}>New Comments</h4>
                  <ul style={{ paddingLeft: '20px', margin: 0 }}>
                    {selectedLeadNotifications.unreadComments.map((c, i) => (
                      <li key={c._id || i} style={{ marginBottom: '6px' }}>
                        {c.commentdescription}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Unread Links */}
              {selectedLeadNotifications.unreadLinks && selectedLeadNotifications.unreadLinks.length > 0 && (
                <div>
                  <h4 style={{ margin: '0 0 8px 0', color: '#52c41a' }}>New Property Links</h4>
                  <ul style={{ paddingLeft: '20px', margin: 0 }}>
                    {selectedLeadNotifications.unreadLinks.map((l, i) => (
                      <li key={l._id || i} style={{ marginBottom: '6px' }}>
                        <a href={l.linkdescription} target="_blank" rel="noopener noreferrer">
                          {l.linkdescription}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="rm-modal-footer">
              <button type="button" className="rm-modal-btn submit" onClick={handleCloseAndMarkRead}>
                Mark as Read & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReqMismatchApp;