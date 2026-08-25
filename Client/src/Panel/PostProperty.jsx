import React, { useState } from "react";
import StepProgressBar from "./PostProperty/StepProgressBar";
import StepRegistration from "./PostProperty/StepRegistration";
import StepVerification from "./PostProperty/StepVerification";
import StepInitialDetails from "./PostProperty/StepInitialDetails";
import StepFlatApartment from "./PostProperty/StepFlatApartment";
import StepIndependentHouseVilla from "./PostProperty/StepIndependentHouseVilla";
import StepCommercialProperty from "./PostProperty/StepCommercialProperty";
import "../assets/paneldesign/css/PostProperty.css";

const PostProperty = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    role: "Dealer",
    name: "",
    contact: "",
    sameWhatsapp: false,
    password: "",
    propertyType: "", // Stores selected property type (e.g., 'Flat / Apartment' or 'Independent House / Villa')
  });

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 8));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  // Helper to render Step 4 component conditionally based on property type
  const renderStepFour = () => {
    switch (formData.propertyType) {
        case "Commercial Property":
        case "Commercial":
        return (
          <StepCommercialProperty
            formData={formData}
            setFormData={setFormData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case "Independent House / Villa":
      case "Independent House":
      case "Villa":
        return (
          <StepIndependentHouseVilla
            formData={formData}
            setFormData={setFormData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case "Flat / Apartment":
      case "Flat":
      case "Apartment":
      default:
        return (
          <StepCommercialProperty
            formData={formData}
            setFormData={setFormData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
    }
  };

  return (
    <div className="post_property_container">
      {/* Top Main Banner */}
      <div className="registration_banner">
        <h2>Registration Form</h2>
      </div>

      {/* Stepper Bar Header */}
      <div className="stepper_outer_container">
        <div className="container">
          <StepProgressBar currentStep={currentStep} />
        </div>
      </div>

      {/* Dynamic Form Step Card */}
      <div className="container form_card_container">
        <div className="main_form_card">
          {/* Step 1: Registration */}
          {currentStep === 1 && (
            <StepRegistration
              formData={formData}
              setFormData={setFormData}
              onNext={nextStep}
            />
          )}

          {/* Step 2: OTP Verification */}
          {currentStep === 2 && (
            <StepVerification
              formData={formData}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}

          {/* Step 3: Initial Details & Property Selection */}
         {/* Step 3: Initial Details */}
{currentStep === 3 && (
  <div>
    {/* Temporary Testing Bar */}
    <div style={{ padding: '10px', background: '#fff', marginBottom: '15px', textTransform: 'center' }}>
      <p style={{ fontWeight: 'bold', margin: '0 0 8px' }}>Test Selection:</p>
      <button 
        type="button" 
        onClick={() => setFormData(prev => ({ ...prev, propertyType: 'Flat / Apartment' }))}
        style={{ marginRight: '10px', padding: '6px 12px', cursor: 'pointer' }}
      >
        Select Flat / Apartment
      </button>
      <button 
        type="button" 
        onClick={() => setFormData(prev => ({ ...prev, propertyType: 'Independent House / Villa' }))}
        style={{ padding: '6px 12px', cursor: 'pointer' }}
      >
        Select Independent House / Villa
      </button>
      <p style={{ marginTop: '5px', fontSize: '12px' }}>
        Current Type: <strong>{formData.propertyType || 'None selected'}</strong>
      </p>
    </div>

    <StepInitialDetails
      formData={formData}
      setFormData={setFormData}
      onNext={nextStep}
      onPrev={prevStep}
    />
  </div>
)}

          {/* Step 4: Dynamic Specific Form (Flat / House / Villa) */}
          {currentStep === 4 && renderStepFour()}
        </div>
      </div>
    </div>
  );
};

export default PostProperty;