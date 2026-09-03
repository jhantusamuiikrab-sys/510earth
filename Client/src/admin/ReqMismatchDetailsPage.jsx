import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import '../assets/Content/ReqMismatchDetails.css';
import api from "./utils/api";

const ReqMismatchDetailsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const initialData = location.state?.leadData || {};

  // Helper to safely format dates into YYYY-MM-DD for <input type="date">
  const formatForDateInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toISOString().split('T')[0];
  };

  // Track editing mode and form inputs
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Read-only metadata
    createdAt: initialData.createdAt || initialData.createdOn || '',
    agentName: initialData.agentName || 'Abhisek TestDevlp',
    customerName: initialData.customerName || initialData.name || '',
    
    // Editable fields
    phoneNumber: initialData.phoneNumber || initialData.phoneNo || '',
    alternatePhoneNumber: initialData.alternatePhoneNumber || '',    
    customerCityName: initialData.customerCityName || '',
    custDOB: formatForDateInput(initialData.custDOB),
    custAnniversaryDate: formatForDateInput(initialData.custAnniversaryDate),
    type: initialData.type || initialData.propertyType || 'Land',
    sqFtFrom: initialData.sqFtFrom ?? initialData.minSqFt ?? '',
    sqFtTo: initialData.sqFtTo ?? initialData.maxSqFt ?? '',
    budgetFrom: initialData.budgetFrom ?? initialData.minBudget ?? '',
    budgetTo: initialData.budgetTo ?? initialData.maxBudget ?? '',
    constructionStatus: initialData.constructionStatus || '',
    ucPossessionDate: formatForDateInput(initialData.ucPossessionDate),
    rPurposeToBuyName: initialData.rPurposeToBuyName || '',
    rLandAuthName: initialData.rLandAuthName || '',
    isVastuPrefrence: initialData.isVastuPrefrence || false,
    amenities: initialData.amenities || '',
    specialReq: initialData.specialReq || '',
    preferredLocation: initialData.preferredLocation || '',
    preferredLocationPurpose: initialData.preferredLocationPurpose || '',
    purposeToBuy: initialData.purposeToBuy || '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

 // --- SAVE UPDATED DATA TO BACKEND DATABASE ---

