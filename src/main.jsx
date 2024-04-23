import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import Home from './pages/Home.jsx';
// import Profile from './pages/profile.jsx';
import SignUp from './pages/SignUp.jsx';
import Login from './pages/Login.jsx';
import {AuthProvider}  from './context/auth.jsx';
import RequireAuth from './components/RequireAuth.jsx';
import PresistLogin from './components/PresistLogin.jsx';
import Compatibility from './pages/Compatibility.jsx';

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:"/",
        element:
              <PresistLogin>
                <RequireAuth>
                  <Home/>
                </RequireAuth>
              </PresistLogin>,
      },
      {
        path:'/signup',
        element:<SignUp/>
      },
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:'/error',
        element:<Compatibility/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </React.StrictMode>,
)
