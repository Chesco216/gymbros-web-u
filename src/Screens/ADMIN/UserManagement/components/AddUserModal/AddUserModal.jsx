import { useEffect, useState } from 'react';


import styles from './AddUserModal.module.css';
import { useUser } from '../../../../../store/useUser';
import { collection, doc, getDoc, query, setDoc, where } from 'firebase/firestore';
import { auth, db } from '../../../../../firebase/firebasse';
import { createUserWithEmailAndPassword } from 'firebase/auth';


import { Toaster, toast } from 'sonner'

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

export const AddUserModal = ({ isOpen, setIsOpen, userInfo = info, mod }) => {

	const [user, setUser] = useState(userInfo)
	const [password, setPassword] = useState('')

	useEffect(() => {
		if (isOpen) {
			document.body.classList.add('no-scroll');
		} else {
			document.body.classList.remove('no-scroll');
		}

		return () => {
			document.body.classList.remove('no-scroll');
		};
	}, [isOpen]);

	const handleSubmit = (e) => {
		e.preventDefault()
		if (mod == 'Actualizar') {
			handleUpdateAddUser()
			toast.success("Usuario actualizado correctamente", {
			})

		}
		else if (mod == 'Crear') {
			handleCreateUser()
			toast.success("Usuario creado correctamente", {
			})
		}



	}

	const handleUpdateAddUser = async () => {
		console.log({ user })
		try {
			const userDoc = await getDoc(doc(db, 'user', user.uid))
			const userFB = userDoc.data()
			const res = await setDoc(doc(db, 'user', userFB.uid), {
				...userFB,
				name: user.name,
				age: user.age,
				weight: user.weight,
				height: user.height,
				phone: user.phone
			})

			setIsOpen(false);
		}
		catch (e) {
			console.log(e);
		}


	};

	const handleCreateUser = async () => {
		try {
			const res = await createUserWithEmailAndPassword(auth, user.email, password)
			const userUID = res.user.uid
			console.log('user created')
			console.log({ user })
			const date = new Date()
			const userFB = {
				...user,
				expires_at: date,
				isActive: true,
				uid: userUID,
				id_rol: 1
			}
			await setDoc(doc(db, 'user', userUID), userFB)

			setIsOpen(false);

		} catch (e) {
			console.log(e);
		}
	}

	const handleCancelModal = () => {
		console.log('modal canceled');
		setUser(userInfo)
		setIsOpen(false);

	};

	if (!isOpen) return null;

	return (
		<div className="relative z-10" aria-labelledby="cu-users" role="dialog" aria-modal="true">
			<div className="fixed inset-0 bg-black/50 bg-opacity-90 transition-opacity" aria-hidden="true"></div>

			<div id="cu-users" className="fixed inset-0 z-10 w-screen">
				<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
					<div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
						<div className="bg-white px-4 pb-5 pt-6 sm:p-7 sm:pb-6">
							<h3 className="slide-in text-xl font-semibold leading-6 text-gray-900" id="modal-title">{mod} usuario</h3>
							<p className="slide-in text-md text-gray-500 my-3">
								Estás a punto de <strong className="underline">{mod}</strong> un usuario. Ingresa los campos correspondientes para dicha acción.
							</p>

							<form
								id='myform'
								onSubmit={(e) => handleSubmit(e)}
								className="flex flex-col justify-center px-auto gap-1">
								<label className="slide-in text-md text-gray-900">Nombre:</label>
								<input
									type='text'
									name='name'
									value={user.name}
									onChange={(e) => setUser({ ...user, name: e.target.value })}
									placeholder='Nombre'
									className="border border-gray-300 px-4 py-3 rounded-md w-full fade-in"
									required
								/>
								{
									(mod == 'Crear') &&
									<>
										<label className="slide-in text-md text-gray-900">Carnet de Identidad:</label>
										<input
											type='number'
											name='ci'
											value={user.ci}
											onChange={(e) => setUser({ ...user, ci: e.target.value })}
											placeholder='Carnet de identidad'
											className="border border-gray-300 px-4 py-3 rounded-md w-full fade-in"
											required
										/>
									</>
								}
								{
									(mod == 'Crear') &&
									<>
										<label className="slide-in text-md text-gray-900">Correo electronico:</label>
										<input
											type='text'
											name='email'
											value={user.email}
											onChange={(e) => setUser({ ...user, email: e.target.value })}
											placeholder='Correo electronico'
											className="border border-gray-300 px-4 py-3 rounded-md w-full fade-in"
											required
										/>
									</>
								}
								{

									(mod == 'Crear') &&
									<>
										<label className="slide-in text-md text-gray-900">Contraseña:</label>
										<input
											type='password'
											name='password'
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											placeholder='Contraseña'
											className="border border-gray-300 px-4 py-3 rounded-md w-full fade-in"
											required
										/>
									</>
								}
								<label className="slide-in text-md text-gray-900">Edad:</label>
								<input
									type='number'
									name='age'
									value={user.age}
									onChange={(e) => setUser({ ...user, age: e.target.value })}
									placeholder='Edad'
									className="border border-gray-300 px-4 py-3 rounded-md w-full fade-in"
									required
								/>
								<label className="slide-in text-md text-gray-900">Peso (kg):</label>
								<input
									type='number'
									name='weight'
									value={user.weight}
									onChange={(e) => setUser({ ...user, weight: e.target.value })}
									placeholder='Peso (kg)'
									className="border border-gray-300 px-4 py-3 rounded-md w-full fade-in"
									required
								/>
								<label className="slide-in text-md text-gray-900">Altura (cm):</label>
								<input
									type='number'
									name='height'
									value={user.height}
									onChange={(e) => setUser({ ...user, height: e.target.value })}
									placeholder='Altura'
									className="border border-gray-300 px-4 py-3 rounded-md w-full fade-in"
									required
								/>
								<label className="slide-in text-md text-gray-900">Telefono:</label>
								<input
									type='number'
									name='phone'
									value={user.phone}
									onChange={(e) => setUser({ ...user, phone: e.target.value })}
									placeholder='Telefono'
									className="border border-gray-300 px-4 py-3 rounded-md w-full fade-in"
									required
								/>
								{/*TODO: add fields for start and expiration date*/}
							</form>
						</div>
						<div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-2">
							<button
								data-modal-hide="cu-users"
								type="button"
								className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-md font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto fade-in"
								onClick={handleCancelModal}
							>
								Cancelar
							</button>
							<button
								form="myform"
								type="submit"
								className="inline-flex w-full justify-center rounded-md bg-primary px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-primary/90 sm:ml-3 sm:w-auto fade-in"
							>
								{mod} usuario
							</button>
						</div>
					</div>
				</div>
			</div>
			<Toaster />
		</div>
	);
};

