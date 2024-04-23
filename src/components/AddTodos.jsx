import { useState } from 'react';
import { addTodo } from '../utils/apiCalls';
import { sortTodos } from '../utils/functions';

const AddTodos = ({todos,setTodos,setSortType,sortType}) => {
    const [text,setText] = useState("");


    const handleSortType = (type)=>{
      setSortType(type);
      setTodos(sortTodos(todos,type));
    }  

    const handleSumitTodo = ()=>{
       if(text.trim() === ""){
        return ;
       }
       addTodo(text.trim())
       .then((res)=> setTodos((prev)=>{ setText(""); return sortTodos([res.data,...prev],sortType)}))
       .catch((error=> console.log(error)));
    }

  return (
    <section className='todo-deatils'>
     <h1>What task for today?</h1>
     <div className='input-box'>
      <input type="text" placeholder='Enter here' onChange={(e)=> setText(e.target.value)} />
      <button onClick={()=> handleSumitTodo()}>Add</button>
     </div>
     <div className='filter-box'>
      <p>Filter By:</p>
      <button onClick={()=> handleSortType('Pin')} style={{backgroundColor:`${sortType === 'Pin'?'red':'transparent'}`}}>Pinned</button>
      <button onClick={()=> handleSortType('Completed')} style={{backgroundColor:`${sortType === 'Completed'?'red':'transparent'}`}}>Completed</button>
      <button onClick={()=> handleSortType('Incomplete')}style={{backgroundColor:`${sortType === 'Incomplete'?'red':'transparent'}`}}>Incompleted</button>
     </div>
    </section>
  )
}

export default AddTodos
