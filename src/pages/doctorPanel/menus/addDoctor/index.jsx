import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import axios from "axios";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import ViewDoctors from "../viewDoctor";

// Reusable Input Component
const InputField = ({ id, label, type, value, onChange }) => (
  <div className="d-flex flex-row align-items-center">
    <label htmlFor={id} className="form-label w-25 label-class">
      {label}
    </label>
    <input
      type={type}
      id={id}
      className="form-control input-class"
      value={value}
      onChange={onChange}
    />
  </div>
);

// Reusable TextArea Component
const TextAreaField = ({ id, label, value, onChange }) => (
  <div className="d-flex flex-row align-items-center">
    <label htmlFor={id} className="form-label w-25 label-class">
      {label}
    </label>
    <textarea
      id={id}
      rows="3"
      className="form-control input-class"
      value={value}
      onChange={onChange}
    />
  </div>
);

const Doctor = () => {
  const [activeTab, setActiveTab] = useState(0); // Active tab state
  const [formData, setFormData] = useState({
    fullName: "",
    specialty: "",
    email: "",
    phone: "",
    profilePicture: null,
    biography: "",
    qualifications: "",
    status: false,
  });

  // Handle input changes
  const handleInputChange = (e) => {
    // Check if it's the regular input event or PhoneInput value
    if (e && e.target) {
      const { id, value, type, checked, files } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [id]: type === "checkbox" ? checked : files ? files[0] : value,
      }));
    } else if (e) {
      // Handle PhoneInput value change (e is directly the phone number value)
      setFormData((prevData) => ({
        ...prevData,
        phone: e, // Phone number is passed directly as the value
      }));
    }
  };
  

  // const handleInputChange = (e) => {
  //   const { id, value, type, checked, files } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [id]: type === "checkbox" ? checked : files ? files[0] : value,
  //   }));
  // };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));

    try {
      const response = await axios.post("http://localhost:3005/doc/doctors", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Doctor saved successfully:", response.data);
      alert("Doctor details saved successfully!");
    } catch (error) {
      console.error("Error saving doctor details:", error);
      alert("Failed to save doctor details.");
    }
  };

  const handleTabChange = (event, newValue) => setActiveTab(newValue);

  return (
    <div className="main-content-holder">
      <Box sx={{ width: "100%" }}>
        {/* Tabs Navigation */}
        <Tabs value={activeTab} onChange={handleTabChange} variant="scrollable" scrollButtons allowScrollButtonsMobile>
          <Tab label="Add Doctor" />
          <Tab label="Manage Doctors" />
          <Tab label="Other Info" />
        </Tabs>

        {/* Tab Panels */}
        {activeTab === 0 && (
          <Box sx={{ p: 3 }}>
            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3 form-class">
              <InputField
                id="fullName"
                label="Full Name"
                type="text"
                value={formData.fullName}
                onChange={handleInputChange}
              />
              <div className="d-flex flex-row align-items-center">
                <label htmlFor="specialty" className="form-label w-25 label-class">
                  Specialty
                </label>
                <select
                  id="specialty"
                  className="form-select input-class"
                  value={formData.specialty}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>
                    Select Specialty
                  </option>
                  <option value="cardiologist">Cardiologist</option>
                  <option value="dermatologist">Dermatologist</option>
                  <option value="neurologist">Neurologist</option>
                  <option value="psychiatrist">Psychiatrist</option>

                </select>
              </div>
              <InputField
                id="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
              />
  <div className="d-flex flex-row align-items-center">
  <label htmlFor="phone" className="form-label w-25 label-class">
    Phone Number
  </label>
  <PhoneInput
    placeholder="Enter phone number"
    value={formData.phone}
    onChange={handleInputChange}
    className="phone-input-class"
  />
</div>

               {/* <PhoneInput
  placeholder="Enter phone number"
  value={formData.phone}
  onChange={handleInputChange}
  className="form-control phone-input-class"
/> */}

              {/* <InputField
                id="phone"
                label="Phone Number"
                type="text"
                value={formData.phone}
                onChange={handleInputChange}
              /> */}
              <div className="d-flex flex-row align-items-center">
                <label htmlFor="profilePicture" className="form-label w-25 label-class">
                  Profile Picture
                </label>
                <input
                  type="file"
                  id="profilePicture"
                  className="form-control input-class"
                  onChange={handleInputChange}
                />
              </div>
              <TextAreaField
                id="biography"
                label="Biography"
                value={formData.biography}
                onChange={handleInputChange}
              />
              <TextAreaField
                id="qualifications"
                label="Qualifications"
                value={formData.qualifications}
                onChange={handleInputChange}
              />
              <div className="d-flex flex-row align-items-center">
                <label htmlFor="status" className="form-label w-25 label-class">
                  Status
                </label>
                <div className="form-check form-switch">
                  <input
                    type="checkbox"
                    id="status"
                    className="form-check-input input-class"
                    checked={formData.status}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label label-class" htmlFor="status">
                    Active/Inactive
                  </label>
                </div>
              </div>
              <div className="d-flex justify-content-between mt-3">
                <button type="submit" className="btn btn-primary button-class">
                  Save
                </button>
                <button type="reset" className="btn btn-secondary button-class" onClick={() => setFormData({})}>
                  Reset
                </button>
              </div>
            </form>
          </Box>
        )}

        {activeTab === 1 && (
          <Box sx={{ p: 3 }}>
            <ViewDoctors />
          </Box>
        )}

        {activeTab === 2 && (
          <Box sx={{ p: 3 }}>
            <p>Other Information Tab</p>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default Doctor;



// import React, { useState } from "react";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import Box from "@mui/material/Box";
// import PropTypes from "prop-types";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./index.css";
// import ViewDoctors from "../viewDoctor";

// // Reusable Input Component
// const InputField = ({ id, label, type, value, onChange }) => (
//   <div className="d-flex flex-row align-items-center">
//     <label htmlFor={id} className="form-label w-25 label-class">
//       {label}
//     </label>
//     <input
//       type={type}
//       id={id}
//       className="form-control input-class"
//       value={value}
//       onChange={onChange}
//     />
//   </div>
// );

// // Reusable TextArea Component
// const TextAreaField = ({ id, label, value, onChange }) => (
//   <div className="d-flex flex-row align-items-center">
//     <label htmlFor={id} className="form-label w-25 label-class">
//       {label}
//     </label>
//     <textarea
//       id={id}
//       rows="3"
//       className="form-control input-class"
//       value={value}
//       onChange={onChange}
//     />
//   </div>
// );

// const Doctor = () => {
//   const [activeTab, setActiveTab] = useState(0); // Active tab state
//   const [formData, setFormData] = useState({
//     fullName: "",
//     specialty: "",
//     email: "",
//     phone: "",
//     profilePicture: null,
//     biography: "",
//     qualifications: "",
//     status: false,
//   });

//   // Handle input changes
//   const handleInputChange = (e) => {
//     const { id, value, type, checked, files } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [id]: type === "checkbox" ? checked : files ? files[0] : value,
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     Object.entries(formData).forEach(([key, value]) => data.append(key, value));

//     try {
//       const response = await axios.post("http://localhost:3005/doc/doctors", data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       console.log("Doctor saved successfully:", response.data);
//       alert("Doctor details saved successfully!");
//     } catch (error) {
//       console.error("Error saving doctor details:", error);
//       alert("Failed to save doctor details.");
//     }
//   };

//   const handleTabChange = (event, newValue) => setActiveTab(newValue);

//   // Custom Tab Panel Component
//   const CustomTabPanel = ({ children, value, index }) => (
//     <div role="tabpanel" hidden={value !== index}>
//       {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
//     </div>
//   );

//   CustomTabPanel.propTypes = {
//     children: PropTypes.node,
//     value: PropTypes.number.isRequired,
//     index: PropTypes.number.isRequired,
//   };

//   return (
//     <div className="main-content-holder">
//       <Box sx={{ width: "100%" }}>
//         {/* Tabs Navigation */}
//         <Tabs value={activeTab} onChange={handleTabChange} variant="scrollable" scrollButtons allowScrollButtonsMobile>
//           <Tab label="Add Doctor" />
//           <Tab label="Manage Doctors" />
//           <Tab label="Other Info" />
//         </Tabs>

//         {/* Tab Panels */}
//         <CustomTabPanel value={activeTab} index={0}>
//           <form onSubmit={handleSubmit} className="d-flex flex-column gap-3 form-class">
//             <InputField
//               id="fullName"
//               label="Full Name"
//               type="text"
//               value={formData.fullName}
//               onChange={handleInputChange}
//             />
//             <div className="d-flex flex-row align-items-center">
//               <label htmlFor="specialty" className="form-label w-25 label-class">
//                 Specialty
//               </label>
//               <select
//                 id="specialty"
//                 className="form-select input-class"
//                 value={formData.specialty}
//                 onChange={handleInputChange}
//               >
//                 <option value="" disabled>
//                   Select Specialty
//                 </option>
//                 <option value="cardiologist">Cardiologist</option>
//                 <option value="dermatologist">Dermatologist</option>
//               </select>
//             </div>
//             <InputField
//               id="email"
//               label="Email"
//               type="email"
//               value={formData.email}
//               onChange={handleInputChange}
//             />
//             <InputField
//               id="phone"
//               label="Phone Number"
//               type="text"
//               value={formData.phone}
//               onChange={handleInputChange}
//             />
//             <div className="d-flex flex-row align-items-center">
//               <label htmlFor="profilePicture" className="form-label w-25 label-class">
//                 Profile Picture
//               </label>
//               <input
//                 type="file"
//                 id="profilePicture"
//                 className="form-control input-class"
//                 onChange={handleInputChange}
//               />
//             </div>
//             <TextAreaField
//               id="biography"
//               label="Biography"
//               value={formData.biography}
//               onChange={handleInputChange}
//             />
//             <TextAreaField
//               id="qualifications"
//               label="Qualifications"
//               value={formData.qualifications}
//               onChange={handleInputChange}
//             />
//             <div className="d-flex flex-row align-items-center">
//               <label htmlFor="status" className="form-label w-25 label-class">
//                 Status
//               </label>
//               <div className="form-check form-switch">
//                 <input
//                   type="checkbox"
//                   id="status"
//                   className="form-check-input input-class"
//                   checked={formData.status}
//                   onChange={handleInputChange}
//                 />
//                 <label className="form-check-label label-class" htmlFor="status">
//                   Active/Inactive
//                 </label>
//               </div>
//             </div>
//             <div className="d-flex justify-content-between mt-3">
//               <button type="submit" className="btn btn-primary button-class">
//                 Save
//               </button>
//               <button type="reset" className="btn btn-secondary button-class" onClick={() => setFormData({})}>
//                 Reset
//               </button>
//             </div>
//           </form>
//         </CustomTabPanel>

//         <CustomTabPanel value={activeTab} index={1}>
//           <ViewDoctors />
//         </CustomTabPanel>

//         <CustomTabPanel value={activeTab} index={2}>
//           <p>Other Information Tab</p>
//         </CustomTabPanel>
//       </Box>
//     </div>
//   );
// };

// export default Doctor;



// import React, { useState } from "react";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import Box from "@mui/material/Box";
// import PropTypes from "prop-types";
// import axios from "axios"; // Add axios for making HTTP requests
// // In your main React component or index.js
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./index.css";
// import ViewDoctors from "../viewDoctor";

// const Doctor = () => {
//   const [value, setValue] = useState(0);
//   const [fullName, setFullName] = useState("");
//   const [specialty, setSpecialty] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [profilePicture, setProfilePicture] = useState(null);
//   const [biography, setBiography] = useState("");
//   const [qualifications, setQualifications] = useState("");
//   const [status, setStatus] = useState(false);

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     // Create FormData object to handle file uploads
//     const formData = new FormData();
//     formData.append('fullName', fullName);
//     formData.append('specialty', specialty);
//     formData.append('email', email);
//     formData.append('phone', phone);
//     formData.append('biography', biography);
//     formData.append('qualifications', qualifications);
//     formData.append('status', status);
    
//     // Append profile picture if selected
//     if (profilePicture) {
//       formData.append('profilePicture', profilePicture);
//     }
//     console.log("formData",formData)
  
//     try {
//       // Send POST request to your backend
//       const response = await axios.post("http://localhost:3005/doc/doctors", formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data', // Ensure it's set for file uploads
//         },
//       });
  
//       console.log("Doctor saved successfully:", response.data);
//     } catch (error) {
//       console.error("Error saving doctor details:", error);
//       alert("Failed to save doctor details.");
//     }
//   };
  

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   function CustomTabPanel(props) {
//     const { children, value, index, ...other } = props;

//     return (
//       <div
//         role="tabpanel"
//         hidden={value !== index}
//         id={`simple-tabpanel-${index}`}
//         aria-labelledby={`simple-tab-${index}`}
//         {...other}
//       >
//         {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
//       </div>
//     );
//   }

//   CustomTabPanel.propTypes = {
//     children: PropTypes.node,
//     index: PropTypes.number.isRequired,
//     value: PropTypes.number.isRequired,
//   };

//   function a11yProps(index) {
//     return {
//       id: `simple-tab-${index}`,
//       "aria-controls": `simple-tabpanel-${index}`,
//     };
//   }

//   return (
//     <div className="main-content-holder">
//       <Box sx={{ width: "100%" }}>
//         <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: "background.paper" }}>
//           <Tabs
//             value={value}
//             onChange={handleChange}
//             variant="scrollable"
//             scrollButtons
//             allowScrollButtonsMobile
//             aria-label="scrollable force tabs example"
//           >
//             <Tab label="Add Doctor" {...a11yProps(0)} />
//             <Tab label="Manage Doctors" {...a11yProps(1)} />
//             <Tab label="Item Three" {...a11yProps(2)} />
//             <Tab label="Item Four" {...a11yProps(3)} />
//             <Tab label="Item Five" {...a11yProps(4)} />
//             <Tab label="Item Six" {...a11yProps(5)} />
//             <Tab label="Item Seven" {...a11yProps(6)} />
//           </Tabs>
//         </Box>
//         <CustomTabPanel value={value} index={0}>
//           <div>
//             <form
//               className="d-flex flex-column gap-3 gap-class form-class"
//               onSubmit={handleSubmit}
//             >
//               {/* Full Name */}
//               <div className="d-flex flex-row align-items-center">
//                 <label htmlFor="full-name" className="form-label w-25 label-class">
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   className="form-control input-class"
//                   id="full-name"
//                   aria-label="Full Name"
//                   value={fullName}
//                   onChange={(e) => setFullName(e.target.value)}
//                 />
//               </div>

//               {/* Specialty */}
//               <div className="d-flex flex-row align-items-center">
//                 <label htmlFor="specialty" className="form-label w-25 label-class">
//                   Specialty
//                 </label>
//                 <select
//                   className="form-select input-class"
//                   id="specialty"
//                   aria-label="Specialty"
//                   value={specialty}
//                   onChange={(e) => setSpecialty(e.target.value)}
//                 >
//                   <option value="" disabled>
//                     Select Specialty
//                   </option>
//                   <option value="cardiologist">Cardiologist</option>
//                   <option value="dermatologist">Dermatologist</option>
//                   <option value="neurologist">Neurologist</option>
//                 </select>
//               </div>

//               {/* Email and Phone Number */}
//               <div className="d-flex gap-3">
//                 <div className="d-flex flex-row align-items-center w-50">
//                   <label htmlFor="email" className="form-label label-class">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     className="form-control input-class"
//                     id="email"
//                     aria-label="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </div>

//                 <div className="d-flex flex-row align-items-center w-50">
//                   <label htmlFor="phone" className="form-label label-class">
//                     Phone Number
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control input-class"
//                     id="phone"
//                     aria-label="Phone Number"
//                     value={phone}
//                     onChange={(e) => setPhone(e.target.value)}
//                   />
//                 </div>
//               </div>

//               {/* Profile Picture */}
//               <div className="d-flex flex-row align-items-center">
//                 <label
//                   htmlFor="profile-picture"
//                   className="form-label w-25 label-class"
//                 >
//                   Profile Picture
//                 </label>
//                 <input
//                   type="file"
//                   className="form-control input-class"
//                   id="profile-picture"
//                   aria-label="Profile Picture"
//                   onChange={(e) => setProfilePicture(e.target.files[0])}
//                 />
//               </div>

//               {/* Biography */}
//               <div className="d-flex flex-row align-items-center">
//                 <label htmlFor="biography" className="form-label w-25 label-class">
//                   Biography
//                 </label>
//                 <textarea
//                   className="form-control input-class"
//                   id="biography"
//                   rows="3"
//                   aria-label="Biography"
//                   value={biography}
//                   onChange={(e) => setBiography(e.target.value)}
//                 />
//               </div>

//               {/* Qualifications */}
//               <div className="d-flex flex-row align-items-center">
//                 <label htmlFor="qualifications" className="form-label w-25 label-class">
//                   Qualifications
//                 </label>
//                 <textarea
//                   className="form-control input-class"
//                   id="qualifications"
//                   rows="3"
//                   aria-label="Qualifications"
//                   value={qualifications}
//                   onChange={(e) => setQualifications(e.target.value)}
//                 />
//               </div>

//               {/* Status */}
//               <div className="d-flex flex-row align-items-center">
//                 <label htmlFor="status" className="form-label w-25 label-class">
//                   Status
//                 </label>
//                 <div className="form-check form-switch">
//                   <input
//                     className="form-check-input input-class"
//                     type="checkbox"
//                     id="status"
//                     checked={status}
//                     onChange={() => setStatus(!status)}
//                   />
//                   <label className="form-check-label label-class" htmlFor="status">
//                     Active/Inactive
//                   </label>
//                 </div>
//               </div>

//               {/* Submit and Reset Buttons */}
//               <div className="d-flex justify-content-between mt-3">
//                 <button type="submit" className="btn btn-primary button-class">
//                   Save
//                 </button>
//                 <button type="reset" className="btn btn-secondary button-class">
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </CustomTabPanel>
//         <CustomTabPanel value={value} index={1}>
//           <ViewDoctors/>
//         </CustomTabPanel>
//         <CustomTabPanel value={value} index={2}>
//           Item Three
//         </CustomTabPanel>
//       </Box>
//     </div>
//   );
// };

// export default Doctor;







// import React, { useState } from "react";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import Box from "@mui/material/Box";
// import PropTypes from 'prop-types';
// // In your main React component or index.js
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './index.css'



// const Doctor = () => {

//   const [value, setValue] = useState(0);
//   const [fullName,setFullName] = useState('');
//   const [specialty,setSpecialty] = useState('');
//   const [email,setEmail] = useState('');
//   const [phone,setPhone] = useState('');
//   const [profilePicture, setProfilePicture] = useState(null);
//   const [biography,setBiography] = useState('');
//   const [qualifications,setQualifications] = useState('');
//   const [status,setStatus] = useState(false);


//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Step 3: Collect the form data
//     const formData = {
//       fullName,
//       specialty,
//       email,
//       phone,
//       profilePicture,
//       biography,
//       qualifications,
//       status
//     };

//     // Step 4: Process the data (log or send to server)
//     console.log('Form Data Submitted:', formData);

//   };
//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };


//   function CustomTabPanel(props) {
//     const { children, value, index, ...other } = props;
  
//     return (
//       <div
//         role="tabpanel"
//         hidden={value !== index}
//         id={`simple-tabpanel-${index}`}
//         aria-labelledby={`simple-tab-${index}`}
//         {...other}
//       >
//         {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
//       </div>
//     );
//   }
  
//   CustomTabPanel.propTypes = {
//     children: PropTypes.node,
//     index: PropTypes.number.isRequired,
//     value: PropTypes.number.isRequired,
//   };
  
//   function a11yProps(index) {
//     return {
//       id: `simple-tab-${index}`,
//       'aria-controls': `simple-tabpanel-${index}`,
//     };
//   }


//   return (
//     <div className="main-content-holder">
//         <Box sx={{ width: '100%' }}>
//       <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: "background.paper" } }>
//         <Tabs
//           value={value}
//           onChange={handleChange}
//           variant="scrollable"
//           scrollButtons
//           allowScrollButtonsMobile
//           aria-label="scrollable force tabs example"
//         >
//           <Tab label="Add Doctor" {...a11yProps(0)} />
//           <Tab label="Item Two" {...a11yProps(1)} />
//           <Tab label="Item Three" {...a11yProps(2)} />
//           <Tab label="Item Four" {...a11yProps(3)} />
//           <Tab label="Item Five"{...a11yProps(4)}  />
//           <Tab label="Item Six" {...a11yProps(5)} />
//           <Tab label="Item Seven" {...a11yProps(6)} />
//         </Tabs>
//       </Box>
//       <CustomTabPanel value={value} index={0}>
//         <div>
//         <form className="d-flex flex-column gap-3 gap-class form-class" onSubmit={handleSubmit}>
//   {/* Full Name */}
//   <div className="d-flex flex-row align-items-center">
//     <label htmlFor="full-name" className="form-label w-25 label-class">Full Name</label>
//     <input 
//       type="text" 
//       className="form-control input-class" 
//       id="full-name" 
//       aria-label="Full Name"
//       value={fullName}
//       onChange={(e) => setFullName(e.target.value)}
//     />
//   </div>

//   {/* Specialty */}
//   <div className="d-flex flex-row align-items-center">
//     <label htmlFor="specialty" className="form-label w-25 label-class">Specialty</label>
//     <select
//       className="form-select input-class"
//       id="specialty"
//       aria-label="Specialty"
//       value={specialty}
//       onChange={(e) => setSpecialty(e.target.value)}
//     >
//       <option value="" disabled>Select Specialty</option>
//       <option value="cardiologist">Cardiologist</option>
//       <option value="dermatologist">Dermatologist</option>
//       <option value="neurologist">Neurologist</option>
//     </select>
//   </div>

//   {/* Email and Phone Number */}
//   <div className="d-flex gap-3">
//     <div className="d-flex flex-row align-items-center w-50">
//       <label htmlFor="email" className="form-label label-class">Email</label>
//       <input 
//         type="email" 
//         className="form-control input-class" 
//         id="email" 
//         aria-label="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//     </div>

//     <div className="d-flex flex-row align-items-center w-50">
//       <label htmlFor="phone" className="form-label label-class">Phone Number</label>
//       <input 
//         type="text" 
//         className="form-control input-class" 
//         id="phone" 
//         aria-label="Phone Number"
//         value={phone}
//         onChange={(e) => setPhone(e.target.value)}
//       />
//     </div>
//   </div>

//   {/* Profile Picture */}
//   <div className="d-flex flex-row align-items-center">
//     <label htmlFor="profile-picture" className="form-label w-25 label-class">Profile Picture</label>
//     <input 
//       type="file" 
//       className="form-control input-class" 
//       id="profile-picture" 
//       aria-label="Profile Picture"
//       onChange={(e) => setProfilePicture(e.target.files[0])}
//     />
//   </div>

//   {/* Biography */}
//   <div className="d-flex flex-row align-items-center">
//     <label htmlFor="biography" className="form-label w-25 label-class">Biography</label>
//     <textarea
//       className="form-control input-class"
//       id="biography"
//       rows="3"
//       aria-label="Biography"
//       value={biography}
//       onChange={(e) => setBiography(e.target.value)}
//     />
//   </div>

//   {/* Qualifications */}
//   <div className="d-flex flex-row align-items-center">
//     <label htmlFor="qualifications" className="form-label w-25 label-class">Qualifications</label>
//     <textarea
//       className="form-control input-class"
//       id="qualifications"
//       rows="3"
//       aria-label="Qualifications"
//       value={qualifications}
//       onChange={(e) => setQualifications(e.target.value)}
//     />
//   </div>

//   {/* Status */}
//   <div className="d-flex flex-row align-items-center">
//     <label htmlFor="status" className="form-label w-25 label-class">Status</label>
//     <div className="form-check form-switch">
//       <input
//         className="form-check-input input-class"
//         type="checkbox"
//         id="status"
//         checked={status}
//         onChange={() => setStatus(!status)}
//       />
//       <label className="form-check-label label-class" htmlFor="status">Active/Inactive</label>
//     </div>
//   </div>

//   {/* Submit and Reset Buttons */}
//   <div className="d-flex justify-content-between mt-3">
//     <button type="submit" className="btn btn-primary button-class">Save</button>
//     <button type="reset" className="btn btn-secondary button-class">Cancel</button>
//   </div>
//   </form>
//         </div>
//       </CustomTabPanel>
//       <CustomTabPanel value={value} index={1}>
//         Item Two
//       </CustomTabPanel>
//       <CustomTabPanel value={value} index={2}>
//         Item Three
//       </CustomTabPanel>
//       </Box>
//     </div>
//   );
// };

// export default Doctor;
