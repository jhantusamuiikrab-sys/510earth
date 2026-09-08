import React, { useEffect, useState } from "react";
import styles from "../assets/Content/AutoLeadAssignment.module.css";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

const AutoLeadAssignment = () => {
  const [propertyType, setPropertyType] = useState("");
  const [propertyName, setPropertyName] = useState("");
  const [agentName, setAgentName] = useState("");
  const [assignments, setAssignments] = useState([]);
  const [propertiesList, setPropertiesList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch initial data
  const fetchProperties = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/properties`);
      setPropertiesList(response.data.data || []);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  const fetchDistributedLeads = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/lead-distributin/LeadDistribution`
      );
      setAssignments(response.data.data || []);
    } catch (error) {
      console.error("Error fetching distributed leads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
    fetchDistributedLeads();
  }, []);

  // Filter properties based on selected Property Type
  const filteredProperties = propertiesList.filter((item) => {
    if (!propertyType) return true;
    return (
      item.propertyType?.toLowerCase() === propertyType.toLowerCase() ||
      item.PropertyType?.toLowerCase() === propertyType.toLowerCase()
    );
  });

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!propertyType || !propertyName || !agentName) {
      alert("Please select all options before submitting.");
      return;
    }

    try {
      const payload = {
        PropertyType: propertyType,
        PropertyName: propertyName,
        AgentName: agentName,
      };

      await axios.post(
        `${API_BASE_URL}/lead-distributin/LeadDistribution`,
        payload
      );

      // Reset form controls
      setPropertyType("");
      setPropertyName("");
      setAgentName("");

      // Refresh assignments table
      fetchDistributedLeads();
    } catch (error) {
      console.error("Error creating assignment:", error);
      alert("Failed to assign lead. Please try again.");
    }
  };

  // Delete Assignment Handler
  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to remove this property agent link?"
      )
    ) {
      return;
    }

    try {
      await axios.delete(
        `${API_BASE_URL}/lead-distributin/LeadDistribution/${id}`
      );
      setAssignments((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting record:", error);
      alert("Failed to delete record.");
    }
  };

  // Helper function to format Date fields
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Dynamic status color badge mapping
  const getTypeBadgeClass = (type) => {
    switch (type?.toLowerCase()) {
      case "residential":
        return styles.badgeResidential;
      case "commercial":
        return styles.badgeCommercial;
      case "land":
        return styles.badgeLand;
      default:
        return styles.typeBadge;
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
            onChange={(e) => {
              setPropertyType(e.target.value);
              setPropertyName(""); // Reset dynamic property name choice when type changes
            }}
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
            <option value="">Select PName</option>
            {filteredProperties.map((item) => {
              const pName = item.propertyName || item.PropertyName;
              return (
                <option key={item._id || item.id} value={pName}>
                  {pName}
                </option>
              );
            })}
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
              {loading ? (
                <tr>
                  <td colSpan="7" className={styles.emptyCell}>
                    Loading assignments...
                  </td>
                </tr>
              ) : assignments.length === 0 ? (
                <tr>
                  <td colSpan="7" className={styles.emptyCell}>
                    No property agent assignments found.
                  </td>
                </tr>
              ) : (
                assignments.map((row, index) => {
                  const type = row.PropertyType || row.propertyType;
                  const name = row.PropertyName || row.propertyName;
                  const agent = row.AgentName || row.agentName;
                  const connectedDate =
                    row.PropertyConnectedDate || row.connectedDate;
                  const assignDate = row.LastAssignDate || row.lastAssignDate;

                  return (
                    <tr key={row._id || index}>
                      <td className={styles.srCell}>#{index + 1}</td>
                      <td>
                        <span
                          className={`${styles.typeBadge} ${getTypeBadgeClass(
                            type
                          )}`}
                        >
                          {type}
                        </span>
                      </td>
                      <td className={styles.boldText}>{name}</td>
                      <td>{agent}</td>
                      <td className={styles.dateText}>
                        {formatDate(connectedDate)}
                      </td>
                      <td className={styles.dateText}>
                        {formatDate(assignDate)}
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <button
                          className={styles.deleteIconBtn}
                          onClick={() => handleDelete(row._id)}
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
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AutoLeadAssignment;