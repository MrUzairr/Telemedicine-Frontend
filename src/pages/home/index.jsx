import React from "react";
import Navbar from "../../components/navbar";
import MedicineSlider from "../../components/slider";
import HeroSection from "./HeroSection";
import DoctorCardsSection from "./DoctorCardsSection";
import AboutSection from "./AboutSection";
import ReviewSection from "./ReviewSection";
import CmpSection from "./CmpSection";
import Footer from "./Footer";
import "./index.css";
const Home = () => {
  return (
    <div>
      {/* <div className="home-front"><Navbar /></div> */}
      <div
        className="relative bg-cover bg-[center_-30px] h-screen w-full text-white"
        style={{ backgroundImage: "url('/doctor-pic.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10">
          <Navbar />
        </div>
      </div>
      <HeroSection />
      <DoctorCardsSection />
      <AboutSection />
      <div className="home-body-slider"><MedicineSlider /></div>
      <ReviewSection />
      <CmpSection />
      <Footer />
    </div>
  );
};
export default Home;



// import React, { useState, useEffect } from "react";
// import "./index.css";
// import Navbar from "../../components/navbar";
// import Slider from "../../components/slider";
// import ReactStars from "react-rating-stars-component";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Protected from "../../components/Protected/Protected"
// import {
//   Box,
//   Typography,
//   Snackbar,
//   CircularProgress,
//   Alert,
// } from "@mui/material";
// import { useSelector } from "react-redux";


// const Home = () => {
//   const navigate = useNavigate(); 
//   // const isAuth = localStorage.getItem("userAuth");
//   const isAuth = useSelector((state) => state.user.auth);
//   // const isAuth = localStorage.getItem("userAuth") ? true : isAuth1;
 
//   console.log("isAuth",isAuth)
//   const [doctors, setDoctors] = useState([]); // State to hold fetched doctors
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   // Handle click event on "Get care now" button
//   const handleGetCareNowClick = (doctor) => {
//     navigate("/doctorinfo", { state: { doctor } }); // Passing doctor data to the doctorinfo page
//   };

//   // Static data (for fallback if API data is unavailable)
//   const staticCardData = [
//     { id: 1, title: "Dr. Asim", description: "Anytime, anywhere, anything care", image: "/images/doctor1.jpg", link: "#" },
//     { id: 2, title: "Dr. Bilal", description: "Find clinics near you", image: "/images/doctor2.jpg", link: "#" },
//     { id: 3, title: "Dr. Tahira", description: "Get emergency help", image: "/images/doctor3.jpg", link: "#" },
//     { id: 3, title: "Dr. Ahmed Khan", description: "Available 24/7 for consultations.", image: "/images/doctor5.jpg", link: "#" },
//   ];

//   // Fetch doctors from the API
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

//   return (
//     <div>
//       {/* Navbar */}
//       <div className="home-front">
//         <Navbar />
//       </div>

//       {/* Front view */}
//       <div className="home-body">
//         <h2 className="home-body-top-content">
//           For your physical health. For your{" "}
//           <a href="#" style={{ color: "#17AF2D" }}>
//             mental health
//           </a>
//           . For{" "}
//           <a href="#" style={{ color: "#008CAF" }}>
//             clinicians
//           </a>
//           . For{" "}
//           <a href="#" style={{ color: "#6240E8" }}>
//             hospitals
//           </a>
//           . For all of it in one place. For life.
//         </h2>
//       </div>

//            {/* Card Section */}
//       <div className="home-body-card-part">
//         {loading ? (
//           <CircularProgress />
//         ) : error ? (
//           <Snackbar open={true} autoHideDuration={4000} onClose={() => setError(null)}>
//             <Alert severity="error">{error}</Alert>
//           </Snackbar>
//         ) : (
//           // Check if doctors were fetched, else use the static fallback data
//           (doctors.length > 0 ? doctors : staticCardData).map((card) => (
//             <div key={card._id || card.id} className="home-body-cards">
//               <div className="home-body-cards-content">
//                 <h4>{(card.fullName)?.length > 20
//     ? `${(card.fullName).slice(0, 20)}...`
//     : card.fullName}</h4>
//                 <p>{(card.qualifications || card.description)?.length > 28
//     ? `${(card.qualifications || card.description).slice(0, 28)}...`
//     : card.qualifications || card.description}</p>
//                 <Protected isAuth={isAuth} >
//                 <a href={card.link || "/doctorinfo"} style={{color:"#6240E8",}} onClick={() => handleGetCareNowClick(card)}>Get care now</a>
//                 </Protected>

//               </div>
//               <div className="home-body-cards-image">
//                 <img
//                   src={`http://localhost:3005/images/${card.profilePicture || card.image}`}
//                   alt={card.fullName || card.title}
//                 />
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//       {/* About Section */}

//       <div className="home-body-about">
//         <h2>A high-quality care experience—anywhere, anytime</h2>
//         <p>
//           It started with a simple yet revolutionary idea. That everyone should
//           have access to the best healthcare anywhere in the world on their
//           terms. That includes you.
//         </p>
//         <a href="">About us</a>
//       </div>
//       {/* Slider Section */}

//       <div className="home-body-slider">
//         <Slider />
//       </div>
//       {/* Review Section */}

//       <div className="home-body-review">
//         <div className="home-body-review-heading">
//           <h2>Our Customers love us</h2>
//           <p>Check out the reviews from our satisfied customers</p>
//         </div>
//         <div className="home-body-review-card">
//           <div className="home-body-review-card-data">
//             <ReactStars
//               classNames={"home-body-review-card-data-stars"}
//               count={5}
//               value={4.5}
//               // onChange={ratingChanged}
//               size={32}
//               isHalf={true}
//               emptyIcon={<i className="far fa-star"></i>}
//               halfIcon={<i className="fa fa-star-half-alt"></i>}
//               fullIcon={<i className="fa fa-star"></i>}
//               activeColor="#ffd700"
//             />
//             <p>
//               "Great platform, very efficient and works really well on both
//               phone and web. I think this is the most easiest way of booking
//               appointments in Pakistan as it has made the whole process much
//               more efficient."
//             </p>
//             <img src="doctor-card-pic.jpg" alt="doctor-card-pic.jpg" />
//             <h5>Umar</h5>
//           </div>
//           <div className="home-body-review-card-data">
//             <ReactStars
//               classNames={"home-body-review-card-data-stars"}
//               count={5}
//               value={4.5}
//               // onChange={ratingChanged}
//               size={32}
//               isHalf={true}
//               emptyIcon={<i className="far fa-star"></i>}
//               halfIcon={<i className="fa fa-star-half-alt"></i>}
//               fullIcon={<i className="fa fa-star"></i>}
//               activeColor="#ffd700"
//             />
//             <p>
//               "Great platform, very efficient and works really well on both
//               phone and web. I think this is the most easiest way of booking
//               appointments in Pakistan as it has made the whole process much
//               more efficient."
//             </p>
//             <img src="doctor-card-pic.jpg" alt="doctor-card-pic.jpg" />
//             <h5>Umar</h5>
//           </div>
//           <div className="home-body-review-card-data">
//             <ReactStars
//               classNames={"home-body-review-card-data-stars"}
//               count={5}
//               value={4.5}
//               // onChange={ratingChanged}
//               size={32}
//               isHalf={true}
//               emptyIcon={<i className="far fa-star"></i>}
//               halfIcon={<i className="fa fa-star-half-alt"></i>}
//               fullIcon={<i className="fa fa-star"></i>}
//               activeColor="#ffd700"
//             />
//             <p>
//               "Great platform, very efficient and works really well on both
//               phone and web. I think this is the most easiest way of booking
//               appointments in Pakistan as it has made the whole process much
//               more efficient."
//             </p>
//             <img src="doctor-card-pic.jpg" alt="doctor-card-pic.jpg" />
//             <h5>Umar</h5>
//           </div>
//         </div>
//       </div>
//       {/* Cmp Section */}

//       <div className="home-body-cmp-container">
//         <h2>This is whole-person care.</h2>
//         <a href="">Get started</a>
//       </div>
//       {/* Footer Section */}

//       <div className="home-body-footer">
//         <div className="footer-content">
//           <div className="footer-logo">
//             <h2>Telemed</h2>
//             <p>Your trusted telemedicine platform</p>
//           </div>

//           <div className="footer-links">
//             <ul>
//               <li>
//                 <a href="/about">About Us</a>
//               </li>
//               <li>
//                 <a href="/services">Services</a>
//               </li>
//               <li>
//                 <a href="/privacy">Privacy Policy</a>
//               </li>
//               <li>
//                 <a href="/terms">Terms of Service</a>
//               </li>
//             </ul>
//           </div>

//           <div className="footer-contact">
//             <p>Contact Us:</p>
//             <ul>
//               <li>Email: contact@telemed.com</li>
//               <li>Phone: +123-456-7890</li>
//             </ul>
//           </div>

//           <div className="footer-socials">
//             <a
//               href="https://www.facebook.com"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <i className="fab fa-facebook"></i>
//             </a>
//             <a
//               href="https://www.twitter.com"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <i className="fab fa-twitter"></i>
//             </a>
//             <a
//               href="https://www.instagram.com"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <i className="fab fa-instagram"></i>
//             </a>
//             <a
//               href="https://www.linkedin.com"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <i className="fab fa-linkedin"></i>
//             </a>
//           </div>
//         </div>

//         <div className="footer-bottom">
//           <p>&copy; 2024 Telemed. All Rights Reserved.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
