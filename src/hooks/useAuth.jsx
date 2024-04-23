import { useContext } from "react";
import AuthContext from "../context/auth";

const useAuthContext = ()=>{
   return useContext(AuthContext);
}

export default useAuthContext;