// 2. Replace your save handler logic
const handleSave = async () => {
  const recordId = initialData?._id || initialData?.rmId || initialData?.leadId || id;

  if (!recordId) {
    alert("Error: Record ID missing.");
    return;
  }

  setIsSubmitting(true);

  try {
    // Axios automatically prepends your baseURL (http://localhost:3000/api)
    const response = await api.patch(`/requirement-mismatch/${recordId}`, formData);

    if (response.data && response.data.success) {
      alert("Database updated successfully!");
      setIsEditing(false);
    }
  } catch (error) {
    console.error("Save error:", error);
    const errorMessage = error.response?.data?.message || error.message || "An error occurred.";
    alert(`Error saving changes: ${errorMessage}`);
  } finally {
    setIsSubmitting(false);
  }
};

  const handleCancel = () => {
    setFormData({
      createdAt: initialData.createdAt || initialData.createdOn || '',
      agentName: initialData.agentName || 'Abhisek TestDevlp',
      customerName: initialData.customerName || initialData.name || '',
      phoneNumber: initialData.phoneNumber || initialData.phoneNo || '',
      alternatePhoneNumber: initialData.alternatePhoneNumber || '',
      customerCityName: initialData.customerCityName || '',
      custDOB: formatForDateInput(initialData.custDOB),
      custAnniversaryDate: formatForDateInput(initialData.custAnniversaryDate),
      type: initialData.type || initialData.propertyType || 'Land',
      sqFtFrom: initialData.sqFtFrom ?? initialData.minSqFt ?? '',
      sqFtTo: initialData.sqFtTo ?? initialData.maxSqFt ?? '',
      budgetFrom: initialData.budgetFrom ?? initialData.minBudget ?? '',
      budgetTo: initialData.budgetTo ?? initialData.maxBudget ?? '',
      constructionStatus: initialData.constructionStatus || '',
      ucPossessionDate: formatForDateInput(initialData.ucPossessionDate),
      rPurposeToBuyName: initialData.rPurposeToBuyName || '',
      rLandAuthName: initialData.rLandAuthName || '',
      isVastuPrefrence: initialData.isVastuPrefrence || false,
      amenities: initialData.amenities || '',
      specialReq: initialData.specialReq || '',
      preferredLocation: initialData.preferredLocation || '',
      preferredLocationPurpose: initialData.preferredLocationPurpose || '',
      purposeToBuy: initialData.purposeToBuy || '',
    });
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? dateString : date.toLocaleDateString();
  };

  return (
    <div className="details-page-wrapper">
      {/* Top Header Bar */}
      <div className="details-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back to List
        </button>
        <div className="header-title">
          <h1>Requirement Mismatch Details</h1>
          <span className="lead-tag">ID: #{id || initialData._id || '1389'}</span>
        </div>
      </div>

      <div className="details-content">
        {/* Customer Information */}
        <section className="detail-card">
          <h2>Customer Information</h2>
          <div className="grid-layout">
            {/* Read-Only: Lead Date */}
            <div className="field-group">
              <label>Lead Date</label>
              <div className="field-value readonly-field">{formatDate(formData.createdAt)}</div>
            </div>

            {/* Read-Only: Agent Name */}
            <div className="field-group">
              <label>Agent Name</label>
              <div className="field-value readonly-field">{formData.agentName}</div>
            </div>

            {/* Read-Only: Customer Name */}
            <div className="field-group">
              <label>Customer Name</label>
              <div className="field-value font-bold readonly-field">{formData.customerName || '-'}</div>
            </div>

            {/* Editable: Phone Number */}
            <div className="field-group">
              <label>Phone Number</label>
              {isEditing ? (
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              ) : (
                <div className="field-value">{formData.phoneNumber || '-'}</div>
              )}
            </div>

            {/* Editable: Alternate Phone Number */}
            <div className="field-group">
              <label>Alternate Phone Number</label>
              {isEditing ? (
                <input
                  type="text"
                  name="alternatePhoneNumber"
                  value={formData.alternatePhoneNumber}
                  onChange={handleChange}
                />
              ) : (
                <div className="field-value">{formData.alternatePhoneNumber || '-'}</div>
              )}
            </div>

            {/* Editable: Customer City */}
            <div className="field-group">
              <label>Customer City</label>
              {isEditing ? (
                <input
                  type="text"
                  name="customerCityName"
                  value={formData.customerCityName}
                  onChange={handleChange}
                />
              ) : (
                <div className="field-value">{formData.customerCityName || '-'}</div>
              )}
            </div>

            {/* Editable: Birth Date */}
            <div className="field-group">
              <label>Birth Date</label>
              {isEditing ? (
                <input
                  type="date"
                  name="custDOB"
                  value={formData.custDOB}
                  onChange={handleChange}
                />
              ) : (
                <div className="field-value">{formatDate(formData.custDOB)}</div>
              )}
            </div>

            {/* Editable: Anniversary Date */}
            <div className="field-group">
              <label>Anniversary Date</label>
              {isEditing ? (
                <input
                  type="date"
                  name="custAnniversaryDate"
                  value={formData.custAnniversaryDate}
                  onChange={handleChange}
                />
              ) : (
                <div className="field-value">{formatDate(formData.custAnniversaryDate)}</div>
              )}
            </div>
          </div>
        </section>

        {/* Property Specs */}
        <section className="detail-card">
          <h2>Property Specifications</h2>
          <div className="grid-layout">
            <div className="field-group">
              <label>Property Type</label>
              {isEditing ? (
                <input
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                />
              ) : (
                <div className="badge-group">
                  <span className="badge badge-primary">{formData.type}</span>
                </div>
              )}
            </div>

            <div className="field-group">
              <label>SQ ft Range</label>
              {isEditing ? (
                <div className="range-inputs">
                  <input
                    type="number"
                    name="sqFtFrom"
                    placeholder="From"
                    value={formData.sqFtFrom}
                    onChange={handleChange}
                  />
                  <span> - </span>
                  <input
                    type="number"
                    name="sqFtTo"
                    placeholder="To"
                    value={formData.sqFtTo}
                    onChange={handleChange}
                  />
                </div>
              ) : (
                <div className="field-value">
                  {formData.sqFtFrom || '-'} - {formData.sqFtTo || '-'}
                </div>
              )}
            </div>


<div className="field-group">
  <label>Budget Range</label>
  {isEditing ? (
    <div className="range-inputs">
      <input
        type="text"
        name="budgetFrom"
        placeholder="From"
        value={formData.budgetFrom}
        onChange={handleChange}
      />
      <span> - </span>
      <input
        type="text"
        name="budgetTo"
        placeholder="To"
        value={formData.budgetTo}
        onChange={handleChange}
      />
    </div>
  ) : (
    <div className="field-value">
      {formData.budgetFrom || '-'} - {formData.budgetTo || '-'}
    </div>
  )}
</div>

            {/* <div className="field-group">
              <label>Budget Range</label>
              {isEditing ? (
                <div className="range-inputs">
                  <input
                    type="number"
                    name="budgetFrom"
                    placeholder="From"
                    value={formData.budgetFrom}
                    onChange={handleChange}
                  />
                  <span> - </span>
                  <input
                    type="number"
                    name="budgetTo"
                    placeholder="To"
                    value={formData.budgetTo}
                    onChange={handleChange}
                  />
                </div>
              ) : (
                <div className="field-value">
                  {formData.budgetFrom || '-'} - {formData.budgetTo || '-'}
                </div>
              )}
            </div> */}

            <div className="field-group">
              <label>Construction Status</label>
              {isEditing ? (
                <input
                  type="text"
                  name="constructionStatus"
                  value={formData.constructionStatus}
                  onChange={handleChange}
                />
              ) : (
                <div className="badge-group">
                  <span className="badge badge-outline">{formData.constructionStatus || '-'}</span>
                </div>
              )}
            </div>

            <div className="field-group">
              <label>Target Date</label>
              {isEditing ? (
                <input
                  type="date"
                  name="ucPossessionDate"
                  value={formData.ucPossessionDate}
                  onChange={handleChange}
                />
              ) : (
                <div className="field-value">{formatDate(formData.ucPossessionDate)}</div>
              )}
            </div>

            <div className="field-group">
              <label>Purpose to Buy</label>
              {isEditing ? (
                <input
                  type="text"
                  name="rPurposeToBuyName"
                  value={formData.rPurposeToBuyName}
                  onChange={handleChange}
                />
              ) : (
                <div className="field-value">{formData.rPurposeToBuyName || '-'}</div>
              )}
            </div>

            <div className="field-group">
              <label>Land Authority</label>
              {isEditing ? (
                <input
                  type="text"
                  name="rLandAuthName"
                  value={formData.rLandAuthName}
                  onChange={handleChange}
                />
              ) : (
                <div className="field-value">{formData.rLandAuthName || '-'}</div>
              )}
            </div>
          </div>
        </section>

        {/* Preferences & Site Visits */}
        <section className="detail-card">
          <h2>Preferences & Site Visits</h2>
          <div className="grid-layout full">
            <div className="field-group">
              <label>Is Vastu Preferred</label>
              {isEditing ? (
                <select
                  name="isVastuPrefrence"
                  value={formData.isVastuPrefrence}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      isVastuPrefrence: e.target.value === 'true',
                    }))
                  }
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              ) : (
                <div className="field-value">{formData.isVastuPrefrence ? 'Yes' : 'No'}</div>
              )}
            </div>

            <div className="field-group">
              <label>Specific Amenities</label>
              {isEditing ? (
                <input
                  type="text"
                  name="amenities"
                  value={formData.amenities}
                  onChange={handleChange}
                />
              ) : (
                <div className="badge-group">
                  <span className="badge badge-accent">{formData.amenities || '-'}</span>
                </div>
              )}
            </div>

            <div className="field-group">
              <label>Special Requirement</label>
              {isEditing ? (
                <input
                  type="text"
                  name="specialReq"
                  value={formData.specialReq}
                  onChange={handleChange}
                />
              ) : (
                <div className="field-value">{formData.specialReq || '-'}</div>
              )}
            </div>

            <div className="field-group">
              <label>Preferred Locations</label>
              {isEditing ? (
                <input
                  type="text"
                  name="preferredLocation"
                  value={formData.preferredLocation}
                  onChange={handleChange}
                />
              ) : (
                <div className="field-value box">{formData.preferredLocation || '-'}</div>
              )}
            </div>

            <div className="field-group">
              <label>Why this Location / Purpose?</label>
              {isEditing ? (
                <input
                  type="text"
                  name="preferredLocationPurpose"
                  value={formData.preferredLocationPurpose}
                  onChange={handleChange}
                />
              ) : (
                <div className="field-value box">{formData.preferredLocationPurpose || '-'}</div>
              )}
            </div>
          </div>
        </section>

        {/* Bottom Action Footer */}
       <div className="details-footer">
  {isEditing ? (
    <>
      <button 
        className="btn btn-secondary" 
        onClick={handleCancel} 
        disabled={isSubmitting}
      >
        Cancel
      </button>
      <button 
        className="btn btn-primary" 
        onClick={handleSave} 
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Saving...' : 'Save Changes'}
      </button>
    </>
  ) : (
    <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
      Edit Details
    </button>
  )}
</div>
      </div>
    </div>
  );
};

export default ReqMismatchDetailsPage;