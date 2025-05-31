import React from 'react'
import DoctorPanel from './doctor.jsx';
import { SidebarProvider } from './context/sidebarContext.jsx';

const DoctorMain = () => {
  return (
    <SidebarProvider>
    <DoctorPanel />
  </SidebarProvider>
  )
}

export default DoctorMain
