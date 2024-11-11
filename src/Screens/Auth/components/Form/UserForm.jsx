import React, { useState } from 'react'
import { useUser } from '../../../../store/useUser'

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

export const UserForm = () => {

	const user = useUser(state => state.user)

	const [userInfo, setUserInfo] = useState(info)

	const handleSubmit = () => {

	}

	return (
		<form onSubmit={(e) => handleSubmit(e)}>
			<label>Numero de documento</label>
			<input
				type='text'
				name='name'
				value={userInfo.name}
				placeholder='ci'
				onChange={(e) => setUserInfo({
					...userInfo,
					ci: e.target.value
				})}
			/>
			<label>Edad</label>
			<input
				type='number'
				name='age'
				value={userInfo.age}
				placeholder='Edad'
				onChange={(e) => setUserInfo({
					...userInfo,
					age: e.target.value
				})}
			/>
			<label>Peso (kg)</label>
			<input
				type='number'
				name='weight'
				value={userInfo.weight}
				placeholder='Peso'
				onChange={(e) => setUserInfo({
					...userInfo,
					weight: e.target.value
				})}
			/>
			<label>Altura (cm)</label>
			<input
				type='number'
				name='height'
				value={userInfo.height}
				placeholder='Altura'
				onChange={(e) => setUserInfo({
					...userInfo,
					height: e.target.value
				})}
			/>
			<label>Peso (kg)</label>
			<input
				type='number'
				name='weight'
				value={userInfo.weight}
				placeholder=''
				onChange={(e) => setUserInfo({
					...userInfo,
					weight: e.target.value
				})}
			/>
			<label>Telefono</label>
			<input
				type='tel'
				name='phone'
				value={userInfo.phone}
				placeholder=''
				onChange={(e) => setUserInfo({
					...userInfo,
					phone: e.target.value
				})}
			/>
			<button type='submit'>Aceptar</button>
		</form>
	)
}

