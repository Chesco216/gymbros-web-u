import { RoutinesGrid } from './components/RoutinesGrid/RoutinesGrid'
import { useUser } from '../../../store/useUser'
import { UserLayout } from '../../Common/Layouts/UserLayout.jsx'

export const TrainerLayout = () => {

  const user = useUser(state => state.user)
  
  return (
    <UserLayout>
      <div className='w-full flex align-center justify-center'>
        <RoutinesGrid/>
      </div>
    </UserLayout>
  )
}

