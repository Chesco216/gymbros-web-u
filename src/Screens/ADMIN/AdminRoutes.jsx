import { Outlet, Navigate } from 'react-router-dom'
import { useUser } from '../../store/useUser'

export const AdminRoutes = () => {

  const user = useUser(state => state.user)

	return (user.id_rol === 2) ? <Outlet /> : <Navigate to={'/'} />
}
