import { Outlet, Navigate } from 'react-router-dom'

import { useUser } from "../../store/useUser"

export const GymsAdminRoutes = () => {

  const user = useUser(state => state.user)

	return (user.id_rol === 3) ? <Outlet /> : <Navigate to={'/'} />
}

