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

  //FIX: i dont know why but statte is not changing
  useEffect(() => {
    const data = []
    getDocs(collection(db, 'gym'))
      .then(doc => doc.forEach(gym => {
        data.push(gym.data())
      }))
    setGymList(data)
    console.log(data)
  },[])


  return (
    <form>
      {
        console.log({msg: 'gymList from form', gymList})
      }
      {
        (gymList.length > 0) &&
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
      }
    </form>
  )
}
