import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
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

  
const handleDownloadPDF = async() => {
  if (!leadData) {
    alert("No data available to download.");
    return;
  }

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // Company branding
  const logo = new Image();
  logo.src = "/images/510earth.png";

  await new Promise((resolve, reject) => {
    logo.onload = resolve;
    logo.onerror = reject;
  });

  doc.addImage(logo, "PNG", 15, 12, 45, 32);

  // Corporate office details
  doc.setFontSize(9);
  doc.setTextColor(0, 0, 0);

  doc.text("CORPORATE OFFICE", 112, 15);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);

  const officeDetails = [
    "Municipal Premises No. 540, 1st floor, Block-GD, Plot No-50,",
    "P.O-East Kolkata Township, P.S- Kasba, District South 24 Parganas,",
    "Rajarhat Main Road, Kolkata-700107",
    "Contact No - +91-9073338396",
  ];

  officeDetails.forEach((line, index) => {
    doc.text(line, 112, 20 + index * 4);
  });

  doc.setFont("helvetica", "bold");
  doc.text(
    "West Bengal RERA Registration No - WBRERA/A/SOU/2023/000185",
    112,
    41
  );
  doc.text(
    "Maharashtra RERA Registration No - A52100043083",
    112,
    46
  );

  // Horizontal separator
  doc.setDrawColor(34, 101, 180);
  doc.setLineWidth(0.5);
  doc.line(15, 52, 195, 52);

  // Form heading
  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);

  doc.text(
    `Requirement Mismatch ${leadData.propertyType || "Residential"} Application Form`,
    105,
    59,
    { align: "center" }
  );

  // Helper for empty values
  const getValue = (value) => {
    if (value === undefined || value === null || value === "") {
      return "-";
    }

    if (Array.isArray(value)) {
      return value.length ? value.join(", ") : "-";
    }

    if (typeof value === "object") {
      return Object.values(value).join(", ") || "-";
    }

    return String(value);
  };

  const tableRows = [
    [
      "Date",
      getValue(
        formatDate(
          leadData.createdOn ||
          leadData.createdAt ||
          leadData.reqAssignDate
        )
      ),
      "Agent Name",
      getValue(leadData.agentName),
    ],
    [
      "Customer Name",
      getValue(leadData.customerName),
      "Phone",
      getValue(leadData.phoneNumber),
    ],
    [
      "Customer City",
      getValue(leadData.customerCityName),
      "Property Type",
      getValue(leadData.propertyType),
    ],
    [
      "Preferred BHK",
      getValue(leadData.preferredBHK),
      "Preferred Floor",
      getValue(leadData.preferredFloor),
    ],
    [
      "SQ ft Range",
      `${getValue(leadData.sqFtFrom)} - ${getValue(leadData.sqFtTo)}`,
      "Budget",
      `${getValue(leadData.budgetFrom)} - ${getValue(leadData.budgetTo)}`,
    ],
    [
      "Construction Status",
      getValue(leadData.constructionStatus),
      "In Case UC",
      getValue(leadData.ucPossessionDate),
    ],
    [
      "Building Type",
      getValue(leadData.buildingType),
      "Vastu Pref*",
      getValue(leadData.isVastuPrefrences),
    ],
    [
      "Amenities*",
      getValue(leadData.amenities),
      "Parking*",
      getValue(
        leadData.coveredParking ||
        leadData.openParking ||
        leadData.mechanicalParking
      ),
    ],
    [
      "Property Offered",
      getValue(leadData.propertyOffered),
      "Property Visited",
      getValue(leadData.propertyVisited),
    ],
    [
      "Property Interested",
      getValue(leadData.propertyInterested),
      "Property Visited (Done by Self)",
      getValue(leadData.pvDoneOwnself),
    ],
    [
      "Pref Location, 3-4 Location",
      getValue(leadData.preferredLocation),
      "Why this Location/Purpose?",
      getValue(leadData.preferredLocationPurpose),
    ],
    [
      "Brokerage",
      getValue(leadData.isBrokerage),
      "Brokerage(%)",
      getValue(leadData.brokeragePercentage),
    ],
  ];

  // Generate the bordered table
  autoTable(doc, {
    startY: 65,
    head: [],
    body: tableRows,
    theme: "grid",

    margin: {
      left: 10,
      right: 10,
      bottom: 15,
    },

    tableWidth: 190,

    styles: {
      font: "helvetica",
      fontSize: 9,
      textColor: [0, 0, 0],
      lineColor: [35, 35, 35],
      lineWidth: 0.35,
      cellPadding: 2,
      valign: "middle",
      overflow: "linebreak",
    },

    columnStyles: {
      0: {
        cellWidth: 44,
        fontStyle: "normal",
      },
      1: {
        cellWidth: 51,
      },
      2: {
        cellWidth: 43,
        fontStyle: "normal",
      },
      3: {
        cellWidth: 52,
      },
    },

    didDrawPage: () => {
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
    },
  });

  // Download the PDF
  const customerName = (leadData.customerName || "Customer")
    .replace(/[^a-zA-Z0-9_-]/g, "_");

  doc.save(`RequirementMismatchInfoForm_${customerName}.pdf`);
};


  useEffect(() => {
    const fetchAllData = async () => {
      if (!id) return;

      try {
        setLoading(true);

        let baseData = location.state?.leadData || null;

        if (!baseData) {
          const detailRes = await fetch(`${API_URL}/req-mismatchLink/${id}`);
          const detailResult = await detailRes.json();
          if (detailResult.success && detailResult.data) {
            baseData = detailResult.data;
          }
        }

        const targetId = baseData?.leadId || baseData?.rmId || id;

        const commentsRes = await fetch(`${API_URL}/req-mismatchLink/${targetId}/comments-links`);
        const commentsResult = await commentsRes.json();

        if (commentsResult.success && commentsResult.data) {
          setLeadData({
            ...baseData,
            Comment: commentsResult.data.Comment || [],
            Link: commentsResult.data.Link || [],
            searchComments: commentsResult.data.searchComments || baseData?.searchComments || null,
            searchLink: commentsResult.data.searchLink || baseData?.searchLink || null
          });
        } else {
          setLeadData(baseData);
        }

        // Mark unread entries as read when viewing full details
        await fetch(`${API_URL}/req-mismatchLink/${targetId}/mark-read`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (err) {
        console.error('Fetch detail error:', err);
        setError('Network error. Unable to load details.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [id, API_URL]);

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? dateString : date.toLocaleString();
  };

  const handleOpenCommentModal = () => {
    setCommentText('');
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
      const targetId = leadData?.leadId || leadData?.rmId || id || leadData?._id;

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
          Comment: result.data.Comment || prev?.Comment || [],
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

  const handleOpenSearchLinkModal = () => {
    setLinkText('');
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
          Link: result.data.Link || prev?.Link || [],
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

        <div className="rm-action-bar">
         <button type="button" className="rm-btn rm-btn-download" onClick={handleDownloadPDF}>Download</button>
          <button type="button" className="rm-btn rm-btn-comment" onClick={handleOpenCommentModal}>Add Comment</button>
          <button type="button" className="rm-btn rm-btn-searchlink" onClick={handleOpenSearchLinkModal}>
            Add Property Search Link
          </button>
        </div>

        <div className="rm-bottom-tables-grid">
          <div className="rm-subtable-wrapper">
            <table className="rm-subtable">
              <thead>
                <tr>
                  <th style={{ width: '40px' }}>#</th>
                  <th style={{ width: '130px' }}>Date</th>
                  <th>Comments</th>
                </tr>
              </thead>
              <tbody>
                {leadData.Comment && leadData.Comment.length > 0 ? (
                  leadData.Comment.map((item, index) => (
                    <tr key={item._id || index}>
                      <td>{index + 1}</td>
                      {/* <td>{formatDate(item.createdAt || item.createdOn)}</td> */}
                      <td>{formatDate(item.createdAt || item.createdOn || leadData.updatedOn || leadData.createdOn)}</td>
                      <td>{item.commentdescription}</td>
                    </tr>
                  ))
                ) : leadData.searchComments ? (
                  <tr>
                    <td>1</td>
                    {/* <td>{formatDate(leadData.updatedOn || leadData.createdOn)}</td> */}
                    <td>{formatDate(item.createdAt || item.createdOn || leadData.updatedOn || leadData.createdOn)}</td>
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
                  <th style={{ width: '130px' }}>Date</th>
                  <th>Property Links</th>
                </tr>
              </thead>
              <tbody>
                {leadData.Link && leadData.Link.length > 0 ? (
                  leadData.Link.map((item, index) => (
                    <tr key={item._id || index}>
                      <td>{index + 1}</td>
                      {/* <td>{formatDate(item.createdAt || item.createdOn)}</td> */}
                      <td>{formatDate(item.createdAt || item.createdOn || leadData.updatedOn || leadData.createdOn)}</td>
                      <td>
                        <a href={item.linkdescription} target="_blank" rel="noopener noreferrer">
                          {item.linkdescription}
                        </a>
                      </td>
                    </tr>
                  ))
                ) : leadData.searchLink ? (
                  <tr>
                    <td>1</td>
                    {/* <td>{formatDate(leadData.updatedOn || leadData.createdOn)}</td> */}
                    <td>{formatDate(item.createdAt || item.createdOn || leadData.updatedOn || leadData.createdOn)}</td>
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