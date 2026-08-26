import React, { useState } from "react";
import { FaUser } from "react-icons/fa";

const StepVerification = ({ onNext }) => {
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");

  // Restrict input to numbers only & maximum 4 digits
  const handleOtpChange = (e) => {
    const value = e.target.value;
    
    // Allow only numeric digits and limit length to 6
    if (/^\d*$/.test(value) && value.length <= 6) {
      setOtp(value);
      if (error) setError(""); // Clear error when typing
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();

    if (!otp) {
      setError("Please enter OTP");
      return;
    }

    // Check exact 6-digit numeric validation
    if (otp.length !== 6) {
      setError("OTP must be exactly 6 digits");
      return;
    }

    setError("");
    setIsVerified(true);
  };

  return (
    <div className="otp_verification_card">
      <div className="otp_header">
        <h3>OTP Verification</h3>
      </div>

      <div className="otp_body">
        <label htmlFor="otpInput">OTP</label>
        
        <div className="input_group">
          <span className="input_icon">
            <FaUser />
          </span>
          <input
            id="otpInput"
            type="text"
            inputMode="numeric"
            placeholder="Enter 6-digit OTP"
            value={otp}
            disabled={isVerified}
            maxLength={6}
            onChange={handleOtpChange}
          />
        </div>

        {/* Validation Error Text */}
        {error && <p className="error_text">{error}</p>}

        {/* Success Text */}
        {isVerified && <p className="success_text">OTP verified successfully</p>}

        {!isVerified && (
          <button type="button" className="resend_btn">
            Resend OTP
          </button>
        )}

        <div className="submit_btn_wrapper">
          {!isVerified ? (
            <button type="button" className="btn_next" onClick={handleVerify}>
              Submit &rarr;
            </button>
          ) : (
            <button type="button" className="btn_next" onClick={onNext}>
              Next &rarr;
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepVerification;