import { useState } from 'react'
import { useFormik } from 'formik';
import { signUpValidation } from '../schema';
import Input from './Input';
import InputError from './InputError';
import { signUpRequest } from '../utils/apiCalls';
import {useNavigate} from "react-router-dom";
import useAuthContext from '../hooks/useAuth';

const SignUpForm = () => {
    const [error,setError] = useState("");
    const [loading,setLoading] = useState(false);
    const [showPassword,setShowPassword] = useState(false);
    const navigate = useNavigate();
    const {setAuth} = useAuthContext();
    
    const initialValue = {
        name:"",
        email:"",
        username:"",
        password:""
    }
    
    const {values,errors,handleBlur,handleChange,touched,handleSubmit} = useFormik({
         initialValues: initialValue,
         validationSchema: signUpValidation,
         onSubmit: async()=>{
            try {
                setLoading(true);
                const userDetails = await signUpRequest(values.name,values.username,values.email,values.password);
                setAuth(userDetails.data);
                navigate('/login');
            } catch (error) {
                if(error.status === 401){
                  setError("User already exist!");
                }else if(error.status === 400){
                  setError("All fields required!");
                }else if(error.status === 500){
                  setError("Server Error try again!");
                }
                console.log(error.message);
            }finally{
              setLoading(false);
            }
         }
    });

  console.log(loading);

  return (
    <div className='form'>
       {
          error.length > 0 && <InputError error={error}/>
        }
      <form onSubmit={handleSubmit}>
      <Input
          label={'Name'}
          placeholder={'Enter name'}
          name={'name'}
          value={values.name}
          handleChange={handleChange}
          handleBur={handleBlur}
        />
        {
            errors.name &&  touched.name ? <InputError error={errors.name}/>: null      
        }
        <Input
          label={'Username'}
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
          label={'Email'}
          placeholder={'Enter email'}
          name={'email'}
          value={values.email}
          handleChange={handleChange}
          handleBur={handleBlur}
        />
        {
            errors.email &&  touched.email ? <InputError error={errors.email}/>: null      
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
        <button >{loading?"Creating":"SignUp"}</button>
      </form>
    </div>
  )
}

export default SignUpForm
