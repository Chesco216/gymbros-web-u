import { doc, getDoc } from "firebase/firestore"
import { db } from "../../../firebase/firebasse"

export const getUserFb = async(uid) => {
  try {
    const res = await getDoc(doc(db, 'user', uid))
    const user = res.data()

    return {
      ...user,
      profile_photo: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
    }
  } catch (error) {
    console.log({error})
    alert(error.code)
  }
}
