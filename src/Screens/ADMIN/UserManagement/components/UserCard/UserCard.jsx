import styles from './UserCard.module.css'

export const UserCard = ({name, ci, isActive, expires, plan}) => {
  return (
    <div className={styles.container}>
      <label className={`${styles.labels} `}>{name}</label>
      <label className={`${styles.labels} `}>{ci}</label>
      <label className={`${styles.labels} `}>{(isActive) ? 'Activo' : 'Expirado'}</label>
      <label className={`${styles.labels} `}>{expires}</label>
      <label className={`${styles.labels} `}>{plan}</label>
    </div>
  )
}

