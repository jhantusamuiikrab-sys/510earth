import React, { useState } from 'react';
import { 
  UserCheck, 
  Search, 
  Filter, 
  MessageSquare, 
  User, 
  Phone, 
  ArrowRightLeft, 
  Eye, 
  CheckCircle2, 
  XCircle, 
  RefreshCw 
} from 'lucide-react';
import styles from '../assets/Content/ReassignLeads.module.css';

export default function ReassignLeads() {
  // Mock data for previewing design without DB connection
  const [reassignRequests, setReassignRequests] = useState([
    {
      id: '1',
      fullName: 'Rahul Sharma',
      phoneNo: '+91 98765 43210',
      fromAgent: 'Amit Patel',
      toAgent: 'Priya Verma',
      comments: 'Client requested senior commercial agent',
      status: 'Pending',
      requestDate: '2026-09-14 10:30 AM'
    },
    {
      id: '2',
      fullName: 'Anita Roy',
      phoneNo: '+91 91234 56789',
      fromAgent: 'Suresh Kumar',
      toAgent: 'Vikram Singh',
      comments: 'Out of location coverage for current agent',
      status: 'Approved',
      requestDate: '2026-09-13 04:15 PM'
    },
    {
      id: '3',
      fullName: 'Global Tech Corp (Rajesh)',
      phoneNo: '+91 99887 76655',
      fromAgent: 'Priya Verma',
      toAgent: 'Amit Patel',
      comments: 'Follow up lead transfer',
      status: 'Rejected',
      requestDate: '2026-09-12 11:00 AM'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedComment, setSelectedComment] = useState(null);

  const filteredRequests = reassignRequests.filter(req => 
    req.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.phoneNo.includes(searchQuery) ||
    req.fromAgent.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.toAgent.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          onClick={() => alert('Refreshing data...')}
        >
          <RefreshCw size={16} />
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

        {/* DATA TABLE VIEW (DESKTOP) */}
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
                filteredRequests.map((item, index) => (
                  <tr key={item.id}>
                    <td className={styles.tdCenter}>
                      <span className={styles.srBadge}>{index + 1}</span>
                    </td>
                    <td className={styles.tdName}>
                      <User size={14} className={styles.iconInline} />
                      {item.fullName}
                    </td>
                    <td className={styles.fontMono}>
                      <Phone size={13} className={styles.iconInline} />
                      {item.phoneNo}
                    </td>
                    <td>
                      <span className={styles.agentTagFrom}>{item.fromAgent}</span>
                    </td>
                    <td>
                      <span className={styles.agentTagTo}>
                        <ArrowRightLeft size={12} style={{ marginRight: '4px' }} />
                        {item.toAgent}
                      </span>
                    </td>
                    <td>
                      <button 
                        className={styles.commentBtn}
                        onClick={() => setSelectedComment(item.comments)}
                      >
                        <Eye size={13} />
                        <span>View Comment</span>
                      </button>
                    </td>
                    <td>
                      <span className={`${styles.statusBadge} ${styles[item.status.toLowerCase()]}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className={styles.tdCenter}>
                      <div className={styles.actionGroup}>
                        <button 
                          className={styles.btnApprove} 
                          title="Approve Reassignment"
                          disabled={item.status !== 'Pending'}
                        >
                          <CheckCircle2 size={16} />
                        </button>
                        <button 
                          className={styles.btnReject} 
                          title="Reject Reassignment"
                          disabled={item.status !== 'Pending'}
                        >
                          <XCircle size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARDS VIEW (TABLE ALTERNATIVE FOR MOBILE) */}
        <div className={styles.mobileCards}>
          {filteredRequests.map((item, index) => (
            <div key={item.id} className={styles.mobileCard}>
              <div className={styles.mobileHeader}>
                <span className={styles.srBadge}>#{index + 1}</span>
                <span className={`${styles.statusBadge} ${styles[item.status.toLowerCase()]}`}>
                  {item.status}
                </span>
              </div>

              <div className={styles.mobileBody}>
                <h3 className={styles.mobileLeadName}>{item.fullName}</h3>
                <p className={styles.mobilePhone}>{item.phoneNo}</p>

                <div className={styles.transferFlow}>
                  <div className={styles.flowAgent}>
                    <small>From</small>
                    <div>{item.fromAgent}</div>
                  </div>
                  <ArrowRightLeft size={16} className={styles.flowIcon} />
                  <div className={styles.flowAgent}>
                    <small>To</small>
                    <div>{item.toAgent}</div>
                  </div>
                </div>

                {item.comments && (
                  <div className={styles.mobileCommentBox}>
                    <MessageSquare size={13} />
                    <span>{item.comments}</span>
                  </div>
                )}
              </div>

              {item.status === 'Pending' && (
                <div className={styles.mobileFooter}>
                  <button className={styles.mobileApproveBtn}>
                    <CheckCircle2 size={16} /> Approve
                  </button>
                  <button className={styles.mobileRejectBtn}>
                    <XCircle size={16} /> Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
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