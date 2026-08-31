import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../../assets/paneldesign/css/FlatApartmentList.css";

const MOCK_PROPERTIES = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=150&auto=format&fit=crop&q=60",
    name: "Abcd",
    city: "Kolkata",
    status: "Under Review",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=150&auto=format&fit=crop&q=60",
    name: "Skyline Heights",
    city: "Kolkata",
    status: "Active",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=150&auto=format&fit=crop&q=60",
    name: "Green Residency",
    city: "Mumbai",
    status: "Deactivated",
  },
];

const IndependentHouseVila = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [properties, setProperties] = useState(MOCK_PROPERTIES);

  // Search filter handler
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setProperties(MOCK_PROPERTIES);
      return;
    }
    const filtered = MOCK_PROPERTIES.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.city.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setProperties(filtered);
  };

  // Toggle active / deactivate state
  const handleToggleDeactivate = (id) => {
    setProperties((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newStatus =
            item.status === "Deactivated" ? "Active" : "Deactivated";
          return { ...item, status: newStatus };
        }
        return item;
      }),
    );
  };

  // Navigate to the separate nested edit route
  const handleEditClick = (id) => {
    navigate(`/dashboard/edit-independent-house-vila/${id}`);
  };

  return (
    <div className="flat-apartment-container">
      {/* Search Bar */}
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
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="property-thumbnail"
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.city}</td>
                    <td>
                      <span
                        className={`status-badge ${item.status
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-btn-group">
                        <button
                          className="action-btn edit-btn"
                          onClick={() => handleEditClick(item.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="action-btn deactivate-btn"
                          onClick={() => handleToggleDeactivate(item.id)}
                        >
                          {item.status === "Deactivated"
                            ? "Activate"
                            : "Deactivate"}
                        </button>
                      </div>
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

export default IndependentHouseVila;
