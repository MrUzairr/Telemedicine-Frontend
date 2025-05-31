import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { googleAuthLogin } from "../../api";
import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const handleError = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

const GoogleLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const responseGoogle = async (authResult) => {
    try {
      if (authResult?.code) {
        const response = await googleAuthLogin(authResult.code);

        if (response && response.data) {
          const { user, auth } = response.data;
          const { isAdmin, isDoctor, token, email, _id } = user;

          if (isAdmin) {
            localStorage.setItem("adminAuth", "true");
            navigate("/admin");
          } else if (isDoctor) {
            localStorage.setItem("doctorAuth", JSON.stringify(user));
            navigate("/doctor");
          } else {
            localStorage.setItem("userAuth", "true");
            navigate("/");
          }

          toast.success("Google login successful!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          handleError("User not found, please create an account");
          setError("User not found, please create an account");
        }
      } else {
        console.error("Google authentication failed:", authResult);
        throw new Error("Google authentication failed");
      }
    } catch (err) {
      console.error("Login Error:", err);

      if (err.response) {
        handleError(err.response.data.message || "An error occurred on the server.");
        setError(err.response.data.message || "An error occurred on the server.");
      } else if (err.request) {
        handleError("No response from the server. Please check your connection.");
        setError("No response from the server. Please check your connection.");
      } else {
        handleError(`Unexpected error: ${err.message}`);
        setError(`Unexpected error: ${err.message}`);
      }
    }
  };

  const loginGoogle = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: (error) => {
      console.error("Google login error:", error);
      handleError("Google login failed");
    },
    flow: "auth-code",
  });

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={loginGoogle}
        className="
          mt-8 
          rounded-lg 
          bg-transparent 
          text-gray-800 
          px-[126px] py-2 
          text-lg 
          shadow-lg 
          transition-shadow duration-300 
          hover:bg-gray-300/60
          focus:outline-none
          focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
          max-w-full
          sm:px-[105px]
          xs:px-[90px]
          [@media(max-width:380px)]:px-[75px]
          [@media(max-width:350px)]:px-[65px]
          [@media(max-width:320px)]:px-[55px]
          flex items-center justify-center
        "
        style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)" }}
      >
        <FcGoogle className="mr-2 text-xl" />
        <span className="whitespace-nowrap">Login with Google</span>
      </button>

      <ToastContainer />

      {error && (
        <p className="text-red-600 text-sm font-medium mt-4 text-center max-w-xs">
          {error}
        </p>
      )}
    </div>
  );
};

export default GoogleLogin;







// import React, { useState } from "react";
// import { useGoogleLogin } from "@react-oauth/google";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { setUser } from "../../store/userSlice"; // Redux slice for user
// import { googleAuthLogin } from "../../api"; // API integration
// import { FcGoogle } from "react-icons/fc";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const handleError = (message) => {
//   toast.error(message, {
//     position: "top-right",
//     autoClose: 5000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//   });
// };

// const GoogleLogin = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [error, setError] = useState("");

//   const responseGoogle = async (authResult) => {
//     try {
//       if (authResult?.code) {
//         const response = await googleAuthLogin(authResult.code);
//         if (response && response.data) {
//           const auth = response.data.auth;
//           const { email, isAdmin, token } = response.data.user;

//           if (typeof isAdmin !== "undefined") {
//             localStorage.setItem("adminAuth", JSON.stringify(isAdmin));
//           } else {
//             console.warn("isAdmin property is undefined in response data.");
//             handleError("An unexpected issue occurred. Please contact support.");
//             setError("An unexpected issue occurred. Please contact support.");
//             return;
//           }

//           const user = {
//             _id: response.data.user._id,
//             email,
//             auth,
//             token,
//             isAdmin,
//           };
//           console.log("google isAdmin", isAdmin);
//           localStorage.setItem("adminAuth", JSON.stringify(user.isAdmin));
//           dispatch(setUser(user));

//           if (isAdmin === true) {
//             navigate("/admin");
//           } else {
//             navigate("/");
//           }
//         } else {
//           console.warn("Response data is undefined or invalid.");
//           handleError("User not found, Please create an account");
//           setError("User not found, Please create an account");
//         }
//       } else {
//         console.error("Google authentication failed:", authResult);
//         throw new Error(authResult);
//       }
//     } catch (err) {
//       console.error("Login Error:", err);

//       if (err.response) {
//         handleError(err.response.data.message || "An error occurred on the server.");
//         setError(err.response.data.message || "An error occurred on the server.");
//       } else if (err.request) {
//         handleError("No response from the server. Please check your connection.");
//         setError("No response from the server. Please check your connection.");
//       } else {
//         handleError(`Unexpected error: ${err.message}`);
//         setError(`Unexpected error: ${err.message}`);
//       }
//     }
//   };

//   const loginGoogle = useGoogleLogin({
//     onSuccess: responseGoogle,
//     onError: (error) => console.error("Google login error:", error),
//     flow: "auth-code",
//   });

