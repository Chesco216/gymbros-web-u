import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { AdminRoutes } from "./Screens/ADMIN/AdminRoutes"
import { UserManagement } from "./Screens/ADMIN/UserManagement/UserManagement"
import { PostManagement } from "./Screens/ADMIN/PostsManagement/PostManagement"
import { Home } from "./Screens/Home/Home"
import { Login } from "./Screens/Auth/Login"
import { Signup } from "./Screens/Auth/Signup"
import { GymInfo } from "./Screens/GymInfo/GymInfo"
import { GymsAdminRoutes } from "./Screens/ADMIN_GYMS/GymsAdminRoutes"
import { GymsManagement } from "./Screens/ADMIN_GYMS/Screens/GymsManagement/GymsManagement"
import { Reports } from "./Screens/ADMIN_GYMS/Screens/Reports/Reports"
import { GymCRUD } from "./Screens/ADMIN_GYMS/Screens/GymsCRUD/GymCRUD"

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
			element: <AdminRoutes />,
			children: [
				{
					path: 'users',
					element: <UserManagement />
				},
				{
					path: 'posts',
					element: <PostManagement />
				},
			]
		},
		{
			path: '/gyms/:id',
			element: <GymInfo />
		},
    {
      path: '/superadmin',
      element: <GymsAdminRoutes/>,
      children: [
        {
          path: 'gyms',
          element: <GymsManagement/>
        },
        {
          path: 'newgym',
          element: <GymCRUD/>
        },
        {
          path: 'reports',
          element: <Reports/>
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
