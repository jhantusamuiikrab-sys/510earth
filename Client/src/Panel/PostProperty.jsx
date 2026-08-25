import React, { useState } from "react";
import StepProgressBar from "./PostProperty/StepProgressBar";
import StepRegistration from "./PostProperty/StepRegistration";
import "../assets/paneldesign/css/PostProperty.css";

const PostProperty = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    role: "Dealer",
    name: "",
    contact: "",
    sameWhatsapp: false,
    password: "",
  });

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 8));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

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
          {currentStep === 1 && (
            <StepRegistration
              formData={formData}
              setFormData={setFormData}
              onNext={nextStep}
            />
          )}

          {currentStep === 2 && (
            <div className="p-4 text-center">
              <h3>Step 2: Verification</h3>
              <button className="btn btn-secondary me-2" onClick={prevStep}>
                Back
              </button>
              <button className="btn_next" onClick={nextStep}>
                Next &rarr;
              </button>
            </div>
          )}

          {/* Steps 3-8 render dynamically here */}
        </div>
      </div>
    </div>
  );
};

export default PostProperty;