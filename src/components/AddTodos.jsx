import { useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { sortTodos } from '../utils/functions';

const AddTodos = ({todos,setTodos,setSortType,sortType}) => {
    const [text,setText] = useState("");
    const axiosPrivate = useAxiosPrivate();


    const handleSortType =async(type)=>{
      if(type==='Date'){
        try {
          setSortType(type);
          const response = await axiosPrivate.get('/api/v1/todo/getTodos');
          const todos = await response.data;
          return setTodos(todos.data);
        } catch (error) {
          return console.error(error);
        }
      }
      setSortType(type);
      setTodos(sortTodos(todos,type));
    }  

    const handleSumitTodo = async()=>{
       if(text.trim() === ""){
        return ;
       }
      try {
          const response = await axiosPrivate.post('/api/v1/todo/add',JSON.stringify({title:text}));
          const res = await response.data;
          setTodos((prev)=>{
            return sortTodos([res.data,...prev],sortType)
          })
          setText("");
      }catch (error){
          console.error(error);
      }
    }

  return (
    <section className='todo-deatils'>
     <h1>What task for today?</h1>
     <div className='input-box'>
      <input type="text" placeholder='Enter here' onChange={(e)=> setText(e.target.value)} value={text}/>
      <button onClick={()=> handleSumitTodo()}>Add</button>
     </div>
     <div className='filter-box'>
      <p>Filter By:</p>
      <button onClick={()=> handleSortType('Pin')} style={{backgroundColor:`${sortType === 'Pin'?'red':'transparent'}`}}>Pinned</button>
      <button onClick={()=> handleSortType('Completed')} style={{backgroundColor:`${sortType === 'Completed'?'red':'transparent'}`}}>Completed</button>
      <button onClick={()=> handleSortType('Incomplete')}style={{backgroundColor:`${sortType === 'Incomplete'?'red':'transparent'}`}}>Incompleted</button>
      <button onClick={()=> handleSortType('Date')} style={{backgroundColor:`${sortType === 'Date'?'red':'transparent'}`}}>Date</button>
     </div>
    </section>
  )
}

export default AddTodos
