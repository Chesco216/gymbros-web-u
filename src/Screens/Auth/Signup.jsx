import { useState } from "react"
import { Form } from "./components/Form/Form"
import { signupEP } from "./services/auth"
import { useNavigate } from "react-router-dom"
import { BackIcon } from "./components/BackIcon/BackIcon"
import { AdminForm } from "./components/Form/AdminForm"
import { UserForm } from "./components/Form/UserForm"
import { useUser } from "../../store/useUser"
import { createAssessment } from "./services/getCaptcha"

export const Signup = () => {
	const navigate = useNavigate();

	const [name, setName] = useState()
	const [email, setEmail] = useState()
	const [password, setPassword] = useState()
  const [isSubmited, setIsSubmited] = useState(false)
  const [userType, setUserType] = useState('')

  const set_user = useUser(state => state.set_user)
  const user = useUser(state => state.user)
	const handleSubmit = async () => {

		const userFB = await signupEP(email, password)
    // set_user({
    //  ...user
    //  email: userFB.email,
    //  uid: userFB.uid
    // })
    setIsSubmited(true)
		// navigate('/')
		console.log({ user })
    const res = await createAssessment()
    console.log({res})
	}

	const fields = [
		{
			type: 'text',
			value: name,
			set: setName,
			label: 'Nombre',
			placeHolder: 'Ingresa tu nombre'
		},
		{
			type: 'email',
			value: email,
			set: setEmail,
			label: 'Correo',
			placeHolder: 'Ingresa tu correo'
		},
		{
			type: 'password',
			value: password,
			set: setPassword,
			label: 'Contraseña',
			placeHolder: 'Ingresa tu contraseña'
		},
	]

  console.log(userType)

	return (
		<div className="flex justify-center min-h-screen bg-fourth sm:items-center xl:bg-third ">
      {
        (!isSubmited) &&
          <>
            <BackIcon w={60} h={60} c='#F6F1EE' />
            <div className="flex justify-center px-2 bg-fourth py-4 sm:items-center sm:px-16 xl:max-w-6xl xl:rounded-lg xl:gap-10 xl:py-16 xl:px-16 2xl:max-w-7xl 2xl:rounded-xl ">
              <section className="flex flex-col gap-3 sm:gap-5 xl:w-[50%] xl:gap-7">
                <svg className="w-16 h-16" fill="#000000" viewBox="0 0 24 24" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M22.942,6.837,20.76,4.654l.947-.947a1,1,0,1,0-1.414-1.414l-.947.947L17.163,1.058a3.7,3.7,0,0,0-5.105,0,3.609,3.609,0,0,0,0,5.106L14.24,8.346,8.346,14.24,6.163,12.058a3.7,3.7,0,0,0-5.105,0,3.609,3.609,0,0,0,0,5.106L3.24,19.346l-.947.947a1,1,0,1,0,1.414,1.414l.947-.947,2.183,2.182a3.609,3.609,0,0,0,5.105,0h0a3.608,3.608,0,0,0,0-5.105L9.76,15.655l5.9-5.895,2.182,2.182a3.609,3.609,0,0,0,5.105,0h0a3.608,3.608,0,0,0,0-5.105ZM11,20.39a1.6,1.6,0,0,1-.472,1.138,1.647,1.647,0,0,1-2.277,0L2.472,15.749a1.61,1.61,0,1,1,2.277-2.277l5.779,5.779A1.6,1.6,0,0,1,11,20.39Zm10.528-9.862a1.647,1.647,0,0,1-2.277,0L13.472,4.749a1.61,1.61,0,1,1,2.277-2.277l5.779,5.779a1.609,1.609,0,0,1,0,2.277Z"></path></g></svg>
                <h1 className='text-3xl font-extrabold sm:text-4xl xl:text-5xl'>Bienvenido de nuevo a gymbros!</h1>
                <p className='text-lg font-bold sm:text-xl xl:text-2xl'>Ingresa tu correo y contraseña</p>
                <Form fields={fields} op='signup' handleSubmit={handleSubmit} />
              </section>
              <section className="hidden xl:flex">
                <img src="https://static.vecteezy.com/system/resources/previews/005/283/009/original/workout-at-gym-concept-in-flat-cartoon-design-man-doing-exercises-with-dumbbells-in-sports-club-doing-weightlifting-and-strength-training-at-gym-illustration-with-people-scene-background-vector.jpg" alt=""
                  className="xl:w-[600px] 2xl:w-[700px] shadow-xl"
                />
              </section>
            </div>
          </>
      }
      <div className='flex flex-col p-[50px]'>

      {
        (isSubmited) &&
          <div className='bg-white w-fit py-[15px] px-[20px]'>
            <label>Como deseas registrarte?</label>
            <div className='flex flex-row'>
              <input
                className="form-radio text-blue-600 h-5 w-5"
                onChange={(e) => setUserType(e.target.value)}
                type="radio"
                value='user'
                id="user"
                name="userType"
              />
              <label for='user'>Usuario</label>
              <input
                className="form-radio text-blue-600 h-5 w-5"
                onChange={(e) => setUserType(e.target.value)}
                type="radio"
                value='gym'
                id="gym"
                name="userType"
              />
              <label for='gym'>Gimnasio</label>
            </div>
          </div>
      }
      {
        (userType == 'gym') &&
          <AdminForm name={name} email={email}/>
      }
      {
        (userType == 'user') &&
          <UserForm name={name} email={email}/>
      }
      </div>
		</div>
	)
}
