import React from "react";
import {
  FiArrowUpRight,  
  FiCalendar,
  FiHome,
  FiUsers,
} from "react-icons/fi";

const Dashboard = () => {
  const adminUser = JSON.parse(
    localStorage.getItem("adminUser") || "{}"
  );

  const stats = [
    {
      title: "Total Properties",
      value: "248",
      change: "+12.5%",
      icon: <FiHome />,
    },
    {
      title: "Active Listings",
      value: "186",
      change: "+8.2%",
      icon: <FiHome />,
    },
    {
      title: "Total Users",
      value: "64",
      change: "+14.4%",
      icon: <FiUsers />,
    },
    {
      title: "Site Visits",
      value: "126",
      change: "+6.8%",
      icon: <FiCalendar />,
    },
  ];

  return (
    <div>
      <div className="page-heading">
        <div>
          <span className="page-kicker">
            OVERVIEW
          </span>

          <h1>
            Good morning,{" "}
            {adminUser?.name?.split(" ")[0] ||
              "Admin"}
            .
          </h1>

          <p>
            Here's what's happening with your real
            estate business today.
          </p>
        </div>
      </div>

      <div className="row g-4 mb-4">
        {stats.map((stat) => (
          <div
            className="col-12 col-sm-6 col-xl-3"
            key={stat.title}
          >
            <div className="stat-card">
              <div className="stat-card-top">
                <div className="stat-icon">
                  {stat.icon}
                </div>

                <span className="stat-change">
                  <FiArrowUpRight />
                  {stat.change}
                </span>
              </div>

              <div className="stat-value">
                {stat.value}
              </div>

              <div className="stat-title">
                {stat.title}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4">
        <div className="col-12 col-xl-8">
          <div className="dashboard-card">
            <div className="dashboard-card-header">
              <div>
                <span className="page-kicker">
                  PERFORMANCE
                </span>
                <h5>Property Overview</h5>
              </div>

              <select className="dashboard-select">
                <option>Last 30 days</option>
                <option>Last 7 days</option>
                <option>This year</option>
              </select>
            </div>

            <div className="chart-placeholder">
              <div className="chart-bars">
                {[40, 65, 45, 80, 55, 72, 90, 62, 78, 95, 68, 86].map(
                  (height, index) => (
                    <div
                      key={index}
                      className="chart-bar-wrapper"
                    >
                      <div
                        className="chart-bar"
                        style={{
                          height: `${height}%`,
                        }}
                      />
                    </div>
                  )
                )}
              </div>

              <div className="chart-labels">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-4">
          <div className="dashboard-card h-100">
            <div className="dashboard-card-header">
              <div>
                <span className="page-kicker">
                  RECENT
                </span>
                <h5>Recent Activity</h5>
              </div>
            </div>

            <div className="activity-list">
              {[
                {
                  initials: "RK",
                  text: "Rahul added a new property",
                  time: "12 min ago",
                },
                {
                  initials: "AM",
                  text: "Amit updated customer details",
                  time: "28 min ago",
                },
                {
                  initials: "SK",
                  text: "Sneha created a new lead",
                  time: "1 hour ago",
                },
                {
                  initials: "RS",
                  text: "Ravi completed a site visit",
                  time: "2 hours ago",
                },
              ].map((item) => (
                <div
                  className="activity-item"
                  key={item.text}
                >
                  <div className="activity-avatar">
                    {item.initials}
                  </div>

                  <div>
                    <strong>{item.text}</strong>
                    <span>{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;