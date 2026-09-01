import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

const UploadContextLayout = () => {
  // Shared state for all property upload steps
  const [formData, setFormData] = useState({
    // Category & Intent selection
    lookingTo: '',       // 'sell', 'resell', 'rent', 'pg'
    propertyType: '',    // 'residential', 'commercial', 'land'
    subCategory: '',     // 'flat', 'villa'

    // Step-specific form dynamic state containers
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

  // Helper function to reset form state after completion
  const resetFormData = () => {
    setFormData({
      lookingTo: '',
      propertyType: '',
      subCategory: '',
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