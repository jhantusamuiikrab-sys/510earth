import React, { useState } from "react";
import StepProgressBar from "./PostProperty/StepProgressBar";
import StepRegistration from "./PostProperty/StepRegistration";
import StepVerification from "./PostProperty/StepVerification";
import StepInitialDetails from "./PostProperty/StepInitialDetails";
import StepFlatApartment from "./PostProperty/StepFlatApartment";
import StepIndependentHouseVilla from "./PostProperty/StepIndependentHouseVilla";
import StepCommercialProperty from "./PostProperty/StepCommercialProperty";
import StepAmenities from "./PostProperty/StepAmenities";
import StepNearBy from "./PostProperty/StepNearBy";
import StepKeyFeatures from "./PostProperty/StepKeyFeatures";
import StepOtherInformation from "./PostProperty/StepOtherInformation";
import PropertyPostSuccessful from "./PostProperty/PropertyPostSuccessful";
import "../assets/paneldesign/css/PostProperty.css";

const PostProperty = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    role: "Dealer",
    name: "",
    contact: "",
    sameWhatsapp: false,
    password: "",
    propertyType: "",
  });

  // Updated max step limit to 9 for the success screen
  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 9));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

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
          <StepFlatApartment
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
      {/* Hide registration banner and stepper when success screen appears */}
      {currentStep <= 8 && (
        <>
          <div className="registration_banner">
            <h2>Registration Form</h2>
          </div>

          <div className="stepper_outer_container">
            <div className="container">
              <StepProgressBar currentStep={currentStep} />
            </div>
          </div>
        </>
      )}

      {/* Dynamic Form Card */}
      <div className="container form_card_container">
        <div className="main_form_card">
          {currentStep === 1 && (
            <StepRegistration
              formData={formData}
              setFormData={setFormData}
              onNext={nextStep}
            />
          )}

          {currentStep === 2 && (
            <StepVerification
              formData={formData}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}

          {currentStep === 3 && (
            <StepInitialDetails
              formData={formData}
              setFormData={setFormData}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}

          {currentStep === 4 && renderStepFour()}

          {currentStep === 5 && (
            <StepAmenities
              formData={formData}
              setFormData={setFormData}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}

          {currentStep === 6 && (
            <StepNearBy
              formData={formData}
              setFormData={setFormData}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}

          {currentStep === 7 && (
            <StepKeyFeatures
              formData={formData}
              setFormData={setFormData}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}

          {/* Step 8: Other Information -> onSubmit triggers nextStep (Step 9) */}
          {currentStep === 8 && (
            <StepOtherInformation
              formData={formData}
              setFormData={setFormData}
              onSubmit={nextStep}
              onPrev={prevStep}
            />
          )}

          {/* Step 9: Render Success Component inside the flow */}
          {currentStep === 9 && <PropertyPostSuccessful />}
        </div>
      </div>
    </div>
  );
};

export default PostProperty;