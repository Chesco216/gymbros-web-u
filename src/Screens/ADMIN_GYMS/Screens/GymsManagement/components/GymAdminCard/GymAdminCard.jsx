import React from 'react'

export const GymAdminCard = ({expires_at= {seconds: 0}, name, active_users, max_users, plan}) => {
  console.log({expires_at})

  const dateObj = new Date(expires_at.seconds*1000)
  const date = `${dateObj.getDate().toString()} / ${dateObj.getMonth().toString()} / ${dateObj.getFullYear().toString()}`

  const handleDelete = () => {
    if(confirm(`Esta seguro de que desea eliminar el gimnasio ${name}?`)){
      console.log(`deleted ${name}`)
    }
  }

  const handleUpdate = () => {

  }

  return (
		<tr className="bg-white border-b hover:bg-gray-50 fade-in">
			<th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap capitalize">{name}</th>
			<td className="px-6 py-4">{max_users}</td>
			<td className="px-6 py-4">{active_users}</td>
			<td className="px-6 py-4">{date}</td>
			<td className="px-6 py-4 capitalize">{plan}</td>
			<td className="px-6 py-4 text-right"><button 
        onClick={() => handleDelete()}
        className='bg-red-400 py-2.5 px-4 rounded-lg font-semibold text-white'
      >
        Eliminar
      </button></td>
			<td className="px-6 py-4 text-right"><button
        onClick={() => handleUpdate()}
        className='bg-primary py-2.5 px-4 rounded-lg font-semibold text-white'
      >
        Actualizar
      </button></td>
		</tr>
  )
}

