import Todo from './Todo'
import { useMemo} from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const TodosList = ({todos,setTodos,sortType}) => {
  
  const axiosPrivateInpector = useAxiosPrivate();

  const sortedTodo = useMemo(()=>{
    if(sortType === 'Date' ){
      return todos;
    }else if(sortType === 'Pin' ){
      const pindTodo = todos.filter((todo)=> todo.pin === true )
      return pindTodo? pindTodo : [];
    } else if(sortType === 'Completed' ){
      const completedTodo = todos.filter((todo)=> todo.isCompleted === true )
     return completedTodo? completedTodo : [] ;
    } else if(sortType === 'Incomplete' ){
      const incompleteTodo = todos.filter((todo)=> todo.isCompleted === false )
      return incompleteTodo? incompleteTodo : [];
    } 
  },[sortType,todos]);


  const handleUpdates = async(todo)=>{
    const newTodos = todos.filter((i)=> i._id !== todo._id);
    try {
        const response = await axiosPrivateInpector.patch('/api/v1/todo/update',JSON.stringify({...todo}));
        const res = await response.data;
        setTodos([res.data,...newTodos]);
    } catch (error) {
        console.error(error);
    }
  }

  const handleDelete = async(_id)=>{
    const newTodos = todos.filter((i)=> i._id !== _id);
    try {
          await axiosPrivateInpector.delete(`/api/v1/todo/${_id}`);
          setTodos([...newTodos]);
    } catch (error) {
          console.error(error);
    }
  }

  return (
    <section className='todo-list'>
      {
        sortedTodo?.length > 0 ?
        sortedTodo.map((todo)=>(
          <Todo todo={todo} key={todo._id} handleUpdates={handleUpdates} handleDelete={handleDelete}/>
        ))
        :
        <h1>Empty!</h1>
      }
    </section>
  )
}

export default TodosList
