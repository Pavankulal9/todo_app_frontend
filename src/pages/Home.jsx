import { useEffect, useState } from "react";
import AddTodos from "../components/AddTodos"
import TodosList from "../components/TodosList"
import { getTodos } from "../utils/apiCalls";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";


const Home = () => {

  const [todos,setTodos] = useState(false);
  const [sortType,setSortType] = useState('');
  const [loading,setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  

  useEffect(()=>{
     getTodos()
     .then(res=>{ 
      setLoading(false);
      setTodos(res.data);
    })
     .catch(error =>{
      if(error.status === 403){
        setLoading(false);
        navigate('/error');
        return;
      }else{
        console.log(error);
        navigate('/login', {state:{from: location},replace:true});
      }
     })
  },[navigate,location])
    
  return (
    <div className="home">
      {
        todos&&!loading?
        <>
          <AddTodos todos={todos} setTodos={setTodos} setSortType={setSortType} sortType={sortType}/>
          <TodosList todos={todos} setTodos={setTodos} sortType={sortType}/>
        </>
        :<Loading/>
      }
    </div>
  )
}

export default Home
