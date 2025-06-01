import React, { useState, useEffect } from "react";
import "./ContentMain.css";
import axios from "axios";
import Account from "../../menus/account/index";
import PatientRecord from "../../menus/records/index";
import Analytics from "../../menus/analytics/index";
import Saving from "../../menus/saving/index";
import Messages from "../../menus/messages/index";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const ContentMain = ({ activeTab }) => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [joinNowPatientId, setJoinNowPatientId] = useState(null);

  const admin = JSON.parse(localStorage.getItem("doctorAuth"));

  useEffect(() => {
    if (!admin?.userid) {
      setLoading(false);
      return;
    }

    axios
      .get("https://ten-reminiscent-sombrero.glitch.me/patient-symptoms")
      .then((response) => {
        if (response.data.success) {
          const filteredPatients = response.data.patients.filter(
            (patient) => patient.doctorId === admin.userid
          );

          const storedStatuses = JSON.parse(localStorage.getItem("patientStatuses") || "{}");

          const patientsWithStatus = filteredPatients.map((p, index) => {
            const patientId = index + 1;
            const status = storedStatuses[patientId] || p.status || "Pending";
            return {
              id: patientId,
              name: p.name,
              requestTime: new Date(p.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              status,
            };
          });

          setPatients(patientsWithStatus);
        } else {
          setPatients([]);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch patients:", error);
        setPatients([]);
      })
      .finally(() => setLoading(false));
  }, [admin]);

  const handleRequestStatusChange = (id, action) => {
    const updatedPatients = patients.map((patient) => {
      if (patient.id === id) {
        const updatedPatient = {
          ...patient,
          status: action === "approve" ? "Approved" : "Rejected",
        };
        if (action === "approve") {
          setJoinNowPatientId(id);
        }
        return updatedPatient;
      }
      return patient;
    });
    setPatients(updatedPatients);

    const updatedStatuses = updatedPatients.reduce((acc, curr) => {
      acc[curr.id] = curr.status;
      return acc;
    }, {});

    localStorage.setItem("patientStatuses", JSON.stringify(updatedStatuses));
  };

  const handleJoinNow = (id) => {
    toast.success(`Joining consultation for patient ${id}...`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    setTimeout(() => {
      window.location.href = "https://video-calling-to-patient.glitch.me/";
    }, 2000);
  };

  let content;

  if (activeTab === "patients") {
    content = (
      <div className="doctor-dashboard">
        <h2>Patient Consultation Requests</h2>
        <div className="patient-list">
          {loading ? (
            <p>Loading consultation requests...</p>
          ) : patients.length === 0 ? (
            <p>No new consultation requests</p>
          ) : (
            patients.map((patient) => (
              <div className="patient-item" key={patient.id}>
                <div className="patient-info">
                  <h3>{patient.name}</h3>
                  <p>Requested at: {patient.requestTime}</p>
                  <p>
                    Status: <span className={patient.status.toLowerCase()}>{patient.status}</span>
                  </p>
                </div>
                <div className="action-buttons">
                  {patient.status === "Pending" && (
                    <>
                      <button
                        className="approve-btn"
                        onClick={() => handleRequestStatusChange(patient.id, "approve")}
                      >
                        Approve
                      </button>
                      <button
                        className="reject-btn"
                        onClick={() => handleRequestStatusChange(patient.id, "reject")}
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {patient.status === "Approved" && joinNowPatientId === patient.id && (
                    <button className="join-now-btn" onClick={() => handleJoinNow(patient.id)}>
                      Join Now
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  } else if (activeTab === "account") {
    content = <Account />;
  } 
   else if (activeTab === "medical records") {
    content = <PatientRecord />;
  } 
   else if (activeTab === "analytics") {
    content = <Analytics />;
  } 
   else if (activeTab === "messages") {
    content = <Messages />;
  } 
   else if (activeTab === "savings") {
    content = <Saving />;
  } 
  else if (activeTab === "schedule") {
    content = (
      <div className="schedule-container">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upcoming Schedule</h2>
        <ul className="schedule-list space-y-4">
          <li className="bg-white p-4 rounded shadow">
            <p className="text-lg font-medium">10:00 AM - 10:30 AM</p>
            <p className="text-gray-500">John Doe - General Consultation</p>
          </li>
          <li className="bg-white p-4 rounded shadow">
            <p className="text-lg font-medium">11:00 AM - 11:30 AM</p>
            <p className="text-gray-500">Jane Smith - Follow-up Check</p>
          </li>
          <li className="bg-white p-4 rounded shadow">
            <p className="text-lg font-medium">01:00 PM - 01:45 PM</p>
            <p className="text-gray-500">Michael Johnson - Prescription Review</p>
          </li>
        </ul>
      </div>
    );
  } else {
    const totalPatients = patients.length;
    const pendingCount = patients.filter((p) => p.status === "Pending").length;
    const approvedCount = patients.filter((p) => p.status === "Approved").length;
    const rejectedCount = patients.filter((p) => p.status === "Rejected").length;

    const barData = {
      labels: ["Approved", "Pending", "Rejected"],
      datasets: [
        {
          label: "Requests",
          data: [approvedCount, pendingCount, rejectedCount],
          backgroundColor: ["#10b981", "#fbbf24", "#ef4444"],
          borderRadius: 5,
        },
      ],
    };

    const pieData = {
      labels: ["Approved", "Pending", "Rejected"],
      datasets: [
        {
          data: [approvedCount, pendingCount, rejectedCount],
          backgroundColor: ["#10b981", "#fbbf24", "#ef4444"],
          hoverOffset: 6,
        },
      ],
    };

    content = (
      <div className="p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Doctor's Dashboard Overview</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-4 rounded-xl shadow text-center">
            <h3 className="text-gray-500">Total Patients</h3>
            <p className="text-2xl font-bold">{totalPatients}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow text-center">
            <h3 className="text-gray-500">Pending</h3>
            <p className="text-2xl font-bold">{pendingCount}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow text-center">
            <h3 className="text-gray-500">Approved</h3>
            <p className="text-2xl font-bold">{approvedCount}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow text-center">
            <h3 className="text-gray-500">Rejected</h3>
            <p className="text-2xl font-bold">{rejectedCount}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-medium mb-4">Consultation Requests (Bar)</h3>
            <Bar data={barData} />
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-medium mb-4">Request Status (Doughnut)</h3>
            <Doughnut data={pieData} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content-holder">
      {content}
      <ToastContainer />
    </div>
  );
};

export default ContentMain;








// import React, { useState, useEffect } from "react";
// import "./ContentMain.css";
// import axios from "axios";
// import Account from "../../menus/account/index";

// const ContentMain = ({ activeTab }) => {
//   const [patients, setPatients] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [joinNowPatientId, setJoinNowPatientId] = useState(null);

//   // Retrieve logged-in doctor info from localStorage
//   const admin = JSON.parse(localStorage.getItem("doctorAuth"));

//   useEffect(() => {
//     if (!admin?.userid) {
//       setLoading(false);
//       return;
//     }

//     // Fetch patient symptoms data
//     axios
//       .get("https://ten-reminiscent-sombrero.glitch.me/patient-symptoms")
//       .then((response) => {
//         if (response.data.success) {
//           // Filter patients for this doctor by matching doctorId with admin.userid
//           const filteredPatients = response.data.patients.filter(
//             (patient) => patient.doctorId === admin.userid
//           );

//           // Map to required patient shape with status "Pending" by default
//           const patientsWithStatus = filteredPatients.map((p, index) => ({
//             id: index + 1, // simple id for internal tracking
//             name: p.name,
//             requestTime: new Date(p.createdAt).toLocaleTimeString([], {
//               hour: "2-digit",
//               minute: "2-digit",
//             }),
//             status: "Pending",
//           }));

//           setPatients(patientsWithStatus);
//         } else {
//           setPatients([]);
//         }
//       })
//       .catch((error) => {
//         console.error("Failed to fetch patients:", error);
//         setPatients([]);
//       })
//       .finally(() => setLoading(false));
//   }, [admin]);

//   // Approve or Reject consultation request
//   const handleRequestStatusChange = (id, action) => {
//     const updatedPatients = patients.map((patient) => {
//       if (patient.id === id) {
//         const updatedPatient = {
//           ...patient,
//           status: action === "approve" ? "Approved" : "Rejected",
//         };
//         if (action === "approve") {
//           setJoinNowPatientId(id);
//         }
//         return updatedPatient;
//       }
//       return patient;
//     });
//     setPatients(updatedPatients);
//   };

//   // Handle Join Now button click
//   const handleJoinNow = (id) => {
//     alert(`Joining consultation for patient ${id}...`);
//     window.location.href = "https://video-calling-to-patient.glitch.me/";
//   };

//   let content;

//   if (activeTab === "Join Now") {
//     content = (
//       <div className="doctor-dashboard">
//         <h2>Patient Consultation Requests</h2>
//         <div className="patient-list">
//           {loading ? (
//             <p>Loading consultation requests...</p>
//           ) : patients.length === 0 ? (
//             <p>No new consultation requests</p>
//           ) : (
//             patients.map((patient) => (
//               <div className="patient-item" key={patient.id}>
//                 <div className="patient-info">
//                   <h3>{patient.name}</h3>
//                   <p>Requested at: {patient.requestTime}</p>
//                   <p>
//                     Status:{" "}
//                     <span className={patient.status.toLowerCase()}>
//                       {patient.status}
//                     </span>
//                   </p>
//                 </div>
//                 <div className="action-buttons">
//                   {patient.status === "Pending" && (
//                     <>
//                       <button
//                         className="approve-btn"
//                         onClick={() =>
//                           handleRequestStatusChange(patient.id, "approve")
//                         }
//                       >
//                         Approve
//                       </button>
//                       <button
//                         className="reject-btn"
//                         onClick={() =>
//                           handleRequestStatusChange(patient.id, "reject")
//                         }
//                       >
//                         Reject
//                       </button>
//                     </>
//                   )}
//                   {patient.status === "Approved" &&
//                     joinNowPatientId === patient.id && (
//                       <button
//                         className="join-now-btn"
//                         onClick={() => handleJoinNow(patient.id)}
//                       >
//                         Join Now
//                       </button>
//                     )}
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     );
//   } else if (activeTab === "account") {
//     content = <Account />;
//   } else {
//     content = (
//       <div className="doctor-dashboard">
//         <h2 className="dashboard-title">Doctor's Consultation Dashboard</h2>
//         <div className="consultation-requests">
//           {patients.map((patient) => (
//             <div key={patient.id} className="consultation-card">
//               <div className="patient-info">
//                 <h3>{patient.name}</h3>
//                 <p>Requested at: {patient.requestTime}</p>
//                 <p>
//                   Status:{" "}
//                   <span className={patient.status.toLowerCase()}>
//                     {patient.status}
//                   </span>
//                 </p>
//               </div>
//               <div className="action-buttons">
//                 {patient.status === "Pending" && (
//                   <>
//                     <button
//                       className="action-button accept"
//                       onClick={() =>
//                         handleRequestStatusChange(patient.id, "approve")
//                       }
//                     >
//                       Accept
//                     </button>
//                     <button
//                       className="action-button reject"
//                       onClick={() =>
//                         handleRequestStatusChange(patient.id, "reject")
//                       }
//                     >
//                       Reject
//                     </button>
//                   </>
//                 )}
//                 {patient.status === "Approved" &&
//                   joinNowPatientId === patient.id && (
//                     <button
//                       className="join-now-btn"
//                       onClick={() => handleJoinNow(patient.id)}
//                     >
//                       Join Now
//                     </button>
//                   )}
//                 {patient.status === "Rejected" && <p>Consultation Rejected</p>}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   return <div className="main-content-holder">{content}</div>;
// };

// export default ContentMain;









// import React, { useState, useEffect } from "react";
// import "./ContentMain.css";
// import axios from 'axios'; // Importing axios for API calls
// import Account from "../../menus/account/index";

// // Dummy patient data (You can replace this with API calls)
// const dummyPatients = [
//   { id: 1, name: "John Doe", requestTime: "2:00 PM", status: "Pending" },
//   { id: 2, name: "Jane Smith", requestTime: "3:30 PM", status: "Pending" },
//   { id: 3, name: "Mark Johnson", requestTime: "4:15 PM", status: "Pending" }
// ];

// const ContentMain = ({ activeTab }) => {
//   const [patients, setPatients] = useState(dummyPatients); // Manage patient request list
//   const [loading, setLoading] = useState(true);
//   const [joinNowPatientId, setJoinNowPatientId] = useState(null); // Track the patient for the Join Now button
//   const admin = JSON.parse(localStorage.getItem("doctorAuth")); // Retrieve admin info

//   // Fetching consultation requests from API (for dynamic data)

//   // Approve or Reject consultation request
//   const handleRequestStatusChange = (id, action) => {
//     const updatedPatients = patients.map((patient) => {
//       if (patient.id === id) {
//         const updatedPatient = { ...patient, status: action === "approve" ? "Approved" : "Rejected" };
//         if (action === "approve") {
//           setJoinNowPatientId(id); // Show the Join Now button for the approved patient
//         }
//         return updatedPatient;
//       }
//       return patient;
//     });
//     setPatients(updatedPatients);
//   };

//   // Function to handle Join Now button click (for starting the consultation)
//   const handleJoinNow = (id) => {
//     alert(`Joining consultation for patient ${id}...`);
//     window.location.href = "https://video-calling-to-patient.glitch.me/"
//     // Implement the logic for joining the video call or session
//   };

//   let content;

//   if (activeTab === "Join Now") {
//     content = (
//       <div className="doctor-dashboard">
//         <h2>Patient Consultation Requests</h2>
//         <div className="patient-list">
//           {loading ? (
//             <p>Loading consultation requests...</p>
//           ) : patients.length === 0 ? (
//             <p>No new consultation requests</p>
//           ) : (
//             patients.map((patient) => (
//               <div className="patient-item" key={patient.id}>
//                 <div className="patient-info">
//                   <h3>{patient.name}</h3>
//                   <p>Requested at: {patient.requestTime}</p>
//                   <p>Status: <span className={patient.status.toLowerCase()}>{patient.status}</span></p>
//                 </div>
//                 <div className="action-buttons">
//                   {patient.status === "Pending" && (
//                     <>
//                       <button
//                         className="approve-btn"
//                         onClick={() => handleRequestStatusChange(patient.id, "approve")}
//                       >
//                         Approve
//                       </button>
//                       <button
//                         className="reject-btn"
//                         onClick={() => handleRequestStatusChange(patient.id, "reject")}
//                       >
//                         Reject
//                       </button>
//                     </>
//                   )}
//                   {patient.status === "Approved" && joinNowPatientId === patient.id && (
//                     <button
//                       className="join-now-btn"
//                       onClick={() => handleJoinNow(patient.id)}
//                     >
//                       Join Now
//                     </button>
//                   )}
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     );
//   } else if (activeTab === "account") {
//     content = <Account />;
//   } else {
//     content = (
//       <div className="doctor-dashboard">
//         <h2 className="dashboard-title">Doctor's Consultation Dashboard</h2>
//         <div className="consultation-requests">
//           {patients.map((patient) => (
//             <div key={patient.id} className="consultation-card">
//               <div className="patient-info">
//                 <h3>{patient.name}</h3>
//                 <p>Requested at: {patient.requestTime}</p>
//                 <p>Status: <span className={patient.status.toLowerCase()}>{patient.status}</span></p>
//               </div>
//               <div className="action-buttons">
//                 {patient.status === "Pending" && (
//                   <>
//                     <button
//                       className="action-button accept"
//                       onClick={() => handleRequestStatusChange(patient.id, "approve")}
//                     >
//                       Accept
//                     </button>
//                     <button
//                       className="action-button reject"
//                       onClick={() => handleRequestStatusChange(patient.id, "reject")}
//                     >
//                       Reject
//                     </button>
//                   </>
//                 )}
//                 {patient.status === "Approved" && joinNowPatientId === patient.id && (
//                   <button
//                     className="join-now-btn"
//                     onClick={() => handleJoinNow(patient.id)}
//                   >
//                     Join Now
//                   </button>
//                 )}
//                 {patient.status === "Rejected" && <p>Consultation Rejected</p>}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   return <div className="main-content-holder">{content}</div>;
// };

// export default ContentMain;






// import "./ContentMain.css";
// import Cards from "../Cards/Cards";
// import Transactions from "../Transactions/Transactions";
// import Report from "../Report/Report";
// import Budget from "../Budget/Budget";
// import Subscriptions from "../Subscriptions/Subscriptions";
// import Savings from "../Savings/Savings";
// import Loans from "../Loans/Loans";
// import Financial from "../Financial/Financial";
// import Doctor from "../../menus/addDoctor/index";
// import Account from "../../menus/account/index";


// const ContentMain = ({ activeTab }) => {
//   let content;
//   if (activeTab == "doctors") {     
//       content = <Doctor/>
//   }
//   if (activeTab == "account") {     
//     content = <Account/>
// }
//   else{
//     content = (<>
//       <div className="content-grid-one">
//             {/* <Cards />
//             <Transactions /> */}
//             <a href="http://localhost:8000" style={{fontSize:'40px'}}><b>Join Now</b></a>
//             <Report />
//         </div>
//         <div className="content-grid-two">
//             <Budget />
//             <div className="grid-two-item">
//               <div className="subgrid-two">
//                 <Subscriptions />
//                 <Savings />
//               </div>
//             </div>

//             <div className="grid-two-item">
//               <div className="subgrid-two">
//                 <Loans />
//                 <Financial />
//               </div>
//             </div>
//         </div>
//         </>
//     )
//   }        
    

//   return (
//     <div className="main-content-holder">
//        {content}
//     </div>
//   )
// }

// export default ContentMain
