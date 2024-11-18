import React, { useState } from 'react'
import { Toaster, toast } from 'sonner'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { db, store } from '../../../../../firebase/firebasse'
import { addDoc, collection } from 'firebase/firestore'
import { useUser } from '../../../../../store/useUser'

export const PostForm = () => {

	const [title, setTitle] = useState()
	const [desc, setDesc] = useState()
  const user = useUser(state => state.user)
	// const [file, setFile] = useState()
	// console.log(file)

	const uploadPostImage = async (e) => {
		try {
			const file = e.target.pic.files[0]
			const setImgRef = ref(store, `posts/${file.name}`)
			await uploadBytes(setImgRef, file)
			const getImgRef = ref(store, `gs://gymbros-f0bab.appspot.com/posts/${file.name}`)
			const downloadUrl = getDownloadURL(getImgRef)
			return downloadUrl
		} catch (error) {
			alert(error.code)
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const picUrl = await uploadPostImage(e)
			await addDoc(collection(db, 'posts'), {
				id_gym: user.id_gym,
				description: desc,
				title: title,
				img: picUrl,
				is_Active: true
			})
			console.log('post uploaded')
      toast.success('Publicacion subida correctamente', {
        duration: 2500,
      })
      setTitle('')
      setDesc('')
		} catch (error) {
			alert(error.code)
		}
	}

  const fields = 'flex flex-col'
  const titles = 'text-[25px] font-bold my-[20px]'
  const subtitles = 'text-[18px] font-semibold'
  const inputs = 'border border-gray-300 px-4 py-3 rounded-md w-full fade-in my-[15px]'

	return (
    <div className='flex flex-col my-[50px]'>
    <h2 className='font-semibold text-[25px]'>Sube una publicacion nueva</h2>
		<form
      className='mt-[30px] flex flex-col border-2 border-black rounded-lg p-[25px]'
      onSubmit={handleSubmit}>
			<span
        className={fields}
      >
				<label className={subtitles}>Titulo de la publicacion</label>
				<input
          className={inputs}
					type='text'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</span>
			<span
        className={fields}
      >
				<label className={subtitles}>Descripcion</label>
				<input
          className={inputs}
					type='text'
					value={desc}
					onChange={(e) => setDesc(e.target.value)}
				/>
			</span>
			<span
        className={fields}
      >
				<label className={subtitles}>Foto</label>
				<input
					type='file'
					name='pic'
				// onChange={(e) => setFile(e.target.files[0])}
				/>
			</span>
			<button
          className='inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong mt-[15px]'
        type='submit'
      >
          Subir
      </button>
		</form>
      <Toaster/>
    </div>
	)
}

