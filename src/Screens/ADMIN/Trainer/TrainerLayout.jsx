import React, { useEffect } from 'react'
import { RoutinesGrid } from './components/RoutinesGrid/RoutinesGrid'
import { useUser } from '../../../store/useUser'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../../firebase/firebasse'

export const TrainerLayout = () => {

  const set_user = useUser(state => state.set_user)

  useEffect(() => {
    const lc = localStorage.getItem('user')
    const id = lc.replaceAll('"', '')
    const user = getDoc(doc(db, 'user', id))
    set_user(user)
  })

  return (
    <>
      <RoutinesGrid/>
    </>
  )
}

