import { useEffect, useState } from 'react'
import styles from './UserManagement.module.css'
import { UserGrid } from './components/UserGrid/UserGrid'
import { AddUserModal } from './components/AddUserModal/AddUserModal'
import { getUsers } from '../services/getUsers'

export const UserManagement = () => {

  const [userCI, setUserCI] = useState()
  const [isOpen, setIsOpen] = useState(false)


  const [users, setUsers] = useState(null)

  useEffect(() => {
    getUsers().then(usersF => setUsers(usersF))
  }, [])

  const handleUsers = () => {
    const userFiltered = users.filter(user => user.ci == userCI)
    setUsers([userFiltered])
    console.log({userFiltered, userCI})
  }

  return (
    <div className={styles.container}>
      <span>
        <input 
          name='user_ci'
          value={userCI}
          type='text'
          placeholder='ingresa el ci del usuario'
          onChange={(e) => setUserCI(e.target.value)}
        />
        <button onClick={() => handleUsers()}>Buscar</button>
      </span>
      {
        users && <UserGrid users={users}/>

      }
            {
        isOpen && <AddUserModal setIsOpen={setIsOpen}/>

      }
      <button onClick={() => setIsOpen(!isOpen)}>Agregar usuario</button> 
    </div>
  )
}

