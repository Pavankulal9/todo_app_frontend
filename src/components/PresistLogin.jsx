import Loading from "./Loading";
import useVerifyRefreshToken from "../hooks/useVerifyRefreshToken";


const PresistLogin = ({children})=>{
  const refreshToken = useVerifyRefreshToken(); 

    return (
      <>
        {
          refreshToken?
             <Loading/>
            :
            <>{children}</>
        } 
      </>  
    )
}


export default PresistLogin;