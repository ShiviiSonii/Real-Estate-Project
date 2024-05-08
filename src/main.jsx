import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Profile from "./pages/Profile.jsx"
import Signin from "./pages/SignIn.jsx"
import Signout from "./pages/SignUp.jsx"
import './index.css'
import Layout from './components/Layout.jsx'

const router = createBrowserRouter([
  {
    path : "/",
    element : <Layout/>,
    children : [
      {
        path: "",
        element : <Home/>
      },
      {
        path: "/about",
        element : <About/>
      }
    ]
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
