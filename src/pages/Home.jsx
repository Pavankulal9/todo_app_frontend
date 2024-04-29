import { useEffect, useState } from "react";
import AddTodos from "../components/AddTodos"
import TodosList from "../components/TodosList"
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";


const Home = () => {

  const [todos,setTodos] = useState(0);
  const [sortType,setSortType] = useState('');
  const [loading,setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  
  useEffect(()=>{
    const getTodos = async()=>{
        try {
            const response = await axiosPrivate.get('/api/v1/todo/getTodos');
            const todos = await response.data;
            setLoading(false);
            setTodos(todos.data);
        } catch (error) {
            console.error(error);
            navigate('/login', {state:{from: location},replace:true});
        }
    }

    getTodos();

  },[axiosPrivate,navigate,location])
  


    
  return (
    <div className="home">
      {
        todos && !loading?
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
