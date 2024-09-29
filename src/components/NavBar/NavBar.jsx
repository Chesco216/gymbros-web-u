import { useState } from 'react'
import styles from './NavBar.module.css'

export const NavBar = () => {

  const [isOpen, setIsOpen] = useState(false)

  return (
    <div 
      className={`${styles.container}`}
      style={(isOpen) ? ''
        :
        {
          display: none
        }
      }
    >
      NavBar
    </div>
  )
}

