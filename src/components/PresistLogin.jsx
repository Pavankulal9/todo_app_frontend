import { useState,useEffect } from "react";
import useAuthContext from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";
import { getCurrentUser } from "../utils/apiCalls";
import Loading from "./Loading";


const PresistLogin = ({children})=>{
    const [isLoading,setIsloading] = useState(true);
    const refresh = useRefreshToken();
    const {auth,setAuth} = useAuthContext();

    useEffect(()=>{
     const verifyRefreshToken = async function(){
            if(!auth?.accessToken){
               try {
                 await refresh();
                 const user = await getCurrentUser();
                 setAuth((prev)=>{
                    return {...prev,loggedInUser:user.data}
                 })
               } catch (error) {
                   console.error(error);
               }finally{
                    setIsloading(false);
               }
            }else{
               setIsloading(false);
            }
        }


      verifyRefreshToken()
    },[]);

    return (
      <>
        {
            isLoading?
             <Loading/>
            :
            <>{children}</>
        } 
      </>  
    )
}


export default PresistLogin;