import { collection, doc, getDocs } from 'firebase/firestore'
import { db } from '../../../firebase/firebasse'

export const getUsers = async () => {
	try {
		const docs = await getDocs(collection(db, 'user'))
		const users = []
		docs.forEach(doc => {
			const data = doc.data()
			const user = {
				name: data.name,
				ci: data.ci,
				email: data.email,
				expires_at: data.expires_at,
				height: data.height,
				id_gym: data.id_gym,
				id_rol: data.id_rol,
				is_active: data.is_active,
				phone: data.phone,
				plan: data.plan,
				weight: data.weight
			}
			users.push(user)
		})
		return users
	} catch (error) {
		alert(error.code)
	}
}
