import { Outlet, Navigate } from 'react-router-dom'

import { useUser } from "../../store/useUser"

export const GymsAdminRoutes = () => {

  // const user = useUser(state => state.user)
  const user = 1

	return (user === 1) ? <Outlet /> : <Navigate to={'/'} />
}

