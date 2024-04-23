import ImageComp from '../components/ImageComp';
import logo from "../assets/todoLogo.png";
import useAuthContext from '../hooks/useAuth';
import { logoutRequest } from '../utils/apiCalls';

const Header = () => {
  const {auth,setAuth} = useAuthContext();

  const handleLogout = ()=>{
    logoutRequest()
    .then(()=>
       setAuth({})
     )
     .catch((error)=> console.log(error));
  }
  return (
    <header className='header'>
      <div className='logo'>
        <ImageComp img={logo} alt={"logo"}/>
      </div>
      <div className='logout'>
        {
          auth?.loggedInUser?._id&&
          <>
            <button onClick={()=> handleLogout()}>Logout</button>
          </>
        }
       </div>
    </header>
  )
}

export default Header;
