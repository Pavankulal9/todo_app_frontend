import {AiFillEye} from "react-icons/ai";

const Input = ({type='text',label,placeholder,name,value,handleChange,handleBur,showPassword=null,setShowPassword}) => {
  return (
    <div className="input-container">
        <label htmlFor={name}>{label}</label>
        <input 
            type={type} 
            placeholder={placeholder} 
            name={name} 
            value={value}
            onChange={handleChange}
            onBlur={handleBur}
        />
        {showPassword!==null && <AiFillEye onClick={()=> setShowPassword(!showPassword)} style={{color:`${showPassword? "red":"#fff"}`}}/>}
    </div>
  )
}

export default Input;
