import React, { useState } from 'react'
import { useUser } from '../../../../store/useUser'
import { addDoc, doc, collection, setDoc } from 'firebase/firestore'
import { db } from '../../../../firebase/firebasse.js'
import { useNavigate } from 'react-router-dom'

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

export const UserForm = ({name, email}) => {

	const user = useUser(state => state.user)
  const set_user = useUser(state => state.set_user)
  
	const [userInfo, setUserInfo] = useState(info)

  const navigate = useNavigate()

	const handleSubmit = async(e) => {
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
      navigate('/')
    } catch (error) {
      alert(error)
    }
	}

  const fields = 'flex flex-col'
  const titles = 'text-[25px] font-bold my-[20px]'
  const subtitles = 'text-[18px] font-semibold'
  const inputs = 'border border-gray-300 px-4 py-3 rounded-md w-full fade-in my-[15px]'

	return (
		<form 
      className="flex flex-col gap-2.5 xl:gap-5 xl:text-lg"
      onSubmit={handleSubmit}>
			<label>Numero de documento</label>
			<input
				type='text'
				name='ci'
				value={userInfo.ci}
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