//   return (
//     <div className="flex flex-col items-center">
//      <button
//   onClick={loginGoogle}
//   className="
//     mt-8 
//     rounded-lg 
//     bg-transparent 
//     text-gray-800 
//     px-[126px] py-2 
//     text-lg 
//     shadow-lg 
//     transition-shadow duration-300 
//     hover:bg-gray-300/60
//     focus:outline-none
//     focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
//     max-w-full
//     sm:px-[105px]
//     xs:px-[90px]
//     [@media(max-width:380px)]:px-[75px]
//     [@media(max-width:350px)]:px-[65px]
//     [@media(max-width:320px)]:px-[55px]
//     flex items-center justify-center
//   "
//   style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)" }}
// >
//   <FcGoogle className="mr-2 text-xl" />
//   <span className="whitespace-nowrap">Login with Google</span>
// </button>

//       {error && <ToastContainer />}
//     </div>
//   );
// };

// export default GoogleLogin;







// import React,{useState} from "react";
// import { useGoogleLogin } from "@react-oauth/google";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { setUser } from "../../store/userSlice"; // Redux slice for user
// import { googleAuthLogin } from "../../api"; // API integration
// import { FcGoogle } from "react-icons/fc";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css"; 
// import "./index.css";

// const handleError = (message) => {
//   toast.error(message, {
//     position: "top-right",
//     autoClose: 5000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//   });
// };
// const GoogleLogin = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [error, setError] = useState("");


//   // Function to handle Google Login success or failure
//   const responseGoogle = async (authResult) => {
//     try {
//       if (authResult?.code) {
//         // Call backend API with Google auth code
//         const response = await googleAuthLogin(authResult.code);
//         // Ensure the response and isAdmin property exist
//         if (response && response.data) {
//           const auth = response.data.auth;
//           const { email, isAdmin, token } = response.data.user;
    
//           if (typeof isAdmin !== "undefined") {
//             // Save admin status to localStorage
//             localStorage.setItem("adminAuth", JSON.stringify(isAdmin));
//           } else {
//             console.warn("isAdmin property is undefined in response data.");
//             handleError("An unexpected issue occurred. Please contact support.");
//             setError("An unexpected issue occurred. Please contact support.");
//             return; // Stop further execution
//           }
    
//           const user = {
//             _id: response.data.user._id,
//             email,
//             auth,
//             token,
//             isAdmin,
//           };
//           console.log("google isAdmin",isAdmin)
//           // Save user info in localStorage
//           localStorage.setItem("adminAuth", JSON.stringify(user.isAdmin));
//           dispatch(setUser(user));
          
//           // Navigate based on admin status
//           if (isAdmin===true) {
//             navigate("/admin");
//           } else {
//             navigate("/");
//           }
//         } else {
//           console.warn("Response data is undefined or invalid.");
//           handleError("User not found, Please create an account");
//           setError("User not found, Please create an account");
//         }

//       } else {
//         console.error("Google authentication failed:", authResult);
//         throw new Error(authResult);
//       }
//     } catch (err) {
//       // Handle specific error codes from backend
//       console.error("Login Error:", err);
//       console.error("Login Error:", err);

//       if (err.response) {
//         // Backend responded with an error
//         handleError(err.response.data.message || "An error occurred on the server.");
//         setError(err.response.data.message || "An error occurred on the server.");
//       } else if (err.request) {
//         // No response received from the backend
//         handleError("No response from the server. Please check your connection.");
//         setError("No response from the server. Please check your connection.");
//       } else {
//         // Something else went wrong
//         handleError(`Unexpected error: ${err.message}`);
//         setError(`Unexpected error: ${err.message}`);
//       }
//     }
//   };

//   // Trigger Google login
//   const loginGoogle = useGoogleLogin({
//     onSuccess: responseGoogle,
//     onError: (error) => console.error("Google login error:", error),
//     flow: "auth-code",
//   });

//   return (
//     <div>
//     <button className="google-login" onClick={loginGoogle}>
//       <FcGoogle /> Login with Google
//     </button>
//       <div>
//             {error && <p className="errorMessage"><ToastContainer /></p>}
//       </div>
//     </div>

    
//   );
// };

// export default GoogleLogin;
 



// import React from 'react'
// import {useGoogleLogin} from '@react-oauth/google';
// import { googleAuth } from '../../api';
// import './index.css'
// import { FcGoogle } from "react-icons/fc";

// function GoogleLogin(){
//     const responseGoogle = async(authResult) => {
//         try {
//             if(authResult['code']){
//                 const result = await googleAuth(authResult.code);
//                 const {email} = result.data.user;
//                 const token = result.data.token;
// 				const obj = {email,token};
// 				localStorage.setItem('user-info', JSON.stringify(obj));
//                 console.log("result.data.user..",result.data.user)
//                 if(result.data.user.isAdmin){
//                     window.location.href = "/admin"
//                 }
//                 else{
//                     localStorage.setItem("authToken",JSON.stringify(result.data.user.token))
//                     window.location.href = "/"
//                 }
//             }
//             else{
//                 console.log(authResult);
//                 throw new Error(authResult);
//             }
//         } catch (err) {
//             console.log('Error while requesting google code: ',err)

//         }
//     }
//     const loginGoogle = useGoogleLogin({
//         onSuccess: responseGoogle,
//         onError: responseGoogle,
//         flow: 'auth-code'
//     })
//     return(
//             <button className='google-login' onClick={loginGoogle}><FcGoogle/> Login with Google</button>
//     )
// }
// export default GoogleLogin;
