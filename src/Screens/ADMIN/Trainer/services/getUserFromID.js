import { doc, getDoc } from "firebase/firestore"
import { db } from "../../../../firebase/firebasse"

export const getUserFromID = async(id) => {
  try {
    const res = await getDoc(doc(db, 'user', id))
    const user = res.data()
    const formatedData = {
      uid: user.uid,
      name: user.name,
      height: user.height,
      weight: user.weight,
      age: user.age
    }

    return formatedData
  } catch (error) {
    console.log('error from get user from UD')
    alert(error.code)
  }
}
