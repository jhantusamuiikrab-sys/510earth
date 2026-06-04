import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
// import axios from 'axios';

const PropertyManagement = () => {
  // 1. Form State Management
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    location: '',
    message: '' // Kept from your @Html.HiddenFor model
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [activeModal, setActiveModal] = useState(null);

  const locationInputRef = useRef(null);
  const autocompleteRef = useRef(null);

  // 2. Load Google Maps Places Autocomplete dynamically safely
  useEffect(() => {
    // Check if script is already injected globally, if not, inject it
    const scriptId = 'google-maps-places-script';
    let script = document.getElementById(scriptId);

    const initAutocomplete = () => {
      if (!locationInputRef.current || !window.google) return;

      autocompleteRef.current = new window.google.maps.places.Autocomplete(
        locationInputRef.current,
        { componentRestrictions: { country: 'IN' } }
      );

      autocompleteRef.current.addListener('place_changed', () => {
        const place = autocompleteRef.current.getPlace();
        if (place && place.formatted_address) {
          setFormData((prev) => ({
            ...prev,
            location: place.formatted_address
          }));
          if (errors.location) setErrors((prev) => ({ ...prev, location: '' }));
        }
      });
    };

    if (!window.google) {
      if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.src = "https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyA6c3IfivOFIz0iI9XRM7rCJm-clhapr7w&region=in&libraries=places";
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }
      script.onload = initAutocomplete;
    } else {
      initAutocomplete();
    }

    // Clean up event listeners on component unmount
    return () => {
      if (window.google && window.google.maps && autocompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [errors.location]);

  // 3. Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // 4. Client Side Validations (Replaces jquery.validate)
  const validateForm = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.mobile.trim()) tempErrors.mobile = "Mobile number is required";
    
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
    }
    
    if (!formData.location.trim()) tempErrors.location = "Property location is required";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // 5. Axios Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await axios.post('/api/property-management/lead', formData);
      if (response.status === 200 || response.status === 201) {
        setSubmitStatus({ success: true, message: 'Thank you! Your request has been recorded.' });
        setFormData({ name: '', mobile: '', email: '', location: '', message: '' });
      }
    } catch (error) {
      setSubmitStatus({ 
        success: false, 
        message: error.response?.data?.message || 'Something went wrong. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // 6. Extracted Data Structures for Modals & Grids
  const managementPoints = [
    {
      id: 'mngModal1',
      title: 'Quality Verified Tenants',
      icon: 'fas fa-thumbs-up',
      shortText: 'The importance of getting good and Verified Tenants is well known to every Landlord...',
      longText: "The importance of getting good and Verified Tenants is well known to every Landlord. There's always a possibility of getting bad Tenants, which is the most significant issue faced in the rent market. The hassles involved dealing with them and then getting the concerned property vacated can be avoided by a thorough screening process that ensures you get good tenants who sre honest, loyal, pay Timely rent and have value in what they do. They follow the agreement and take good care of the property."
    },
    {
      id: 'mngModal2',
      title: 'Timely and Quick Documentation',
      icon: 'fas fa-file',
      shortText: 'The process of on-boarding Screening of Tenants can be time consuming and complicated...',
      hasList: true,
      longText: 'The process of on-boarding Screening of Tenants can be time consuming and complicated, difficult for every common person to understand. The following steps are lengthy and cumbersome:',
      listItems: [
        'Safety and liveable conditions of the property',
        'Instances of Evictions',
        'Regular Inspections',
        'Addendums to Leases',
        'Termination of Lease',
        'Handling of refundable security deposits',
        'Collection of Rent'
      ],
      footerText: 'However a professional company can make things fast, easy and free of any hidden Claus and make things simple for the Landlord.'
    },
    {
      id: 'mngModal4',
      title: 'Management of Continuous Renting Process',
      icon: 'fas fa-tasks',
      shortText: 'The most important three steps of managing the contineous renting process is well...',
      hasRichList: true,
      longText: 'The most important three steps of managing the contineous renting process is well managed if a professional company is managing the affairs. They are as following:',
      richListItems: [
        { label: 'Improve and ready the property for rent –', text: 'A property manager will suggest and supervise beautification improvements that maximize revenue.' },
        { label: 'Ascertain the best rent rate –', text: 'Too high and you are stuck waiting, to low and you’re losing money every month the tenant is in the unit. Assessment of best possible price requires knowledge of the local market, data on recently sold comparables, and access to rental rate tools.' },
        { label: 'Effective market strategy for your property –', text: 'An experienced property management company has written hundreds of ads and understands what to say and where advertise in order to get good number of consumers in a shorter period of time. Additionally because of their volume they can usually negotiate cheaper advertising rates both online and offline. Lastly, they are familiar with sales and know how to close when they field calls from prospects and take them on showings.' }
      ]
    },
    {
      id: 'mngModal5',
      title: 'Property Repairs & Maintenance',
      icon: 'fas fa-cogs',
      shortText: 'The major part of any property is maintainence and timely repair works, which is almost required...',
      longText: 'The major part of any property is maintainence and timely repair works, which is almost required every alternate year. And in the condition of Tenant change painting and minor repair is essential. There a professional can arrange for timely and Cost Effective repair works.'
    }
  ];

  return (
    <>
      {/* Dynamic SEO Header Configuration (Replaces ViewBag variables) */}
      <Helmet>
        <title>Property Management Services In Kolkata | 510earth</title>
        <meta name="description" content="510earth provides Property Management Services In India, which includes Suitable Rent Solution, Analyse, Timely Reporting, Quality, Cost Effective, etc Call Now." />
        <link rel="canonical" href="https://yourdomain.com/Property-Management" />
        <link href="https://fonts.googleapis.com/css2?family=Fjalla+One&family=Michroma&family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Raleway&display=swap" rel="stylesheet" />
      </Helmet>

      {/* Banner Section */}
      <section className="manage_bnnr" role="img" aria-label="property-management-services">
        <div className="container">
          <div className="row">
            <div className="col-sm-10 offset-md-1">
              <h2>Searching for Property Management Services</h2>
              <p>We Are Here To Help...</p>
              <div className="btn_area">
                <a href="/contact">Contact Us</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="form_sec">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1 col-sm-12">
              <div className="form_area">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="form_box col-md-6 mb-3">
                      <label>Name</label>
                      <input 
                        type="text" 
                        name="name"
                        className="form-control" 
                        placeholder="Enter Your Name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                      {errors.name && <span className="text-danger">{errors.name}</span>}
                    </div>

                    <div className="form_box col-md-6 mb-3">
                      <label>Mobile</label>
                      <input 
                        type="text" 
                        name="mobile"
                        className="form-control" 
                        placeholder="Enter Your Mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                      />
                      {errors.mobile && <span className="text-danger">{errors.mobile}</span>}
                    </div>

                    <div className="form_box col-md-6 mb-3">
                      <label>E-mail</label>
                      <input 
                        type="email" 
                        name="email"
                        className="form-control" 
                        placeholder="Enter Your E-mail"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                      {errors.email && <span className="text-danger">{errors.email}</span>}
                    </div>

                    <div className="form_box col-md-6 mb-3">
                      <label>Property Location</label>
                      <input 
                        ref={locationInputRef}
                        type="text" 
                        name="location"
                        id="Location" 
                        className="form-control" 
                        placeholder="Enter Your Location"
                        value={formData.location}
                        onChange={handleInputChange}
                      />
                      {errors.location && <span className="text-danger">{errors.location}</span>}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <div className="form_btn">
                        <button type="submit" disabled={isSubmitting}>
                          {isSubmitting ? 'Submitting...' : 'Submit'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {submitStatus && (
                    <div className={`alert mt-3 ${submitStatus.success ? 'alert-success' : 'alert-danger'}`}>
                      {submitStatus.message}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="container mng_btm_area mt-4">
          <div className="col-md-12">
            <p>Our expert management and your property put together can take<br /> your profitability to the next level. </p>
            <p>We as a startup endeavor to create professionally managed environment for every property with maximum utilisation and enhanced profitability. </p>
            <p>Assign your property issues to us and concentrate<br /> diligently on your Career and Family. </p>
          </div>
        </div>
      </section>

      {/* Expect Section */}
      <section className="expect_area">
        <div className="container">
          <div className="row">
            <div className="col-md-7 d-flex">
              <div className="expect_left">
                <h2 className="head">What to expect</h2>
                <div className="central-border"></div>
                <ul>
                  <li>Flexible Customised Solution as per Client's need</li>
                  <li>Analyse, Promote and Find Suitable Rent Solution </li>
                  <li>Proper Background Check for Prospective Client</li>
                  <li>Conduct all required Agreement & Paperwork </li>
                  <li>Transparent Rent Management & Timely Reporting </li>
                  <li>Quality, Cost Effective and Flawless Repairs</li>
                </ul>
                <p>Complete Control of your Property, You stay on top of every aspect of your Property </p>
              </div>
            </div>
            <div className="col-md-5 d-flex">
              <div className="expect_right">
                <img src="/images/expt_img.jpg" alt="property-management-expert" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fixed section: Why need a property management services */}
      <section className="mng_why_area" role="img" aria-label="property-management-company-510earth">
        <div className="container">
          <div className="row justify-content-end">
            <div className="col-md-6">
              <h2>Why need a property management services</h2>
              <p>"Let the professional do the job and you do what you are best at", perhaps the best and most primary reason to hire a property management company.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Fixed section: Examine section */}
      <section className="examine_area">
        <div className="container">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <p>However, there are endless benefits of getting the help of a professional company, let's examine:</p>
              <div className="central-border"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Points Area Layout */}
      <section className="mng_point_area">
        <div className="container">
          <div className="row">
            {managementPoints.map((point) => (
              <div className="col-md-6 d-flex mb-4" key={point.id}>
                <div className="mng_box w-100">
                  <div className="mng_img_box">
                    <i className={point.icon}></i>
                  </div>
                  <div className="mng_cont_box">
                    <h3>{point.title}</h3>
                    <p>
                      {point.shortText}{' '}
                      <button 
                        type="button" 
                        className="btn btn-link p-0 m-0 style-unset" 
                        onClick={() => setActiveModal(point.id)}
                        style={{ textDecoration: 'underline', verticalAlign: 'baseline' }}
                      >
                        Know More
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Native React Modal Integration (No jQuery Conflict Risk) */}
      {activeModal && (() => {
        const modalData = managementPoints.find((p) => p.id === activeModal);
        if (!modalData) return null;
        return (
          <div className="modal show d-block fade in mng_modal" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header border-0 pb-0 justify-content-end">
                  <button type="button" className="close p-2" onClick={() => setActiveModal(null)} aria-label="Close">
                    <span aria-hidden="true" style={{ fontSize: '1.8rem' }}>&times;</span>
                  </button>
                </div>
                <div className="modal-body pt-0">
                  <h3>{modalData.title}</h3>
                  <p>{modalData.longText}</p>
                  
                  {/* Handle Custom list layout for Modal #2 */}
                  {modalData.hasList && (
                    <ul>
                      {modalData.listItems.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                  )}
                  {modalData.footerText && <p className="mt-2">{modalData.footerText}</p>}

                  {/* Handle Custom Rich definitions list layout for Modal #4 */}
                  {modalData.hasRichList && (
                    <ul>
                      {modalData.richListItems.map((item, index) => (
                        <li key={index} className="mb-2">
                          <strong>{item.label}</strong> {item.text}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </>
  );
};

export default PropertyManagement;