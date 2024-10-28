import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../../../firebase/firebasse'

const info = {
  uid: '',
  name: '',
  email: '',
  id_gym: '',
  id_rol: '',
  member_type: '',
  expires_at: ''
}

export const AdminForm = () => {

  const [gymInfo, setGymInfo] = useState(info)
  const [gymList, setGymList] = useState([])

  useEffect(() => {
    getDocs(collection(db, 'gym'))
      .then(doc => doc.forEach(gym => {
        console.log(gym.data())
        setGymList([
          ...gymList,
          gym.data()
        ])
      }))
    // const filtered = gymList.filter(gym => gym.name != '')
    // console.log({filtered})
    // setGymList(gymList.filter(gym => console.log(gym.name)))
    console.log(gymList)
  },[])

  return (
    <form>
      <select
        onChange={(e) => setGymInfo({
          ...gymInfo,
          id_gym: e.target.value
        })}
      >
        {
          gymList.map((gym) =>
            <option
              key={gym.uid}
              value={gym.uid}
            >
              {gym.name}
            </option>
          )
        }
      </select>
    </form>
  )
}
