import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthProvider";

const ProtectedRoute = ({children})=>{

    const {checkUserAuthenticated} = useAuth();

    const isUerAuthenticated = checkUserAuthenticated();
    const navigate = useNavigate();

   useEffect(()=>{
      if(!isUerAuthenticated){ //quand il est pas authentifié et que le user actuel est null
        navigate("/");
      }

   })
   return isUerAuthenticated ? children:<></>;
}


export default ProtectedRoute;