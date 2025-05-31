import React from 'react'
import Admin from './admin.jsx';
import { SidebarProvider } from './context/sidebarContext.jsx';

const Main = () => {
  return (
    <SidebarProvider>
    <Admin />
  </SidebarProvider>
  )
}

export default Main
