// src/components/Protected1/Protected1.jsx
import { Navigate } from "react-router-dom";

function Protected1({ role, children }) {
  const isAdmin = localStorage.getItem("adminAuth") === "true";
  const doctorData = localStorage.getItem("doctorAuth");
  const isDoctor = !!doctorData;
  const isUser = localStorage.getItem("userAuth") === "true";

  const authMap = {
    admin: isAdmin,
    doctor: isDoctor,
    user: isUser,
  };

  if (authMap[role]) {
    return children;
  } else {
    return <Navigate to="/signin" replace />;
  }
}

export default Protected1;






// import { Navigate } from "react-router-dom";

// function Protected1({isAuth,children}){
//     if(isAuth){
//         return children;
//     }
//     else{
//         console.log("children",children)
//         return <Navigate to='/signin' />
//     }
// }

// export default Protected1;