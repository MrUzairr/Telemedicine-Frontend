import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Snackbar,
  Alert,
  TextField,
  Switch,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const ViewDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [expandedDoctor, setExpandedDoctor] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // Create a ref for the file input
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3005/doc/getalldoctors");
        setDoctors(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch doctor details.");
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3005/doc/deletedoctor/${id}`);
      setDoctors(doctors.filter((doctor) => doctor._id !== id));
      setSuccessMessage("Doctor details deleted successfully!");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to delete doctor.");
    }
  };

  const handleEdit = (doctor) => {
    setEditingDoctor(doctor);
  };

  const handleUpdateDoctor = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", editingDoctor.fullName);
    formData.append("specialty", editingDoctor.specialty);
    formData.append("email", editingDoctor.email);
    formData.append("phone", editingDoctor.phone);
    formData.append("biography", editingDoctor.biography);
    formData.append("qualifications", editingDoctor.qualifications);
    formData.append("status", editingDoctor.status);

    if (selectedFile) {
      console.log("profilePicture", selectedFile)
      formData.append("profilePicture", selectedFile);
    }

    try {
      const response = await axios.put(`http://localhost:3005/doc/updatedoctor/${editingDoctor._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setDoctors(doctors.map((doc) => (doc._id === editingDoctor._id ? response.data : doc)));
      setSuccessMessage("Doctor details updated successfully!");
      setEditingDoctor(null);
      setSelectedFile(null); // Reset the selected file after submission
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update doctor.");
    }
  };

  const handleInputChange = (e) => {
    setEditingDoctor({
      ...editingDoctor,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger file input click using the ref if it's not null
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file); // Set selected file to state
  };

  return (
    <Box p={4} maxWidth="1000px" margin="auto">
      <Typography variant="h4" textAlign="center" gutterBottom>
        View Doctors
      </Typography>

      {error && (
        <Snackbar open={true} autoHideDuration={4000} onClose={() => setError(null)}>
          <Alert severity="error">{error}</Alert>
        </Snackbar>
      )}
      {successMessage && (
        <Snackbar open={true} autoHideDuration={4000} onClose={() => setSuccessMessage(null)}>
          <Alert severity="success">{successMessage}</Alert>
        </Snackbar>
      )}

      <Typography variant="h6" gutterBottom>
        Existing Doctor Details
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Full Name</b></TableCell>
                <TableCell><b>Specialty</b></TableCell>
                <TableCell><b>Email</b></TableCell>
                <TableCell><b>Phone</b></TableCell>
                <TableCell><b>Profile Picture</b></TableCell>
                <TableCell><b>Biography</b></TableCell>
                <TableCell><b>Qualifications</b></TableCell>
                <TableCell><b>Status</b></TableCell>
                <TableCell align="center"><b>Actions</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {doctors.length > 0 ? (
                doctors.map((doctor) => (
                  <TableRow key={doctor._id}>
                    <TableCell>{doctor.fullName}</TableCell>
                    <TableCell>{doctor.specialty}</TableCell>
                    <TableCell>{doctor.email}</TableCell>
                    <TableCell>{doctor.phone}</TableCell>
                    <TableCell>
                      {doctor.profilePicture && (
                        <img
                          src={`http://localhost:3005/images/${doctor.profilePicture}`}
                          alt={doctor.fullName}
                          style={{
                            width: "50px",
                            height: "50px",
                            objectPosition: "top center",
                            objectFit: "cover",
                            borderRadius: "50%",
                            cursor: "pointer",
                          }}
                          onClick={handleImageClick} // Click to trigger file input
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      {expandedDoctor === doctor._id
                        ? doctor.biography
                        : doctor.biography.split(" ").slice(0, 10).join(" ") + "..."}
                      {doctor.biography.split(" ").length > 10 && (
                        <Button
                          onClick={() => setExpandedDoctor(expandedDoctor === doctor._id ? null : doctor._id)}
                          size="small"
                          color="primary"
                          sx={{ textTransform: "none" }}
                        >
                          {expandedDoctor === doctor._id ? "Show Less" : "Read More"}
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>
                      {expandedDoctor === doctor._id
                        ? doctor.qualifications
                        : doctor.qualifications.split(" ").slice(0, 30).join(" ") + "..."}

                      {doctor.qualifications.split(" ").length > 30 && (
                        <Button
                          onClick={() => setExpandedDoctor(expandedDoctor === doctor._id ? null : doctor._id)}
                          size="small"
                          color="primary"
                          sx={{ textTransform: "none" }}
                        >
                          {expandedDoctor === doctor._id ? "Show Less" : "Read More"}
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>{doctor.status === "true" ? "Active" : "Inactive"}</TableCell>
                    <TableCell align="center">
                      <IconButton color="primary" onClick={() => handleEdit(doctor)}>
                        <Edit />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDelete(doctor._id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    No doctors available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {editingDoctor && (
        <Box mt={3} bgcolor="grey.100" p={3} borderRadius={2} boxShadow={3}>
          <Typography variant="h6" gutterBottom>
            Update Doctor Details
          </Typography>
          <form onSubmit={handleUpdateDoctor}>
            <TextField
              label="Full Name"
              name="fullName"
              value={editingDoctor.fullName}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
            />
            <TextField
              label="Specialty"
              name="specialty"
              value={editingDoctor.specialty}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
            />
            <TextField
              label="Email"
              name="email"
              value={editingDoctor.email}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
            />
            <TextField
              label="Phone"
              name="phone"
              value={editingDoctor.phone}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
            />
            <TextField
              label="Biography"
              name="biography"
              value={editingDoctor.biography}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
            />
            <TextField
              label="Qualifications"
              name="qualifications"
              value={editingDoctor.qualifications}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
              required
            />
            <div>
              <label>Status</label>
              <Switch
                checked={editingDoctor.status === "true"}
                onChange={(e) => handleInputChange({ target: { name: "status", value: e.target.checked ? "true" : "false" } })}
              />
            </div>

            <Button variant="contained" color="primary" type="submit">
              Update Doctor
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            {selectedFile && (
              <Box mt={2}>
                <Typography variant="body2">{selectedFile.name}</Typography>
              </Box>
            )}
          </form>
        </Box>
      )}
    </Box>
  );
};

export default ViewDoctors;










// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Box,
//   Button,
//   Typography,
//   IconButton,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   CircularProgress,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import { Delete, Edit } from "@mui/icons-material";

// const ViewDoctors = () => {
//   const [doctors, setDoctors] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState(null);
//   const [editingDoctor, setEditingDoctor] = useState(null);

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get("http://localhost:3005/doc/getalldoctors");
//         setDoctors(response.data.data);  // Access the nested data array
//         console.log("response", response.data); // Log the response to verify
//         setLoading(false);
//       } catch (err) {
//         setError(err.response?.data?.error || "Failed to fetch doctor details.");
//         setLoading(false);
//       }
//     };
//     fetchDoctors();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3005/doc/deletedoctor/${id}`);
//       setDoctors(doctors.filter((doctor) => doctor._id !== id));
//       setSuccessMessage("Doctor details deleted successfully!");
//     } catch (err) {
//       setError(err.response?.data?.error || "Failed to delete doctor.");
//     }
//   };

//   const handleEdit = (doctor) => {
//     setEditingDoctor(doctor);
//     // You could display an edit form or modal here
//   };

//   return (
//     <Box p={4} maxWidth="1000px" margin="auto">
//       <Typography variant="h4" textAlign="center" gutterBottom>
//         View Doctors
//       </Typography>

//       {error && (
//         <Snackbar open={true} autoHideDuration={4000} onClose={() => setError(null)}>
//           <Alert severity="error">{error}</Alert>
//         </Snackbar>
//       )}
//       {successMessage && (
//         <Snackbar open={true} autoHideDuration={4000} onClose={() => setSuccessMessage(null)}>
//           <Alert severity="success">{successMessage}</Alert>
//         </Snackbar>
//       )}

//       <Typography variant="h6" gutterBottom>
//         Existing Doctor Details
//       </Typography>
//       {loading ? (
//         <CircularProgress />
//       ) : (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell><b>Full Name</b></TableCell>
//                 <TableCell><b>Specialty</b></TableCell>
//                 <TableCell><b>Email</b></TableCell>
//                 <TableCell><b>Phone</b></TableCell>
//                 <TableCell><b>Profile Picture</b></TableCell>
//                 <TableCell><b>Biography</b></TableCell>
//                 <TableCell><b>Qualifications</b></TableCell>
//                 <TableCell><b>Status</b></TableCell>
//                 <TableCell align="center"><b>Actions</b></TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {doctors.length > 0 ? (
//                 doctors.map((doctor) => {
//                   console.log("Doctor Data:", doctor);  // Log each doctor object
//                   return (
//                     <TableRow key={doctor._id}>
//                       <TableCell>{doctor.fullName}</TableCell>
//                       <TableCell>{doctor.specialty}</TableCell>
//                       <TableCell>{doctor.email}</TableCell>
//                       <TableCell>{doctor.phone}</TableCell>
//                       <TableCell>
//                         {doctor.profilePicture && (
//                           <img
//                             src={`http://localhost:3005/images/${doctor.profilePicture}`}
//                             alt={doctor.fullName}
//                             style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "50%" }}
//                           />
//                         )}
//                       </TableCell>
//                       <TableCell>{doctor.biography}</TableCell>
//                       <TableCell>{doctor.qualifications}</TableCell>
//                       <TableCell>{doctor.status === "true" ? "Active" : "Inactive"}</TableCell>
//                       <TableCell align="center">
//                         <IconButton color="primary" onClick={() => handleEdit(doctor)}>
//                           <Edit />
//                         </IconButton>
//                         <IconButton color="error" onClick={() => handleDelete(doctor._id)}>
//                           <Delete />
//                         </IconButton>
//                       </TableCell>
//                     </TableRow>
//                   );
//                 })
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={9} align="center">
//                     No doctors available
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </Box>
//   );
// };

// export default ViewDoctors;
