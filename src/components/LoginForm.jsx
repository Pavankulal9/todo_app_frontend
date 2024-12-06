import { useState } from "react";
import { useFormik } from "formik";
import { loginValidation } from "../schema";
import { loginRequest } from "../utils/apiCalls";
import { useLocation, useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuth";
import FormCreator from "./FormCreator";

const initialValue = {
  username: "",
  password: "",
};

const inputs = [
  {
    name: "username",
    type: "text",
    label: "Username",
    placeholder: "Enter Username",
  },
  {
    name: "password",
    type: "password",
    label: "Password",
    placeholder: "Enter Password",
  },
];

const LoginForm = () => {
  const [formStateHandler, setFormStateHandler] = useState({
    loading: false,
    error: null,
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { setAuth } = useAuthContext();

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: loginValidation,
    onSubmit: async (value, action) => {
      setFormStateHandler({
        ...formStateHandler,
        loading: true,
      });
      try {
        const response = await loginRequest(value.username, value.password);
        setAuth(response.data.user);
        action.resetForm();
        navigate(from, { replace: true });
      } catch (error) {
        if (error.status === 401) {
          setFormStateHandler({
            loading: false,
            error: "User does not exist!",
          });
        } else if (error.status === 400) {
          setFormStateHandler({
            loading: false,
            error: "username and password missing!",
          });
        } else if (error.status === 500) {
          setFormStateHandler({
            loading: false,
            error: "Server Error",
          });
        } else if (error.status === 403) {
          setFormStateHandler({
            loading: false,
            error: "Invalid Password!",
          });
        }
        console.error(error);
      }
    },
  });

  return (
    <FormCreator
      formik={formik}
      setShowPassword={setShowPassword}
      loading={formStateHandler.loading}
      errorMessage={formStateHandler.error}
      showPassword={showPassword}
      buttonText={formStateHandler.loading ? "Logging In" : "Login"}
      inputs={inputs}
    />
  );
};

export default LoginForm;
