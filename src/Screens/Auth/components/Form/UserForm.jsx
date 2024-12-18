import React, { useState } from 'react'
import { Toaster, toast } from 'sonner'
import { useUser } from '../../../../store/useUser'
import { addDoc, doc, collection, setDoc } from 'firebase/firestore'
import { db } from '../../../../firebase/firebasse.js'
import { useNavigate } from 'react-router-dom'
import { BackIcon } from '../BackIcon/BackIcon.jsx'

const info = {
	name: '',
	ci: '',
	email: '',
	age: '',
	height: '',
	weight: '',
	uid: '',
	phone: '',
	isActive: '',
	id_rol: '',
	expires_at: ''
}

export const UserForm = ({ name, email }) => {

	const user = useUser(state => state.user)
	const set_user = useUser(state => state.set_user)

	const [userInfo, setUserInfo] = useState(info)

	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const date = new Date()
			// const res = await addDoc(collection(db, 'user'), {
			//   ...userInfo,
			//   name: name,
			//   email: email,
			//   isActive: false,
			//   id_rol: 1,
			//   expires_at: date
			// })
			const lc = localStorage.getItem('user')
			const id = lc.replaceAll('"', '');
			await setDoc(doc(db, 'user', id), {
				...userInfo,
				name: name,
				email: email,
				isActive: false,
				id_rol: 1,
				expires_at: date,
				uid: id
			})
			toast.success('Inicio de sesion completado', {
				duration: 2500,
			})
			navigate('/')
		} catch (error) {
			alert(error)
		}
	}

	const fields = 'flex flex-col'
	const titles = 'text-[25px] font-bold my-[20px]'
	const subtitles = 'text-[18px] font-semibold'
	const inputs = 'border border-gray-300 px-4 py-3 rounded-md w-full fade-in'

	return (
		<>
			<BackIcon w={60} h={60} c='#F6F1EE' />
			<form
				className="flex flex-col gap-3 xl:text-lg py-[50px]"
				onSubmit={handleSubmit}>
				<h1 className="font-bold text-3xl">Llena tu informacion por favor </h1>
				<label className={subtitles}>Numero de documento</label>
				<input
					className={inputs}
					type='text'
					name='ci'
					value={userInfo.ci}
					placeholder='Numero de documento'
					onChange={(e) => setUserInfo({
						...userInfo,
						ci: e.target.value
					})}
				/>
				<label className={subtitles}>Edad</label>
				<input
					className={inputs}
					type='number'
					name='age'
					value={userInfo.age}
					placeholder='Edad'
					onChange={(e) => setUserInfo({
						...userInfo,
						age: e.target.value
					})}
				/>
				<label className={subtitles}>Peso (kg)</label>
				<input
					className={inputs}
					type='number'
					name='weight'
					value={userInfo.weight}
					placeholder='Peso'
					onChange={(e) => setUserInfo({
						...userInfo,
						weight: e.target.value
					})}
				/>
				<label className={subtitles}>Altura (cm)</label>
				<input
					className={inputs}
					type='number'
					name='height'
					value={userInfo.height}
					placeholder='Altura'
					onChange={(e) => setUserInfo({
						...userInfo,
						height: e.target.value
					})}
				/>
				<label className={subtitles}>Telefono</label>
				<input
					className={inputs}
					type='tel'
					name='phone'
					value={userInfo.phone}
					placeholder='Telefono'
					onChange={(e) => setUserInfo({
						...userInfo,
						phone: e.target.value
					})}
				/>
				<button
					className='flex flex-col justify-center items-center col-span-2 gap-6 px-8 py-3 rounded-md text-white font-semibold bg-primary mt-4 hover:bg-primary/90 shadow-lg shadow-black/10'
					type='submit'
				>
					Aceptar
				</button>
			</form>
			<Toaster />
		</>
	)
}

