import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Register from './pages/register';
import PageNotFound from './pageNotFound';
import Login from './pages/login';
import Main from './pages/admin/main';
import DoctorMain from './pages/doctorPanel/doctormain';
import PaletteManager from './pages/palette';
import DoctorInfo from './pages/doctor';
import Protected1 from './components/Protected1/Protected1';
import SymptomsForm from './components/SymptomsForm';
import Task from './pages/task';
import TableData from './pages/asanaDatabaseData';
import { ToastContainer, toast } from "react-toastify";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />

        {/* Admin Route */}
        <Route 
          path="/admin" 
          element={
            <Protected1 role="admin">
              <Main />
            </Protected1>
          } 
        />

        {/* Doctor Route */}
        <Route 
          path="/doctor" 
          element={
            <Protected1 role="doctor">
              <DoctorMain />
            </Protected1>
          } 
        />

        <Route path="/doctorinfo" element={<DoctorInfo />} />
        <Route path="/symptoms" element={<SymptomsForm />} />
        <Route path="/task" element={<Task />} />
        <Route path="/asanaData" element={<TableData />} />
        <Route path="/palette" element={<PaletteManager />} />

        {/* Fallback Route */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;






// import './App.css';
// import { Routes, Route } from 'react-router-dom';
// import Home from './pages/home';
// import Register from './pages/register';
// import PageNotFound from './pageNotFound';
// import Login from './pages/login';
// import Main from './pages/admin/main';
// import DoctorMain from './pages/doctorPanel/doctormain';
// import PaletteManager from './pages/palette';
// import DoctorInfo from './pages/doctor';
// // import Protected from './components/Protected/Protected';
// import Protected1 from './components/Protected1/Protected1';
// import SymptomsForm from './components/SymptomsForm';
// import Task from './pages/task';
// import TableData from './pages/asanaDatabaseData';



// function App() {
//   // Pull auth status from localStorage
//   const isAuth = localStorage.getItem("userAuth") || localStorage.getItem("adminAuth") || localStorage.getItem("doctorAuth");
//   const isAdmin = localStorage.getItem("adminAuth");
//   const doctorData = localStorage.getItem("doctorAuth");

//   return (
//     <div className="App">
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/signup" element={<Register />} />
//         <Route path="/signin" element={<Login />} />

//         {/* Admin route - protected */}
//         <Route 
//           path="/admin"  
//           element={
//             <Protected1 isAuth={isAuth} isAdmin={isAdmin}>
//               <Main />
//             </Protected1>
//           } 
//         />

//         {/* Doctor route - protected */}
//         <Route 
//           path="/doctor" 
//           element={
//             <Protected1 isAuth={doctorData} doctor={JSON.parse(doctorData)}>
//               <DoctorMain />
//             </Protected1>
//           } 
//         />

//         <Route path="/doctorinfo" element={<DoctorInfo />} />  
//         <Route path="/symptoms" element={<SymptomsForm />} />  
//         <Route path="/task" element={<Task />} />  
//         <Route path="/asanaData" element={<TableData />} />  
//         <Route path="/palette" element={<PaletteManager />} />
        
//         <Route path="*" element={<PageNotFound />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;










// import logo from './logo.svg';
// import './App.css';
// import { Routes, Route } from 'react-router-dom';
// import Home from './pages/home/index';
// import Register from './pages/register/index';
// import PageNotFound from './pageNotFound';
// import Login from './pages/login';
// import Main from './pages/admin/main';
// import DoctorMain from './pages/doctorPanel/doctormain';
// import PaletteManager from './pages/palette/index';
// import DoctorInfo from './pages/doctor';
// import Protected from './components/Protected/Protected';
// import Protected1 from './components/Protected1/Protected1';
// import { useSelector } from "react-redux";
// import SymptomsForm from './components/SymptomsForm';
// import Task from './pages/task';
// import TableData from './pages/asanaDatabaseData';

// function App() {
//   // const isAuth = useSelector((state) => state.user.auth);
//   // const isAuth = localStorage.getItem("userAuth") ? true : isAuth1;
//   // const isDoctor =  useSelector((state) => state.user.isDoctor);
//   // const userData = useSelector((state) => state.user);
//   const isAdmin = localStorage.getItem("adminAuth");

//   // Conditionally assign user data
//   // const doctor = isDoctor ? userData : null;
//   const admin = !isDoctor && isAdmin && isAuth ? userData : null;

//   return (
//     <div className="App">
//       <Routes>
//         {/* Define your routes here */}
//         <Route path="/" element={<Home />} />
//         <Route path="/signup" element={<Register />} />
//         <Route path="/signin" element={<Login />} />
//         <Route path="/admin"  element={<Protected1 isAuth={admin}><Main /></Protected1>} />
//         <Route path="/doctor" element={<Protected1 isAuth={isAuth} doctor={doctor}><DoctorMain /></Protected1>} />
//         <Route path="/doctorinfo" element={<DoctorInfo />} />  
//         <Route path="/symptoms" element={<SymptomsForm />} />  
//         <Route path="/task" element={<Task />} />  
//         <Route path="/asanaData" element={<TableData />} />  
//         <Route path="/palette" element={<PaletteManager />} />

//         {/* Catch-all route for 404 pages */}
//         <Route path="*" element={<PageNotFound />} />

//       </Routes>

//     </div>
//   );
// }

// export default App;



        {/* <Route exact path="/room" component={Room}/>
        <Route exact path="/book/:roomid/:fromdate/:todate" component={Booking}/>
        <Route exact path="/about" component={About}/>
        <Route exact path="/service" component={Services}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/signup" component={Signup}/>
        <Route exact path="/profile" component={Profile}/>
        <Route exact path="/admin" component={Admin}/> */}