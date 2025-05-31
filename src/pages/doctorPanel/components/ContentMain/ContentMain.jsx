import React, { useState, useEffect } from "react";
import "./ContentMain.css";
import axios from 'axios'; // Importing axios for API calls
import Account from "../../menus/account/index";

// Dummy patient data (You can replace this with API calls)
const dummyPatients = [
  { id: 1, name: "John Doe", requestTime: "2:00 PM", status: "Pending" },
  { id: 2, name: "Jane Smith", requestTime: "3:30 PM", status: "Pending" },
  { id: 3, name: "Mark Johnson", requestTime: "4:15 PM", status: "Pending" }
];

const ContentMain = ({ activeTab }) => {
  const [patients, setPatients] = useState(dummyPatients); // Manage patient request list
  const [loading, setLoading] = useState(true);
  const [joinNowPatientId, setJoinNowPatientId] = useState(null); // Track the patient for the Join Now button

  // Fetching consultation requests from API (for dynamic data)

  // Approve or Reject consultation request
  const handleRequestStatusChange = (id, action) => {
    const updatedPatients = patients.map((patient) => {
      if (patient.id === id) {
        const updatedPatient = { ...patient, status: action === "approve" ? "Approved" : "Rejected" };
        if (action === "approve") {
          setJoinNowPatientId(id); // Show the Join Now button for the approved patient
        }
        return updatedPatient;
      }
      return patient;
    });
    setPatients(updatedPatients);
  };

  // Function to handle Join Now button click (for starting the consultation)
  const handleJoinNow = (id) => {
    alert(`Joining consultation for patient ${id}...`);
    window.location.href = "https://video-calling-to-patient.glitch.me/"
    // Implement the logic for joining the video call or session
  };

  let content;

  if (activeTab === "Join Now") {
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
                  <p>Status: <span className={patient.status.toLowerCase()}>{patient.status}</span></p>
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
                    <button
                      className="join-now-btn"
                      onClick={() => handleJoinNow(patient.id)}
                    >
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
  } else {
    content = (
      <div className="doctor-dashboard">
        <h2 className="dashboard-title">Doctor's Consultation Dashboard</h2>
        <div className="consultation-requests">
          {patients.map((patient) => (
            <div key={patient.id} className="consultation-card">
              <div className="patient-info">
                <h3>{patient.name}</h3>
                <p>Requested at: {patient.requestTime}</p>
                <p>Status: <span className={patient.status.toLowerCase()}>{patient.status}</span></p>
              </div>
              <div className="action-buttons">
                {patient.status === "Pending" && (
                  <>
                    <button
                      className="action-button accept"
                      onClick={() => handleRequestStatusChange(patient.id, "approve")}
                    >
                      Accept
                    </button>
                    <button
                      className="action-button reject"
                      onClick={() => handleRequestStatusChange(patient.id, "reject")}
                    >
                      Reject
                    </button>
                  </>
                )}
                {patient.status === "Approved" && joinNowPatientId === patient.id && (
                  <button
                    className="join-now-btn"
                    onClick={() => handleJoinNow(patient.id)}
                  >
                    Join Now
                  </button>
                )}
                {patient.status === "Rejected" && <p>Consultation Rejected</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return <div className="main-content-holder">{content}</div>;
};

export default ContentMain;






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
