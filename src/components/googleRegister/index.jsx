import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { googleAuthRegister } from "../../api";
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

const GoogleRegister = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const responseGoogle = async (authResult) => {
    try {
      if (authResult?.code) {
        const response = await googleAuthRegister(authResult.code);

        if (response && response.data) {
          const { user, auth } = response.data;
          const { isAdmin, isDoctor, email, token, fullName, _id } = user;

          // Store role-based localStorage
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

          // ✅ Toast success
          toast.success("Google login successful!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });

        } else {
          handleError("User not found, Please create an account");
          setError("User not found, Please create an account");
        }
      } else {
        throw new Error("Google authentication failed");
      }
    } catch (err) {
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

  const registerGoogle = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: (error) => {
      console.error("Google login error:", error);
      handleError("Google login failed");
    },
    flow: "auth-code",
  });

  return (
    <div className="w-full flex flex-col items-center mt-8">
      <button
        onClick={registerGoogle}
        className="flex items-center gap-3 px-6 py-2 border border-gray-300 rounded-md
                   hover:bg-gray-100 transition-colors duration-200 ease-in-out
                   text-gray-800 font-medium w-full max-w-xs justify-center"
        aria-label="Register with Google"
      >
        <FcGoogle className="text-2xl" />
        Register with Google
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

export default GoogleRegister;






// import React, { useState } from "react";
// import { useGoogleLogin } from "@react-oauth/google";
// // import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// // import { setUser } from "../../store/userSlice";
// import { googleAuthRegister } from "../../api";
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

// const GoogleRegister = () => {
//   // const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [error, setError] = useState("");

//   const responseGoogle = async (authResult) => {
//     try {
//       if (authResult?.code) {
//         const response = await googleAuthRegister(authResult.code);

//         if (response && response.data) {
//           const auth = response.data.auth;
//           const { email, isAdmin, token } = response.data.user;

//           if (typeof isAdmin !== "undefined") {
//             localStorage.setItem("adminAuth", JSON.stringify(isAdmin));
//           } else {
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

//           dispatch(setUser(user));
//           navigate("/");
//         } else {
//           handleError("User not found, Please create an account");
//           setError("User not found, Please create an account");
//         }
//       } else {
//         throw new Error(authResult);
//       }
//     } catch (err) {
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

//   const registerGoogle = useGoogleLogin({
//     onSuccess: responseGoogle,
//     onError: (error) => console.error("Google login error:", error),
//     flow: "auth-code",
//   });

//   return (
//     <div className="w-full flex flex-col items-center mt-8">
//       <button
//         onClick={registerGoogle}
//         className="flex items-center gap-3 px-6 py-2 border border-gray-300 rounded-md
//                    hover:bg-gray-100 transition-colors duration-200 ease-in-out
//                    text-gray-800 font-medium w-full max-w-xs justify-center"
//         aria-label="Register with Google"
//       >
//         <FcGoogle className="text-2xl" />
//         Register with Google
//       </button>

//       <ToastContainer />

//       {error && (
//         <p className="text-red-600 text-sm font-medium mt-4 text-center max-w-xs">
//           {error}
//         </p>
//       )}
//     </div>
//   );
// };

// export default GoogleRegister;




// import React,{useState} from "react";
// import { useGoogleLogin } from "@react-oauth/google";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { setUser } from "../../store/userSlice"; // Redux slice for user
// import { googleAuthRegister } from "../../api"; // API integration
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
// const GoogleRegister = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [error, setError] = useState("");


//   // Function to handle Google Login success or failure
//   const responseGoogle = async (authResult) => {
//     try {
//       if (authResult?.code) {
//         // Call backend API with Google auth code
//         console.log("response",authResult)
//         const response = await googleAuthRegister(authResult.code);
//         console.log("response1",response)
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
//           dispatch(setUser(user));
//           // Navigate based on admin status
//           navigate("/");
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
//   const registerGoogle = useGoogleLogin({
//     onSuccess: responseGoogle,
//     onError: (error) => console.error("Google login error:", error),
//     flow: "auth-code",
//   });

//   return (
//     <div>
//     <button className="google-login" onClick={registerGoogle}>
//       <FcGoogle /> Register with Google
//     </button>
//       <div>
//             {error && <p className="errorMessage"><ToastContainer /></p>}
//       </div>
//     </div>

    
//   );
// };

// export default GoogleRegister;
 



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
