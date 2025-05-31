import { Navigate } from "react-router-dom";

function Protected1({isAuth,children}){
    if(isAuth){
        return children;
    }
    else{
        console.log("children",children)
        return <Navigate to='/signin' />
    }
}

export default Protected1;