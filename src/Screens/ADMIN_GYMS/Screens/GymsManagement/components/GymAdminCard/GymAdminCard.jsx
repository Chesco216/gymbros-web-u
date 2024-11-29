import React, { useState } from 'react'
import { usePopUp } from '../../../../../../store/usePopUp'
import { UpdateGymModal } from './UpdateGymModal'

export const GymAdminCard = ({expires_at= {seconds: 0}, name, active_users, max_users, plan}) => {

  const dateObj = new Date(expires_at.seconds*1000)
  const date = `${dateObj.getDate().toString()} / ${dateObj.getMonth().toString()} / ${dateObj.getFullYear().toString()}`

  const setMessage = usePopUp(state => state.setMessage)
  const setIsOpen = usePopUp(state => state.setIsOpen)
  const props = usePopUp(state => state.props)
  
  const[isModalOpened, setIsModalOpened] =useState(false)

  const handleDelete = () => {
    setIsOpen(true)
    setMessage(`Estas seguro de que quieres eliminar el gimnasio ${name}?`)
    //TODO: set isActive field pn false
  }

  console.log({props})

  return (
    <>
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
          onClick={() => setIsModalOpened(true)}
          className='bg-primary py-2.5 px-4 rounded-lg font-semibold text-white'
        >
          Actualizar
        </button></td>
      </tr>
      {
        (isModalOpened) &&
          <tr>
            <UpdateGymModal user={name} setIsModalOpened={setIsModalOpened}/>
          </tr>
      }
    </>
  )
}

