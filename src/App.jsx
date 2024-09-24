import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Home } from "./Screens/Home/Home"
import { Login } from "./Screens/Auth/Login"
import { Signup } from "./Screens/Auth/Signup"

function App() {

  const routes = createBrowserRouter([
    {
      path: '/',
      element: <Home/>
    },
    {
      path: '/login',
      element: <Login/>
    },
    {
      path: '/signup',
      element: <Signup/>
    },
  ])

  return (
    <>
      <RouterProvider router={routes}/>
    </>
  )
}

export default App
