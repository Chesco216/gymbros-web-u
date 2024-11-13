import React from 'react'
import { GymForm } from './components/GymForm/GymForm'
import { UserLayout } from '../../../Common/Layouts/UserLayout.jsx'

export const GymCRUD = () => {
  return (
    <UserLayout>
      <div className='w-full h-full flex items-center justify-center py-[80px]'>
        <GymForm/>
      </div>
    </UserLayout>
  )
}

