import { collection, getDocs } from "firebase/firestore"
import { db } from "../../../firebase/firebasse"

export const getGymsFb = async () => {
  try {
    const data = await getDocs(collection(db, 'gym'))
    const gyms = []
    data.forEach(doc => {
      const data = doc.data()
      if(data.name != '') gyms.push({
        ...data,
        uid: doc.id,
        main_image: 'https://media.revistagq.com/photos/65b12cd1df908a3c3a4d7373/16:9/w_2560%2Cc_limit/fitness%2520portada.jpg'
      })
    })
    console.log({msg: 'gyms from getGymsFb', arr: gyms})
    return gyms
  } catch (error) {
    alert(error.code)
  }
}
