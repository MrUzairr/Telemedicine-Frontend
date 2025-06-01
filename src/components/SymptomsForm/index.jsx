import React, { useState } from "react";
import ChatBot from "../../pages/chatbot";
import './index.css';

const SymptomsForm = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [symptom, setSymptom] = useState("");
  const [severity, setSeverity] = useState("");
  const [symptomDuration, setSymptomDuration] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState("");
  const [confidence, setConfidence] = useState("");
  const [recommendedDoctors, setRecommendedDoctors] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handlePredict = async () => {
    if (!symptom) {
      alert("Please enter symptoms before predicting.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("https://forested-fork-wrist.glitch.me/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms: symptom.split(",") }),
      });
      const data = await response.json();
      setPrediction(data.prediction || "No clear prediction");
      setConfidence(data.confidence || "N/A");
      setRecommendedDoctors(data.recommended_doctors || []);
      setOpenDialog(true);
    } catch (error) {
      alert("Prediction failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setOpenDialog(false);
    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("dob", dob);
    formData.append("gender", gender);
    formData.append("symptom", symptom);
    formData.append("severity", severity);
    formData.append("symptomDuration", symptomDuration);
    formData.append("predictedDisease", prediction);
    if (files.length > 0) {
      formData.append("file", files[0]);
    }
    try {
      const response = await fetch("http://localhost:3005/patient-symptoms/submit", {
        method: "POST",
        body: formData,
      });
      alert(response.ok ? "Form submitted successfully!" : "Error submitting form.");
    } catch (error) {
      alert("Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-2xl rounded-2xl mt-10 relative overflow-hidden">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">🩺 Symptom Submission Form</h2>

      <form className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Full Name"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="date"
            className="input"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </div>

        <select
          className="input"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <input
          type="text"
          placeholder="Primary Symptom (comma separated)"
          className="input"
          value={symptom}
          onChange={(e) => setSymptom(e.target.value)}
          required
        />

        <div className="grid sm:grid-cols-2 gap-6">
          <input
            type="number"
            placeholder="Severity (1-10)"
            className="input"
            min="1"
            max="10"
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Duration of Symptom"
            className="input"
            value={symptomDuration}
            onChange={(e) => setSymptomDuration(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center space-x-4">
          <label className="block w-full">
            <span className="text-gray-600">Upload Medical Report</span>
            <input
              type="file"
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0 file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              onChange={handleFileChange}
              accept=".pdf,.docx,.jpg,.jpeg,.png"
            />
          </label>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button type="button" onClick={handleBack} className="btn btn-gray">
            ← Back
          </button>
          <button type="button" onClick={handlePredict} disabled={loading} className="btn btn-indigo">
            {loading ? "Predicting..." : "🔍 Predict Disease"}
          </button>
          <button type="button" onClick={handleSubmit} disabled={loading} className="btn btn-green">
            {loading ? "Submitting..." : "✅ Submit Data"}
          </button>
        </div>
      </form>

      {openDialog && (
        <div className="mt-6 bg-indigo-50 p-6 rounded-lg border border-indigo-200">
          <h3 className="text-xl font-semibold text-indigo-700 mb-2">🧠 Prediction Result</h3>
          <p className="text-gray-800 mb-1">
            <strong>Disease:</strong> {prediction}
          </p>
          <p className="text-gray-800 mb-3">
            <strong>Confidence:</strong> {confidence}
          </p>

          <h4 className="text-lg font-medium text-indigo-600 mb-2">👨‍⚕️ Recommended Doctors:</h4>
          <ul className="space-y-4">
            {recommendedDoctors.map((doc, idx) => (
              <li key={doc._id} className="p-4 bg-white rounded-lg shadow border">
                <p className="font-semibold text-gray-900">{doc.fullName}</p>
                <p className="text-sm text-gray-600">📧 {doc.email}</p>
                <p className="text-sm text-gray-600">📞 {doc.phone}</p>
                <p className="text-sm text-gray-600">🎓 {doc.qualifications}</p>
                <p className="text-sm text-gray-600">🩺 Specialty: {doc.specialty}</p>
                <p className="text-sm text-gray-600">
                  ✅ Status: {doc.status === "true" ? "Available" : "Unavailable"}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex gap-4">
            <button onClick={() => setOpenDialog(false)} className="btn btn-gray">
              Cancel
            </button>
            <button onClick={handleSubmit} className="btn btn-indigo">
              Submit Data
            </button>
          </div>
        </div>
      )}

      <ChatBot showChatbot={showChatbot} setShowChatbot={setShowChatbot} />
    </div>
  );
};

export default SymptomsForm;









// import React, { useState } from "react";
// import ChatBot from "../../pages/chatbot";
// import './index.css'

// const SymptomsForm = () => {
//   const [name, setName] = useState("");
//   const [dob, setDob] = useState("");
//   const [gender, setGender] = useState("");
//   const [symptom, setSymptom] = useState("");
//   const [severity, setSeverity] = useState("");
//   const [symptomDuration, setSymptomDuration] = useState("");
//   const [files, setFiles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [prediction, setPrediction] = useState("");
//   const [openDialog, setOpenDialog] = useState(false);
//   const [showChatbot, setShowChatbot] = useState(false);

//   const handleFileChange = (e) => {
//     setFiles(e.target.files);
//   };

//   const handlePredict = async () => {
//     if (!symptom) {
//       alert("Please enter symptoms before predicting.");
//       return;
//     }
//     setLoading(true);
//     try {
//       const response = await fetch("https://forested-fork-wrist.glitch.me/predict", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ symptoms: symptom.split(",") }),
//       });
//       const data = await response.json();
//       setPrediction(data.prediction || "No clear prediction");
//       setOpenDialog(true);
//     } catch (error) {
//       alert("Prediction failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async () => {
//     setOpenDialog(false);
//     setLoading(true);
//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("dob", dob);
//     formData.append("gender", gender);
//     formData.append("symptom", symptom);
//     formData.append("severity", severity);
//     formData.append("symptomDuration", symptomDuration);
//     formData.append("predictedDisease", prediction);
//     if (files.length > 0) {
//       formData.append("file", files[0]);
//     }
//     try {
//       const response = await fetch("http://localhost:3005/patient-symptoms/submit", {
//         method: "POST",
//         body: formData,
//       });
//       alert(response.ok ? "Form submitted successfully!" : "Error submitting form.");
//     } catch (error) {
//       alert("Submission failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBack = () => {
//     window.history.back();
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-8 bg-white shadow-2xl rounded-2xl mt-10 relative overflow-hidden">
//       <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">🩺 Symptom Submission Form</h2>

//       <form className="space-y-6">
//         <div className="grid sm:grid-cols-2 gap-6">
//           <input
//             type="text"
//             placeholder="Full Name"
//             className="input"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//           <input
//             type="date"
//             className="input"
//             value={dob}
//             onChange={(e) => setDob(e.target.value)}
//             required
//           />
//         </div>

//         <select
//           className="input"
//           value={gender}
//           onChange={(e) => setGender(e.target.value)}
//           required
//         >
//           <option value="">Select Gender</option>
//           <option value="male">Male</option>
//           <option value="female">Female</option>
//           <option value="other">Other</option>
//         </select>

//         <input
//           type="text"
//           placeholder="Primary Symptom (comma separated)"
//           className="input"
//           value={symptom}
//           onChange={(e) => setSymptom(e.target.value)}
//           required
//         />

//         <div className="grid sm:grid-cols-2 gap-6">
//           <input
//             type="number"
//             placeholder="Severity (1-10)"
//             className="input"
//             min="1"
//             max="10"
//             value={severity}
//             onChange={(e) => setSeverity(e.target.value)}
//             required
//           />
//           <input
//             type="text"
//             placeholder="Duration of Symptom"
//             className="input"
//             value={symptomDuration}
//             onChange={(e) => setSymptomDuration(e.target.value)}
//             required
//           />
//         </div>

//         <div className="flex items-center space-x-4">
//           <label className="block w-full">
//             <span className="text-gray-600">Upload Medical Report</span>
//             <input
//               type="file"
//               className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
//               file:rounded-full file:border-0 file:text-sm file:font-semibold
//               file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
//               onChange={handleFileChange}
//               accept=".pdf,.docx,.jpg,.jpeg,.png"
//             />
//           </label>
//         </div>

//         <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
//           <button
//             type="button"
//             onClick={handleBack}
//             className="btn btn-gray"
//           >
//             ← Back
//           </button>
//           <button
//             type="button"
//             onClick={handlePredict}
//             disabled={loading}
//             className="btn btn-indigo"
//           >
//             {loading ? "Predicting..." : "🔍 Predict Disease"}
//           </button>
//           <button
//             type="button"
//             onClick={handleSubmit}
//             disabled={loading}
//             className="btn btn-green"
//           >
//             {loading ? "Submitting..." : "✅ Submit Data"}
//           </button>
//         </div>
//       </form>

//       {openDialog && (
//         <div className="mt-6 bg-indigo-50 p-4 rounded-lg border border-indigo-200">
//           <h3 className="text-xl font-semibold text-indigo-700 mb-2">Prediction Result</h3>
//           <p className="text-gray-700">
//             The predicted disease is: <strong>{prediction}</strong>
//           </p>
//           <p className="text-sm mt-2 text-gray-600">Would you like to save this data?</p>
//           <div className="mt-4 flex gap-4">
//             <button
//               onClick={() => setOpenDialog(false)}
//               className="btn btn-gray"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleSubmit}
//               className="btn btn-indigo"
//             >
//               Submit Data
//             </button>
//           </div>
//         </div>
//       )}

//       <ChatBot showChatbot={showChatbot} setShowChatbot={setShowChatbot} />
//     </div>
//   );
// };

// export default SymptomsForm;







// import React, { useState } from "react";
// import ChatBot from "../../pages/chatbot";
// import './index.css'
// const SymptomsForm = () => {
//   const [name, setName] = useState("");
//   const [dob, setDob] = useState("");
//   const [gender, setGender] = useState("");
//   const [symptom, setSymptom] = useState("");
//   const [severity, setSeverity] = useState("");
//   const [symptomDuration, setSymptomDuration] = useState("");
//   const [files, setFiles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [prediction, setPrediction] = useState("");
//   const [openDialog, setOpenDialog] = useState(false);
//   const [showChatbot, setShowChatbot] = useState(false);

//   const handleFileChange = (e) => {
//     setFiles(e.target.files);
//   };

//   const handlePredict = async () => {
//     if (!symptom) {
//       alert("Please enter symptoms before predicting.");
//       return;
//     }
//     setLoading(true);
//     try {
//       const response = await fetch("http://127.0.0.1:5000/predict", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ symptoms: symptom.split(",") }),
//       });
//       const data = await response.json();
//       setPrediction(data.prediction || "No clear prediction");
//       setOpenDialog(true);
//     } catch (error) {
//       alert("Prediction failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async () => {
//     setOpenDialog(false);
//     setLoading(true);
//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("dob", dob);
//     formData.append("gender", gender);
//     formData.append("symptom", symptom);
//     formData.append("severity", severity);
//     formData.append("symptomDuration", symptomDuration);
//     formData.append("predictedDisease", prediction);
//     if (files.length > 0) {
//       formData.append("file", files[0]);
//     }
//     try {
//       const response = await fetch("http://localhost:3005/patient-symptoms/submit", {
//         method: "POST",
//         body: formData,
//       });
//       alert(response.ok ? "Form submitted successfully!" : "Error submitting form.");
//     } catch (error) {
//       alert("Submission failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-8 bg-white shadow-2xl rounded-2xl mt-10 relative overflow-hidden">
//       <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">🩺 Symptom Submission Form</h2>

//       <form className="space-y-6">
//         <div className="grid sm:grid-cols-2 gap-6">
//           <input
//             type="text"
//             placeholder="Full Name"
//             className="input"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//           <input
//             type="date"
//             className="input"
//             value={dob}
//             onChange={(e) => setDob(e.target.value)}
//             required
//           />
//         </div>

//         <select
//           className="input"
//           value={gender}
//           onChange={(e) => setGender(e.target.value)}
//           required
//         >
//           <option value="">Select Gender</option>
//           <option value="male">Male</option>
//           <option value="female">Female</option>
//           <option value="other">Other</option>
//         </select>

//         <input
//           type="text"
//           placeholder="Primary Symptom (comma separated)"
//           className="input"
//           value={symptom}
//           onChange={(e) => setSymptom(e.target.value)}
//           required
//         />

//         <div className="grid sm:grid-cols-2 gap-6">
//           <input
//             type="number"
//             placeholder="Severity (1-10)"
//             className="input"
//             min="1"
//             max="10"
//             value={severity}
//             onChange={(e) => setSeverity(e.target.value)}
//             required
//           />
//           <input
//             type="text"
//             placeholder="Duration of Symptom"
//             className="input"
//             value={symptomDuration}
//             onChange={(e) => setSymptomDuration(e.target.value)}
//             required
//           />
//         </div>

//         <div className="flex items-center space-x-4">
//           <label className="block">
//             <span className="text-gray-600">Upload Medical Report</span>
//             <input
//               type="file"
//               className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
//               file:rounded-full file:border-0 file:text-sm file:font-semibold
//               file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
//               onChange={handleFileChange}
//               accept=".pdf,.docx,.jpg,.jpeg,.png"
//             />
//           </label>
//         </div>

//         <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
//           <button
//             type="button"
//             onClick={handlePredict}
//             disabled={loading}
//             className="btn btn-indigo"
//           >
//             {loading ? "Predicting..." : "🔍 Predict Disease"}
//           </button>
//           <button
//             type="button"
//             onClick={handleSubmit}
//             disabled={loading}
//             className="btn btn-green"
//           >
//             {loading ? "Submitting..." : "✅ Submit Data"}
//           </button>
//         </div>
//       </form>

//       {openDialog && (
//         <div className="mt-6 bg-indigo-50 p-4 rounded-lg border border-indigo-200">
//           <h3 className="text-xl font-semibold text-indigo-700 mb-2">Prediction Result</h3>
//           <p className="text-gray-700">
//             The predicted disease is: <strong>{prediction}</strong>
//           </p>
//           <p className="text-sm mt-2 text-gray-600">Would you like to save this data?</p>
//           <div className="mt-4 flex gap-4">
//             <button
//               onClick={() => setOpenDialog(false)}
//               className="btn btn-gray"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleSubmit}
//               className="btn btn-indigo"
//             >
//               Submit Data
//             </button>
//           </div>
//         </div>
//       )}

//       <ChatBot showChatbot={showChatbot} setShowChatbot={setShowChatbot} />
//     </div>
//   );
// };

// export default SymptomsForm;






// import React, { useState } from "react";
// import {
//   TextField, Button, Typography, Box, Grid, MenuItem, Select, InputLabel,
//   FormControl, IconButton, Tooltip, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions
// } from "@mui/material";
// import { AttachFile } from "@mui/icons-material";
// import { useMediaQuery } from "@mui/material";
// import ChatBot from "../../pages/chatbot";

// const SymptomsForm = () => {
//   const [name, setName] = useState("");
//   const [dob, setDob] = useState("");
//   const [gender, setGender] = useState("");
//   const [symptom, setSymptom] = useState("");
//   const [severity, setSeverity] = useState("");
//   const [symptomDuration, setSymptomDuration] = useState("");
//   const [files, setFiles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [prediction, setPrediction] = useState("");
//   const [openDialog, setOpenDialog] = useState(false);
//   const [showChatbot, setShowChatbot] = useState(false);

//   const isSmallScreen = useMediaQuery("(max-width:500px)");

//   const handleFileChange = (e) => {
//     setFiles(e.target.files);
//   };

//   const handlePredict = async () => {
//     if (!symptom) {
//       alert("Please enter symptoms before predicting.");
//       return;
//     }
//     setLoading(true);
//     try {
//       const response = await fetch("http://127.0.0.1:5000/predict", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ symptoms: symptom.split(",") }),
//       });
//       const data = await response.json();
//       setPrediction(data.prediction || "No clear prediction");
//       setOpenDialog(true);
//     } catch (error) {
//       alert("Prediction failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async () => {
//     setOpenDialog(false);
//     setLoading(true);
//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("dob", dob);
//     formData.append("gender", gender);
//     formData.append("symptom", symptom);
//     formData.append("severity", severity);
//     formData.append("symptomDuration", symptomDuration);
//     formData.append("predictedDisease", prediction);
//     if (files.length > 0) {
//       formData.append("file", files[0]);
//     }
//     try {
//       const response = await fetch("http://localhost:3005/patient-symptoms/submit", {
//         method: "POST",
//         body: formData,
//       });
//       if (response.ok) {
//         alert("Form submitted successfully!");
//       } else {
//         alert("Error submitting form.");
//       }
//     } catch (error) {
//       alert("Submission failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box sx={{ maxWidth: "600px", margin: "auto", padding: 4, boxShadow: 3, borderRadius: "8px", backgroundColor: "#f5f5f5" }}>
//       {!(isSmallScreen && showChatbot) && (
//         <>
//           <Typography variant="h4" gutterBottom align="center" color="primary">
//             Symptom Data Submission
//           </Typography>
//           <form>
//             <Grid container spacing={3}>
//               <Grid item xs={12}><TextField fullWidth label="Full Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} required /></Grid>
//               <Grid item xs={12}><TextField fullWidth label="Date of Birth" type="date" variant="outlined" value={dob} onChange={(e) => setDob(e.target.value)} InputLabelProps={{ shrink: true }} required /></Grid>
//               <Grid item xs={12}><FormControl fullWidth><InputLabel>Gender</InputLabel><Select value={gender} onChange={(e) => setGender(e.target.value)} required><MenuItem value="male">Male</MenuItem><MenuItem value="female">Female</MenuItem><MenuItem value="other">Other</MenuItem></Select></FormControl></Grid>
//               <Grid item xs={12}><TextField fullWidth label="Primary Symptom" variant="outlined" value={symptom} onChange={(e) => setSymptom(e.target.value)} required /></Grid>
//               <Grid item xs={12} sm={6}><TextField fullWidth label="Symptom Severity (1-10)" type="number" variant="outlined" value={severity} onChange={(e) => setSeverity(e.target.value)} inputProps={{ min: 1, max: 10 }} required /></Grid>
//               <Grid item xs={12} sm={6}><TextField fullWidth label="Duration of Symptom" variant="outlined" value={symptomDuration} onChange={(e) => setSymptomDuration(e.target.value)} required /></Grid>
//               <Grid item xs={12}><Button fullWidth onClick={handlePredict} variant="contained" color="primary" disabled={loading}>{loading ? <CircularProgress size={24} /> : "Predict Disease"}</Button></Grid>
//               <Grid item xs={12}><Typography variant="h6">Upload Medical Reports</Typography><input type="file" hidden onChange={handleFileChange} multiple accept=".pdf,.docx,.jpg,.jpeg,.png" id="file-upload-input" /><label htmlFor="file-upload-input"><Tooltip title="Click to upload medical reports"><IconButton color="primary" component="span" size="large"><AttachFile /></IconButton></Tooltip></label></Grid>
//               <Grid item xs={12}><Button fullWidth onClick={handleSubmit} variant="contained" color="primary" disabled={loading}>{loading ? <CircularProgress size={24} /> : "Submit"}</Button></Grid>
//             </Grid>
//           </form>
//         </>
//       )}
//       <Dialog open={openDialog} onClose={() => setOpenDialog(false)}><DialogTitle>Prediction Result</DialogTitle><DialogContent><Typography>The predicted disease is: <strong>{prediction}</strong></Typography><Typography>Do you want to save this data?</Typography></DialogContent><DialogActions><Button onClick={() => setOpenDialog(false)} color="secondary">Cancel</Button><Button onClick={handleSubmit} color="primary" variant="contained">Submit Data</Button></DialogActions></Dialog>
//       <ChatBot showChatbot={showChatbot} setShowChatbot={setShowChatbot} />
//     </Box>
//   );
// };
// export default SymptomsForm;





// import React, { useState } from 'react';
// import {
//   TextField, Button, Typography, Box, Grid, MenuItem, Select, InputLabel,
//   FormControl, IconButton, Tooltip, CircularProgress
// } from '@mui/material';
// import { AttachFile } from '@mui/icons-material';
// import { useMediaQuery } from '@mui/material';
// import ChatBot from '../../pages/chatbot';

// const SymptomsForm = () => {
//   const [name, setName] = useState('');
//   const [dob, setDob] = useState('');
//   const [gender, setGender] = useState('');
//   const [symptom, setSymptom] = useState('');
//   const [severity, setSeverity] = useState('');
//   const [symptomDuration, setSymptomDuration] = useState('');
//   const [files, setFiles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showChatbot, setShowChatbot] = useState(false);

//   const isSmallScreen = useMediaQuery('(max-width:500px)');

//   // Handle file uploads
//   const handleFileChange = (e) => {
//     setFiles(e.target.files);  // Store files as an array
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
  
//     const formData = new FormData();
//     formData.append('name', name);
//     formData.append('dob', dob);
//     formData.append('gender', gender);
//     formData.append('symptom', symptom);
//     formData.append('severity', severity);
//     formData.append('symptomDuration', symptomDuration);
  
//     // Append the single file
//     formData.append('file', files[0]);  // Assuming files[0] is the single file you want to upload
  
//     try {
//       const response = await fetch('http://localhost:3005/patient-symptoms/submit', {
//         method: 'POST',
//         body: formData,
//       });
  
//       const result = await response.json();
//       if (response.ok) {
//         alert('Form submitted successfully!');
//       } else {
//         alert(`Error: ${result.error}`);
//       }
//     } catch (error) {
//       alert(`Submission failed: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   return (
//     <Box sx={{ maxWidth: '600px', margin: 'auto', padding: 4, boxShadow: 3, borderRadius: '8px', backgroundColor: '#f5f5f5' }}>
//       {!(isSmallScreen && showChatbot) && (
//         <>
//           <Typography variant="h4" gutterBottom align="center" color="primary">
//             Symptom Data Submission
//           </Typography>
//           <form onSubmit={handleSubmit}>
//             <Grid container spacing={3}>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Full Name"
//                   variant="outlined"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   required
//                   sx={{ backgroundColor: 'white' }}
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Date of Birth"
//                   type="date"
//                   variant="outlined"
//                   value={dob}
//                   onChange={(e) => setDob(e.target.value)}
//                   InputLabelProps={{ shrink: true }}
//                   required
//                   sx={{ backgroundColor: 'white' }}
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <FormControl fullWidth>
//                   <InputLabel>Gender</InputLabel>
//                   <Select
//                     value={gender}
//                     onChange={(e) => setGender(e.target.value)}
//                     label="Gender"
//                     required
//                     sx={{ backgroundColor: 'white' }}
//                   >
//                     <MenuItem value="male">Male</MenuItem>
//                     <MenuItem value="female">Female</MenuItem>
//                     <MenuItem value="other">Other</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>

//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Primary Symptom"
//                   variant="outlined"
//                   value={symptom}
//                   onChange={(e) => setSymptom(e.target.value)}
//                   required
//                   sx={{ backgroundColor: 'white' }}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Symptom Severity (1-10)"
//                   type="number"
//                   variant="outlined"
//                   value={severity}
//                   onChange={(e) => setSeverity(e.target.value)}
//                   inputProps={{ min: 1, max: 10 }}
//                   required
//                   sx={{ backgroundColor: 'white' }}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Duration of Symptom"
//                   variant="outlined"
//                   value={symptomDuration}
//                   onChange={(e) => setSymptomDuration(e.target.value)}
//                   required
//                   sx={{ backgroundColor: 'white' }}
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <Typography variant="h6" gutterBottom>Upload Medical Reports</Typography>
//                 <Box sx={{
//                   border: '2px dashed #1976d2', borderRadius: '8px', padding: 3, textAlign: 'center'
//                 }}>
//                   <input
//                     type="file"
//                     hidden
//                     onChange={handleFileChange}
//                     multiple
//                     accept=".pdf,.docx,.jpg,.jpeg,.png"
//                     id="file-upload-input"
//                   />
//                   <label htmlFor="file-upload-input">
//                     <Tooltip title="Click to upload medical reports">
//                       <IconButton
//                         color="primary"
//                         component="span"
//                         size="large"
//                         sx={{ fontSize: '30px', marginBottom: 1 }}
//                       >
//                         <AttachFile />
//                       </IconButton>
//                     </Tooltip>
//                     <Typography variant="body1" color="textSecondary">Click or drag files here</Typography>
//                   </label>
//                   <Box sx={{ marginTop: 2 }}>
//                     {files.length > 0 && (
//                       <Typography variant="body2" color="textSecondary">
//                         <strong>Uploaded Files:</strong>
//                         <ul>
//                           {Array.from(files).map((file, index) => (
//                             <li key={index}>{file.name}</li>
//                           ))}
//                         </ul>
//                       </Typography>
//                     )}
//                   </Box>
//                 </Box>
//               </Grid>

//               <Grid item xs={12}>
//                 <Button
//                   fullWidth
//                   type="submit"
//                   variant="contained"
//                   color="primary"
//                   size="large"
//                   disabled={loading}
//                   sx={{
//                     padding: '14px 0',
//                     fontWeight: 'bold',
//                     backgroundColor: loading ? 'gray' : '#1976d2',
//                     '&:hover': { backgroundColor: '#1565c0' }
//                   }}
//                 >
//                   {loading ? <CircularProgress size={24} /> : 'Submit'}
//                 </Button>
//               </Grid>
//             </Grid>
//           </form>
//         </>
//       )}
//       <div>
//         <ChatBot showChatbot={showChatbot} setShowChatbot={setShowChatbot} />
//       </div>
//     </Box>
//   );
// };

// export default SymptomsForm;







// import React, { useState } from 'react';
// import {
//   TextField, Button, Typography, Box, Grid, MenuItem, Select, InputLabel,
//   FormControl, IconButton, Tooltip, CircularProgress
// } from '@mui/material';
// import { AttachFile } from '@mui/icons-material';
// import { useMediaQuery } from '@mui/material';
// import ChatBot from '../../pages/chatbot';

// const SymptomsForm = () => {
//   const [name, setName] = useState('');
//   const [dob, setDob] = useState('');
//   const [gender, setGender] = useState('');
//   const [symptom, setSymptom] = useState('');
//   const [severity, setSeverity] = useState('');
//   const [symptomDuration, setSymptomDuration] = useState('');
//   const [files, setFiles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showChatbot, setShowChatbot] = useState(false); // Shared state

//   const isSmallScreen = useMediaQuery('(max-width:500px)');

//   // Handle file uploads
//   const handleFileChange = (e) => {
//     setFiles([...files, ...e.target.files]);
//   };

 
//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
  
//     try {
//       // Convert files to base64
//       const filePromises = files.map((file) =>
//         new Promise((resolve, reject) => {
//           const reader = new FileReader();
//           reader.onloadend = () => resolve(reader.result);
//           reader.onerror = reject;
//           reader.readAsDataURL(file);
//         })
//       );
  
//       const fileBase64Strings = await Promise.all(filePromises);
  
//       // Prepare JSON data
//       const formData = {
//         name,
//         dob,
//         gender,
//         symptom,
//         severity,
//         symptomDuration,
//         files: fileBase64Strings,  // Attach base64 files here
//       };  
  
//       // Send the data as JSON
//       const response = await fetch('http://localhost:3005/patient-symptoms/submit', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
  
//       const result = await response.json();
//       if (response.ok) {
//         alert('Form submitted successfully!');
//       } else {
//         alert(`Error: ${result.error}`);
//       }
//     } catch (error) {
//       console.error('Submission failed:', error);
//       alert(`Submission failed: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };
  
  
//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   setLoading(true);

//   //   const formData = new FormData();
//   //   formData.append('name', name);
//   //   formData.append('dob', dob);
//   //   formData.append('gender', gender);
//   //   formData.append('symptom', symptom);
//   //   formData.append('severity', severity);
//   //   formData.append('symptomDuration', symptomDuration);

//   //   // Append multiple files
//   //   files.forEach((file) => {
//   //     formData.append('files', file);
//   //   });

//   //   try {
//   //     const response = await fetch('http://localhost:3005/patient-symptoms/submit', {
//   //       method: 'POST',
//   //       body: formData,
//   //     });

//   //     const result = await response.json();
//   //     if (response.ok) {
//   //       alert('Form submitted successfully!');
//   //     } else {
//   //       alert(`Error: ${result.error}`);
//   //     }
//   //   } catch (error) {
//   //     alert(`Submission failed: ${error.message}`);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   return (
//     <Box sx={{ maxWidth: '600px', margin: 'auto', padding: 4, boxShadow: 3, borderRadius: '8px', backgroundColor: '#f5f5f5' }}>
//       {!(isSmallScreen && showChatbot) && (
//         <>
//           <Typography variant="h4" gutterBottom align="center" color="primary">
//             Symptom Data Submission
//           </Typography>
//           <form onSubmit={handleSubmit}>
//             <Grid container spacing={3}>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Full Name"
//                   variant="outlined"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   required
//                   sx={{ backgroundColor: 'white' }}
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Date of Birth"
//                   type="date"
//                   variant="outlined"
//                   value={dob}
//                   onChange={(e) => setDob(e.target.value)}
//                   InputLabelProps={{ shrink: true }}
//                   required
//                   sx={{ backgroundColor: 'white' }}
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <FormControl fullWidth>
//                   <InputLabel>Gender</InputLabel>
//                   <Select
//                     value={gender}
//                     onChange={(e) => setGender(e.target.value)}
//                     label="Gender"
//                     required
//                     sx={{ backgroundColor: 'white' }}
//                   >
//                     <MenuItem value="male">Male</MenuItem>
//                     <MenuItem value="female">Female</MenuItem>
//                     <MenuItem value="other">Other</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>

//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Primary Symptom"
//                   variant="outlined"
//                   value={symptom}
//                   onChange={(e) => setSymptom(e.target.value)}
//                   required
//                   sx={{ backgroundColor: 'white' }}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Symptom Severity (1-10)"
//                   type="number"
//                   variant="outlined"
//                   value={severity}
//                   onChange={(e) => setSeverity(e.target.value)}
//                   inputProps={{ min: 1, max: 10 }}
//                   required
//                   sx={{ backgroundColor: 'white' }}
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Duration of Symptom"
//                   variant="outlined"
//                   value={symptomDuration}
//                   onChange={(e) => setSymptomDuration(e.target.value)}
//                   required
//                   sx={{ backgroundColor: 'white' }}
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <Typography variant="h6" gutterBottom>Upload Medical Reports</Typography>
//                 <Box sx={{
//                   border: '2px dashed #1976d2', borderRadius: '8px', padding: 3, textAlign: 'center'
//                 }}>
//                   <input
//                     type="file"
//                     hidden
//                     onChange={handleFileChange}
//                     multiple
//                     accept=".pdf,.docx"
//                     id="file-upload-input"
//                   />
//                   <label htmlFor="file-upload-input">
//                     <Tooltip title="Click to upload medical reports">
//                       <IconButton
//                         color="primary"
//                         component="span"
//                         size="large"
//                         sx={{ fontSize: '30px', marginBottom: 1 }}
//                       >
//                         <AttachFile />
//                       </IconButton>
//                     </Tooltip>
//                     <Typography variant="body1" color="textSecondary">Click or drag files here</Typography>
//                   </label>
//                   <Box sx={{ marginTop: 2 }}>
//                     {files.length > 0 && (
//                       <Typography variant="body2" color="textSecondary">
//                         <strong>Uploaded Files:</strong>
//                         <ul>
//                           {files.map((file, index) => (
//                             <li key={index}>{file.name}</li>
//                           ))}
//                         </ul>
//                       </Typography>
//                     )}
//                   </Box>
//                 </Box>
//               </Grid>

//               <Grid item xs={12}>
//                 <Button
//                   fullWidth
//                   type="submit"
//                   variant="contained"
//                   color="primary"
//                   size="large"
//                   disabled={loading}
//                   sx={{
//                     padding: '14px 0',
//                     fontWeight: 'bold',
//                     backgroundColor: loading ? 'gray' : '#1976d2',
//                     '&:hover': { backgroundColor: '#1565c0' }
//                   }}
//                 >
//                   {loading ? <CircularProgress size={24} /> : 'Submit'}
//                 </Button>
//               </Grid>
//             </Grid>
//           </form>
//         </>
//       )}
//       <div>
//         <ChatBot showChatbot={showChatbot} setShowChatbot={setShowChatbot} />
//       </div>
//     </Box>
//   );
// };

// export default SymptomsForm;




// import React, { useState } from 'react';
// import {
//   TextField, Button, Typography, Box, Grid, MenuItem, Select, InputLabel,
//   FormControl, FormHelperText, IconButton, Tooltip, CircularProgress
// } from '@mui/material';
// import { useMediaQuery } from '@mui/material';
// import { AttachFile, CloudUpload } from '@mui/icons-material';
// import ChatBot from '../../pages/chatbot';

// const SymptomsForm = () => {
//   const [name, setName] = useState('');
//   const [dob, setDob] = useState('');
//   const [gender, setGender] = useState('');
//   const [symptom, setSymptom] = useState('');
//   const [severity, setSeverity] = useState('');
//   const [symptomDuration, setSymptomDuration] = useState('');
//   const [files, setFiles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showChatbot, setShowChatbot] = useState(false); // Shared state

//   const isSmallScreen = useMediaQuery('(max-width:500px)');
//   // Handle file uploads
//   const handleFileChange = (e) => {
//     setFiles([...files, ...e.target.files]);
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const formData = {
//       name,
//       dob,
//       gender,
//       symptom,
//       severity,
//       symptomDuration,
//       files,
//     };

//     console.log('Form Data Submitted:', formData);
//     // Simulate an API call
//     setTimeout(() => {
//       setLoading(false);
//       alert('Form submitted successfully!');
//     }, 2000); // Simulate 2s API response delay
//   };

//   return (
//     <Box sx={{ maxWidth: '600px', margin: 'auto', padding: 4, boxShadow: 3, borderRadius: '8px', backgroundColor: '#f5f5f5' }}>
//   {!(isSmallScreen && showChatbot) && (
//         <>
//       <Typography variant="h4" gutterBottom align="center" color="primary">
//         Symptom Data Submission
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <Grid container spacing={3}>
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Full Name"
//               variant="outlined"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//               sx={{ backgroundColor: 'white' }}
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Date of Birth"
//               type="date"
//               variant="outlined"
//               value={dob}
//               onChange={(e) => setDob(e.target.value)}
//               InputLabelProps={{ shrink: true }}
//               required
//               sx={{ backgroundColor: 'white' }}
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <FormControl fullWidth>
//               <InputLabel>Gender</InputLabel>
//               <Select
//                 value={gender}
//                 onChange={(e) => setGender(e.target.value)}
//                 label="Gender"
//                 required
//                 sx={{ backgroundColor: 'white' }}
//               >
//                 <MenuItem value="male">Male</MenuItem>
//                 <MenuItem value="female">Female</MenuItem>
//                 <MenuItem value="other">Other</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>

//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Primary Symptom"
//               variant="outlined"
//               value={symptom}
//               onChange={(e) => setSymptom(e.target.value)}
//               required
//               sx={{ backgroundColor: 'white' }}
//             />
//           </Grid>

//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               label="Symptom Severity (1-10)"
//               type="number"
//               variant="outlined"
//               value={severity}
//               onChange={(e) => setSeverity(e.target.value)}
//               inputProps={{ min: 1, max: 10 }}
//               required
//               sx={{ backgroundColor: 'white' }}
//             />
//           </Grid>

//           <Grid item xs={12} sm={6}>
//             <TextField
//               fullWidth
//               label="Duration of Symptom"
//               variant="outlined"
//               value={symptomDuration}
//               onChange={(e) => setSymptomDuration(e.target.value)}
//               required
//               sx={{ backgroundColor: 'white' }}
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <Typography variant="h6" gutterBottom>Upload Medical Reports</Typography>
//             <Box sx={{
//               border: '2px dashed #1976d2', borderRadius: '8px', padding: 3, textAlign: 'center'
//             }}>
//               <input
//                 type="file"
//                 hidden
//                 onChange={handleFileChange}
//                 multiple
//                 accept="image/*, .pdf, .docx"
//                 id="file-upload-input"
//               />
//               <label htmlFor="file-upload-input">
//                 <Tooltip title="Click to upload medical reports">
//                   <IconButton
//                     color="primary"
//                     component="span"
//                     size="large"
//                     sx={{ fontSize: '30px', marginBottom: 1 }}
//                   >
//                     <AttachFile />
//                   </IconButton>
//                 </Tooltip>
//                 <Typography variant="body1" color="textSecondary">Click or drag files here</Typography>
//               </label>
//               <Box sx={{ marginTop: 2 }}>
//                 {files.length > 0 && (
//                   <Typography variant="body2" color="textSecondary">
//                     <strong>Uploaded Files:</strong>
//                     <ul>
//                       {files.map((file, index) => (
//                         <li key={index}>{file.name}</li>
//                       ))}
//                     </ul>
//                   </Typography>
//                 )}
//               </Box>
//             </Box>
//           </Grid>

//           <Grid item xs={12}>
//             <Button
//               fullWidth
//               type="submit"
//               variant="contained"
//               color="primary"
//               size="large"
//               disabled={loading}
//               sx={{
//                 padding: '14px 0',
//                 fontWeight: 'bold',
//                 backgroundColor: loading ? 'gray' : '#1976d2',
//                 '&:hover': { backgroundColor: '#1565c0' }
//               }}
//             >
//               {loading ? <CircularProgress size={24} /> : 'Submit'}
//             </Button>
//           </Grid>
//         </Grid>
//       </form>
//       </>
//       )}
//       <div>
//         <ChatBot showChatbot={showChatbot} setShowChatbot={setShowChatbot}/>
//       </div>
//     </Box>
//   );
// };

// export default SymptomsForm;
