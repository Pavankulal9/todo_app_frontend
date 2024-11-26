import { useState } from "react";
import { useFormik } from "formik";
import { signUpValidation } from "../schema";
import { signUpRequest } from "../utils/apiCalls";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuth";
import FormCreator from "./FormCreator";

const initialValue = {
  name: "",
  email: "",
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
    name: "name",
    type: "text",
    label: "Name",
    placeholder: "Enter Name",
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Enter Email",
  },
  {
    name: "password",
    type: "password",
    label: "Password",
    placeholder: "Enter Password",
  },
];

const SignUpForm = () => {
  const [formStateHandler, setFormStateHandler] = useState({
    loading: false,
    error: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = useAuthContext();

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: signUpValidation,
    onSubmit: async (value) => {
      try {
        setFormStateHandler({
          ...formStateHandler,
          loading: true,
        });
        const userDetails = await signUpRequest(
          value.name,
          value.username,
          value.email,
          value.password
        );
        setAuth(userDetails.data);
        navigate("/login");
      } catch (error) {
        if (error.status === 401) {
          setFormStateHandler({
            ...formStateHandler,
            error: "User already exist!",
          });
        } else if (error.status === 400) {
          setFormStateHandler({
            ...formStateHandler,
            error: "All fields required!",
          });
        } else if (error.status === 500) {
          setFormStateHandler({
            ...formStateHandler,
            error: "Server Error try again!",
          });
        }
        console.error(error.message);
      } finally {
        setFormStateHandler({
          ...formStateHandler,
          loading: false,
        });
      }
    },
  });

  return (
    <FormCreator
      formik={formik}
      loading={formStateHandler.loading}
      errorMessage={formStateHandler.error}
      setShowPassword={setShowPassword}
      showPassword={showPassword}
      buttonText={formStateHandler.loading ? "Creating" : "SignUp"}
      inputs={inputs}
    />
  );
};

export default SignUpForm;
