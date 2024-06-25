import { Navigate,useLocation } from 'react-router-dom';
import useAuthContext from '../hooks/useAuth';

const RequireAuth = ({children}) => {
    const {auth} = useAuthContext();
    const location = useLocation();

  return (
     auth?.loggedInUser?._id || auth?.accessToken ?
       <>{children}</>
     : 
     <Navigate to={'/login'} state={{from: location}} replace/> 
  )
}

export default RequireAuth
