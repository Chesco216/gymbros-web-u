import { useState } from "react"
import { Form } from "./components/Form/Form"
import { loginEP } from "./services/auth"

export const Signup = () => {

  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const handleSubmit = async() => {
    const user = await loginEP(email, password)
    console.log({user})
  }

  const fields = [
    {
      type: 'text',
      value: name,
      set: setName,
      label: 'name',
      placeHolder: 'Ingresa tu nombre'
    },
    {
      type: 'text',
      value: email,
      set: setEmail,
      label: 'email',
      placeHolder: 'Ingresa tu correo'
    },
    {
      type: 'password',
      value: password,
      set: setPassword,
      label: 'password',
      placeHolder: 'Ingresa tu contraseña'
    },
  ]

  return (
    <div>
      <label>(logo de la plataforma)</label>
      <h1>Bienvenido de nuevo!</h1>
      <Form fields={fields} op='signup' handleSubmit={handleSubmit}/>
    </div>
  )
}


