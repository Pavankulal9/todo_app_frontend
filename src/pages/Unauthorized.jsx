import { useNavigate } from "react-router-dom"

const Unauthorized = () => {
    const naviagte = useNavigate();

  return (
    <div className='error'>
        <p>Login First to acess this page!</p>
      <button onClick={()=> naviagte('/login')} >Login page</button>
    </div>
  )
}

export default Unauthorized
