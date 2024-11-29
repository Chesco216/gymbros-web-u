import React, { useState } from 'react'
import { UserLayout } from '../../../Common/Layouts/UserLayout.jsx'
import { AdminForm } from '../../../Auth/components/Form/AdminForm.jsx'

export const GymCRUD = () => {

  const [isSubmited, setIsSubmited] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [ci, setCI] = useState('')

  return (
    <UserLayout>
      <div className='w-full h-full flex items-center justify-center py-[80px]'>
        {/*WARN: it must change give gym admin info cause AdminForm component is taking info from state*/}
        {
          (!isSubmited) &&
            <div className='flex flex-col'>
              <span>
                <p className='font-semibold text-xl my-4'>Nombre</p>
                <input 
                  required
                  type='text'
                  className='py-2.5 px-4 rounded-lg border border-gray-300'
                  onChange={(e) => setName(e.target.value)}
                />
              </span>
              <span>
                <p className='font-semibold text-xl my-4'>CI</p>
                <input 
                  required
                  type='email'
                  className='py-2.5 px-4 rounded-lg border border-gray-300'
                  onChange={(e) => setCI(e.target.value)}
                />
              </span>
              <span>
                <p className='font-semibold text-xl my-4'>Correo electronico</p>
                <input 
                  required
                  type='email'
                  className='py-2.5 px-4 rounded-lg border border-gray-300'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </span>
              <span>
                <p className='font-semibold text-xl my-4'>Contraseña</p>
                <input 
                  required
                  type='password'
                  className='py-2.5 px-4 rounded-lg border border-gray-300'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </span>
              <button 
                className='py-2.5 px-5 mt-6 bg-primary rounded-lg font-semibold text-white text-lg'
                onClick={(e) => {
                  e.preventDefault()
                  setIsSubmited(true)
                }}
              >
                Siguiente
              </button>
            </div>
        }
        {
          (isSubmited) && 
            <div className='flex flex-col'>
              <AdminForm/>
              <button
                className='py-2.5 px-5 my-4 bg-gray-300 border border-black rounded-lg font-semibold text-xl'
                onClick={() => setIsSubmited(false)}
              >
                Volver
              </button>
            </div>
        }
      </div>
    </UserLayout>
  )
}

