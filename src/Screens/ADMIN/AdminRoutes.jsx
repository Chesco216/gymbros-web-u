import { Outlet, Navigate } from 'react-router-dom'

export const AdminRoutes = () => {

	const user = 1

	return (user === 1) ? <Outlet /> : <Navigate to={'/'} />
}
