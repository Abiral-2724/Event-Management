import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/login'
import Signup from './pages/Signup'
import CreateEvent from './pages/CreateEvent'
import Explore from './pages/Explore'
import About from './pages/About'
import Profile from './pages/Profile'
import Pricing from './pages/Pricing'
import Services from './pages/Services'

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
    },{
      path:'/about',
      element:<About></About>
    },{
      path:'/profile',
      element:<Profile></Profile>
    },{
      path:'/pricing',
      element:<Pricing></Pricing>
    },{
      path:'/services',
      element:<Services></Services>
    }
  ])
  
  return (
   <>
   <RouterProvider router={appRouter} />
   </>
  )
}

export default App
