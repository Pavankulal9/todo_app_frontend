import useAuthContext from "./useAuth";
import { axiosPrivate } from "../utils/apiCalls";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
   const {auth} = useAuthContext();
    const refresh = useRefreshToken();
   
   useEffect(()=>{
    const requestIntercept = axiosPrivate.interceptors.use(
        config =>{
            if(!config.headers['Authorization']){
                config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
            }
            return config;
        },(error)=> Promise.reject(error)
    )

     const responseIntercept = axiosPrivate.interceptors.use(
        response => response,
        async(error)=>{
              const prevRequest = error?.config;
              console.log(error);
              //! it may be error.status
              if(error?.response?.status === 403 && !prevRequest.sent){
                  prevRequest.sent = true;
                  const newAccessToken = await refresh();
                  prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                  return axiosPrivate(prevRequest);
              }

              return Promise.reject(error);
        }
     )

     return ()=>{ 
        axiosPrivate.interceptors.response.eject(responseIntercept);
        axiosPrivate.interceptors.request.eject(requestIntercept);

    }
   },[auth,refresh])
   

   return axiosPrivate;
}

export default useAxiosPrivate
