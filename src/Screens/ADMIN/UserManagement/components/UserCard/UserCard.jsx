import styles from './UserCard.module.css'

export const UserCard = ({name, ci, isActive, expires, plan, setIsOpen, setMod}) => {

  // console.log('expires date: ', expires.seconds)
  const dateObj = new Date(expires.seconds*1000)
  const date = `${dateObj.getDate()} / ${dateObj.getMonth()} / ${dateObj.getFullYear()}`

  const handleUpdate =() => {
    setIsOpen(true)
    setMod('Actualizar')
  }

  return (
    <div className={styles.container}>
      <label className={`${styles.labels} `}>{name}</label>
      <label className={`${styles.labels} `}>{ci}</label>
      <label className={`${styles.labels} `}>{(isActive) ? 'Activo' : 'Expirado'}</label>
      <label className={`${styles.labels} `}>{date}</label>
      <label className={`${styles.labels} `}>{plan}</label>
      <button onClick={() => handleUpdate()}>Actualizar usuario</button>
    </div>
  )
}
