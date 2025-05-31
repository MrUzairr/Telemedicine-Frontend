import { useState } from "react";
import { Navigate } from "react-router-dom";

function Protected({ isAuth, children }) {
    const [redirect, setRedirect] = useState(false);

    const handleClick = (e) => {
        if (!isAuth) {
            e.preventDefault(); // Stop navigation
            console.log("Anchor tag clicked. Redirecting to Sign In...");
            setRedirect(true);
        }
    };

    if (redirect) {
        return <Navigate to="/signin" replace />;
    }

    return <div onClick={handleClick}>{children}</div>;
}

export default Protected;



// import { Navigate } from "react-router-dom";

// function Protected({isAuth,children}){
//     if(isAuth){
//         return children;
//     }
//     else{
//         console.log("children",children)
//         return <Navigate to='/signin' />
//     }
// }

// export default Protected;