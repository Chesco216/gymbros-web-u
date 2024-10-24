import React from 'react'

export const GymAdminCard = ({expires_at, name, active_users, max_users, plan}) => {

  const dateObj = new Date(expires_at.seconds*1000)
  const date = `${dateObj.getDate().toString()} / ${dateObj.getMonth().toString()} / ${dateObj.getFullYear().toString()}`

  return (
    <tr>
      <td>

      </td>
    </tr>
  )
}

