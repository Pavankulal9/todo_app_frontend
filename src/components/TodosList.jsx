import Todo from './Todo'
import { sortTodos } from '../utils/functions';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const TodosList = ({todos,setTodos,sortType}) => {

  const axiosPrivate = useAxiosPrivate();

  const handleUpdates = async(todo)=>{
    const newTodos = todos.filter((i)=> i._id !== todo._id);
    try {
        const response = await axiosPrivate.patch('/api/v1/todo/update',JSON.stringify({...todo}));
        const res = await response.data;
        setTodos(sortTodos([res.data,...newTodos],sortType));
    } catch (error) {
        console.error(error);
    }
  }

  const handleDelete = async(_id)=>{
    const newTodos = todos.filter((i)=> i._id !== _id);
    try {
          await axiosPrivate.delete(`/api/v1/todo/${_id}`);
          setTodos(sortTodos([...newTodos],sortType))
    } catch (error) {
          console.error(error)
    }
  }

  return (
    <section className='todo-list'>
      {
        todos?.length > 0 ?
        todos.map((todo)=>(
            <Todo todo={todo} key={todo._id} handleUpdates={handleUpdates} handleDelete={handleDelete}/>
        ))
        :
        <h1>Empty!</h1>
      }
    </section>
  )
}

export default TodosList
