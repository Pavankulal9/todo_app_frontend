import axios from "axios";

export const Axios = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
    headers:{
        "Content-Type":"application/json",
        "Access-Control-Allow-Origin":`${import.meta.env.VITE_API_URL}`
    },
    withCredentials: true
})

export const axiosPrivate = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
    headers:{
        "Content-Type":"application/json",
        "Access-Control-Allow-Origin":`${import.meta.env.VITE_API_URL}`
    },
    withCredentials:true
})

//*User Auth Calls
export const loginRequest = async(username,password)=>{
    try {
        const response = await Axios.post('/api/v1/users/login',JSON.stringify({username,password}));
        return response.data;
    } catch (error) {
        return Promise.reject(error.response);
    }
}

export const logoutRequest =async()=>{
    try {
        const response = await axiosPrivate.get(`/api/v1/users/logout`);
        console.log(response);
       return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const signUpRequest = async(name,username,email,password)=>{
    try {
        const response = await Axios.post('/api/v1/users/register',JSON.stringify({name,username,email,password}));
        return response.data;
    } catch (error) {
       return Promise.reject(error.response);
    }
}

export const getCurrentUser = async()=>{
    try {
        const response = await axiosPrivate.get('/api/v1/users/current-user');
        return response.data;
    } catch (error) {
        console.log(error);
        return Promise.reject(error.response);
    }
}


//*User Todos Api calls
export const getTodos = async()=>{
    try {
        const response = await axiosPrivate.get('/api/v1/todo/getTodos');
        return response.data;
    } catch (error) {
       console.log(error);
       return Promise.reject(error.response); 
    }
}

export const addTodo = async(title)=>{
    try {
        const response = await axiosPrivate.post('/api/v1/todo/add',JSON.stringify({title}));
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const updateTodo = async(todo)=>{
  try {
    const response = await axiosPrivate.patch('/api/v1/todo/update',JSON.stringify(todo));
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export const deleteTodo = async(_id)=>{
    try {
        const response = await axiosPrivate.delete(`/api/v1/todo/${_id}`);
        console.log(response);
       return response;
    } catch (error) {
        return Promise.reject(error);
    }
}

