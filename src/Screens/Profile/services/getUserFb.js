import { doc, getDoc } from "firebase/firestore"
import { db } from "../../../firebase/firebasse"

export const getUserFb = async (uid) => {
	try {
		const res = await getDoc(doc(db, 'user', uid))
		const user = res.data()

		return {
			...user,
		}
	} catch (error) {
		console.log({ error })
		alert(error.code)
	}
}
