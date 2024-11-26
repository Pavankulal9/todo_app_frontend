import ImageComp from "../components/ImageComp";
import Logo from "../assets/todoLogo.png";
import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="form-body">
      <div className="logo">
        <ImageComp img={Logo} alt={"logo"} />
      </div>
      <LoginForm />
      <div className="link">
        <p>
          or SignUp here <Link to={"/signup"}>SignUP</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
