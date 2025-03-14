import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import { createStandaloneToast } from '@chakra-ui/react'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Login from './components/login/Login.jsx'
import AuthProvider from './components/context/AuthProvider.jsx'
import ProtectedRoute from './components/shared/ProtectedRoute.jsx'
import NewCustomer from './components/NewCustomer.jsx'

//for Toast purposes (standalone)
const { ToastContainer} = createStandaloneToast();

//Routing within React Router
const router = createBrowserRouter([
  {
    path:"/",
    element: <Login/>
  },
  {
    path:"/dashboard",
    element: <ProtectedRoute><App/></ProtectedRoute>
  },
  {
    path:"/new-customer",
    element: <NewCustomer></NewCustomer>
  }
])

//rendering the component
createRoot(
  document
   .getElementById('root'))
   .render(
        <StrictMode>
          <ChakraProvider>
             <AuthProvider>
                   <RouterProvider router={router}/> 
             </AuthProvider>
             <ToastContainer/>
          </ChakraProvider>
        </StrictMode>,
)
