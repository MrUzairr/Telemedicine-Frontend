import './admin.css';
import React,{useState} from 'react'
import Sidebar from './layout/Sidebar/Sidebar';
import Content from './layout/Content/Content';

function Admin() {
  const [activeTab, setActiveTab] = useState("home");
  return (
    <>
      <div className='app'>
      <Sidebar setActiveTab={setActiveTab} /> {/* Pass state setter to Sidebar */}
      <Content activeTab={activeTab} /> {/* Pass activeTab to Content */}
      </div>
    </>
  )
}

export default Admin
/* 
:root {
  --clr-primary: #29221d;
  --clr-primar-light: #473b33;
  --clr-secondary: #1e1611;
  --clr-white: #fff;
  --clr-black: #000;
  --clr-pumpkin: #fe6c00;
  --clr-silver: #a8a5a6;
  --clr-silver-v1: #bdbabb;
  --clr-scarlet: #fe1e00;
  --clr-scarlet-v1: rgb(254, 30, 0, 0.79);
  --clr-green: #00fe93;
  --clr-yellow: #fec80a;
  --clr-jet: #302924;
  --clr-peach: #ffc397;
  --font-family-bai: "Bai Jamjuree", sans-serif;
  --transition-default: all 300ms ease-in-out;
}
*/