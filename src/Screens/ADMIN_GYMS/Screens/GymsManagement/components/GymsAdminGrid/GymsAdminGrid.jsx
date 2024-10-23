import { useState } from "react"
import { useGymsAdmin } from "../../../../store/useGymsAdmin"
import { GymsModal } from "../GymsModal/GymsModal"

export const GymsAdminGrid = () => {

  const gymsAdmin = useGymsAdmin(state => state.gymsAdmin)
  
  const [isOpen, setIsOpen] = useState(false)

  console.log({isOpen})
  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Agreagar un gimnasio</button>
      {
        (isOpen) && <GymsModal setIsOpen={setIsOpen}/>
      }
    </div>
  )
}

