import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { AdminRoutes } from "./Screens/ADMIN/AdminRoutes"
import { UserManagement } from "./Screens/ADMIN/UserManagement/UserManagement"
import { PostManagement } from "./Screens/ADMIN/PostsManagement/PostManagement"
import { Home } from "./Screens/Home/Home"
import { Login } from "./Screens/Auth/Login"
import { Signup } from "./Screens/Auth/Signup"
import { GymInfo } from "./Screens/GymInfo/GymInfo"

import { Suscription } from "./Screens/Suscription/Suscription"

import { GymsAdminRoutes } from "./Screens/ADMIN_GYMS/GymsAdminRoutes"
import { GymsManagement } from "./Screens/ADMIN_GYMS/Screens/GymsManagement/GymsManagement"
import { Reports } from "./Screens/ADMIN_GYMS/Screens/Reports/Reports"
import { GymCRUD } from "./Screens/ADMIN_GYMS/Screens/GymsCRUD/GymCRUD"
import { TrainerRoutes } from "./Screens/ADMIN/Trainer/TrainerRoutes"
import { TrainerLayout } from "./Screens/ADMIN/Trainer/TrainerLayout"
import { Profile } from "./Screens/Profile/Profile"
import { Payment } from "./Screens/Profile/Payment"


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
			path: '/profile',
			element: <Profile />
		},
		{
			path: '/profile/payment',
			element: <Payment />
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
			path: '/trainer',
			element: <TrainerRoutes />,
			children: [
				{
					path: 'users',
					element: <TrainerLayout />
				},
			]
		},
		{
			path: '/superadmin',
			element: <GymsAdminRoutes />,
			children: [
				{
					path: 'gyms',
					element: <GymsManagement />
				},
				{
					path: 'newgym',
					element: <GymCRUD />
				},
				{
					path: 'reports',
					element: <Reports />
				},
			]
		},
		{
			path: '/gyms/:id',
			element: <GymInfo />
		},
		{
      path: '/gyms/:id/suscript',
			element: <Suscription />
		},
	])

	return (
		<>
			<RouterProvider router={routes} />
		</>
	)
}

export default App
