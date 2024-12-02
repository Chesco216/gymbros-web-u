import React, { useState } from 'react'
import { useGym } from '../../../../../../store/useGym'

export const UpdateGymModal = ({id, setIsModalOpened}) => {

  const { gyms } = useGym()

  const [name, setName] = useState('')
  const [plan, setPlan] = useState('')

  const handleUpdateGym = () => {
    const gymDoc = gyms.filter((item) => item.uid == id)
    const gymUppdated = {
      ...gymDoc[0],
      name: name,
      plan: plan
    }
    setIsModalOpened(false)
    console.log({gymUppdated})
  }

  return (
    <div className='flex flex-col my-4 bg-white p-6 rounded-lg'>
      <span>
        <p className='font-semibold text-lg mb-4'>Nombre</p>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='py-2.5 px-5 border-2 border-gray-300 rounded-lg mb-6'
        />
      </span>
      <span>
        <p className='font-semibold text-lg mb-4'>Plan</p>
        <select 
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
          className='block w-full p-2 mb-6 text-md text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary'
        >
          <option value='Simple Inscripcion'>Simple Inscripcion</option>
          <option value='Inscripcion y Aplicacion movil'>Inscripcion y Aplicacion movil</option>
        </select>
      </span>
      <span className='flex flex-row justify-between mt-3'>
        <button
          className='py-2.5 px-6 bg-primary font-semibold text-xl text-white rounded-lg'
          onClick={() => handleUpdateGym()} 
        >
          Actualizar
        </button>
        <button 
          className='py-2.5 px-6 bg-red-400 font-semibold text-xl text-white rounded-lg'
          onClick={() => setIsModalOpened(false)}
        >
          Cancelar
        </button>
      </span>
    </div>
  )
}

