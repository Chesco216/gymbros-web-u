import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../../../firebase/firebasse"

export const getAllRoutines = async() => {
  try {
    const routines =[]
    const q = query(collection(db, 'routine'), where('isAprobed', '==', false))
    const res = await getDocs(q)
    res.forEach(element => {
      routines.push(element.data())
    });
    return routines
  } catch (error) {
    alert(error.code)
  }
}
