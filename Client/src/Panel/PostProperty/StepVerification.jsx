import React, { useState } from "react";
import { FaUser } from "react-icons/fa";

const StepVerification = ({ onNext }) => {
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = (e) => {
    e.preventDefault();
    if (!otp) {
      setError("Please enter OTP");
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
        <label>OTP</label>
        
        <div className="input_group">
          <span className="input_icon">
            <FaUser />
          </span>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            disabled={isVerified}
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>

        {isVerified && <p className="success_text">OTP verified successfully</p>}
        {error && <p className="success_text">{error}</p>}

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