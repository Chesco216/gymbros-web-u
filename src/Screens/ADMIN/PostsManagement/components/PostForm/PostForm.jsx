import React, { useState } from 'react'
import { Toaster, toast } from 'sonner'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { db, store } from '../../../../../firebase/firebasse'
import { addDoc, collection, updateDoc } from 'firebase/firestore'
import { useUser } from '../../../../../store/useUser'

export const PostForm = ({updatePosts}) => {

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
      updatePosts()
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
        className='text-[18px] text-white rounded-lg mt-[20px] py-[10px] font-semibold bg-primary'
        type='submit'
      >
          Subir
      </button>
		</form>
      <Toaster/>
    </div>
	)
}

