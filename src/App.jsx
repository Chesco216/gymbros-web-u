import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Home } from "./Screens/Home/Home"
import { Login } from "./Screens/Auth/Login"
import { Signup } from "./Screens/Auth/Signup"
import { GymInfo } from "./Screens/GymInfo/GymInfo"

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
			path: '/gyms/:id',
			element: <GymInfo />
		}
	])

	return (
		<>
			<RouterProvider router={routes} />
		</>
	)
}

export default App
