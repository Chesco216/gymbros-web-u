import { useEffect, useState } from 'react'
import styles from './UserManagement.module.css'
import { UserGrid } from './components/UserGrid/UserGrid'
import { AddUserModal } from './components/AddUserModal/AddUserModal'
import { getUsers } from '../services/getUsers'
import { useUserList } from '../store/useUserList'

export const UserManagement = () => {

  const [userCI, setUserCI] = useState()
  const [isOpen, setIsOpen] = useState(false)


  // const [users, setUsers] = useState(null)

  const users = useUserList(state => state.userList)
  const setUsers = useUserList(state => state.set_user_list)
  // useEffect(() => {
  //   getUsers().then(usersF => setUsers(usersF))
  // }, [])

  const handleUsers = () => {
    setUsers(userCI)
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

