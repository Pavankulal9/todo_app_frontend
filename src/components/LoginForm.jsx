import { useState } from 'react'
import { useFormik } from 'formik';
import { loginValidation } from '../schema';
import Input from './Input';
import InputError from './InputError';
import { loginRequest } from '../utils/apiCalls';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuthContext from '../hooks/useAuth';

const LoginForm = () => {
    const [error,setError] = useState("");
    const [loading,setLoading] = useState(false);
    const [showPassword,setShowPassword] = useState(false);
    const navigate = useNavigate();
    const loction = useLocation();
    const from = loction.state?.from?.pathname || '/';
    const {setAuth} = useAuthContext();

    const initialValue = {
        username:"",
        password:""
    }

    const {values,errors,handleBlur,handleChange,touched,handleSubmit} = useFormik({
         initialValues: initialValue,
         validationSchema: loginValidation,
         onSubmit: async(value,action)=>{
                setLoading(true);
                 try {
                   const response= await loginRequest(value.username,value.password)
                    setAuth(response.data.user);
                    action.resetForm();
                    setLoading(false);
                    navigate(from,{replace:true});
                 } catch (error) {
                  if(error.status === 401){
                      setError("User does not exist");
                    }else if(error.status === 400){
                      setError("User does not exist");
                    }else if(error.status === 500){
                      setError("Server Error");
                    }else if(error.status === 409){
                      setError("Invaild Password");
                    }
                    setLoading(false);
                 }
            }
    });
    
  return (
    <div className='form'>
       {
          error.length > 0 && <InputError error={error}/>
        }
      <form onSubmit={handleSubmit}>
        <Input
          label={'User-name'}
          placeholder={'Enter username'}
          name={'username'}
          value={values.username}
          handleChange={handleChange}
          handleBur={handleBlur}
        />
        {
            errors.username &&  touched.username ? <InputError error={errors.username}/>: null      
        }
        <Input
          type={`${showPassword?"text":"password"}`}
          label={'Password'}
          placeholder={'Enter password'}
          name={'password'}
          value={values.password}
          handleChange={handleChange}
          handleBur={handleBlur}
          setShowPassword={setShowPassword}
          showPassword={showPassword}
         />
          {
            errors.password &&  touched.password ? <InputError error={errors.password}/>: null      
          }  
        <button >{loading?"Logging In":"Login"}</button>
      </form>
    </div>
  )
}

export default LoginForm
