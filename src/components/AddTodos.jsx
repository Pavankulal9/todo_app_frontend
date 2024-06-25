import { useState } from 'react';
import {BiFilter} from 'react-icons/bi'
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const AddTodos = ({setTodos,setSortType,sortType}) => {
    const [text,setText] = useState("");
    const axiosPrivateInpector = useAxiosPrivate();


    const handleSorType = (type)=>{
      setSortType(type);
    }

    const handleSumitTodo = async()=>{
       if(text.trim() === ""){
        return ;
       }
      try {
          const response = await axiosPrivateInpector.post('/api/v1/todo/add',JSON.stringify({title:text}));
          const res = await response.data;
          setTodos((prev)=>{
            return [res.data,...prev]
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
      <BiFilter/>
      <button onClick={()=> handleSorType('Date')} style={{backgroundColor:`${sortType === 'Date'?'red':'transparent'}`}}>Date</button>
      <button onClick={()=> handleSorType('Pin')} style={{backgroundColor:`${sortType === 'Pin'?'red':'transparent'}`}}>Pinned</button>
      <button onClick={()=> handleSorType('Completed')} style={{backgroundColor:`${sortType === 'Completed'?'red':'transparent'}`}}>Completed</button>
      <button onClick={()=> handleSorType('Incomplete')}style={{backgroundColor:`${sortType === 'Incomplete'?'red':'transparent'}`}}>Incompleted</button>
     </div>
    </section>
  )
}

export default AddTodos
