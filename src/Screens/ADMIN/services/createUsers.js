import { collection, addDoc, setDoc, doc } from 'firebase/firestore'
import { db } from '../../../firebase/firebasse'

export const createUser = async (userData) => {
	try {
		const docRef = await addDoc(collection(db, 'user'), {
			name: userData.name,
			ci: userData.ci,
			email: userData.email,
			expires_at: userData.expires_at,
			height: userData.height,
			id_gym: userData.id_gym,
			id_rol: userData.id_rol,
			is_active: userData.is_active || true,
			phone: userData.phone,
			plan: userData.plan,
			weight: userData.weight,
			created_at: new Date()
		})

		return docRef.id
	} catch (error) {
		alert(error.code)
		return null
	}
}

// Método 2: Especificando un ID personalizado
export const createUserWithCustomId = async (customId, userData) => {
	try {
		// Crear referencia con ID personalizado
		const userRef = doc(db, 'user', customId)

		// Crear el documento
		await setDoc(userRef, {
			name: userData.name,
			ci: userData.ci,
			email: userData.email,
			expires_at: userData.expires_at,
			height: userData.height,
			id_gym: userData.id_gym,
			id_rol: userData.id_rol,
			is_active: userData.is_active || true,
			phone: userData.phone,
			plan: userData.plan,
			weight: userData.weight,
			created_at: new Date()
		})

		return customId
	} catch (error) {
		alert(error.code)
		return null
	}
}
