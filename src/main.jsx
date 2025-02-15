import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import store from "./store/store.js"
import {Provider} from "react-redux";

import './index.css'
import App from './App.jsx'

import { Theme } from "@radix-ui/themes";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {Home, Login, Signup, AddPost, Post, AllPost} from "./pages"
import {AuthLayout} from "./components"


const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App/>,
      children: [
        {
          path: '/',
          element: <Home/> 
        },
        {
          path: "/login",
          element: (
            <AuthLayout authentication={false}>
              <Login/>
            </AuthLayout>
          )
        },
        {
          path: "/signup",
          element: (
            <AuthLayout authentication={false}>
              <Signup/>
            </AuthLayout>
          )
        },
        {
          path: "/add-post",
          element: (
            <AuthLayout authentication={true}>
              <AddPost/>
            </AuthLayout>
          )
        },
        {
          path: "/all-post",
          element: (
            <AuthLayout authentication>
              <AllPost/>
            </AuthLayout>
          )
        },
        {
          path: "/post/:slug",
          element: (
            <AuthLayout authentication> 
              <Post/>
            </AuthLayout>
          )
        }
      ]
    }
  ]
)

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <Provider store={store}>
      <Theme>
        <RouterProvider router={router}/>
      </Theme>   
    </Provider>
  </StrictMode>,
)