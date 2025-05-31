import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
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
} from "@mui/material";
import { Delete, Edit, Add } from "@mui/icons-material";
import { SketchPicker } from "react-color";

const PaletteManager = () => {
  const [paletteDetails, setPaletteDetails] = useState([]);
  const [details, setDetails] = useState([{ label: "", value: "#000000" }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    const fetchPaletteDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3005/temp/get-palette-details");
        setPaletteDetails(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch palette details.");
        setLoading(false);
      }
    };
    fetchPaletteDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (editingItem) {
      await handleUpdate(editingItem._id, details[0].label, details[0].value);
    } else {
      try {
        const response = await axios.post("http://localhost:3005/temp/palette-details", {
          details,
        });
        setPaletteDetails([...paletteDetails, ...response.data.details]);
        setDetails([{ label: "", value: "#000000" }]);
        setLoading(false);
        setSuccessMessage("Palette details added successfully!");
      } catch (err) {
        setLoading(false);
        setError(err.response?.data?.error || "An error occurred while creating palette details.");
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3005/temp/delete-palette-details/${id}`);
      setPaletteDetails(paletteDetails.filter((detail) => detail._id !== id));
      setSuccessMessage("Palette detail deleted successfully!");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to delete palette detail.");
    }
  };

  const handleUpdate = async (id, label, value) => {
    try {
      setLoading(true);
      const response = await axios.put(`http://localhost:3005/temp/update-palette-details/${id}`, {
        label,
        value,
      });

      if (response.data) {
        setPaletteDetails((prevDetails) =>
          prevDetails.map((detail) => {
            const updatedDetails = detail.details.map((item) =>
              item._id === id ? { ...item, label, value } : item
            );
            return { ...detail, details: updatedDetails };
          })
        );
        setSuccessMessage("Palette detail updated successfully!");
        setDetails([{ label: "", value: "#000000" }]);
        setEditingItem(null);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update palette detail.");
    } finally {
      setLoading(false);
    }
  };

  const addDetailField = () => {
    setDetails([...details, { label: "", value: "#000000" }]);
  };

  const handleDetailChange = (index, field, value) => {
    const updatedDetails = [...details];
    updatedDetails[index][field] = value;
    setDetails(updatedDetails);
  };

  return (
    <Box p={4} maxWidth="800px" margin="auto">
      <Typography variant="h4" textAlign="center" gutterBottom>
        Palette Manager
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

      <Paper elevation={3} sx={{ padding: 2, marginBottom: 4 }}>
        <Typography variant="h6">
          {editingItem ? "Edit Palette Details" : "Add Palette Details"}
        </Typography>
        <form onSubmit={handleSubmit}>
          {details.map((detail, index) => (
            <Box key={index} display="flex" gap={2} marginBottom={2} alignItems="center">
              <TextField
                label="Label"
                value={detail.label}
                onChange={(e) => handleDetailChange(index, "label", e.target.value)}
                required
                fullWidth
              />
              <SketchPicker
                color={detail.value}
                onChangeComplete={(color) =>
                  handleDetailChange(index, "value", color.hex)
                }
              />
            </Box>
          ))}
          <Box display="flex" justifyContent="space-between">
            <Button variant="outlined" startIcon={<Add />} onClick={addDetailField} disabled={loading}>
              Add Another Field
            </Button>
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? <CircularProgress size={24} /> : editingItem ? "Update" : "Submit"}
            </Button>
          </Box>
        </form>
      </Paper>

      <Typography variant="h6" gutterBottom>
        Existing Palette Details
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Label</b></TableCell>
                <TableCell><b>Value</b></TableCell>
                <TableCell align="center"><b>Actions</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paletteDetails.length > 0 ? (
                paletteDetails.map((detail) =>
                  detail.details.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.label}</TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                          }}
                        >
                          <Box
                            sx={{
                              width: "24px",
                              height: "24px",
                              backgroundColor: item.value,
                              border: "1px solid #ccc",
                              borderRadius: "50%",
                            }}
                          />
                          <Typography variant="body2">{item.value}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="primary"
                          onClick={() => {
                            setEditingItem(item);
                            setDetails([{ label: item.label, value: item.value }]);
                          }}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDelete(detail._id)}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No palette details available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default PaletteManager;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Box,
