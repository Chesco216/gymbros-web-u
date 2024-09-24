import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../../firebase/firebasse"
import { useNavigate } from 'react-router-dom'

export const loginEP = async(email, password) => {

  const naviagate = useNavigate()

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    localStorage.setItem('user', JSON.stringify(user))
    naviagate('/')

    return user
  } catch (error) {
    alert('Error: ',error.code)
  }
}
