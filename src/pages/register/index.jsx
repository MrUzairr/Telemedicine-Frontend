import React, { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleRegister from "../../components/googleRegister/index";
import { useFormik } from "formik";
import { signup } from "../../api";
// import { setUser } from "../../store/userSlice";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const [error, setError] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [zip, setZip] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [password, setPassword] = useState("");

  const GoogleWrapper = () => (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <GoogleRegister />
    </GoogleOAuthProvider>
  );

  const handleSignup = async (e) => {
    e.preventDefault();
    const data = {
      firstname,
      lastname,
      email,
      password,
      zip,
      gender,
      birthdate,
    };
  
    const response = await signup(data);
    console.log("response12", response);
    if (response.status === 201) {
      toast.success("Signup successful! Please login.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
  
      // Delay navigation slightly so the toast is visible
      setTimeout(() => {
        navigate("/signin");
      }, 1500);
    } else if (response.code === "ERR_BAD_REQUEST") {
      setError(response.response.data.message);
    }
  };
  
    const { touched, handleBlur, errors } = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      zip: "",
      gender: "",
      birthdate: "",
    },
  });

  return (
    <div className="w-full flex justify-center px-4 py-8">
      <div className="w-full max-w-lg flex flex-col items-center">
        <a href="/" className="self-start text-blue-600 mb-4 flex items-center gap-1">
          <FaChevronLeft /> Back
        </a>
        <h2 className="text-2xl font-bold self-start w-full text-left">Let’s get started</h2>
        <p className="text-gray-600 text-left w-full mb-2">
          Enter your information just as it appears on your health insurance
          card or pay stub.
        </p>
        <span className="text-left w-full text-red-600 mb-6">* Required</span>

        <form onSubmit={handleSignup} className="w-full flex flex-col space-y-4">
          {[
            { label: "First Name*", value: firstname, setValue: setFirstname, name: "firstName", type: "text" },
            { label: "Last Name*", value: lastname, setValue: setLastname, name: "lastName", type: "text" },
            { label: "Email*", value: email, setValue: setEmail, name: "email", type: "email" },
            { label: "Password*", value: password, setValue: setPassword, name: "password", type: "password" },
            { label: "ZIP code*", value: zip, setValue: setZip, name: "zipcode", type: "text" },
          ].map((field, index) => (
            <div key={index} className="flex flex-col">
              <label className="font-semibold mb-1 text-left" htmlFor={field.name}>
                {field.label}
              </label>
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-lg"
                value={field.value}
                onChange={(e) => field.setValue(e.target.value)}
                required
                onBlur={handleBlur}
              />
            </div>
          ))}

          <div className="flex flex-col">
            <label className="font-semibold mb-1 text-left" htmlFor="gender">Gender*</label>
            <select
              id="gender"
              name="gender"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-lg"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
              onBlur={handleBlur}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="font-semibold mb-1 text-left" htmlFor="birthdate">Date Of Birth*</label>
            <input
              id="birthdate"
              name="birthdate"
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-lg"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              required
              onBlur={handleBlur}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-md transition duration-300"
          >
            Next
          </button>

          <div className="w-full ">
            <GoogleWrapper />
          </div>
        </form>
        <ToastContainer />
        {error && <p className="text-red-600 font-bold text-lg mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default Register;







// const handleSignup = async (e) => {
  //   e.preventDefault();
  //   const data = {
  //     firstname,
  //     lastname,
  //     email,
  //     password,
  //     zip,
  //     gender,
  //     birthdate,
  //   };

  //   const response = await signup(data);
  //   console.log("response12",response)
  //   if (response.status === 201) {
  //     const user = {
  //       _id: response.data.user._id,
  //       email: response.data.user.email,
  //       auth: response.data.auth,
  //     };
  //     dispatch(setUser(user));
  //     navigate("/");
  //   } else if (response.code === "ERR_BAD_REQUEST") {
  //     setError(response.response.data.message);
  //   }
  // };


// import React, { useState } from "react";
// import "./index.css";
// import GoogleRegister from '../../components/googleRegister/index';
// import { GoogleOAuthProvider } from '@react-oauth/google';
// import { FaChevronLeft } from "react-icons/fa";
// import { useFormik } from 'formik'; 
// import {signup} from '../../api';
// import { setUser } from '../../store/userSlice';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

// const Register = () => {

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [error, setError] = useState("");
//   const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
//   const [firstname, setFirstname] = useState("");
//   const [lastname, setLastname] = useState("");
//   const [email, setEmail] = useState("");
//   const [zip, setZip] = useState("");
//   const [gender, setGender] = useState("");
//   const [birthdate, setBirthdate] = useState("");
//   const [password, setPassword] = useState("");
  
//   const GoogleWrapper = ()=>(
// 		<GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
// 			<GoogleRegister></GoogleRegister>
// 		</GoogleOAuthProvider>
// 	)
//   // Update handleRegister to prevent default form submission
//   const handleSignup = async () => {
//     const data = {
//       firstname,
//       lastname,
//       email,
//       password,
//       zip,
//       gender,
//       birthdate,
//     };

//     const response = await signup(data);

//     if (response.status === 201) {
//       // set User
//       const user = {
//         _id: response.data.user._id,
//         email: response.data.user.email,
//         auth: response.data.auth,
//       };
//       dispatch(setUser(user));
//       // 2. redirect -> homepage
//       navigate("/");
//     } else if (response.code === "ERR_BAD_REQUEST") {
//       // display error message
//       setError(response.response.data.message);
//     }
//   };
//   const { values, touched, handleBlur, errors } = useFormik({
//     initialValues: {
//       firstname: "",
//       lastname: "",
//       email: "",
//       password: "",
//       zip: "",
//       gender: "",
//       birthdate: "",
//     }
//   });
  

//   return (
//     <div className="reg-container">
//       <div className="reg-data">
//         <a href="/" className="reg-back"><span><FaChevronLeft/></span> Back</a>
//         <h2 className="reg-main-heading">Let’s get started</h2>
//         <p className="reg-main-heading-content">
//           Enter your information just as it appears on your health insurance
//           card or pay stub.
//         </p>
//         <span className="reg-required">* Required</span>
//         <form onSubmit={handleSignup} className="reg-form">
//           <label className="reg-labels" htmlFor="firstName">
//             First Name*
//           </label>
//           <input
//             className="reg-inputs form-control"
//             type="text"
//             id="firstName"
//             value={firstname}
//             onChange={(e) => setFirstname(e.target.value)}
//             name="firstName"
//             required
//             error={errors.firstname && touched.firstname ? 1 : undefined}
//             errormessage={errors.firstname}
//             onBlur={handleBlur}

//           />
//           <label className="reg-labels" htmlFor="lastName">
//             Last Name*
//           </label>
//           <input
//             className="reg-inputs form-control"
//             type="text"
//             id="lastName"
//             value={lastname}
//             onChange={(e) => setLastname(e.target.value)}
//             name="lastName"
//             required
//             error={errors.lastname && touched.lastname ? 1 : undefined}
//             errormessage={errors.lastname}
//             onBlur={handleBlur}
//           />
//           <label className="reg-labels" htmlFor="email">
//             Email*
//           </label>
//           <input
//             className="reg-inputs form-control"
//             type="text"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             name="email"
//             required
//             error={errors.email && touched.email ? 1 : undefined}
//             errormessage={errors.email}
//             onBlur={handleBlur}
//           />
//           <label className="reg-labels" htmlFor="password">
//             Password*
//           </label>
//           <input
//             className="reg-inputs form-control"
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             name="password"
//             required
//             error={errors.password && touched.password ? 1 : undefined}
//             errormessage={errors.password}
//             onBlur={handleBlur}
//           />
//           <label className="reg-labels" htmlFor="zipcode">
//             ZIP code*
//           </label>
//           <input
//             className="reg-inputs form-control"
//             type="text"
//             id="zipcode"
//             value={zip}
//             onChange={(e) => setZip(e.target.value)}
//             name="zipcode"
//             required
//             error={errors.zip && touched.zip ? 1 : undefined}
//             errormessage={errors.zip}
//             onBlur={handleBlur}
//           />
//           <label className="reg-labels" htmlFor="gender">
//             Gender*
//           </label>
//           <select
//             className="reg-inputs form-control"
//             id="gender"
//             name="gender"
//             value={gender}
//             onChange={(e) => setGender(e.target.value)}
//             required
//             error={errors.gender && touched.gender ? 1 : undefined}
//             errormessage={errors.gender}
//             onBlur={handleBlur}
//           >
//             <option value="">Select Gender</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="other">Other</option>
//           </select>
//           <label className="reg-labels" htmlFor="dateOfBirth">
//             Date Of Birth*
//           </label>
//           <input
//             className="reg-inputs form-control"
//             type="date"
//             id="dateOfBirth"
//             value={birthdate}
//             onChange={(e) => setBirthdate(e.target.value)}
//             name="dateOfBirth"
//             required
//             error={errors.birthdate && touched.birthdate ? 1 : undefined}
//             errormessage={errors.birthdate}
//             onBlur={handleBlur}
//           />
//           <button type="submit" className="reg-submit reg-submit1">
//             Next
//           </button>
//           <GoogleWrapper/>

//         </form>
//         {error != "" ? <p className={'errorMessage'}>{error}</p> : ""}
//       </div>
//     </div>
//   );
// };

// export default Register;






// // const handleRegister = async (e) => {
//   //   e.preventDefault(); // Prevent the default form submission

//   //   const user = {
//   //     firstname,
//   //     lastname,
//   //     email,
//   //     password,
//   //     zip,
//   //     gender,
//   //     birthdate,
//   //   };
//   //   console.log(user)

//   //   try {
//   //     const response = await fetch("http://localhost:3005/api/users", {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify(user),
//   //     });

//   //     const result = await response.json();
//   //     console.log(result); // Log the result from the API
//   //     if(result.isAdmin == true){
//   //       window.location.href = "/admin"
//   //     }
//   //     else{
//   //       localStorage.setItem("authToken",JSON.stringify(result.token))
//   //       window.location.href = "/"
//   //     }
//   //   } catch (error) {
//   //     console.log(error); // Log any error
//   //   }
//   // };
// // import React, { useState } from "react";
// // import "./index.css";

// // const Register = () => {
// //   const [firstname, setFirstname] = useState("");
// //   const [lastname, setLastname] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [zip, setZip] = useState("");
// //   const [gender, setGender] = useState("");
// //   const [birthdate, setBirthdate] = useState("");
// //   const [password, setPassword] = useState("");

// //   async function handleRegister() {
// //     const user = {
// //       firstname,
// //       lastname,
// //       email,
// //       password,
// //       zip,
// //       gender,
// //       birthdate,
// //     };
// //     try {
// //       const response = await fetch("https://localhost:3005/api/users", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify(user),
// //       });

// //       const result = await response.json();
// //       console.log(result);
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   }

// //   return (
// //     <div className="reg-container">
// //       <div className="reg-data">
// //         <h2>Let’s get started</h2>
// //         <p>
// //           Enter your information just as it appears on your health insurance
// //           card or pay stub.
// //         </p>
// //         <span>* Required</span>
// //         <form action="" className="reg-form">
// //           <label className="reg-labels" htmlFor="firstName">
// //             First Name*
// //           </label>
// //           <input
// //             className="reg-inputs form-control"
// //             type="text"
// //             id="firstName"
// //             value={firstname}
// //             onChange={(e) => {
// //               setFirstname(e.target.value);
// //             }}
// //             name="firstName"
// //           />
// //           <label className="reg-labels" htmlFor="lastName">
// //             Last Name*
// //           </label>
// //           <input
// //             className="reg-inputs form-control"
// //             type="text"
// //             id="lastName"
// //             value={lastname}
// //             onChange={(e) => {
// //               setLastname(e.target.value);
// //             }}
// //             name="lastName"
// //           />
// //           <label className="reg-labels" htmlFor="email">
// //             Email*
// //           </label>
// //           <input
// //             className="reg-inputs form-control"
// //             type="text"
// //             id="email"
// //             value={email}
// //             onChange={(e) => {
// //               setEmail(e.target.value);
// //             }}
// //             name="email"
// //           />
// //           <label className="reg-labels" htmlFor="lastName">
// //             Password*
// //           </label>
// //           <input
// //             className="reg-inputs form-control"
// //             type="password"
// //             id="password"
// //             value={password}
// //             onChange={(e) => {
// //               setPassword(e.target.value);
// //             }}
// //             name="password"
// //           />
// //           <label className="reg-labels" htmlFor="zipcode">
// //             ZIP code*
// //           </label>
// //           <input
// //             className="reg-inputs form-control"
// //             type="text"
// //             id="zipcode"
// //             value={zip}
// //             onChange={(e) => {
// //               setZip(e.target.value);
// //             }}
// //             name="zipcode"
// //           />
// //           {/* <label className="reg-labels" htmlFor="gender">Gender*</label>
// //         <input className="reg-inputs" type="text" id="gender" value={gender} onChange={(e)=>{
// //                 setGender(e.target.value) }} name="gender" /> */}
// //           <label className="reg-labels" htmlFor="gender">
// //             Gender*
// //           </label>
// //           <select
// //             className="reg-inputs form-control"
// //             id="gender"
// //             name="gender"
// //             value={gender}
// //             onChange={(e) => setGender(e.target.value)}
// //           >
// //             <option value="">Select Gender</option>
// //             <option value="male">Male</option>
// //             <option value="female">Female</option>
// //             <option value="other">Other</option>
// //           </select>
// //           <label className="reg-labels" htmlFor="dateOfBirth">
// //             Date Of Birth*
// //           </label>
// //           <input
// //             className="reg-inputs form-control"
// //             type="date"
// //             id="dateOfBirth"
// //             value={birthdate}
// //             onChange={(e) => {
// //               setBirthdate(e.target.value);
// //             }}
// //             name="dateOfBirth"
// //           />
// //           <a href="" onClick={handleRegister} className="reg-submit">
// //             Next
// //           </a>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Register;
