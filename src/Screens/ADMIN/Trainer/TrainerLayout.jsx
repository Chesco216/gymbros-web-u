import { RoutinesGrid } from './components/RoutinesGrid/RoutinesGrid'
import { useUser } from '../../../store/useUser'
import { UserLayout } from '../../Common/Layouts/UserLayout.jsx'

export const TrainerLayout = () => {

  const user = useUser(state => state.user)
  console.log({user});
  
  return (
    <UserLayout>
      <RoutinesGrid/>
    </UserLayout>
  )
}

