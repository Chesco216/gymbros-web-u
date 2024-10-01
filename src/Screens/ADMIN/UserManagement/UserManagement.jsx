import { useState } from 'react'
import styles from './UserManagement.module.css'
import { UserGrid } from './components/UserGrid/UserGrid'
import { AddUserModal } from './components/AddUserModal/AddUserModal'

export const UserManagement = () => {

  const [userCI, setUserCI] = useState()
  const [isOpen, setIsOpen] = useState(false)

  const dateRaw = new Date()
  const date = `${dateRaw.getDay()} / ${dateRaw.getMonth()} / ${dateRaw.getFullYear()}`
  const [users, setUsers] = useState([
    {
      name: 'veichan',
      ci: '97213',
      isActive: false,
      expires_at: date.toString(),
      plan: 'estudiantil'
    },
    {
      name: 'eibar',
      ci: '97214',
      isActive: true,
      expires_at: date.toString(),
      plan: 'normal'
    },
    {
      name: 'trini',
      ci: '97215',
      isActive: false,
      expires_at: date.toString(),
      plan: 'promo 2x1'
    },
    {
      name: 'choca',
      ci: '97216',
      isActive: true,
      expires_at: date.toString(),
      plan: 'estudiantil'
    },
  ])

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
      <UserGrid users={users}/>
      {
        isOpen && <AddUserModal setIsOpen={setIsOpen}/>

      }
      <button onClick={() => setIsOpen(!isOpen)}>Agregar usuario</button> 
    </div>
  )
}

