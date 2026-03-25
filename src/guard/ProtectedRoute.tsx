import React, { useEffect } from 'react'
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
const ProtectedRoute = ({children}:React.PropsWithChildren) => {
    const navagation = useNavigate();
    const token = Cookies.get('access_token');
    useEffect(() => {
        if(!token){
            navagation('/login')  
        } 
    },[])

  return (
    <div>{children}</div>
  )
}

export default ProtectedRoute