import React, { useState } from 'react'
import { Toaster, toast } from 'sonner'
import { useUser } from '../../../store/useUser'
import { doc, setDoc } from 'firebase/firestore'
import { db, store } from '../../../firebase/firebasse'
import { ref, uploadBytes } from 'firebase/storage'

export const UpdateForm = () => {

	const user = useUser(state => state.user)
	const set_user = useUser(state => state.set_user)
	const [img, setImg] = useState()
	const setUser = useUser(state => state.set_user)

	const [isUpdating, setIsUpdating] = useState(false);
	const [isUpdated, setIsUpdated] = useState(false);


	const handleSubmit = async (e) => {
		e.preventDefault()

		setIsUpdating(true);
		try {
			const res = await setDoc(doc(db, 'user', user.uid), user)
			toast.success("Actualizado correctamente", {
				duration: 2500,
			})
			setIsUpdating(false);
			setIsUpdated(true);

			setTimeout(() => {
				setIsUpdated(false);
			}, 3000);

		} catch (error) {
			console.log(error)

			setIsUpdating(false);

			toast.error(error.code)
		}
	}

	return (
		<form onSubmit={handleSubmit} className="fade-in">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="relative group">
					<input
						type="text"
						value={user.name}
						onChange={(e) => setUser({ ...user, name: e.target.value })}
						className="mt-3 peer w-full h-14 px-4 border-2 border-gray-300 rounded-lg outline-none transition-all duration-300 focus:border-primary bg-white/5 backdrop-blur-sm"
						placeholder=" "
					/>
					<label className="absolute left-2 top-1 px-2 transition-all duration-300 transform 
                         text-gray-500 text-sm peer-placeholder-shown:text-base
                         peer-placeholder-shown:top-3 peer-placeholder-shown:left-4
                         peer-focus:top-1 peer-focus:left-2 peer-focus:text-sm
                         peer-focus:text-primary bg-white">
						Nombre
					</label>
				</div>

				<div className="relative group">
					<input
						type="number"
						value={user.age}
						onChange={(e) => setUser({ ...user, age: e.target.value })}
						className="mt-3 peer w-full h-14 px-4 border-2 border-gray-300 rounded-lg outline-none transition-all duration-300 focus:border-primary bg-white/5 backdrop-blur-sm"
						placeholder=" "
					/>
					<label className="absolute left-2 top-1 px-2 transition-all duration-300 transform 
                         text-gray-500 text-sm peer-placeholder-shown:text-base
                         peer-placeholder-shown:top-3 peer-placeholder-shown:left-4
                         peer-focus:top-1 peer-focus:left-2 peer-focus:text-sm
                         peer-focus:text-primary bg-white">
						Edad
					</label>
				</div>

				<div className="relative group">
					<input
						type="number"
						value={user.weight}
						onChange={(e) => setUser({ ...user, weight: e.target.value })}
						className="mt-3 peer w-full h-14 px-4 border-2 border-gray-300 rounded-lg outline-none transition-all duration-300 focus:border-primary bg-white/5 backdrop-blur-sm"
						placeholder=" "
					/>
					<label className="absolute left-2 top-1 px-2 transition-all duration-300 transform 
                         text-gray-500 text-sm peer-placeholder-shown:text-base
                         peer-placeholder-shown:top-3 peer-placeholder-shown:left-4
                         peer-focus:top-1 peer-focus:left-2 peer-focus:text-sm
                         peer-focus:text-primary bg-white">
						Peso (kg)
					</label>
				</div>

				<div className="relative group">
					<input
						type="number"
						value={user.height}
						onChange={(e) => setUser({ ...user, height: e.target.value })}
						className="mt-3 peer w-full h-14 px-4 border-2 border-gray-300 rounded-lg outline-none transition-all duration-300 focus:border-primary bg-white/5 backdrop-blur-sm"
						placeholder=" "
					/>
					<label className="absolute left-2 top-1 px-2 transition-all duration-300 transform 
                         text-gray-500 text-sm peer-placeholder-shown:text-base
                         peer-placeholder-shown:top-3 peer-placeholder-shown:left-4
                         peer-focus:top-1 peer-focus:left-2 peer-focus:text-sm
                         peer-focus:text-primary bg-white">
						Altura (cm)
					</label>
				</div>

				<div className="relative group col-span-full">
					<input
						type="tel"
						value={user.phone}
						onChange={(e) => setUser({ ...user, phone: e.target.value })}
						className="mt-3 peer w-full h-14 px-4 border-2 border-gray-300 rounded-lg outline-none transition-all duration-300 focus:border-primary bg-white/5 backdrop-blur-sm"
						placeholder=" "
					/>
					<label className="absolute left-2 top-1 px-2 transition-all duration-300 transform 
                         text-gray-500 text-sm peer-placeholder-shown:text-base
                         peer-placeholder-shown:top-3 peer-placeholder-shown:left-4
                         peer-focus:top-1 peer-focus:left-2 peer-focus:text-sm
                         peer-focus:text-primary bg-white">
						Teléfono
					</label>
				</div>
			</div>

			<div className="inline-flex w-full justify-center">
				<button
					type="submit"
					className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-primary px-8 py-3 font-medium text-white transition duration-300 ease-out w-full hover:bg-primary/90 my-4"
				>
					<span
						className={`absolute inset-0 flex h-full w-full items-center justify-center translate-x-full group-hover:translate-x-0 duration-300 ${isUpdating ? 'animate-spin' : 'animate-pulse'
							} ${isUpdated ? 'text-green-500' : 'text-white'}`}
					>
						{isUpdated ? (
							<svg
								className="h-6 w-6"
								fill="none"
								stroke="white"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
							</svg>
						) : (
							<svg
								className="h-6 w-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
							</svg>
						)}
					</span>
					<span className="absolute flex h-full w-full transform items-center justify-center text-white transition-all duration-300 group-hover:translate-x-full">
						{isUpdated ? 'Perfil Actualizado' : 'Actualizar Perfil'}
					</span>
					<span className="invisible relative">{isUpdated ? 'Perfil Actualizado' : 'Actualizar Perfil'}</span>
				</button>
			</div>
			<Toaster />
		</form>
	)
}
