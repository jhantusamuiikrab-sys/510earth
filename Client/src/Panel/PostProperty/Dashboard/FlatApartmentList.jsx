import React, { useState } from 'react';
import "../../../assets/paneldesign/css/FlatApartmentList.css";

const FlatApartmentList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [properties, setProperties] = useState([
    // Example data structure
    // { id: 1, image: '/path/to/img.jpg', name: 'Skyline Heights', city: 'Mumbai', status: 'Active' }
  ]);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for property:', searchTerm);
    // Trigger API call or filtering logic here
  };

  return (
    <div className="flat-apartment-container">
      {/* Top Search Bar */}
      <div className="search-section">
        <label htmlFor="propertyName" className="search-label">
          Property Name
        </label>
        <div className="search-input-group">
          <input
            type="text"
            id="propertyName"
            placeholder="Select property name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="button" onClick={handleSearch} className="search-btn">
            Search
          </button>
        </div>
      </div>

      {/* Property Table Card */}
      <div className="table-card">
        <div className="table-header">
          <h2 className="table-title">Flat/Apartment</h2>
        </div>

        <div className="table-wrapper">
          <table className="property-table">
            <thead>
              <tr>
                <th className="col-sr">Sr</th>
                <th className="col-image">Image</th>
                <th className="col-name">Property Name</th>
                <th className="col-city">City</th>
                <th className="col-status">Status</th>
                <th className="col-operation">Operation</th>
              </tr>
            </thead>
            <tbody>
              {properties.length > 0 ? (
                properties.map((item, index) => (
                  <tr key={item.id || index}>
                    <td>{index + 1}</td>
                    <td>
                      <img src={item.image} alt={item.name} className="property-thumbnail" />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.city}</td>
                    <td>
                      <span className={`status-badge ${item.status.toLowerCase()}`}>
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <button className="action-btn edit">Edit</button>
                      <button className="action-btn delete">Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-data">
                    No properties found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FlatApartmentList;