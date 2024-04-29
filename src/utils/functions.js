export const sortTodos = (todos,sortType)=>{
    if(sortType === 'Pin'){
      const pinnedTodos = todos.filter((todo)=> todo.pin === true);
      const unpinnedTodos = todos.filter((todo)=> todo.pin !== true);
      return [...pinnedTodos,...unpinnedTodos];
    }else {
      const completedTodos= todos.filter((todo)=> todo.isCompleted === true);
      const incompleteTodos = todos.filter((todo)=> todo.isCompleted !== true);
    
      return sortType === 'Completed'? [...completedTodos,...incompleteTodos]
      :[...incompleteTodos,...completedTodos]
    }
  }

  