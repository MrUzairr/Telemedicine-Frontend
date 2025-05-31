import { iconsImgs } from "../../utils/images";
import "./ContentTop.css";
import React, { useMemo, useContext, useState } from "react";
import { SidebarContext } from "../../context/sidebarContext";
import UserInfo from "../UserInfo";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "../searchbar";

const ContentTop = ({ activeTab }) => {
  const [session, setSession] = useState(null); // State for session management
  const admin = JSON.parse(localStorage.getItem("doctorAuth")); // Retrieve admin info
  const navigate = useNavigate(); // For navigation
  const { toggleSidebar } = useContext(SidebarContext); // Sidebar toggle function
  const [value, setValue] = useState("");

  const handleSearch = () => {
    console.log("Search value:", value); // Replace this with your actual search logic
  };
  // Define authentication methods
  const authentication = useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            name: admin.name,
            email: admin.email,
            image: 'myPic2.png', // Replace with actual image URL if available
          },
        });
      },
      signOut: () => {
        setSession(null);
        localStorage.removeItem("doctorAuth"); // Remove authentication token
        navigate("/"); // Redirect to login page
      },
    };
  }, [admin, navigate]);

  // Handle logout functionality
  const handleLogout = () => {
    authentication.signOut(); // Call signOut to clear session and navigate
  };

  // Define the content for the active tab
  let content;
  if (activeTab === "schedule") {
    content = "Schedule";
  } else if (activeTab === "patients") {
    content = "Patients";
  } else if (activeTab === "messages") {
    content = "Messages";
  } else if (activeTab === "medical records") {
    content = "Medical Records";
  } else if (activeTab === "analytics") {
    content = "Analytics";
  } else if (activeTab === "savings") {
    content = "Savings";
  } else if (activeTab === "financial advice") {
    content = "Financial Advice";
  } else if (activeTab === "account") {
    content = "Account";
  } else if (activeTab === "settings") {
    content = "Settings";
  } else if (activeTab === "logout") {
    handleLogout(); // Call logout function if the tab is "logout"
  } else {
    content = "Dashboard";
  }

  return (
    <div className="main-content-top">
      <div className="content-top-left">
        <button
          type="button"
          className="sidebar-toggler"
          onClick={() => toggleSidebar()}
        >
          <img src={iconsImgs.menu} alt="Toggle Sidebar" />
        </button>
        <h3 className="content-top-title">{content}</h3>
      </div>
      <div className="content-top-btns">
        <button type="button" className="search-btn content-top-btn">
          {/* <img src={iconsImgs.search} alt="Search" /> */}
          <SearchBar/>
        </button>
        <button className="notification-btn content-top-btn">
          <img src={iconsImgs.email} alt="Notifications" />
          <span className="notification-btn-dot"></span>
        </button>
        <button className="notification-btn content-top-btn">
          <img src={iconsImgs.notification} alt="Notifications" />
          <span className="notification-btn-dot"></span>
        </button>
        <div>
          <UserInfo admin={admin} />
        </div>
      </div>
    </div>
  );
};

export default ContentTop;









// import { iconsImgs } from "../../utils/images";
// import "./ContentTop.css";
// import react,{useMemo,useContext } from "react";
// import { SidebarContext } from "../../context/sidebarContext";
// import UserInfo from "../UserInfo"
// import { useNavigate } from "react-router-dom";

// const ContentTop = ({ activeTab }) => {
//   const [session, setSession] = useState({});
//   const admin = JSON.parse(localStorage.getItem("doctorAuth"));
//   const navigate = useNavigate();
//   const handleLogout = () => {
//     localStorage.removeItem("doctorAuth"); // Remove authentication token
//     navigate("/"); // Redirect to login page
//   };
//   // Define authentication methods
//   const authentication = useMemo(() => {
//     return {
//       signIn: () => {
//         setSession({
//           user: {
//             name: admin.name,
//             email: admin.email,
//             image: 'myPic2.png',
//           },
//         });
//       },
//       signOut: () => {
//         setSession(null);
//         localStorage.removeItem('doctorAuth'); // Remove from localStorage
//         navigate("/")
//       },
//     };
//   }, []);
//   const { toggleSidebar } = useContext(SidebarContext);
//   let content;
//   if (activeTab == "schedule") {     
//       content = "Schedule"
//   }
//   else if(activeTab == "patients"){
//     content = "Patients"

//   }
//   else if(activeTab == "messages"){
//     content = "Messages"
    
//   }
//   else if(activeTab == "medical records"){
//     content = "Medical Records"
    
//   }
//   else if(activeTab == "analytics"){
//     content = "Analytics"
    
//   }
//   else if(activeTab == "savings"){
//     content = "Savings"
    
//   }
//   else if(activeTab == "financial advice"){
//     content = "Financial Advice"
    
//   }
//   else if(activeTab == "account"){
//     content = "Account"
    
//   }
//   else if(activeTab == "settings"){
//     content = "Settings"
    
//   }
//   else if(activeTab == "logout"){
//     handleLogout(); // Call logout function
    
//   }
  
//   else{
//     content = "Dashboard"
//   }
//   return (
//     <div className="main-content-top">
//         <div className="content-top-left">
//             <button type="button" className="sidebar-toggler" onClick={() => toggleSidebar() }>
//                 <img src={ iconsImgs.menu } alt="" />
//             </button>
//             <h3 className="content-top-title">{content}</h3>
//         </div>
//         <div className="content-top-btns">
//             <button type="button" className="search-btn content-top-btn">
//                 <img src={ iconsImgs.search } alt="" />
//             </button>
//             <button className="notification-btn content-top-btn">
//                 <img src={ iconsImgs.bell } />
//                 <span className="notification-btn-dot"></span>
//             </button>
//             <div>
//                 <UserInfo admin={admin}/>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default ContentTop
