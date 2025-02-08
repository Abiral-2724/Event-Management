import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/login'
import Signup from './pages/Signup'

function App() {

  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/login',
      element: <Login></Login>
    },
    {
      path: '/register',
      element: <Signup></Signup>
    },
  ])
  
  return (
   <>
   <RouterProvider router={appRouter} />
   </>
  )
}

export default App
