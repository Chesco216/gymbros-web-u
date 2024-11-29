import { GymsAdminGrid } from "./components/GymsAdminGrid/GymsAdminGrid"
import { UserLayout } from '../../../Common/Layouts/UserLayout.jsx'
import { useGymsAdmin } from "../../store/useGymsAdmin.js"
import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../../../firebase/firebasse.js"
import { usePopUp } from "../../../../store/usePopUp.js"

export const GymsManagement = () => {

  const [gyms, setGyms] = useState([])

  const props = usePopUp(state => state.props)

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

  return (
    <UserLayout>
      <div className='flex alig-center justify-center pt-[100px]'>
        <GymsAdminGrid gyms={gyms}/>
      </div>
    </UserLayout>
  )
}

