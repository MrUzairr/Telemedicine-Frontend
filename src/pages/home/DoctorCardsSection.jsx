import React, { useState, useEffect } from "react";
import { CircularProgress, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Protected from "../../components/Protected/Protected";
import { useTranslation } from "../../context/provider/TranslationContext";

const DoctorCardsSection = () => {
  const navigate = useNavigate();
  const { t, language } = useTranslation();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("adminAuth")) || 
                JSON.parse(localStorage.getItem("userAuth")) || 
                JSON.parse(localStorage.getItem("doctorAuth")) || 
                false;
    setIsAuth(!!auth);
  }, []);

  const staticCardData = [
    {
      id: 1,
      title: t('doctor1_name', "Dr. Asim"),
      description: t('doctor1_desc', "Anytime, anywhere, anything care"),
      image: "/images/doctor1.jpg",
      link: "#",
    },
    {
      id: 2,
      title: t('doctor2_name', "Dr. Bilal"),
      description: t('doctor2_desc', "Find clinics near you"),
      image: "/images/doctor2.jpg",
      link: "#",
    },
    {
      id: 3,
      title: t('doctor3_name', "Dr. Tahira"),
      description: t('doctor3_desc', "Get emergency help"),
      image: "/images/doctor3.jpg",
      link: "#",
    },
    {
      id: 4,
      title: t('doctor4_name', "Dr. Ahmed Khan"),
      description: t('doctor4_desc', "Available 24/7 for consultations."),
      image: "/images/doctor5.jpg",
      link: "#",
    },
  ];

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://ten-reminiscent-sombrero.glitch.me/doc/getalldoctors");
        setDoctors(response.data.data);
      } catch (err) {
        setError(err.response?.data?.error || t('fetch_error', "Failed to fetch doctor details."));
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, [t]);

  const handleGetCareNowClick = (doctor) => {
    navigate("/doctorinfo", { state: { doctor } });
  };

  return (
    <div className={`py-12 px-4 sm:px-6 bg-gray-100 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-teal-600 text-center mb-8">
          {t('meet_doctors', "Meet Our Expert Doctors")}
        </h2>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <CircularProgress size={60} className="text-teal-600" />
          </div>
        ) : error ? (
          <Snackbar open={true} autoHideDuration={4000} onClose={() => setError(null)}>
            <Alert
              severity="error"
              sx={{
                backgroundColor: "#fef2f2",
                color: "#991b1b",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              {error}
            </Alert>
          </Snackbar>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {(doctors.length > 0 ? doctors : staticCardData).map((card) => (
              <div
                key={card._id || card.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={`https://ten-reminiscent-sombrero.glitch.me/images/${card.profilePicture || card.image}`}
                    alt={card.fullName || card.title}
                    className="w-full h-full object-cover object-center object-top"
                    onError={(e) => (e.target.src = "/images/fallback-doctor.jpg")}
                  />
                </div>
                <div className="p-4 flex flex-col items-start">
                  <h4 className="text-lg font-semibold text-gray-800 truncate">
                    {(card.fullName || card.title)?.slice(0, 20)}...
                  </h4>
                  <p className="text-sm text-gray-600 mt-1 truncate">
                    {(card.qualifications || card.description)?.slice(0, 28)}...
                  </p>
                  <Protected isAuth={isAuth}>
                    <button
                      onClick={() => handleGetCareNowClick(card)}
                      className="mt-3 text-sm font-medium text-[#6240E8] hover:text-[#17AF2D] transition-colors"
                    >
                      {t('get_care_now', "Get care now")}
                    </button>
                  </Protected>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorCardsSection;







// import React, { useState, useEffect } from "react";
// import { CircularProgress, Snackbar, Alert } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Protected from "../../components/Protected/Protected";
// // Removed: import { useSelector } from "react-redux";

// const DoctorCardsSection = () => {
//   const navigate = useNavigate();
//   const [doctors, setDoctors] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [isAuth, setIsAuth] = useState(false); // 👈 New state to replace Redux auth

//   useEffect(() => {
//     // Get auth state from localStorage or other logic
//     const auth = JSON.parse(localStorage.getItem("adminAuth")) || false;
//     setIsAuth(!!auth);
//   }, []);

//   const staticCardData = [
//     {
//       id: 1,
//       title: "Dr. Asim",
//       description: "Anytime, anywhere, anything care",
//       image: "/images/doctor1.jpg",
//       link: "#",
//     },
//     {
//       id: 2,
//       title: "Dr. Bilal",
//       description: "Find clinics near you",
//       image: "/images/doctor2.jpg",
//       link: "#",
//     },
//     {
//       id: 3,
//       title: "Dr. Tahira",
//       description: "Get emergency help",
//       image: "/images/doctor3.jpg",
//       link: "#",
//     },
//     {
//       id: 4,
//       title: "Dr. Ahmed Khan",
//       description: "Available 24/7 for consultations.",
//       image: "/images/doctor5.jpg",
//       link: "#",
//     },
//   ];

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get("http://localhost:3005/doc/getalldoctors");
//         setDoctors(response.data.data);
//       } catch (err) {
//         setError(err.response?.data?.error || "Failed to fetch doctor details.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDoctors();
//   }, []);

//   const handleGetCareNowClick = (doctor) => {
//     navigate("/doctorinfo", { state: { doctor } });
//   };

//   return (
//     <div className="py-12 px-4 sm:px-6 bg-gray-100">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-3xl sm:text-4xl font-bold text-teal-600 text-center mb-8">
//           Meet Our Expert Doctors
//         </h2>
//         {loading ? (
//           <div className="flex justify-center items-center h-64">
//             <CircularProgress size={60} className="text-teal-600" />
//           </div>
//         ) : error ? (
//           <Snackbar open={true} autoHideDuration={4000} onClose={() => setError(null)}>
//             <Alert
//               severity="error"
//               sx={{
//                 backgroundColor: "#fef2f2",
//                 color: "#991b1b",
//                 borderRadius: "8px",
//                 boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//               }}
//             >
//               {error}
//             </Alert>
//           </Snackbar>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//             {(doctors.length > 0 ? doctors : staticCardData).map((card) => (
//               <div
//                 key={card._id || card.id}
//                 className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl duration-300"
//               >
//                 <div className="h-48 overflow-hidden">
//                   <img
//                     src={`http://localhost:3005/images/${card.profilePicture || card.image}`}
//                     alt={card.fullName || card.title}
//                     className="w-full h-full object-cover object-center object-top"
//                     onError={(e) => (e.target.src = "/images/fallback-doctor.jpg")}
//                   />
//                 </div>
//                 <div className="p-4 flex flex-col items-start">
//                   <h4 className="text-lg font-semibold text-gray-800 truncate">
//                     {(card.fullName || card.title)?.slice(0, 20)}...
//                   </h4>
//                   <p className="text-sm text-gray-600 mt-1 truncate">
//                     {(card.qualifications || card.description)?.slice(0, 28)}...
//                   </p>
//                   <Protected isAuth={isAuth}>
//                     <button
//                       onClick={() => handleGetCareNowClick(card)}
//                       className="mt-3 text-sm font-medium text-[#6240E8] hover:text-[#17AF2D] transition-colors"
//                     >
//                       Get care now
//                     </button>
//                   </Protected>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DoctorCardsSection;








// import React, { useState, useEffect } from "react";
// import { CircularProgress, Snackbar, Alert } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Protected from "../../components/Protected/Protected";
// import { useSelector } from "react-redux";

// const DoctorCardsSection = () => {
//   const navigate = useNavigate();
//   const isAuth = useSelector((state) => state.user.auth);
//   const [doctors, setDoctors] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const staticCardData = [
//     {
//       id: 1,
//       title: "Dr. Asim",
//       description: "Anytime, anywhere, anything care",
//       image: "/images/doctor1.jpg",
//       link: "#",
//     },
//     {
//       id: 2,
//       title: "Dr. Bilal",
//       description: "Find clinics near you",
//       image: "/images/doctor2.jpg",
//       link: "#",
//     },
//     {
//       id: 3,
//       title: "Dr. Tahira",
//       description: "Get emergency help",
//       image: "/images/doctor3.jpg",
//       link: "#",
//     },
//     {
//       id: 4,
//       title: "Dr. Ahmed Khan",
//       description: "Available 24/7 for consultations.",
//       image: "/images/doctor5.jpg",
//       link: "#",
//     },
//   ];

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get("http://localhost:3005/doc/getalldoctors");
//         setDoctors(response.data.data);
//       } catch (err) {
//         setError(err.response?.data?.error || "Failed to fetch doctor details.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDoctors();
//   }, []);

//   const handleGetCareNowClick = (doctor) => {
//     navigate("/doctorinfo", { state: { doctor } });
//   };

//   return (
//     <div className="py-12 px-4 sm:px-6 bg-gray-100">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-3xl sm:text-4xl font-bold text-teal-600 text-center mb-8">
//           Meet Our Expert Doctors
//         </h2>
//         {loading ? (
//           <div className="flex justify-center items-center h-64">
//             <CircularProgress size={60} className="text-teal-600" />
//           </div>
//         ) : error ? (
//           <Snackbar open={true} autoHideDuration={4000} onClose={() => setError(null)}>
//             <Alert
//               severity="error"
//               sx={{
//                 backgroundColor: "#fef2f2",
//                 color: "#991b1b",
//                 borderRadius: "8px",
//                 boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//               }}
//             >
//               {error}
//             </Alert>
//           </Snackbar>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//             {(doctors.length > 0 ? doctors : staticCardData).map((card) => (
//               <div
//                 key={card._id || card.id}
//                 className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl duration-300"
//               >
//                 <div className="h-48 overflow-hidden">
//                   <img
//                     src={`http://localhost:3005/images/${card.profilePicture || card.image}`}
//                     alt={card.fullName || card.title}
//                     className="w-full h-full object-cover object-center object-top"
//                     onError={(e) => (e.target.src = "/images/fallback-doctor.jpg")} // Fallback image
//                   />
//                 </div>
//                 <div className="p-4 flex flex-col items-start">
//                   <h4 className="text-lg font-semibold text-gray-800 truncate">
//                     {(card.fullName || card.title)?.slice(0, 20)}...
//                   </h4>
//                   <p className="text-sm text-gray-600 mt-1 truncate">
//                     {(card.qualifications || card.description)?.slice(0, 28)}...
//                   </p>
//                   <Protected isAuth={isAuth}>
//                     <button
//                       onClick={() => handleGetCareNowClick(card)}
//                       className="mt-3 text-sm font-medium text-[#6240E8] hover:text-[#17AF2D] transition-colors"
//                     >
//                       Get care now
//                     </button>
//                   </Protected>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DoctorCardsSection;






// import React, { useState, useEffect } from "react";
// import { CircularProgress, Snackbar, Alert } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Protected from "../../components/Protected/Protected";
// import { useSelector } from "react-redux";

// const DoctorCardsSection = () => {
//   const navigate = useNavigate();
//   const isAuth = useSelector((state) => state.user.auth);
//   const [doctors, setDoctors] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const staticCardData = [
//     { id: 1, title: "Dr. Asim", description: "Anytime, anywhere, anything care", image: "/images/doctor1.jpg", link: "#" },
//     { id: 2, title: "Dr. Bilal", description: "Find clinics near you", image: "/images/doctor2.jpg", link: "#" },
//     { id: 3, title: "Dr. Tahira", description: "Get emergency help", image: "/images/doctor3.jpg", link: "#" },
//     { id: 4, title: "Dr. Ahmed Khan", description: "Available 24/7 for consultations.", image: "/images/doctor5.jpg", link: "#" },
//   ];

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get("http://localhost:3005/doc/getalldoctors");
//         setDoctors(response.data.data);
//       } catch (err) {
//         setError(err.response?.data?.error || "Failed to fetch doctor details.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDoctors();
//   }, []);

//   const handleGetCareNowClick = (doctor) => {
//     navigate("/doctorinfo", { state: { doctor } });
//   };

//   return (
//     <div className="home-body-card-part">
//       {loading ? (
//         <CircularProgress />
//       ) : error ? (
//         <Snackbar open={true} autoHideDuration={4000} onClose={() => setError(null)}>
//           <Alert severity="error">{error}</Alert>
//         </Snackbar>
//       ) : (
//         (doctors.length > 0 ? doctors : staticCardData).map((card) => (
//           <div key={card._id || card.id} className="home-body-cards">
//             <div className="home-body-cards-content">
//               <h4>{(card.fullName || card.title)?.slice(0, 20)}...</h4>
//               <p>{(card.qualifications || card.description)?.slice(0, 28)}...</p>
//               <Protected isAuth={isAuth}>
//                 <a href={card.link || "/doctorinfo"} style={{ color: "#6240E8" }} onClick={() => handleGetCareNowClick(card)}>Get care now</a>
//               </Protected>
//             </div>
//             <div className="home-body-cards-image">
//               <img src={`http://localhost:3005/images/${card.profilePicture || card.image}`} alt={card.fullName || card.title} />
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };
// export default DoctorCardsSection;
