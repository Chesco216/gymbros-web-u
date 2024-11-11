import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../../../firebase/firebasse"
import { createAssessment } from "./getCaptcha"
import { useUser } from "../../../store/useUser"
import { doc, getDoc } from "firebase/firestore"

export const signupEP = async (email, password) => {

	try {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password)
		const user = userCredential.user
		localStorage.setItem('user', JSON.stringify(user.uid))
		// window.location.href = '/'
    
		return user
	} catch (error) {
		alert(`Error: ${error.code}`)
	}

}

export const loginEP = async (email, password) => {

	try {
		const userCredential = await signInWithEmailAndPassword(auth, email, password)
		const user = userCredential.user
		localStorage.setItem('user', JSON.stringify(user.uid))

		return user
	} catch (error) {
		alert(`Error: ${error.code}`)
	}
}
