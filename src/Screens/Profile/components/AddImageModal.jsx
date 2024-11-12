import React, { useRef, useState } from 'react'
import { useUser } from '../../../store/useUser'
import { setDoc, doc } from 'firebase/firestore'
import { db } from '../../../firebase/firebasse.js'

export const AddImageModal = ({setIsOpen}) => {

  const user = useUser(state => state.user)
  const set_user = useUser(state => state.user)

  const [img, setImg] = useState()

  const handleInputImage = (e) => {
    console.log(e.target.files[0])
    const urlRef = e.target.files[0]
    setImg(URL.createObjectURL(urlRef))
  }

  const getImageRef = async() => {
    const imgRef = ref((store, `user/${img.name}`))
    await uploadBytes(imgRef)
    const downloadRef = ref(store, `gs://gymbros-f0bab.appspot.com/user/${user.uid}.jpg`)
    const imgUrl = getDownloadURL(downloadRef)
    return imgUrl
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    const pricUrl = await getImageRef()
    const newUserDoc = {
      ...user, 
      profile_photo: pricUrl
    }
    set_user(newUserDoc)
    await setDoc(doc(db, 'user', user.uid))
  }

  //NOTE: mi skill issue con tailwind pipipi, lo centras porfis
  return (
      <form className={`absolute bg-white flex flex-col`} onSubmit={(e) => handleSubmit(e)}>
        <p>Selecciona una imagen para tu perfil</p>
      {
        (img) && <img src={img} className='w-[80px] h-[80px]'/>
      }
        <input type='file' accept='.jpg, .jpeg, .png' onChange={(e) => handleInputImage(e)}/>
        <button type='submit'>Subir foto de perfil</button>
        <button onClick={() => setIsOpen(false)}>Cerrar</button>
      </form>
  )
}
