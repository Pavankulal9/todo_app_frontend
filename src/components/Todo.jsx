import {BiPin} from 'react-icons/bi'
import {AiFillDelete} from 'react-icons/ai'
const Todo = ({todo,handleUpdates,handleDelete}) => {
  return (
    <div className='todo' style={{backgroundColor:`${todo.isCompleted? 'rgba(129, 255, 129, 0.551)':'rgba(255, 0, 0,0.551)'}`}}>
      <p style={{textDecoration:`${todo.isCompleted?'line-through': 'none'}`}}>{todo.title}</p>
      <div className='update-box'>
        <input type="checkbox" checked={todo.isCompleted} onChange={()=> handleUpdates({...todo,isCompleted:!todo.isCompleted})}/>
        <button onClick={()=> handleDelete(todo._id)}><AiFillDelete/></button>
      </div>
      <div className='pin' style={{backgroundColor: `${todo.pin?'red':'black'}`}} onClick={()=> handleUpdates({...todo,pin:!todo.pin})}>
        <BiPin />
      </div>
    </div>
  )
}

export default Todo
