import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../store/useUser'
import styles from './Profile.module.css'
import { getUserFb } from './services/getUserFb'
import { UpdateForm } from './components/UpdateForm'
import { UserLayout } from '../Common/Layouts/UserLayout'

export const Profile = () => {

  const user = useUser(state => state.user)
  const [update, setUpdate] = useState(false)

  const navigate = useNavigate()
  
  //TODO: add a function to set a new profile_photo

  const set_user = useUser(state => state.set_user)
  useEffect(() => {
    const lc = localStorage.getItem('user')
    const id = (lc) ? lc.replaceAll('"', '') : null
    console.log({id})
    if(id) getUserFb(id).then(user => set_user(user))
  },[])

	return (
    <UserLayout>
      {
        (user) &&
          <div className={`${styles.container} `}>
            <span>
              <img src={user.profile_photo} style={{width: 50}}/>
              <p>{user.name}</p>
              <p>{user.email}</p>
            </span>
            {/*NOTE: aca le metes tipo un switch de INFORMACION/EDITAR PERFIL*/}
            <input 
              type='checkbox'
              onChange={() => setUpdate(!update)}
            />
            {
              (!update) &&
                <>
                  <span>
                    <h3>Edad</h3>
                    <p>{user.age}</p>
                    <h3>Numero de documento</h3>
                    <p>{user.ci}</p>
                    <h3>Altura</h3>
                    <p>{user.height}</p>
                    <h3>Peso</h3>
                    <p>{user.weight}</p>
                    <h3>Telefono</h3>
                    <p>{user.phone}</p>
                  </span>
                  <button onClick={() => navigate('/profile/payment')}>Gestionar incripcion y pago</button>
                </>
            }
            {
              (update) &&
                <UpdateForm/>
            }
          </div>
      }
    </UserLayout>
	)
}

