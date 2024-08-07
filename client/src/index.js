import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './Views/Home/Home';
import Login from './Views/Login/Login';
import Signup from './Views/Signup/Signup';
import Updatelinks from './Views/Updatelinks/Updatelinks'
import {createBrowserRouter , RouterProvider} from 'react-router-dom';
import axios from 'axios';



  
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },
  {
    path:'/Login',
    element:<Login/>
  },  
  {
    path:"/update/:id",
    element:<Updatelinks/>    
  },
  {
    path:'/Signup',
    element:<Signup/>
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(< RouterProvider router={router}/>);







