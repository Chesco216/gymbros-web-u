import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"

import { signupEP } from "./services/auth"

import { useUser } from "../../store/useUser"

import { Form } from "./components/Form/Form"
import { AdminForm } from "./components/Form/AdminForm"
import { UserForm } from "./components/Form/UserForm"


import { createAssessment } from "./services/getCaptcha"

import { UserIcon } from "./icons/UserIcon"
import { GymIcon } from "./icons/GymIcon"
import { BackIcon } from "./components/BackIcon/BackIcon"


const roles = [
	{
		id: 'user',
		title: 'Usuario',
		icon: <UserIcon />
	},
	{
		id: 'gym',
		title: 'Gimnasio',
		icon: <GymIcon />
	},
]

export const Signup = () => {
	const navigate = useNavigate();

	const [name, setName] = useState()
	const [email, setEmail] = useState()
	const [password, setPassword] = useState()
	const [isSubmited, setIsSubmited] = useState(false)
	// user type
	const [selectUserType, setSelectUserType] = useState(true);
	const [userType, setUserType] = useState('')

	const [selectedRole, setSelectedRole] = useState('')

	const set_user = useUser(state => state.set_user)
	const user = useUser(state => state.user)
	const handleSubmit = async () => {

		const userFB = await signupEP(email, password)
		set_user({
			...user,
			email: userFB.email,
			uid: userFB.uid
		})
		setIsSubmited(true)
		// navigate('/')
		const res = await createAssessment()
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


	return (
		<div className="flex justify-center min-h-screen bg-fourth sm:items-center xl:bg-third ">
			{
				(!isSubmited) &&
				<>
					<BackIcon w={60} h={60} c='#F6F1EE' />
					<div className="flex justify-center px-20 py-10 bg-fourth  sm:items-center xl:max-w-6xl xl:rounded-lg xl:gap-10 2xl:max-w-7xl 2xl:rounded-xl ">
						<section className="flex flex-col gap-3 sm:gap-5 xl:w-[50%] xl:gap-7">
							<NavLink to="/">
								<svg className="w-16 h-16 slide-in-reverse" fill="#000000" viewBox="0 0 24 24" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M22.942,6.837,20.76,4.654l.947-.947a1,1,0,1,0-1.414-1.414l-.947.947L17.163,1.058a3.7,3.7,0,0,0-5.105,0,3.609,3.609,0,0,0,0,5.106L14.24,8.346,8.346,14.24,6.163,12.058a3.7,3.7,0,0,0-5.105,0,3.609,3.609,0,0,0,0,5.106L3.24,19.346l-.947.947a1,1,0,1,0,1.414,1.414l.947-.947,2.183,2.182a3.609,3.609,0,0,0,5.105,0h0a3.608,3.608,0,0,0,0-5.105L9.76,15.655l5.9-5.895,2.182,2.182a3.609,3.609,0,0,0,5.105,0h0a3.608,3.608,0,0,0,0-5.105ZM11,20.39a1.6,1.6,0,0,1-.472,1.138,1.647,1.647,0,0,1-2.277,0L2.472,15.749a1.61,1.61,0,1,1,2.277-2.277l5.779,5.779A1.6,1.6,0,0,1,11,20.39Zm10.528-9.862a1.647,1.647,0,0,1-2.277,0L13.472,4.749a1.61,1.61,0,1,1,2.277-2.277l5.779,5.779a1.609,1.609,0,0,1,0,2.277Z"></path></g></svg>
							</NavLink>
							<h1 className='text-3xl font-extrabold sm:text-4xl xl:text-5xl slide-in'>Bienvenido de nuevo a gymbros!</h1>
							<p className='text-lg font-bold sm:text-xl xl:text-2xl slide-in-reverse'>Ingresa tu correo y contraseña</p>
							<Form fields={fields} op='signup' handleSubmit={handleSubmit} />
						</section>
						<section className="hidden xl:flex">
							<img src="https://static.vecteezy.com/system/resources/previews/005/283/009/original/workout-at-gym-concept-in-flat-cartoon-design-man-doing-exercises-with-dumbbells-in-sports-club-doing-weightlifting-and-strength-training-at-gym-illustration-with-people-scene-background-vector.jpg" alt=""
								className="xl:w-[600px] 2xl:w-[700px] shadow-xl fade-in"
							/>
						</section>
					</div>
				</>
			}
			<div className='my-[40px] flex flex-col px-[50px] bg-fourth rounded-xl'>

				{
					(isSubmited) && (selectUserType) &&


					<div className="max-w-4xl mx-auto px-4 py-12 w-fit">

						<BackIcon w={60} h={60} c='#F6F1EE' />
						<div className="text-center mb-8">
							<h1 className="text-2xl font-semibold mb-2">Quien eres?</h1>
							<p className="text-gray-600">Para crear una cuenta tienes que registrar como una de las opciones</p>
						</div>

						<form onSubmit={(e) => {
							e.preventDefault()
							setUserType(selectedRole);
							setSelectUserType(false);


						}} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
							{roles.map((role) => (
								<div
									key={role.id}
									className={`p-6 bg-white rounded-lg shadow-md cursor-pointer transition-all hover:shadow-lg justify-center ${selectedRole === role.id ? 'ring-2 ring-primary' : ''
										}`}
									onClick={() => setSelectedRole(role.id)}
								>
									<div className="aspect-square  mb-4">
										{
											role.icon
										}
									</div>
									<h3 className="text-center font-medium">{role.title}</h3>
								</div>
							))}

							<button
								className={`flex flex-col justify-center items-center col-span-2 gap-6 px-8 py-3 rounded-md text-white font-semibold ${selectedRole ? 'bg-primary hover:bg-primary/90' : 'bg-gray-300 cursor-not-allowed'
									}`}
								type="submit"
							>
								Siguiente
							</button>
						</form>

					</div>
				}
				{
					(userType === 'gym') &&
					<AdminForm name={name} email={email} />
				}
				{
					(userType === 'user') &&
					<UserForm name={name} email={email} />
				}
			</div>
		</div>
	)
}
