import { useState, useEffect } from "react"
import { useGymsAdmin } from "../../../../store/useGymsAdmin"
import { GymsModal } from "../GymsModal/GymsModal"
import { GymAdminCard } from "../GymAdminCard/GymAdminCard"
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../../../../../../firebase/firebasse.js'

export const GymsAdminGrid = () => {

  const gymsAdmin = useGymsAdmin(state => state.gymsAdmin)
  const set_gyms_admin = useGymsAdmin(state => state.set_gyms_admin)
  
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const gymsArr = []
    getDocs(collection(db, 'gymsAdmin'))
      .then(gyms => {
        gyms.forEach(gym => {
          const data = gym.data()
          gymsArr.push(data);
        });
      })
      set_gyms_admin(gymsArr)
  }, [])
  
  console.log(gymsAdmin)
  return (
    <div>
      {
        (gymsAdmin.length > 0) &&
          <table>
            <tr>
              <th>Nombre</th>
              <th>Usuarios Permitidos</th>
              <th>Usuarios Activos</th>
              <th>Fecha de renovacion</th>
              <th>Plan</th>
            </tr>
            {
              gymsAdmin.map((gym) => 
                <GymAdminCard
                  name={gym.name}
                  max_users={gym.max_users}
                  active_users={gym.active_users}
                  expires_at={gym.expires_at}
                  plan={gym.plan}
                />
              )
            }
          </table>
      }
    </div>
  )
}

