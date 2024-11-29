import { GymsAdminGrid } from "./components/GymsAdminGrid/GymsAdminGrid"
import { UserLayout } from '../../../Common/Layouts/UserLayout.jsx'
import { useGymsAdmin } from "../../store/useGymsAdmin.js"
import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../../../firebase/firebasse.js"
import { ConfirmPopUp } from "../../../../components/ConfirmPopUp.jsx"
import { usePopUp } from "../../../../store/usePopUp.js"

export const GymsManagement = () => {

  const [gyms, setGyms] = useState([])

  const isOpen = usePopUp(state => state.props.isOpen)
  const message = usePopUp(state => state.props.message)
  const setIsOpen = usePopUp(state => state.setIsOpen)
  
  useEffect(() => {
    getDocs(collection(db, 'gymsAdmin'))
      .then(docs => {
        const g = []
        docs.forEach(gym => {
          const data = gym.data()
          g.push(data)
        });
        setGyms(g)
      })
  }, [])

  console.log({gyms})
  return (
    <UserLayout>
      <div className='flex alig-center justify-center pt-[100px]'>
        <GymsAdminGrid gyms={gyms}/>
      </div>
      <ConfirmPopUp message={message} isOpen={isOpen} setIsOpen={setIsOpen}/>
    </UserLayout>
  )
}

