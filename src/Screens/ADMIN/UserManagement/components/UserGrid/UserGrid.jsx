import { UserCard } from '../UserCard/UserCard'
import styles from './UserGrid.module.css'

export const UserGrid = ({users}) => {


  console.log('users: ', users)

  return (
    <div className={styles.container}>
      <span className={styles.headers}>
        <label className={`${styles.labels} `}>Nombre</label>
        <label className={`${styles.labels} `}>CI</label>
        <label className={`${styles.labels} `}>Estado</label>
        <label className={`${styles.labels} `}>Expira</label>
        <label className={`${styles.labels} `}>Plan</label>
      </span>
      {
        users.map(user => <UserCard
          key={user.name}
          name={user.name}
          ci={user.ci}
          isActive={user.isActive}
          expires={user.expires_at}
          plan={user.plan}
        />)
      }
    </div>
  )
}

