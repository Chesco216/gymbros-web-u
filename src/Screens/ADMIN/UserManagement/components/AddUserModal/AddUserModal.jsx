import { useState } from 'react'
import styles from './AddUserModal.module.css'

const info = {
  name: '',
  ci: '',
  plan: '',
}

export const AddUserModal = ({setIsOpen, userInfo = info, mod}) => {

  const [name, setName] = useState()
  const [ci, setCI] = useState()
  const [plan, setPlan] = useState()

  const handleAddUser = () => {
    console.log('usera added')
    setIsOpen(false)
  }

  return (
    <div 
      className={styles.modalContainer}
      // onClick={() => setIsOpen(false)}
    >
      <form onSubmit={() => handleAddUser()} className={styles.container}>
        <input
          type='text'
          name='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Nombre'
        />
        <input
          type='text'
          name='ci'
          value={ci}
          onChange={(e) => setCI(e.target.value)}
          placeholder='CI'
        />
        <input
          type='text'
          name='plan'
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
          placeholder='Plan'
        />

        <button type='submit'>{mod}</button>
        <button onClick={() => setIsOpen(false)}>Cancelar</button>
      </form>
    </div>
  )
}

