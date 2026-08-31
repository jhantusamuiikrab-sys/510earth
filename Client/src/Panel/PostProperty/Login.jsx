import React, { useState } from "react";
import "../../assets/paneldesign/css/Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [view, setView] = useState("login");

  const [formData, setFormData] = useState({
    emailOrNumber: "8968473542",
    password: "password",
    rememberMe: false,
    contactNumber: "",
    forgotMobileNumber: "",
  });

  const [forgotMsg, setForgotMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Specific change handler for mobile number input validation
  const handleMobileNumberChange = (e) => {
    const value = e.target.value;

    // Allows only numbers up to 10 digits
    if (/^\d{0,10}$/.test(value)) {
      setFormData((prev) => ({
        ...prev,
        forgotMobileNumber: value,
      }));

      // Clear inline error when user fixes input
      if (errorMsg) setErrorMsg("");
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (
      formData.emailOrNumber === "8968473542" &&
      formData.password === "password"
    ) {
      navigate("/dashboard");
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    const phone = formData.forgotMobileNumber;

    // Validate that it starts with 6, 7, 8, or 9 and is exactly 10 digits
    const validPattern = /^[6-9]\d{9}$/;

    if (!validPattern.test(phone)) {
      setForgotMsg("");
      setErrorMsg(
        "Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9.",
      );
      return;
    }

    setErrorMsg("");
    setForgotMsg(
      "User Id & Password has been send to your registered mobile number.",
    );
  };

  const handleBackToLogin = () => {
    setView("login");
    setForgotMsg("");
    setErrorMsg("");
    setFormData((prev) => ({ ...prev, forgotMobileNumber: "" }));
  };

  return (
    <div className="login_page_container">
      {view === "login" ? (
        /* ================= LOGIN FORM ================= */
        <div className="login_modal_card pop_in_anim">
          <div className="login_header">
            <span className="lock_icon">🔐</span>
            <h3>Log In With Password</h3>
          </div>

          <form onSubmit={handlePasswordSubmit} className="login_form">
            <div className="form_group">
              <label htmlFor="emailOrNumber">Number</label>
              <input
                type="text"
                id="emailOrNumber"
                name="emailOrNumber"
                value={formData.emailOrNumber}
                onChange={(e) =>
                  setFormData({ ...formData, emailOrNumber: e.target.value })
                }
                placeholder="admin@510earth.in"
                required
              />
            </div>

            <div className="form_group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>

            <div className="remember_me_group">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={(e) =>
                  setFormData({ ...formData, rememberMe: e.target.checked })
                }
              />
              <label htmlFor="rememberMe">Remember me</label>
            </div>

            <div className="btn_group_row">
              <button type="submit" className="btn_blue">
                Sign In
              </button>
              <button
                type="button"
                className="btn_blue"
                onClick={() => setView("forgotPassword")}
              >
                Forgot Password
              </button>
            </div>
          </form>

          <div className="or_divider_wrapper">
            <hr className="divider_line" />
            <span className="or_badge">OR</span>
          </div>

          <div className="login_header">
            <span className="lock_icon mobile_icon">📱</span>
            <h3>Log In With OTP</h3>
          </div>

          <form onSubmit={handleOtpSubmit} className="login_form">
            <div className="form_group">
              <label htmlFor="contactNumber">Contact Number</label>
              <input
                type="text"
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={(e) =>
                  setFormData({ ...formData, contactNumber: e.target.value })
                }
                placeholder="Contact Number"
                required
              />
            </div>

            <div className="btn_center_wrapper">
              <button type="submit" className="btn_blue">
                Send OTP
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* ================= FORGOT PASSWORD FORM ================= */
        <div
          className="login_modal_card pop_in_anim"
          style={{ textAlign: "center", padding: "30px" }}
        >
          <form onSubmit={handleForgotPasswordSubmit} className="login_form">
            <div className="form_group" style={{ marginBottom: "15px" }}>
              <input
                type="text"
                name="forgotMobileNumber"
                value={formData.forgotMobileNumber}
                onChange={handleMobileNumberChange}
                placeholder="Registered Mobile Number"
                maxLength={10}
                required
                style={{ width: "100%", padding: "10px", fontSize: "14px" }}
              />
            </div>

            {/* Validation Error Message */}
            {errorMsg && (
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                  margin: "5px 0 10px 0",
                  textAlign: "left",
                }}
              >
                {errorMsg}
              </p>
            )}

            {/* Success Message */}
            {forgotMsg && (
              <p
                style={{
                  color: "#ff0000",
                  fontSize: "13px",
                  margin: "10px 0 15px 0",
                  textAlign: "left",
                }}
              >
                {forgotMsg}
              </p>
            )}

            <div
              style={{ display: "flex", justifyContent: "center", gap: "10px" }}
            >
              <button
                type="submit"
                className="btn_blue"
                style={{ minWidth: "120px" }}
              >
                Submit
              </button>
              <button
                type="button"
                className="btn_blue"
                onClick={handleBackToLogin}
                style={{ backgroundColor: "#6c757d", minWidth: "100px" }}
              >
                Back
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
