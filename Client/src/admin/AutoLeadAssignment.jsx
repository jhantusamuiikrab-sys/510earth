import React, { useEffect, useState } from "react";
import styles from "../assets/Content/AutoLeadAssignment.module.css";
import axios from "axios";
// Initial mock data based on the provided UI layout

const AutoLeadAssignment = () => {
  const [propertyType, setPropertyType] = useState("");
  const [propertyName, setPropertyName] = useState("");
  const [agentName, setAgentName] = useState("");
  const [assignments, setAssignments] = useState([]);
  const [propertiesList, setPropertiesList] = useState([]);

  const fetchProperties = async (req, res) => {
    try {
      const data = await axios.get(`http://localhost:3000/api/properties`);
      setPropertiesList(data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProperties();
    assignments.map((item, index) => {
      setPropertyName(item.propertyName);
    });
  }, []);
  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!propertyType || !propertyName || !agentName) {
      alert("Please select all options before submitting.");
      return;
    }

    const now = new Date();
    const formattedDate = `${now.toLocaleDateString("en-GB")} ${now.toLocaleTimeString()}`;

    const newAssignment = {
      id: assignments.length + 1,
      propertyType,
      propertyName,
      agentName,
      connectedDate: formattedDate,
      lastAssignDate: formattedDate,
    };

    setAssignments([newAssignment, ...assignments]);

    // Reset dropdowns
    setPropertyType("");
    setPropertyName("");
    setAgentName("");
  };

  // Delete assignment record
  const handleDelete = (id) => {
    if (
      window.confirm(
        "Are you sure you want to remove this property agent link?",
      )
    ) {
      setAssignments((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <div className={styles.container}>
      {/* Page Header */}
      <div className={styles.header}>
        <span className={styles.subtext}>LEADS AUTOMATION</span>
        <h1 className={styles.title}>Auto Lead Assignment By Property</h1>
      </div>

      {/* Select Assignment Form */}
      <form className={styles.formCard} onSubmit={handleSubmit}>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>PROPERTY TYPE</label>
          <select
            className={styles.selectInput}
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option value="">Select Ptype</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Land">Land</option>
          </select>
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>PROPERTY NAME</label>
          <select
            className={styles.selectInput}
            value={propertyName}
            onChange={(e) => setPropertyName(e.target.value)}
          >
            {/* Static Default Placeholder Option */}
            <option value="">Select PName</option>

            {/* Dynamic Options Fetched From API */}
            {propertiesList.map((item) => (
              <option key={item._id || item.id} value={item.propertyName}>
                {item.propertyName}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.fieldGroup}>
          <label className={styles.label}>AGENT NAME</label>
          <select
            className={styles.selectInput}
            value={agentName}
            onChange={(e) => setAgentName(e.target.value)}
          >
            <option value="">Select Agent</option>
            <option value="Madhabi Agarwal">Madhabi Agarwal</option>
            <option value="Sumita Mukherjee">Sumita Mukherjee</option>
            <option value="Abhisekh Das">Abhisekh Das</option>
          </select>
        </div>

        <button type="submit" className={styles.submitBtn}>
          Submit
        </button>
      </form>

      {/* Table Card */}
      <div className={styles.tableCard}>
        <div className={styles.cardHeader}>
          <h3>Property Agents Table</h3>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ width: "60px" }}>#SR</th>
                <th>PROPERTY TYPE</th>
                <th>PROPERTY NAME</th>
                <th>AGENT NAME</th>
                <th>PROPERTY CONNECTED DATE</th>
                <th>LAST ASSIGN DATE</th>
                <th style={{ textAlign: "right" }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {assignments.length === 0 ? (
                <tr>
                  <td colSpan="7" className={styles.emptyCell}>
                    No property agent assignments found.
                  </td>
                </tr>
              ) : (
                assignments.map((row, index) => (
                  <tr key={index}>
                    <td className={styles.srCell}>#{index + 1}</td>
                    <td>
                      <span className={styles.typeBadge}>
                        {row.propertyType}
                      </span>
                    </td>
                    <td className={styles.boldText}>{row.propertyName}</td>
                    <td>{row.agentName}</td>
                    <td className={styles.dateText}>{row.connectedDate}</td>
                    <td className={styles.dateText}>{row.lastAssignDate}</td>
                    <td style={{ textAlign: "right" }}>
                      <button
                        className={styles.deleteIconBtn}
                        onClick={() => handleDelete(row.id)}
                        title="Delete Link"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          <line x1="10" y1="11" x2="10" y2="17" />
                          <line x1="14" y1="11" x2="14" y2="17" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AutoLeadAssignment;
