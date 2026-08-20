import React from 'react';
import '../../assets/Font/NewHome/style.css'; // Importing CSS specific to ReraSection

const ReraSection = () => {
  // Keeping RERA details in an array makes it easy to add more states later 
  // or fetch dynamically from a MongoDB database in the future.
  const reraCertificates = [
    {
      id: 1,
      state: "Maharashtra",
      regNumber: "A52100043083"
    },
    {
      id: 2,
      state: "West Bengal",
      regNumber: "WBRERA/A/SOU/2023/000185"
    }
  ];

  return (
    <section className="rera_area py-5">
      <div className="container">
        <div className="row text-center mb-4">
          <div className="col-md-12">
            {/* Standardized typography capitalization */}
            <h2 className="text-capitalize fw-bold">Real Estate Consultant in Kolkata</h2>
          </div>
        </div>
        
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="row g-4">
              {reraCertificates.map((cert) => (
                <div className="col-md-6" key={cert.id}>
                  <div className="rera_box p-4 border rounded shadow-sm text-center bg-white h-100">
                    <h3 className="h5 text-muted mb-2">RERA Registration</h3>
                    <span className="d-block fw-bold text-primary mb-1">{cert.state}</span>
                    <p className="text-secondary mb-0 small font-monospace">{cert.regNumber}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReraSection;