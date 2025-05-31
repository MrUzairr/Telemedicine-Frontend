import React from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const DoctorProfile = ({ doctor }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto mt-6 relative">
      {/* Back Button */}
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="absolute top-0 left-0 mt-2 ml-2 flex items-center text-gray-600 hover:text-gray-800"
      >
        <FaChevronLeft className="mr-1" /> Back
      </button>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row p-6">
        {/* Avatar */}
        <div className="flex-shrink-0 flex justify-center items-center mb-6 md:mb-0 md:mr-8">
          <img
            src={`http://localhost:3005/images/${doctor.profilePicture}`}
            alt={doctor.fullName}
            className="w-32 h-32 rounded-full border-4 border-indigo-100 object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1 space-y-4">
          <h2 className="text-2xl font-extrabold text-gray-800">{doctor.fullName}</h2>
          <p className="text-indigo-600 font-medium uppercase">{doctor.specialty}</p>
          <p className="text-gray-700">{doctor.biography}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm text-gray-500">Qualifications</h3>
              <p className="font-medium text-gray-800">{doctor.qualifications}</p>
            </div>

            {/* Email Box */}
            <div>
              <h3 className="text-sm text-gray-500">Email</h3>
              <a
                href={`mailto:${doctor.email}`}
                className="block mt-1 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition"
              >
                {doctor.email}
              </a>
            </div>

            {/* Phone Box */}
            <div>
              <h3 className="text-sm text-gray-500">Phone</h3>
              <a
                href={`tel:${doctor.phone}`}
                className="block mt-1 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition"
              >
                {doctor.phone}
              </a>
            </div>

            {/* Status */}
            <div>
              <h3 className="text-sm text-gray-500">Status</h3>
              <p
                className={`mt-1 font-medium ${
                  doctor.status === "true" ? "text-green-600" : "text-red-600"
                }`}
              >
                {doctor.status === "true" ? "Active" : "Inactive"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;






// import React from 'react';
// import { Box, Typography, Avatar, Grid, Paper } from '@mui/material';

// const DoctorProfile = ({doctor}) => {
//     console.log("doctor",doctor.profilePicture)
//   return (
//     <Paper sx={{ display: 'flex', padding: 3, borderRadius: 2, boxShadow: 3 }}>
//       {/* Left Section - Image */}
//       <Box sx={{ marginRight: 3 }}>
//         <Avatar
//           src={`http://localhost:3005/images/${doctor.profilePicture}`} // Image URL passed via props
//           alt={doctor.fullName}
//           sx={{ width: 120, height: 120 }}
//         />
//       </Box>

//       {/* Right Section - Dynamic Content */}
//       <Grid container spacing={2} sx={{ flex: 1 }}>
//         <Grid item xs={12}>
//           <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{doctor.fullName}</Typography>
//         </Grid>
//         <Grid item xs={12}>
//           <Typography variant="subtitle1" color="textSecondary">{doctor.biography}</Typography>
//         </Grid>
//         <Grid item xs={12}>
//           <Typography variant="body2" color="textSecondary">{doctor.qualification}</Typography>
//         </Grid>
//         <Grid item xs={12}>
//           <Typography variant="body1">Wait Time: {doctor.waitTime}</Typography>
//         </Grid>
//         <Grid item xs={12}>
//           <Typography variant="body1">Experience: {doctor.specialty}</Typography>
//         </Grid>
//         {/* <Grid item xs={12}>
//           <Typography variant="body1">Satisfied Patients: {doctor.satisfiedPatients}</Typography>
//         </Grid> */}
//       </Grid>
//     </Paper>
//   );
// };

// export default DoctorProfile;
