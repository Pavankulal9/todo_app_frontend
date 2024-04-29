import { useState,useEffect } from "react";
import useAuthContext from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";
import Loading from "./Loading";
import useAxiosPrivate from "../hooks/useAxiosPrivate";


const PresistLogin = ({children})=>{
    const [isLoading,setIsloading] = useState(true);
    const refresh = useRefreshToken();
    const {auth,setAuth} = useAuthContext();
    const axiosPrivate = useAxiosPrivate();

    useEffect(()=>{
      const verifyRefreshToken = async function(){
             if(!auth?.accessToken){
                try {
                  await refresh();
                  const response = await axiosPrivate.get('/api/v1/users/current-user');
                  const user = await response.data;
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

      verifyRefreshToken();
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