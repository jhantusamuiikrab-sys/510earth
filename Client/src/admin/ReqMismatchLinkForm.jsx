import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/Content/ReqMismatchLinkForm.css';

const ReqMismatchLinkForm = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

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

      const response = await fetch(`${API_URL}/req-mismatchLink?${queryParams.toString()}`);
      const result = await response.json();

      if (result.success) {
        setTableData(result.data || []);
        setCurrentPage(1); // Reset to page 1 on new search/fetch
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

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTableData = tableData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(tableData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
            <>
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
                    {currentTableData.length > 0 ? (
                      currentTableData.map((row, index) => {
                        const absoluteIndex = indexOfFirstItem + index + 1;
                        return (
                          <tr key={row._id || row.rmId || index}>
                            <td>{absoluteIndex}</td>
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
                        );
                      })
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

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="rm-pagination-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
                  <div className="rm-pagination-info">
                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, tableData.length)} of {tableData.length} entries
                  </div>
                  <div className="rm-pagination-buttons" style={{ display: 'flex', gap: '5px' }}>
                    <button
                      type="button"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="rm-btn-page"
                      style={{ padding: '6px 12px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                    >
                      Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                      <button
                        key={pageNumber}
                        type="button"
                        onClick={() => handlePageChange(pageNumber)}
                        className={`rm-btn-page ${currentPage === pageNumber ? 'active' : ''}`}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: currentPage === pageNumber ? '#007bff' : '#f8f9fa',
                          color: currentPage === pageNumber ? '#fff' : '#333',
                          border: '1px solid #ccc',
                          cursor: 'pointer'
                        }}
                      >
                        {pageNumber}
                      </button>
                    ))}

                    <button
                      type="button"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="rm-btn-page"
                      style={{ padding: '6px 12px', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
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
    </div>
  );
};

export default ReqMismatchLinkForm;