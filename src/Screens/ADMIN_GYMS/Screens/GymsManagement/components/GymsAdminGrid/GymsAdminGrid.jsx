import { GymAdminCard } from "../GymAdminCard/GymAdminCard"

export const GymsAdminGrid = ({ gyms }) => {

  return (
    <table>
      <tr className="">
        <th>Nombre</th>
        <th>Usuarios Permitidos</th>
        <th>Usuarios Activos</th>
        <th>Fecha de renovacion</th>
        <th>Plan</th>
      </tr>
      {
        gyms.map((gym) => 
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
  )
}

