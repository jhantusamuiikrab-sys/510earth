// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import styles from "../assets/Content/ViewSubscriber.module.css";

// function ViewSubscriber() {
//   const [subscribers, setSubscribers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   // Fetch Subscribers from Backend
//   const fetchSubscribers = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get("http://localhost:3000/api/subscribers");
//       setSubscribers(response.data.data || response.data || []);
//     } catch (error) {
//       console.error("Error fetching subscribers:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSubscribers();
//   }, []);

//   // Export to Excel / CSV Handler
//   const handleExportToExcel = () => {
//     if (subscribers.length === 0) {
//       alert("No data available to export.");
//       return;
//     }

//     const headers = ["SL NO,Subscriber Email\n"];
//     const rows = subscribers.map(
//       (sub, index) => `${index + 1},"${sub.email}"\n`
//     );
//     const blob = new Blob([headers.concat(rows)], { type: "text/csv" });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "subscribers_list.csv";
//     a.click();
//     window.URL.revokeObjectURL(url);
//   };

//   // Pagination Logic
//   const totalPages = Math.ceil(subscribers.length / itemsPerPage) || 1;
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentSubscribers = subscribers.slice(
//     indexOfFirstItem,
//     indexOfLastItem
//   );

//   return (
//     <div className={styles.container}>
//       {/* Top Header Section */}
//       <div className={styles.topHeader}>
//         <h1 className={styles.title}>Subscriber Elements</h1>
//         <button
//           className={styles.exportBtn}
//           onClick={handleExportToExcel}
//         >
//           Export To Excel
//         </button>
//       </div>

//       {/* Main Table Card */}
//       <div className={styles.tableCard}>
//         <div className={styles.cardHeader}>
//           <h3>Subscribe Table</h3>
//         </div>

//         <div className={styles.tableWrapper}>
//           <table className={styles.table}>
//             <thead>
//               <tr>
//                 <th style={{ width: "80px" }}>SL NO</th>
//                 <th>Subscriber Name</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="2" className={styles.emptyCell}>
//                     Loading subscribers...
//                   </td>
//                 </tr>
//               ) : currentSubscribers.length === 0 ? (
//                 <tr>
//                   <td colSpan="2" className={styles.emptyCell}>
//                     No subscribers found.
//                   </td>
//                 </tr>
//               ) : (
//                 currentSubscribers.map((item, index) => (
//                   <tr key={item._id || index}>
//                     <td className={styles.srCell}>
//                       {indexOfFirstItem + index + 1}
//                     </td>
//                     <td>{item.email}</td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination Footer */}
//         <div className={styles.paginationWrapper}>
//           <span className={styles.pageInfo}>
//             Page {currentPage} of {totalPages}.
//           </span>
//           <div className={styles.paginationControls}>
//             {data.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//               <button
//                 key={page}
//                 className={`${styles.pageBtn} ${
//                   currentPage === page ? styles.activePage : ""
//                 }`}
//                 onClick={() => setCurrentPage(page)}
//               >
//                 {page}
//               </button>
//             ))}
//             <button
//               className={styles.pageBtn}
//               onClick={() =>
//                 setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//               }
//               disabled={currentPage === totalPages}
//             >
//               »
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ViewSubscriber;

import React, { useState } from "react";
import styles from "../assets/Content/ViewSubscriber.module.css";

// Static Initial Subscribers Data
const data = [
  { id: 1, email: "mdwakil9295@gmail.com" },
  { id: 2, email: "harunrupam84@gmail.com" },
  { id: 3, email: "rajarshisinha2013@gmail.com" },
  { id: 4, email: "rachelshaan@gmail.com" },
  { id: 5, email: "iamsubratadatta1963@gmail.com" },
  { id: 6, email: "brindashikha77@gmail.com" },
  { id: 7, email: "virchauhan868@gmail.com" },
  { id: 8, email: "Sarai718_Beatty_1981@alabamahomenetwoks.com" },
  { id: 9, email: "Alvera990_Corkery.1966@alabamahomenetwoks.com" },
  { id: 10, email: "Malvina976Schowalter1981@alabamahomenetwoks.com" },
  { id: 11, email: "john.doe@example.com" },
  { id: 12, email: "jane.smith@example.com" },
  { id: 13, email: "alex.dev@gmail.com" },
  { id: 14, email: "support@techcorp.io" },
];

function ViewSubscriber() {
  const [subscribers] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Static Export to Excel/CSV
  const handleExportToExcel = () => {
    if (subscribers.length === 0) {
      alert("No data to export.");
      return;
    }

    const headers = "SL NO,Subscriber Email\n";
    const rows = subscribers
      .map((sub, index) => `${index + 1},"${sub.email}"`)
      .join("\n");

    const blob = new Blob([headers + rows], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "subscribers_list.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Pagination Logic
  const handlePageSelect = (id) => {
    setCurrentPage(id);
  };
  return (
    <div className={styles.container}>
      {/* Top Header Section */}
      <div className={styles.topHeader}>
        <h1 className={styles.title}>Subscriber Elements</h1>
        <button className={styles.exportBtn} onClick={handleExportToExcel}>
          Export To Excel
        </button>
      </div>

      {/* Table Card */}
      <div className={styles.tableCard}>
        <div className={styles.cardHeader}>
          <h3>Subscribe Table</h3>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ width: "100px" }}>SL NO</th>
                <th>Subscriber Name</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan="2" className={styles.emptyCell}>
                    No subscribers found.
                  </td>
                </tr>
              ) : (
                data
                  .slice(
                    currentPage * itemsPerPage - itemsPerPage,
                    currentPage * itemsPerPage,
                  )
                  .map((item, index) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.email}</td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className={styles.paginationWrapper}>
          <div className={styles.paginationControls}>
            {[...Array(totalPages)].map((_, i) => (
              <span
                key={i}
                onClick={(e) => handlePageSelect(i + 1)}
                className={`${styles.pageBtn} ${
                  currentPage === i + 1 ? styles.activePage : ""
                }`}
              >
                {i + 1}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewSubscriber;

