import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

const UploadContextLayout = () => {
  // Shared state for all upload steps
  const [formData, setFormData] = useState({
    // Step 0: Category / Intent selection
    lookingTo: 'Sell',            // 'Sell', 'Resell', etc.
    propertyType: 'Residential', // 'Residential', 'Commercial', 'Land/Plot'
    subCategory: 'Flat/Apartment',// 'Flat/Apartment', 'Independent House/Villa', etc.

    // Step-specific details
    basicDetails: {},
    keyFeatures: {},
    propertyDetails: {},
    otherInfo: {}
  });

  // Helper function to update state for a specific step or key
  const updateFormData = (stepKey, stepData) => {
    setFormData((prev) => ({
      ...prev,
      [stepKey]: typeof stepData === 'object' && !Array.isArray(stepData)
        ? { ...prev[stepKey], ...stepData }
        : stepData
    }));
  };

  // Helper function to clear form state after successful submission
  const resetFormData = () => {
    setFormData({
      lookingTo: 'Sell',
      propertyType: 'Residential',
      subCategory: 'Flat/Apartment',
      basicDetails: {},
      keyFeatures: {},
      propertyDetails: {},
      otherInfo: {}
    });
  };

  return (
    <Outlet context={{ formData, setFormData, updateFormData, resetFormData }} />
  );
};

export default UploadContextLayout;