import { Outlet, Navigate } from 'react-router-dom'
import { useUser } from '../../../store/useUser'

export const TrainerRoutes = () => {

  const user = useUser(state => state.user)

	return (user.id_rol === 4) ? <Outlet /> : <Navigate to={'/'} />
}
