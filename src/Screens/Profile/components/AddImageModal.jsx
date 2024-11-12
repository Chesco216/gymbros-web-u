import React, { useState } from 'react'

export const AddImageModal = ({setIsOpen}) => {

  const [img, setImg] = useState()
  const getImageRef = async() => {
    const imgRef = ref((store, `user/${img.name}`))
    await uploadBytes(imgRef)
    const downloadRef = ref(store, `gs://gymbros-f0bab.appspot.com/user/${img.name}`)
    const imgUrl = getDownloadURL(downloadRef)
    return imgUrl
  }

  return (
    <form>
      <p>Selecciona una imagen para tu perfil</p>
      <input type='file' accept='.jpg, .jpeg, .png' onChange={(e) => setImg(e.target.files[0])}/>
      <button>Subir foto de perfil</button>
      <button onClick={() => setIsOpen(false)}>Cerrar</button>
    </form>
  )
}

