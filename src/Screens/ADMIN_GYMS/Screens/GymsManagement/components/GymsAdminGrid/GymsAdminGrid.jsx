import { useState } from "react"
import { useGymsAdmin } from "../../../../store/useGymsAdmin"
import { GymsModal } from "../GymsModal/GymsModal"
import { GymAdminCard } from "../GymAdminCard/GymAdminCard"

export const GymsAdminGrid = () => {

  const gymsAdmin = useGymsAdmin(state => state.gymsAdmin)
  
  const [isOpen, setIsOpen] = useState(false)
  //TODO: get gymsAdmin from firebase

  console.log({isOpen})
  return (
    <div>
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
      <button onClick={() => setIsOpen(true)}>Agreagar un gimnasio</button>
      {
        (isOpen) && <GymsModal setIsOpen={setIsOpen}/>
      }
    </div>
  )
}

