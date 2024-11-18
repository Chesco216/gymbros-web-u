import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../../../../firebase/firebasse"

export const getRoutines = async() => {
  try {
    const q = query(collection(db, 'routines'), where('isAproved', '==', false))
    const res = await getDocs(q)
    const routines = []
    res.forEach(routine => {
      routines.push(routine.data())
    })
    
    const formatedRoutines = []
    routines.forEach((routine) => {
      const fr = {
        days: [
          routine.day_1,
          routine.day_2,
          routine.day_3,
          routine.day_4,
          routine.day_5,
        ],
        isAproved: routine.isAproved,
        user_id: routine.user_id
      }
      formatedRoutines.push(fr)
    })

    return formatedRoutines
  } catch (error) {
    console.log({error})
    alert(error.code)
  }
}
