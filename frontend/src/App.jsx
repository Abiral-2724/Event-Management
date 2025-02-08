import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/login'
import Signup from './pages/Signup'
import CreateEvent from './pages/CreateEvent'
import Explore from './pages/Explore'

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
    },{
      path:'/create-event',
      element:<CreateEvent></CreateEvent>
    },{
      path:'/explore' ,
      element:<Explore></Explore>
    }
  ])
  
  return (
   <>
   <RouterProvider router={appRouter} />
   </>
  )
}

export default App
