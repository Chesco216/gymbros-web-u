import React from 'react'

export const GymAdminCard = ({expires_at, name, active_users, max_users, plan}) => {

  const dateObj = new Date(expires_at.seconds*1000)
  const date = `${dateObj.getDate().toString()} / ${dateObj.getMonth().toString()} / ${dateObj.getFullYear().toString()}`

  return (
		<tr className="bg-white border-b hover:bg-gray-50 fade-in">
			<th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap capitalize">{name}</th>
			<td className="px-6 py-4">{max_users}</td>
			<td className="px-6 py-4">{active_users}</td>
			<td className="px-6 py-4">{date}</td>
			<td className="px-6 py-4 capitalize">{plan}</td>
			<td className="px-6 py-4 text-right">

				<button onClick={() => handleUpdate()} className="text-primary hover:underline"> Editar </button>
			</td>
		</tr>
  )
}

