import React, { useState } from 'react'
import { useUser } from '../../../store/useUser'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../../firebase/firebasse'

export const UpdateForm = () => {

  const user = useUser(state => state.user)
  const set_user = useUser(state => state.set_user)

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      const res = setDoc(doc(db, 'user', user.uid), user)
      console.log(res.user)
    } catch (error) {
      console.log(error)
      alert(error.code)
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <span>
        <h3>Nombre</h3>
        <input
          type='text'
          name='name'
          value={user.name}
          onChange={(e) => set_user({...user, name: e.target.value})}
        />
      </span>
      <span>
        <h3>Edad</h3>
        <input
          type='number'
          name='age'
          value={user.age}
          onChange={(e) => set_user({...user, age: e.target.value})}
        />
      </span>
      <span>
        <h3>Peso</h3>
        <input
          type='number'
          name='weight'
          value={user.weight}
          onChange={(e) => set_user({...user, weight: e.target.value})}
        />
      </span>
      <span>
        <h3>Altura</h3>
        <input
          type='number'
          name='height'
          value={user.height}
          onChange={(e) => set_user({...user, height: e.target.value})}
        />
      </span>
      <span>
        <h3>Telefono</h3>
        <input
          type='text'
          name='phone'
          value={user.phone}
          onChange={(e) => set_user({...user, phone: e.target.value})}
        />
      </span>
      <button type='submit'>Actualizar</button>
    </form>    
  )
}
