import React from 'react';
import DoctorProfile from './doctorProfile';
import { useLocation } from "react-router-dom";
const DoctorInfo = () => {
  const location = useLocation();
  const doctor = location.state?.doctor;

  if (!doctor) {
    return <div>No doctor data available</div>;
  }
  return (
    <div style={{ padding: '20px' }}>
      <DoctorProfile doctor={doctor} />
    </div>
  );
};

export default DoctorInfo;
