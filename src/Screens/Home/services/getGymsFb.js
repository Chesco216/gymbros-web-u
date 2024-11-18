import { collection, getDocs } from "firebase/firestore"
import { db } from "../../../firebase/firebasse"

export const getGymsFb = async () => {
	try {
		const data = await getDocs(collection(db, 'gym'))
		const gyms = []
		data.forEach(doc => {
			const data = doc.data()
			if (data.name != '') gyms.push({
				...data,
				uid: doc.id,
				// main_image: 'https://media.revistagq.com/photos/65b12cd1df908a3c3a4d7373/16:9/w_2560%2Cc_limit/fitness%2520portada.jpg'
				main_image: (data.images[0]) ? data.images[0] : 'https://lh5.googleusercontent.com/p/AF1QipNXg1AzcQU39ZEZy6rCDF4h8Nyo486qMbya9pbc=w426-h240-k-no'
			})
		})
		console.log({ msg: 'gyms from getGymsFb', arr: gyms })
		return gyms
	} catch (error) {
		alert(error.code)
	}
}
