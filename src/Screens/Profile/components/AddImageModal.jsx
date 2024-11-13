import React, { useState, useEffect } from 'react'
import { useUser } from '../../../store/useUser'
import { setDoc, doc } from 'firebase/firestore'
import { db, store } from '../../../firebase/firebasse.js'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

import { Toaster, toast } from 'sonner'

export const AddImageModal = ({ isOpen, setIsOpen }) => {
	const user = useUser(state => state.user)
	const setUser = useUser(state => state.set_user)

	const [img, setImg] = useState(null)
	const [file, setFile] = useState(null)
	const [isUploading, setIsUploading] = useState(false)

	useEffect(() => {
		if (isOpen) {
			document.body.classList.add('overflow-hidden')
		} else {
			document.body.classList.remove('overflow-hidden')
		}

		return () => {
			document.body.classList.remove('overflow-hidden')
		}
	}, [isOpen])

	const handleInputImage = (e) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0]
			setFile(file)
			setImg(URL.createObjectURL(file))
		}
	}

	const uploadImage = async () => {
		if (!file) return null
		const imgRef = ref(store, `user/${user.uid}/${file.name}`)
		await uploadBytes(imgRef, file)
		return getDownloadURL(imgRef)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setIsUploading(true)
		try {
			const imageUrl = await uploadImage();
			if (imageUrl) {
				setUser({
					...user,
					profile_photo: imageUrl,
				})
				toast.success("Imagen subida correctamente")

				setIsOpen(false)

			}
      await setDoc(doc(db, 'user', user.uid), {
        ...user,
        profile_photo: imageUrl
      })
		} catch (error) {
			console.error('Error uploading image:', error)
			alert('Failed to update profile photo')
		} finally {
			setIsUploading(false)
		}
	}

	if (!isOpen) return null

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
				<div className="p-6">
					<h2 className="text-2xl font-bold mb-4">Actualizar foto de perfil</h2>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="flex flex-col items-center space-y-4">
							{img && (
								<div className="relative w-32 h-32 rounded-full overflow-hidden">
									<img src={img} alt="Profile preview" className="w-full h-full object-cover" />
								</div>
							)}
							<label
								htmlFor="photo-upload"
								className="cursor-pointer text-primary hover:text-primary/90 transition-colors"
							>
								{img ? 'Cambiar la foto' : 'Selecciona la foto'}
							</label>
							<input
								id="photo-upload"
								type="file"
								accept=".jpg, .jpeg, .png"
								onChange={handleInputImage}
								className="hidden"
							/>
						</div>
						<div className="flex justify-end space-x-2">
							<button
								type="button"
								onClick={() => setIsOpen(false)}
								className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
							>
								Cancelar
							</button>
							<button
								type="submit"
								disabled={!img || isUploading}
								className={`px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${!img || isUploading
									? 'bg-primary cursor-not-allowed'
									: 'bg-primary hover:bg-primary/90'
									}`}
							>
								{isUploading ? 'Subiendo' : 'Subir foto'}
							</button>
						</div>
					</form>
				</div>
			</div>
			<Toaster />
		</div>
	)
}
