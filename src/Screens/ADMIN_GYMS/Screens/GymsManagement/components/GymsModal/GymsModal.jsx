import styles from './GymsModal.module.css'

export const GymsModal = ({setIsOpen}) => {
  return (
    <form className={styles.container}>
      <button onClick={() => setIsOpen(false)}>cerrar</button>
    </form>
  )
}

