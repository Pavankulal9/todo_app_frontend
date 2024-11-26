import ImageComp from "../components/ImageComp";
import Logo from "../assets/todoLogo.png";
import SignUpForm from "../components/SignUpForm";
import { Link } from "react-router-dom";
const SignUp = () => {
  return (
    <div className="form-body">
      <div className="logo">
        <ImageComp img={Logo} alt={"logo"} />
      </div>
      <SignUpForm />
      <div className="link">
        <p>
          already SignUped?<Link to={"/login"}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
