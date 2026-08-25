import React from "react";

const StepRegistration = ({ formData, setFormData, onNext }) => {
  const handleRoleSelect = (role) => {
    setFormData((prev) => ({ ...prev, role }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="step_card_content">
      {/* Role Selector Header */}
      <div className="blue_header_banner">Let's Know You</div>

      <form onSubmit={handleSubmit}>
        <div className="role_selection_section">
          <p className="role_title">I am a</p>

          <div className="roles_grid">
            {/* Builder Option */}
            <div
              className={`role_card ${formData.role === "Builder" ? "selected" : ""}`}
              onClick={() => handleRoleSelect("Builder")}
            >
              <div className="role_icon builder_icon">🏢</div>
              <div className="radio_circle"></div>
              <span>Builder</span>
            </div>

            {/* Dealer Option */}
            <div
              className={`role_card ${formData.role === "Dealer" ? "selected" : ""}`}
              onClick={() => handleRoleSelect("Dealer")}
            >
              <div className="role_icon dealer_icon">🤝</div>
              <div className="radio_circle"></div>
              <span>Dealer</span>
            </div>

            {/* Owner Option */}
            <div
              className={`role_card ${formData.role === "Owner" ? "selected" : ""}`}
              onClick={() => handleRoleSelect("Owner")}
            >
              <div className="role_icon owner_icon">🏡</div>
              <div className="radio_circle"></div>
              <span>Owner</span>
            </div>
          </div>
        </div>

        {/* Input Fields */}
        <div className="form_fields_wrapper">
          <div className="form_group">
            <label>Your Name</label>
            <div className="input_with_icon">
              <span className="input_icon">👤</span>
              <input
                type="text"
                name="name"
                placeholder="Enter Your Name"
                value={formData.name || ""}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form_group">
            <label>Contact Number</label>
            <div className="input_with_icon">
              <span className="input_icon">📞</span>
              <input
                type="text"
                name="contact"
                placeholder="Contact Number"
                value={formData.contact || ""}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="whatsapp_check">
            <span className="wa_icon">💬</span>
            <input
              type="checkbox"
              id="sameWhatsapp"
              checked={formData.sameWhatsapp || false}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  sameWhatsapp: e.target.checked,
                }))
              }
            />
            <label htmlFor="sameWhatsapp">Whatsapp Number</label>
          </div>

          <div className="form_group">
            <label>Create Password</label>
            <div className="input_with_icon">
              <span className="input_icon">🔑</span>
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={formData.password || ""}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="text-center mt-4">
            <button type="submit" className="btn_next">
              Next &rarr;
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StepRegistration;