import React, { useRef, useState } from 'react'
import { useUser } from '../../../store/useUser'

export const AddImageModal = ({setIsOpen}) => {

  const user = useUser(state => state.user)

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

  //NOTE: mi skill issue con tailwind pipipi, lo centras porfis
  return (
      <form className={`absolute bg-white flex flex-col`}>
        <p>Selecciona una imagen para tu perfil</p>
      {
        (img) && <img src={img} className='w-[80px] h-[80px]'/>
      }
        <input type='file' accept='.jpg, .jpeg, .png' onChange={(e) => handleInputImage(e)}/>
        <button>Subir foto de perfil</button>
        <button onClick={() => setIsOpen(false)}>Cerrar</button>
      </form>
  )
}
