import React from "react";
import { Navigate } from "react-router-dom";

const Protected=({ children })=>{

    const token =localStorage.getItem('token');
    const userType =localStorage.getItem('userType');
    const userId =localStorage.getItem('userId');

    if(!token && !userType && !userId){
        return <Navigate to="/notfound" replace />
    }
    return children;
}
export default Protected;