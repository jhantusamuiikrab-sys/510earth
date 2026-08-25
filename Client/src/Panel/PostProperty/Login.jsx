import React, { useState } from "react";
import "../../assets/paneldesign/css/Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    emailOrNumber: "",
    password: "",
    rememberMe: false,
    contactNumber: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="login_page_container">
      {/* Pop-in animated modal card */}
      <div className="login_modal_card pop_in_anim">
        
        {/* Section 1: Password Login */}
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
              onChange={handleChange}
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
              onChange={handleChange}
              required
            />
          </div>

          <div className="remember_me_group">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            <label htmlFor="rememberMe">Remember me</label>
          </div>

          <div className="btn_group_row">
            <button type="submit" className="btn_blue">
              Sign In
            </button>
            <button type="button" className="btn_blue">
              Forgot Password
            </button>
          </div>
        </form>

        {/* Perfectly Centered OR Divider */}
        <div className="or_divider_wrapper">
          <hr className="divider_line" />
          <span className="or_badge">OR</span>
        </div>

        {/* Section 2: OTP Login */}
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
              onChange={handleChange}
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
    </div>
  );
};

export default Login;