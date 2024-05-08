import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import Home from './components/Home.jsx'
import About from './components/About.jsx'
import Profile from "./components/Profile.jsx"
import Signin from "./components/SignIn.jsx"
import Signout from "./components/SignUp.jsx"
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element : <Home/>
  },
  {
    path: "/about",
    element : <About/>
  },
  {
    path: "/profile",
    element : <Profile/>
  },
  {
    path: "/sign-in",
    element : <Signin/>
  },
  {
    path: "/sign-out",
    element : <Signout/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
