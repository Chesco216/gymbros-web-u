import React, { useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytes }  from 'firebase/storage'
import { db, store } from '../../../../../firebase/firebasse'
import { addDoc, collection } from 'firebase/firestore'

export const PostForm = () => {

  const [title, setTitle] = useState()
  const [desc, setDesc] = useState()
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

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      const picUrl = await uploadPostImage(e)
      await addDoc(collection(db, 'posts'), {
        id_gym: 1,
        description: desc,
        title: title,
        img: picUrl,
        is_Active: true
      })
      console.log('post uploaded')
    } catch (error) {
      alert(error.code)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <span>
        <label>Titulo de la publicacion</label>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </span>
      <span>
        <label>Descripcion</label>
        <input
          type='text'
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </span>
      <span>
        <label>Foto</label>
        <input
          type='file'
          name='pic'
          // onChange={(e) => setFile(e.target.files[0])}
        />
      </span>
      <button type='submit'>Subir</button>
    </form>
  )
}

