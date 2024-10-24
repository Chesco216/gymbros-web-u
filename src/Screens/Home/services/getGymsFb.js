import { collection, getDocs } from "firebase/firestore"
import { db } from "../../../firebase/firebasse"

export const getGymsFb = async () => {
  try {
    const data = await getDocs(collection(db, 'gym'))
    const gyms = []
    data.forEach(doc => {
      gyms.push(doc.data())
    })
    return gyms
  } catch (error) {
    alert(error.code)
  }
}
