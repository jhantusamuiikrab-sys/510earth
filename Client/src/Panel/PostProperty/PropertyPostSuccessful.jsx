import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import '../../assets/paneldesign/css/PropertyPostSuccessful.css';

const PropertyPostSuccessful = () => {
  const navigate = useNavigate();

  const handleOk = () => {
    navigate('/Login'); // Route back home or to desired page
  };

  return (
    <div className="success_modal_overlay">
      <div className="success_card">
        <div className="circle_icon_wrapper">
          <FaCheckCircle className="check_icon" />
        </div>
        
        <div className="success_banner">
          <h3>Your property post successfully submitted</h3>
        </div>

        <p className="sub_text">It will be visible after verification</p>
        <h4 className="thank_you_text">Thank You</h4>

        <button type="button" className="btn_ok" onClick={handleOk}>
          OK
        </button>
      </div>
    </div>
  );
};

export default PropertyPostSuccessful;