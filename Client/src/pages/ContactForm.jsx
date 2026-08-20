import { useState } from "react";
import "../../src/assets/Font/css/style.css";
import "../../src/assets/content/style.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    country: "",
    contactNumber: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );

      const result = await response.json();
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mb-3">
        <input
          type="text"
          className="form-control"
          name="customerName"
          placeholder="Full Name"
          value={formData.customerName}
          onChange={handleChange}
        />
      </div>

      <div className="form-group mb-3">
        <input
          type="email"
          className="form-control"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="row">
        <div className="col-md-4">
          <select
            className="form-control"
            name="country"
            value={formData.country}
            onChange={handleChange}
          >
            <option value="">Select Country</option>
            <option value="India">India</option>
            <option value="USA">USA</option>
          </select>
        </div>

        <div className="col-md-8">
          <input
            type="text"
            className="form-control"
            name="contactNumber"
            placeholder="Contact Number"
            value={formData.contactNumber}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mt-3">
        <textarea
          className="form-control"
          rows="5"
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary mt-3"
      >
        Submit
      </button>
    </form>
  );
};

export default ContactForm;