import { collection, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase/firebasse'

export const updateUser = async (userId, userData) => {
	try {
		const userRef = doc(db, 'user', userId)

		await updateDoc(userRef, userData)

		return true
	} catch (error) {
		alert(error.code)
		return false
	}
}
