import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import '../assets/Content/ReqMismatchDetailView.css';

const ReqMismatchDetailView = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [leadData, setLeadData] = useState(location.state?.leadData || null);
  const [loading, setLoading] = useState(!location.state?.leadData);
  const [error, setError] = useState(null);

  // Comment Modal States
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  // Property Search Link Modal States
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkText, setLinkText] = useState('');
  const [isSubmittingLink, setIsSubmittingLink] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

  useEffect(() => {
    if (!leadData && id) {
      const fetchLeadDetails = async () => {
        try {
          setLoading(true);
          const response = await fetch(`${API_URL}/req-mismatchLink/${id}`);
          const result = await response.json();

          if (result.success && result.data) {
            setLeadData(result.data);
          } else {
            setError(result.message || 'Failed to fetch lead details.');
          }
        } catch (err) {
          console.error('Fetch detail error:', err);
          setError('Network error. Unable to load lead details.');
        } finally {
          setLoading(false);
        }
      };

      fetchLeadDetails();
    }
  }, [id, leadData, API_URL]);

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? dateString : date.toLocaleString();
  };

  // Comment Modal Handlers
  const handleOpenCommentModal = () => {
    setCommentText(leadData?.searchComments || '');
    setShowCommentModal(true);
  };

  const handleCloseCommentModal = () => {
    setShowCommentModal(false);
    setCommentText('');
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      setIsSubmittingComment(true);
      const targetId = id || leadData?._id || leadData?.leadId || leadData?.rmId;

      const response = await fetch(`${API_URL}/req-mismatchLink/${targetId}/comment`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          searchComments: commentText,
          updatedBy: 'Admin'
        })
      });

      const result = await response.json();

      if (result.success && result.data) {
        setLeadData((prev) => ({
          ...prev,
          ...result.data,
          searchComments: result.data.searchComments
        }));
        handleCloseCommentModal();
      } else {
        alert(result.message || 'Failed to save comment.');
      }
    } catch (err) {
      console.error('Error submitting comment:', err);
      alert('Failed to submit comment due to server error.');
    } finally {
      setIsSubmittingComment(false);
    }
  };

  // Property Search Link Handlers
  const handleOpenSearchLinkModal = () => {
    setLinkText(leadData?.searchLink || '');
    setShowLinkModal(true);
  };

  const handleCloseLinkModal = () => {
    setShowLinkModal(false);
    setLinkText('');
  };

  const handleSearchLinkSubmit = async (e) => {
  e.preventDefault();
  if (!linkText.trim()) return;

  try {
    setIsSubmittingLink(true);
    // Prioritize leadId / rmId over raw MongoDB _id string
    const targetId = leadData?.leadId || leadData?.rmId || id || leadData?._id;

    const response = await fetch(`${API_URL}/req-mismatchLink/${targetId}/search-link`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        searchLink: linkText,
        updatedBy: 'Admin'
      })
    });

    const result = await response.json();

    if (result.success && result.data) {
      setLeadData((prev) => ({
        ...prev,
        ...result.data,
        searchLink: result.data.searchLink
      }));
      handleCloseLinkModal();
    } else {
      alert(result.message || 'Failed to save property search link.');
    }
  } catch (err) {
    console.error('Error submitting search link:', err);
    alert('Failed to submit search link due to server error.');
  } finally {
    setIsSubmittingLink(false);
  }
};

  if (loading) {
    return <div className="rm-detail-wrapper"><div className="rm-state-msg">Loading lead details...</div></div>;
  }

  if (error || !leadData) {
    return (
      <div className="rm-detail-wrapper">
        <div className="rm-state-msg rm-error-msg">{error || 'Lead details not found.'}</div>
        <button className="rm-btn-back" onClick={() => navigate('/admin/req-mismatchLink')}>
          Back to List
        </button>
      </div>
    );
  }

  return (
    <div className="rm-detail-wrapper">
      <div className="rm-top-bar">
        <button className="rm-btn-back" onClick={() => navigate('/admin/req-mismatchLink')}>
          &larr; Back
        </button>
      </div>

      <div className="rm-card-header">View Form</div>

      <div className="rm-card-container">
        <h2 className="rm-form-heading">
          Requirement Mismatch {leadData.propertyType || 'Residential'} Application Form
        </h2>

        {/* Structured Form Grid */}
        <div className="rm-grid-table">
          <div className="rm-grid-row">
            <div className="rm-label-col">Date</div>
            <div className="rm-value-col">{formatDate(leadData.createdOn || leadData.createdAt || leadData.reqAssignDate)}</div>
            <div className="rm-label-col">Agent Name</div>
            <div className="rm-value-col">{leadData.agentName || '-'}</div>
          </div>

          <div className="rm-grid-row">
            <div className="rm-label-col">Customer Name</div>
            <div className="rm-value-col">{leadData.customerName || '-'}</div>
            <div className="rm-label-col">Phone</div>
            <div className="rm-value-col">{leadData.phoneNumber || '-'}</div>
          </div>

          <div className="rm-grid-row">
            <div className="rm-label-col">Customer City</div>
            <div className="rm-value-col">{leadData.customerCityName || '-'}</div>
            <div className="rm-label-col">Property Type</div>
            <div className="rm-value-col">{leadData.propertyType || '-'}</div>
          </div>

          <div className="rm-grid-row">
            <div className="rm-label-col">Preferred BHK</div>
            <div className="rm-value-col">{leadData.preferredBHK || '-'}</div>
            <div className="rm-label-col">Preferred Floor</div>
            <div className="rm-value-col">{leadData.preferredFloor || '-'}</div>
          </div>

          <div className="rm-grid-row">
            <div className="rm-label-col">SQ ft Range</div>
            <div className="rm-value-col">{leadData.sqFtFrom || '-'} - {leadData.sqFtTo || '-'}</div>
            <div className="rm-label-col">Budget</div>
            <div className="rm-value-col">{leadData.budgetFrom || '-'} - {leadData.budgetTo || '-'}</div>
          </div>

          <div className="rm-grid-row">
            <div className="rm-label-col">Construction Status</div>
            <div className="rm-value-col">{leadData.constructionStatus || '-'}</div>
            <div className="rm-label-col">in Case UC</div>
            <div className="rm-value-col">{leadData.ucPossessionDate || '-'}</div>
          </div>

          <div className="rm-grid-row">
            <div className="rm-label-col">Building Type</div>
            <div className="rm-value-col">{leadData.buildingType || '-'}</div>
            <div className="rm-label-col">Vastu Pref*</div>
            <div className="rm-value-col">{leadData.isVastuPrefrences || '-'}</div>
          </div>

          <div className="rm-grid-row">
            <div className="rm-label-col">Amenities*</div>
            <div className="rm-value-col">{leadData.amenities || '-'}</div>
            <div className="rm-label-col">Parking*</div>
            <div className="rm-value-col">{leadData.coveredParking || leadData.openParking || leadData.mechanicalParking || '-'}</div>
          </div>

          <div className="rm-grid-row">
            <div className="rm-label-col">Property Offered</div>
            <div className="rm-value-col">{leadData.propertyOffered || '-'}</div>
            <div className="rm-label-col">Property Visited</div>
            <div className="rm-value-col">{leadData.propertyVisited || '-'}</div>
          </div>

          <div className="rm-grid-row">
            <div className="rm-label-col">Property Interested</div>
            <div className="rm-value-col">{leadData.propertyInterested || '-'}</div>
            <div className="rm-label-col">Property Visited (Done by Self)</div>
            <div className="rm-value-col">{leadData.pvDoneOwnself || '-'}</div>
          </div>

          <div className="rm-grid-row">
            <div className="rm-label-col">Pref Location, 3-4 Location</div>
            <div className="rm-value-col">{leadData.preferredLocation || '-'}</div>
            <div className="rm-label-col">Why this Location/ Purpose?</div>
            <div className="rm-value-col">{leadData.preferredLocationPurpose || '-'}</div>
          </div>

          <div className="rm-grid-row">
            <div className="rm-label-col">Brokerage</div>
            <div className="rm-value-col">{leadData.isBrokerage || '-'}</div>
            <div className="rm-label-col">Brokerage(%)</div>
            <div className="rm-value-col">{leadData.brokeragePercentage || '-'}</div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="rm-action-bar">
          <button type="button" className="rm-btn rm-btn-download">Download</button>
          <button type="button" className="rm-btn rm-btn-comment" onClick={handleOpenCommentModal}>Add Comment</button>
          <button type="button" className="rm-btn rm-btn-searchlink" onClick={handleOpenSearchLinkModal}>
            Add Property Search Link
          </button>
        </div>

        {/* Comments and Links Section */}
        <div className="rm-bottom-tables-grid">
          <div className="rm-subtable-wrapper">
            <table className="rm-subtable">
              <thead>
                <tr>
                  <th style={{ width: '40px' }}>#</th>
                  <th style={{ width: '120px' }}>Date</th>
                  <th>Comments</th>
                </tr>
              </thead>
              <tbody>
                {leadData.searchComments ? (
                  <tr>
                    <td>1</td>
                    <td>{formatDate(leadData.updatedOn || leadData.createdOn)}</td>
                    <td>{leadData.searchComments}</td>
                  </tr>
                ) : (
                  <tr>
                    <td colSpan="3" className="rm-empty-td">No comments available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="rm-subtable-wrapper">
            <table className="rm-subtable">
              <thead>
                <tr>
                  <th style={{ width: '40px' }}>#</th>
                  <th style={{ width: '120px' }}>Date</th>
                  <th>Property Links</th>
                </tr>
              </thead>
              <tbody>
                {leadData.searchLink ? (
                  <tr>
                    <td>1</td>
                    <td>{formatDate(leadData.updatedOn || leadData.createdOn)}</td>
                    <td>
                      <a href={leadData.searchLink} target="_blank" rel="noopener noreferrer">
                        {leadData.searchLink}
                      </a>
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td colSpan="3" className="rm-empty-td">No property links found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Comment Modal */}
      {showCommentModal && (
        <div className="rm-modal-overlay">
          <div className="rm-modal-container">
            <div className="rm-modal-header">
              <h3>Add Comment</h3>
              <button className="rm-modal-close" onClick={handleCloseCommentModal}>&times;</button>
            </div>
            <form onSubmit={handleCommentSubmit}>
              <div className="rm-modal-body">
                <label htmlFor="searchComments">Comment:</label>
                <textarea
                  id="searchComments"
                  rows="4"
                  className="rm-modal-textarea"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Enter comment here..."
                  required
                />
              </div>
              <div className="rm-modal-footer">
                <button type="button" className="rm-modal-btn cancel" onClick={handleCloseCommentModal}>
                  Cancel
                </button>
                <button type="submit" className="rm-modal-btn submit" disabled={isSubmittingComment}>
                  {isSubmittingComment ? 'Saving...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Property Search Link Modal */}
      {showLinkModal && (
        <div className="rm-modal-overlay">
          <div className="rm-modal-container">
            <div className="rm-modal-header">
              <h3>Add Property Search Link</h3>
              <button className="rm-modal-close" onClick={handleCloseLinkModal}>&times;</button>
            </div>
            <form onSubmit={handleSearchLinkSubmit}>
              <div className="rm-modal-body">
                <label htmlFor="searchLink">Property Search URL:</label>
                <input
                  type="url"
                  id="searchLink"
                  className="rm-modal-input"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    marginTop: '6px'
                  }}
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="https://example.com/properties/search..."
                  required
                />
              </div>
              <div className="rm-modal-footer">
                <button type="button" className="rm-modal-btn cancel" onClick={handleCloseLinkModal}>
                  Cancel
                </button>
                <button type="submit" className="rm-modal-btn submit" disabled={isSubmittingLink}>
                  {isSubmittingLink ? 'Saving...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReqMismatchDetailView;