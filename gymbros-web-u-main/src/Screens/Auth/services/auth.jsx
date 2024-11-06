import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../../firebase/firebasse"

export const signupEP = async (email, password) => {

	try {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password)
		const user = userCredential.user
		localStorage.setItem('user', JSON.stringify(user))
		window.location.href = '/'

		return user
	} catch (error) {
		alert(`Error: ${error.code}`)
	}

}

export const loginEP = async (email, password) => {

	try {
		const userCredential = await signInWithEmailAndPassword(auth, email, password)
		const user = userCredential.user
		localStorage.setItem('user', JSON.stringify(user))
		window.location.href = '/'

		return user
	} catch (error) {
		alert(`Error: ${error.code}`)
	}
}