//   Button,
//   TextField,
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
// import { Delete, Edit, Add } from "@mui/icons-material";

// const PaletteManager = () => {
//   const [paletteDetails, setPaletteDetails] = useState([]);
//   const [details, setDetails] = useState([{ label: "", value: "" }]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState(null);
//   const [editingItem, setEditingItem] = useState(null); // State to track the item being edited

//   // Fetch palette details on component mount
//   useEffect(() => {
//     const fetchPaletteDetails = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get("http://localhost:3005/temp/get-palette-details");
//         setPaletteDetails(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError(err.response?.data?.error || "Failed to fetch palette details.");
//         setLoading(false);
//       }
//     };
//     fetchPaletteDetails();
//   }, []);

//   // Handle adding new palette details
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     if (editingItem) {
//       // Update palette details
//       await handleUpdate(editingItem._id, details[0].label, details[0].value);
//     } else {
//       // Add new palette details
//       try {
//         const response = await axios.post("http://localhost:3005/temp/palette-details", {
//           details,
//         });
//         setPaletteDetails([...paletteDetails, ...response.data.details]);
//         setDetails([{ label: "", value: "" }]); // Reset form fields
//         setLoading(false);
//         setSuccessMessage("Palette details added successfully!");
//       } catch (err) {
//         setLoading(false);
//         setError(err.response?.data?.error || "An error occurred while creating palette details.");
//       }
//     }
//   };

//   // Handle delete a palette detail
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3005/temp/delete-palette-details/${id}`);
//       setPaletteDetails(paletteDetails.filter((detail) => detail._id !== id));
//       setSuccessMessage("Palette detail deleted successfully!");
//     } catch (err) {
//       setError(err.response?.data?.error || "Failed to delete palette detail.");
//     }
//   };

//   // Handle updating a palette detail
  
//   const handleUpdate = async (id, label, value) => {
//   try {
//     setLoading(true);

//     const response = await axios.put(`http://localhost:3005/temp/update-palette-details/${id}`, {
//       label,
//       value,
//     });

//     if (response.data) {
//       // Safely update the nested data in the state
//       setPaletteDetails((prevDetails) =>
//         prevDetails.map((detail) => {
//           const updatedDetails = detail.details.map((item) =>
//             item._id === id ? { ...item, label, value } : item
//           );
//           return { ...detail, details: updatedDetails }; // Ensure a new object is created
//         })
//       );

//       setSuccessMessage("Palette detail updated successfully!");
//       setDetails([{ label: "", value: "" }]); // Reset form fields
//       setEditingItem(null); // Clear editing state
//     } else {
//       console.error("No data returned from the backend");
//     }
//   } catch (err) {
//     console.error("Error:", err);
//     setError(err.response?.data?.error || "Failed to update palette detail.");
//   } finally {
//     setLoading(false);
//   }
// };

//   // const handleUpdate = async (id, label, value) => {
//   //   try {
//   //     const response = await axios.put(`http://localhost:3005/temp/update-palette-details/${id}`, {
//   //       label,
//   //       value,
//   //     });
  
//   //     if (response.data) {
//   //       // Directly update the modified item in state
//   //       setPaletteDetails((prevDetails) => {
//   //         const updatedDetail = prevDetails.find(detail => detail._id === id);
//   //         if (updatedDetail) {
//   //           updatedDetail.details = updatedDetail.details.map((item) =>
//   //             item._id === id ? { ...item, label, value } : item
//   //           );
//   //         }
//   //         return [...prevDetails];  // Return updated state with only one update
//   //       });
  
//   //       setLoading(false);
//   //       setSuccessMessage("Palette detail updated successfully!");
        
//   //       setEditingItem(null); // Clear editing state
//   //     } else {
//   //       setLoading(false);
//   //       console.error('No data returned from the backend');
//   //     }
  
//   //   } catch (err) {
//   //     console.error("Error:", err);
//   //     setError(err.response?.data?.error || "Failed to update palette detail.");
//   //   }
//   // };

//   // Handle adding new input fields for details
//   const addDetailField = () => {
//     setDetails([...details, { label: "", value: "" }]);
//   };

//   // Handle changing values in the form fields
//   const handleDetailChange = (index, field, value) => {
//     const updatedDetails = [...details];
//     updatedDetails[index][field] = value;
//     setDetails(updatedDetails);
//   };

//   return (
//     <Box p={4} maxWidth="800px" margin="auto">
//       <Typography variant="h4" textAlign="center" gutterBottom>
//         Palette Manager
//       </Typography>

//       {/* Error and Success Notifications */}
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

//       {/* Form to Add or Edit Palette Details */}
//       <Paper elevation={3} sx={{ padding: 2, marginBottom: 4 }}>
//         <Typography variant="h6">
//           {editingItem ? "Edit Palette Details" : "Add Palette Details"}
//         </Typography>
//         <form onSubmit={handleSubmit}>
//           {details.map((detail, index) => (
//             <Box key={index} display="flex" gap={2} marginBottom={2}>
//               <TextField
//                 label="Label"
//                 value={detail.label}
//                 onChange={(e) => handleDetailChange(index, "label", e.target.value)}
//                 required
//                 fullWidth
//               />
//               <TextField
//                 label="Value"
//                 value={detail.value}
//                 onChange={(e) => handleDetailChange(index, "value", e.target.value)}
//                 required
//                 fullWidth
//               />
//             </Box>
//           ))}
//           <Box display="flex" justifyContent="space-between">
//             <Button variant="outlined" startIcon={<Add />} onClick={addDetailField} disabled={loading}>
//               Add Another Field
//             </Button>
//             <Button type="submit" variant="contained" disabled={loading}>
//               {loading ? <CircularProgress size={24} /> : editingItem ? "Update" : "Submit"}
//             </Button>
//           </Box>
//         </form>
//       </Paper>

//       {/* Existing Palette Details */}
//       <Typography variant="h6" gutterBottom>
//         Existing Palette Details
//       </Typography>
//       {loading ? (
//         <CircularProgress />
//       ) : (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell><b>Label</b></TableCell>
//                 <TableCell><b>Value</b></TableCell>
//                 <TableCell align="center"><b>Actions</b></TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {paletteDetails.length > 0 ? (
//                 paletteDetails.map((detail) =>
//                   detail.details.map((item, index) => (
//                     <TableRow key={index}>
//                       <TableCell>{item.label}</TableCell>
//                       <TableCell>{item.value}</TableCell>
//                       <TableCell align="center">
//                         <IconButton
//                           color="primary"
//                           onClick={() => {
//                             console.log("Editing item:", item); // Log the item being edited
//                             setEditingItem(item); // Set the item to be edited
//                             setDetails([{ label: item.label, value: item.value }]); // Pre-fill the form with existing data
//                           }}
//                         >
//                           <Edit />
//                         </IconButton>
//                         <IconButton color="error" onClick={() => handleDelete(detail._id)}>
//                           <Delete />
//                         </IconButton>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 )
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={3} align="center">
//                     No palette details available
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

// export default PaletteManager;







/*
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3005/temp/delete-palette-details/${id}`);
      setPaletteDetails(paletteDetails.filter((detail) => detail._id !== id));
      setSuccessMessage("Palette detail deleted successfully!");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to delete palette detail.");
    }
  };
*/



// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const PaletteTable = ({ paletteDetails, handleDelete, handleUpdate }) => {
//     return (
//       <div>
//         <h2>Existing Palette Details</h2>
//         {paletteDetails.length > 0 ? (
//           <table style={{ width: "100%", borderCollapse: "collapse" }}>
//             <thead>
//               <tr>
//                 <th style={styles.tableHeader}>Label</th>
//                 <th style={styles.tableHeader}>Value</th>
//                 <th style={styles.tableHeader}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {paletteDetails.map((detail) => (
//                 <PaletteRow
//                   key={detail._id}
//                   detail={detail}
//                   handleDelete={handleDelete}
//                   handleUpdate={handleUpdate}
//                 />
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <p>No palette details available.</p>
//         )}
//       </div>
//     );
//   };


//   const PaletteRow = ({ detail, handleDelete, handleUpdate }) => {

//     const [label, setLabel] = useState(detail.details[0]?.label || ""); // Default to the first label
//     const [value, setValue] = useState(detail.details[0]?.value || ""); // Default to the first value
    
//     const handleLabelChange = (e) => setLabel(e.target.value);
//     const handleValueChange = (e) => setValue(e.target.value);
    
//     const handleUpdateClick = () => {
//         console.log("Update button clicked!"); // This will help you confirm if the function is called
//         if (label !== detail.details[0].label || value !== detail.details[0].value) {
//           handleUpdate(detail._id, label, value);
//         }
//     };
      
    
//     return (
//       <tr>
//         <td>
//           <input
//             type="text"
//             value={label}
//             onChange={handleLabelChange}
//             style={styles.input}
//           />
//         </td>
//         <td>
//           <input
//             type="text"
//             value={value}
//             onChange={handleValueChange}
//             style={styles.input}
//           />
//         </td>
//         <td>
//           <button
//             onClick={() => handleDelete(detail._id)}
//             style={styles.removeButton}
//           >
//             Delete
//           </button>
//           <button
//             onClick={handleUpdateClick}
//             style={styles.updateButton}
//           >
//             Update
//           </button>
//         </td>
//       </tr>
//     );
//   };
  
  
  
//   const PaletteForm = ({ details, handleInputChange, addRow, removeRow, handleSubmit, loading }) => {
//     return (
//       <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
//         <table style={{ width: "100%", borderCollapse: "collapse" }}>
//           <thead>
//             <tr>
//               <th style={styles.tableHeader}>Label</th>
//               <th style={styles.tableHeader}>Value</th>
//               <th style={styles.tableHeader}>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {details.map((detail, index) => (
//               <tr key={index}>
//                 <td>
//                   <input
//                     type="text"
//                     placeholder="Label"
//                     value={detail.label}
//                     onChange={(e) => handleInputChange(index, "label", e.target.value)}
//                     required
//                     style={styles.input}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     placeholder="Value"
//                     value={detail.value}
//                     onChange={(e) => handleInputChange(index, "value", e.target.value)}
//                     required
//                     style={styles.input}
//                   />
//                 </td>
//                 <td>
//                   <button
//                     type="button"
//                     onClick={() => removeRow(index)}
//                     style={styles.removeButton}
//                   >
//                     Remove
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
  
//         <div style={{ marginTop: "10px" }}>
//           <button
//             type="button"
//             onClick={addRow}
//             style={styles.addButton}
//           >
//             Add Row
//           </button>
//         </div>
  
//         <div style={{ marginTop: "20px" }}>
//           <button type="submit" disabled={loading} style={styles.submitButton}>
//             {loading ? "Submitting..." : "Submit"}
//           </button>
//         </div>
//       </form>
//     );
//   };
  
//   const PaletteManager = () => {
//     const [details, setDetails] = useState([{ label: "", value: "" }]);
//     const [paletteDetails, setPaletteDetails] = useState([]);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(false);
  
//     useEffect(() => {
//       const fetchPaletteDetails = async () => {
//         try {
//           const response = await axios.get("http://localhost:3005/temp/palette-details");
//           setPaletteDetails(response.data);
//         } catch (err) {
//           setError(err.response?.data?.error || "Failed to fetch palette details");
//         }
//       };
  
//       fetchPaletteDetails();
//     }, []);
  
//     const handleInputChange = (index, field, value) => {
//       const updatedDetails = [...details];
//       updatedDetails[index][field] = value;
//       setDetails(updatedDetails);
//     };
  
//     const addRow = () => {
//       setDetails([...details, { label: "", value: "" }]);
//     };
  
//     const removeRow = (index) => {
//       const updatedDetails = details.filter((_, i) => i !== index);
//       setDetails(updatedDetails);
//     };
  
//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       setLoading(true);
//       setError(null);
  
//       try {
//         const response = await axios.post("http://localhost:3005/temp/palette-details", {
//           details,
//         });
//         setPaletteDetails([...paletteDetails, ...response.data.details]);
//         setDetails([{ label: "", value: "" }]);
//         setLoading(false);
//       } catch (err) {
//         setLoading(false);
//         setError(err.response?.data?.error || "An error occurred while creating palette details.");
//       }
//     };
  
//     const handleDelete = async (id) => {
//       try {
//         await axios.delete(`http://localhost:3005/temp/palette-details/${id}`);
//         setPaletteDetails(paletteDetails.filter((detail) => detail._id !== id));
//       } catch (err) {
//         setError(err.response?.data?.error || "Failed to delete palette detail.");
//       }
//     };
  
//     const handleUpdate = async (id, label, value) => {
//         console.log(`Update function triggered with: ${id}, ${label}, ${value}`); // Confirm if function is called
//         try {
//           const response = await axios.put(
//             `http://localhost:3005/temp/palette-details/${id}`,
//             { label, value }
//           );
//           console.log("Response from server:", response.data); // Log the response from the server
      
//           // Assuming the response data contains the updated palette detail
//           const updatedDetail = response.data;
//           console.log("Updated detail:", updatedDetail); // Log the updated data from the server
      
//           // Update the local state to reflect changes
//           setPaletteDetails(prevDetails =>
//             prevDetails.map((detail) =>
//               detail._id === id ? { ...detail, label, value } : detail
//             )
//           );
//         } catch (err) {
//           console.error("Error updating:", err); // Log any error that occurs
//           setError(err.response?.data?.error || "Failed to update palette detail.");
//         }
//       };
      
      
      
  
//     return (
//       <div>
//         <h1>Manage Palette Details</h1>
//         <PaletteForm
//           details={details}
//           handleInputChange={handleInputChange}
//           addRow={addRow}
//           removeRow={removeRow}
//           handleSubmit={handleSubmit}
//           loading={loading}
//         />
//         {error && <div style={styles.error}>{error}</div>}
//         <PaletteTable
//           paletteDetails={paletteDetails}
//           handleDelete={handleDelete}
//           handleUpdate={handleUpdate}
//         />
//       </div>
//     );
//   };
  

// // Inline styles for better formatting
// const styles = {
//   tableHeader: {
//     backgroundColor: "#f4f4f4",
//     padding: "10px",
//     textAlign: "left",
//     border: "1px solid #ddd",
//   },
//   input: {
//     padding: "8px",
//     width: "100%",
//     border: "1px solid #ccc",
//     borderRadius: "4px",
//   },
//   addButton: {
//     padding: "10px 20px",
//     backgroundColor: "#28a745",
//     color: "white",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//   },
//   submitButton: {
//     padding: "10px 20px",
//     backgroundColor: "#007bff",
//     color: "white",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//   },
//   removeButton: {
//     padding: "5px 10px",
//     backgroundColor: "#dc3545",
//     color: "white",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//   },
//   updateButton: {
//     padding: "5px 10px",
//     backgroundColor: "#007bff",
//     color: "white",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//     marginLeft: "10px",
//   },
//   error: {
//     color: "red",
//     marginTop: "20px",
//   }
// };

// export default PaletteManager;
