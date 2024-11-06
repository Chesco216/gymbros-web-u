import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../firebase/firebasse'

export const getGymsAdmin = async() => {
  try {
    const res = await getDocs(collection(db, 'gymsAdmin'))
    const gymsAdmin = []
    res.forEach(doc => {
      const data = doc.data()
      const gym = {
        equipement: data.equipement,
        extra_services: data.extra_services,
        images: data.images,
        location: data.location,
        name: data.name,
        phone_number: data.phone_number,
        reviews: data.reviews,
        schedule: data.schedule,
        stars: data.stars,
        suscription_price: data.suscription_price,
        trainers: data.trainers
      }
      gymsAdmin.push(gym)
    })

    return gymsAdmin
  } catch (error) {
    alert(error.code)
  }
}
