import React, { useState, useEffect } from 'react';
import { 
  Search, 
  User, 
  Phone, 
  ArrowRightLeft, 
  Eye, 
  CheckCircle2, 
  XCircle, 
  RefreshCw,
  Loader2,
  MessageSquare
} from 'lucide-react';
import styles from '../assets/Content/ReassignLeads.module.css';

export default function ReassignLeads() {
  const [reassignRequests, setReassignRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedComment, setSelectedComment] = useState(null);

  // API Base Endpoint (Adjust port/URL as needed according to your backend setup)
  const API_URL = 'http://localhost:3000/api/reassign-leads'; 

  // Fetch Reassignments from API
  const fetchReassignmentData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (data.success) {
        setReassignRequests(data.data);
      } else {
        setError(data.message || 'Failed to load data');
      }
    } catch (err) {
      console.error("API Fetch Error:", err);
      setError('Unable to connect to server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReassignmentData();
  }, []);

  // Handle Approve or Reject Request
  const handleStatusUpdate = async (id, newStatus, statusName) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, StatusName: statusName }),
      });

      const resData = await response.json();
      if (resData.success) {
        // Refresh list locally or refetch
        fetchReassignmentData();
      } else {
        alert(resData.message || 'Action failed.');
      }
    } catch (err) {
      console.error("Error updating status:", err);
      alert('Failed to update status. Please try again.');
    }
  };

  // Safe Extraction Helpers (Handles Populated Objects or Strings)
  const getLeadName = (item) => item.leadId?.fullName || item.leadId?.name || 'N/A';
  const getLeadPhone = (item) => item.leadId?.phoneNo || item.leadId?.phone || 'N/A';
  const getFromAgent = (item) => item.assignerName?.name || item.AssignerId?.name || 'N/A';
  const getToAgent = (item) => item.assignToName?.name || item.AssignedToId?.name || 'N/A';
  const getComments = (item) => item.subLeadStatus?.name || item.SubLeadStatus || 'No comments';
  const getStatusText = (item) => item.StatusName || (item.status ? 'Approved' : 'Pending');

  // Client-side Filter logic
  const filteredRequests = reassignRequests.filter(req => {
    const q = searchQuery.toLowerCase();
    return (
      getLeadName(req).toLowerCase().includes(q) ||
      getLeadPhone(req).toLowerCase().includes(q) ||
      getFromAgent(req).toLowerCase().includes(q) ||
      getToAgent(req).toLowerCase().includes(q)
    );
  });

  return (
    <div className={styles.container}>
      {/* HEADER SECTION */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Reassign Lead Elements</h1>
          <p className={styles.subtitle}>
            Review and manage lead transfer requests between agents
          </p>
        </div>
        <button 
          className={styles.refreshBtn}
          onClick={fetchReassignmentData}
          disabled={loading}
        >
          <RefreshCw size={16} className={loading ? styles.spin : ''} />
          <span>Refresh List</span>
        </button>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className={styles.card}>
        <div className={styles.filterToolbar}>
          <div className={styles.searchWrapper}>
            <Search size={18} className={styles.searchIcon} />
            <input 
              type="text"
              placeholder="Search by Lead Name, Phone, or Agent..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <div className={styles.statsBadge}>
            Total Requests: <strong>{filteredRequests.length}</strong>
          </div>
        </div>

        {/* LOADING & ERROR STATES */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <Loader2 className={styles.spin} size={32} />
            <p style={{ marginTop: '10px' }}>Loading reassignment data...</p>
          </div>
        )}

        {error && !loading && (
          <div style={{ textAlign: 'center', padding: '30px', color: '#e53e3e' }}>
            <p>{error}</p>
            <button onClick={fetchReassignmentData} style={{ marginTop: '10px' }}>Try Again</button>
          </div>
        )}

        {/* DATA TABLE VIEW (DESKTOP) */}
        {!loading && !error && (
          <div className={styles.tableResponsive}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th style={{ width: '60px', textAlign: 'center' }}>#Sr</th>
                  <th>Full Name</th>
                  <th>Phone No</th>
                  <th>From Agent</th>
                  <th>To Agent</th>
                  <th>Comments</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.length === 0 ? (
                  <tr>
                    <td colSpan="8" className={styles.emptyTd}>
                      No reassignment requests found.
                    </td>
                  </tr>
                ) : (
                  filteredRequests.map((item, index) => {
                    const statusText = getStatusText(item);
                    const isPending = statusText.toLowerCase() === 'pending';

                    return (
                      <tr key={item._id || index}>
                        <td className={styles.tdCenter}>
                          <span className={styles.srBadge}>{index + 1}</span>
                        </td>
                        <td className={styles.tdName}>
                          <User size={14} className={styles.iconInline} />
                          {getLeadName(item)}
                        </td>
                        <td className={styles.fontMono}>
                          <Phone size={13} className={styles.iconInline} />
                          {getLeadPhone(item)}
                        </td>
                        <td>
                          <span className={styles.agentTagFrom}>{getFromAgent(item)}</span>
                        </td>
                        <td>
                          <span className={styles.agentTagTo}>
                            <ArrowRightLeft size={12} style={{ marginRight: '4px' }} />
                            {getToAgent(item)}
                          </span>
                        </td>
                        <td>
                          <button 
                            className={styles.commentBtn}
                            onClick={() => setSelectedComment(getComments(item))}
                          >
                            <Eye size={13} />
                            <span>View Comment</span>
                          </button>
                        </td>
                        <td>
                          <span className={`${styles.statusBadge} ${styles[statusText.toLowerCase()]}`}>
                            {statusText}
                          </span>
                        </td>
                        <td className={styles.tdCenter}>
                          <div className={styles.actionGroup}>
                            <button 
                              className={styles.btnApprove} 
                              title="Approve Reassignment"
                              disabled={!isPending}
                              onClick={() => handleStatusUpdate(item._id, true, 'Approved')}
                            >
                              <CheckCircle2 size={16} />
                            </button>
                            <button 
                              className={styles.btnReject} 
                              title="Reject Reassignment"
                              disabled={!isPending}
                              onClick={() => handleStatusUpdate(item._id, false, 'Rejected')}
                            >
                              <XCircle size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* MOBILE CARDS VIEW */}
        {!loading && !error && (
          <div className={styles.mobileCards}>
            {filteredRequests.map((item, index) => {
              const statusText = getStatusText(item);
              const isPending = statusText.toLowerCase() === 'pending';

              return (
                <div key={item._id || index} className={styles.mobileCard}>
                  <div className={styles.mobileHeader}>
                    <span className={styles.srBadge}>#{index + 1}</span>
                    <span className={`${styles.statusBadge} ${styles[statusText.toLowerCase()]}`}>
                      {statusText}
                    </span>
                  </div>

                  <div className={styles.mobileBody}>
                    <h3 className={styles.mobileLeadName}>{getLeadName(item)}</h3>
                    <p className={styles.mobilePhone}>{getLeadPhone(item)}</p>

                    <div className={styles.transferFlow}>
                      <div className={styles.flowAgent}>
                        <small>From</small>
                        <div>{getFromAgent(item)}</div>
                      </div>
                      <ArrowRightLeft size={16} className={styles.flowIcon} />
                      <div className={styles.flowAgent}>
                        <small>To</small>
                        <div>{getToAgent(item)}</div>
                      </div>
                    </div>

                    <div className={styles.mobileCommentBox}>
                      <MessageSquare size={13} />
                      <span>{getComments(item)}</span>
                    </div>
                  </div>

                  {isPending && (
                    <div className={styles.mobileFooter}>
                      <button 
                        className={styles.mobileApproveBtn}
                        onClick={() => handleStatusUpdate(item._id, true, 'Approved')}
                      >
                        <CheckCircle2 size={16} /> Approve
                      </button>
                      <button 
                        className={styles.mobileRejectBtn}
                        onClick={() => handleStatusUpdate(item._id, false, 'Rejected')}
                      >
                        <XCircle size={16} /> Reject
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* COMMENTS MODAL */}
      {selectedComment && (
        <div className={styles.modalOverlay} onClick={() => setSelectedComment(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Request Comment</h3>
              <button onClick={() => setSelectedComment(null)}>✕</button>
            </div>
            <p className={styles.modalBody}>{selectedComment}</p>
          </div>
        </div>
      )}
    </div>
  );
}