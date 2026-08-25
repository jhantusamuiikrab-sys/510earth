import React from "react";

const STEPS = [
  { id: 1, name: "Registration" },
  { id: 2, name: "Verification" },
  { id: 3, name: "Initial Property Details" },
  { id: 4, name: "Property Details" },
  { id: 5, name: "Amenities" },
  { id: 6, name: "Near By" },
  { id: 7, name: "Key Features" },
  { id: 8, name: "Other Information" },
];

const StepProgressBar = ({ currentStep }) => {
  return (
    <div className="stepper_wrapper">
      <div className="stepper_line"></div>
      {STEPS.map((step) => {
        const isActive = step.id === currentStep;
        const isCompleted = step.id < currentStep;

        return (
          <div
            key={step.id}
            className={`stepper_item ${isActive ? "active" : ""} ${
              isCompleted ? "completed" : ""
            }`}
          >
            <div className="stepper_circle">{step.id}</div>
            <span className="stepper_title">{step.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default StepProgressBar;