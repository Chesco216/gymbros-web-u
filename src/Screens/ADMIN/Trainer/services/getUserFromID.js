import { collection, getDoc, query, where } from "firebase/firestore"
import { db } from "../../../../firebase/firebasse"

export const getUserFromID = async(id) => {
  try {
    const q = query(collection(db, 'user'), where('uid', '==', id))
    const res = await getDoc(q)
    const user = res.data()
    return {
      uid: user.uid,
      name: user.name,
      height: user.height,
      weight: user.weight,
      age: user.age
    }
  } catch (error) {
    alert(error.code)
  }
}
