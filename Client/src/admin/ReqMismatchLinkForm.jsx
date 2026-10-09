import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/Content/ReqMismatchLinkForm.css';

const ReqMismatchLinkForm = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    dateRange: '',
    mobileNo: ''
  });

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

  const fetchData = async (searchParams = {}) => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams();
      if (searchParams.mobileNo) queryParams.append('mobileNo', searchParams.mobileNo);
      if (searchParams.dateRange) queryParams.append('fillDate', searchParams.dateRange);

      // Updated to point to your new route
      const response = await fetch(`${API_URL}/req-mismatchLink?${queryParams.toString()}`);
      const result = await response.json();

      if (result.success) {
        setTableData(result.data || []);
      } else {
        setError(result.message || 'Failed to fetch data.');
      }
    } catch (err) {
      console.error('Fetch Error:', err);
      setError('Network error. Unable to fetch records.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchData(filters);
  };

  const handleView = (row) => {
    const leadId = row._id || row.id || row.rmId;
    navigate(`/admin/req-mismatchLink/${leadId}`, { state: { leadData: row } });
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? dateString : date.toLocaleString();
  };

  return (
    <div className="rm-page-wrapper">
      <h1 className="rm-page-title">Req Mismatch Link Form</h1>

      <div className="rm-card-container">
        {/* Header */}
        <div className="rm-card-header">
          Requirement Mismatch Lead
        </div>

        <div className="rm-card-body">
          {/* Filters Form */}
          <form onSubmit={handleSearch} className="rm-filter-row">
            <div className="rm-form-group">
              <label>Date Range</label>
              <div className="rm-input-icon-wrapper">
                <input
                  type="date"
                  name="dateRange"
                  value={filters.dateRange}
                  onChange={handleInputChange}
                  className="rm-input"
                />
              </div>
            </div>

            <div className="rm-form-group">
              <label>Mobile No</label>
              <input
                type="text"
                name="mobileNo"
                placeholder="Mobile no"
                value={filters.mobileNo}
                onChange={handleInputChange}
                className="rm-input"
              />
            </div>

            <div className="rm-form-group rm-button-group">
              <button type="submit" className="rm-btn-search">
                Search
              </button>
            </div>
          </form>

          {/* Data Table */}
          {loading ? (
            <div className="rm-state-message">Loading records...</div>
          ) : error ? (
            <div className="rm-state-message rm-error">{error}</div>
          ) : (
            <div className="rm-table-responsive">
              <table className="rm-custom-table">
                <thead>
                  <tr>
                    <th style={{ width: '60px' }}>#Sr</th>
                    <th>
                      Requirement Mismatch On <span className="rm-filter-icon">▼</span>
                    </th>
                    <th>
                      CustomerName <span className="rm-filter-icon">▼</span>
                    </th>
                    <th>
                      Phone Number <span className="rm-filter-icon">▼</span>
                    </th>
                    <th>
                      Property Type <span className="rm-filter-icon">▼</span>
                    </th>
                    <th style={{ width: '80px', textAlign: 'center' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.length > 0 ? (
                    tableData.map((row, index) => (
                      <tr key={row._id || row.rmId || index}>
                        <td>{index + 1}</td>
                        <td>{formatDate(row.createdOn || row.createdAt || row.reqAssignDate)}</td>
                        <td>{row.customerName || '-'}</td>
                        <td>{row.phoneNumber || '-'}</td>
                        <td>{row.propertyType || '-'}</td>
                        <td style={{ textAlign: 'center' }}>
                          <button
                            type="button"
                            className="rm-btn-view"
                            onClick={() => handleView(row)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="rm-no-data">
                        No records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReqMismatchLinkForm;