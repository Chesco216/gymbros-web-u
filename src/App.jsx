import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Home } from "./Screens/Home/Home"
import { Login } from "./Screens/Auth/Login"
import { Signup } from "./Screens/Auth/Signup"
import { AdminRoutes } from "./Screens/ADMIN/AdminRoutes"
import { UserManagement } from "./Screens/ADMIN/UserManagement/UserManagement"
import { PostManagement } from "./Screens/ADMIN/PostsManagement/PostManagement"

function App() {

	const routes = createBrowserRouter([
		{
			path: '/',
			element: <Home />
		},
		{
			path: '/login',
			element: <Login />
		},
		{
			path: '/signup',
			element: <Signup />
		},
    {
      path: '/admin',
      element: <AdminRoutes/>,
      children: [
        {
          path: '/admin/users',
          element: <UserManagement/>
        },
        {
          path: '/admin/posts',
          element: <PostManagement/>
        },
      ]
    }
	])

	return (
		<>
			<RouterProvider router={routes} />
		</>
	)
}

export default App
