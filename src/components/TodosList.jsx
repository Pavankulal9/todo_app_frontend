import { deleteTodo, updateTodo } from '../utils/apiCalls';
import Todo from './Todo'
import { sortTodos } from '../utils/functions';

const TodosList = ({todos,setTodos,sortType}) => {

  const handleUpdates = (todo)=>{
    const newTodos = todos.filter((i)=> i._id !== todo._id);
    updateTodo(todo)
    .then((res)=>{ 
       setTodos(sortTodos([res.data,...newTodos],sortType));
    })
    .catch((error)=> console.log(error));
  }

  const handleDelete = (_id)=>{
    const newTodos = todos.filter((i)=> i._id !== _id);
    deleteTodo(_id)
    .then(()=>{ 
      setTodos(sortTodos([...newTodos],sortType))
    })
    .catch((error)=> console.log(error));
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
