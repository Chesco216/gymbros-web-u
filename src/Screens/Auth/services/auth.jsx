import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../../firebase/firebasse"
// import { useNavigate } from 'react-router-dom'

export const signupEP = async (email, password) => {

	// const navigate = useNavigate()

	try {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password)
		const user = userCredential.user
		localStorage.setItem('user', JSON.stringify(user))

		return user
	} catch (error) {
		alert('Error: ', error.code)
	}
}

export const loginEP = async (email, password) => {

	// const navigate = useNavigate()

	try {
		const userCredential = await signInWithEmailAndPassword(auth, email, password)
		const user = userCredential.user
		localStorage.setItem('user', JSON.stringify(user))
		// navigate('/')

		return user
	} catch (error) {
		alert('Error: ', error.code)
	}
}
