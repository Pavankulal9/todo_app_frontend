import useAuthContext from "./useAuth";
import useRefreshToken from "./useRefreshToken"
import { axiosPrivate } from "../utils/apiCalls";
import { useEffect, useState } from "react";


const useVerifyRefreshToken = () => {

   const [userVerifying,setUserVerifying] = useState(true);
   const  refresh = useRefreshToken();
    const {auth,setAuth} = useAuthContext();

    useEffect(()=>{
       const verifyRefreshToken = async function(){
           if(!auth?.accessToken){
              try {
                const accessToken = await refresh();
                const response = await axiosPrivate.get('/api/v1/users/current-user');
                const user = await response.data;
                setAuth((prev)=>{
                   return {...prev,loggedInUser:user.data,accessToken}
                })
              } catch (error) {
                 console.log(error.message);
              }
           }
           return setUserVerifying(false);
       }

       verifyRefreshToken();

    },[])


  return userVerifying;
}

export default useVerifyRefreshToken
