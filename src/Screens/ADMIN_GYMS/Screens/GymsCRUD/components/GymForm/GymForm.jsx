import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import React, { useState } from 'react'
import { store } from '../../../../../../firebase/firebasse'

//NOTE: only for superuser rol pipipi

export const GymForm = () => {

  const [equipement, setEquipement] = useState({
    arms: [],
    back: [],
    chest: [],
    dumbells: [],
    legs: []
  })
  const [services, setServices] = useState()
  const [images, setImages] = useState([])
  const [location, setLocation] = useState()
  const [basicInfo, setBasicInfo] = useState()
  const [trainers, setTrainers] = useState()


  const setEquipementOnChange = (e, cat) => {
    const valueRaw = e.target.value
    const value = valueRaw.split(',');
    switch (cat) {
      case 'arms':
        setEquipement({
          arms: equipement.arms.push(value),
          back: equipement.back,
          chest: equipement.chest,
          dumbells: equipement.dumbells,
          legs: equipement.legs
        })
        break;
      case 'back':
        setEquipement({
          arms: equipement.arms,
          back: equipement.back.push(value),
          chest: equipement.chest,
          dumbells: equipement.dumbells,
          legs: equipement.legs
        })
        break;
      case 'chest':
        setEquipement({
          arms: equipement.arms,
          back: equipement.back,
          chest: equipement.chest.push(value),
          dumbells: equipement.dumbells,
          legs: equipement.legs
        })
        break;
      case 'dumbells':
        setEquipement({
          arms: equipement.arms,
          back: equipement.back,
          chest: equipement.chest,
          dumbells: equipement.dumbells.push(valueRaw),
          legs: equipement.legs
        })
        break;
      case 'legs':
        setEquipement({
          arms: equipement.arms,
          back: equipement.back,
          chest: equipement.chest,
          dumbells: equipement.dumbells,
          legs: equipement.legs.push(value)
        })
        break;

      default:
        break;
    }
  }

  const uploadImages = async () => {
    console.log('upload images')
    const imagesToUpload = []
    if (!images) return
    console.log(images)
    for (let i = 0; i < images.length; i++) {
      const refImg = ref(store, `gyms/${images[i].name}`)
      await uploadBytes(refImg, images[i]).then(console.log('imageUploaded'))
      const getRef = ref(store, `gs://gymbros-f0bab.appspot.com/gyms/${images[i].name}`)
      const downloadUrl = await getDownloadURL(getRef)
      imagesToUpload.push(downloadUrl)
    }
    console.log(imagesToUpload)
  }
  
  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log('submited')
    await uploadImages()
  }

  // WARN: Perdon trini esto va a estar feito de estilizar
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <span>
        <label>Con que maquinas cuenta?</label>
        <label>Brazos</label>
        <input
          placeholder='ej: maquina 1, maquina 2, maquina 3'
          name='arms'
          onChange={(e) => setEquipementOnChange(e, 'arms')}
        />
        <label>Espalda</label>
        <input
          placeholder='ej: maquina 1, maquina 2, maquina 3'
          name='back'
          onChange={(e) => setEquipementOnChange(e, 'back')}
        />
        <label>Pecho</label>
        <input
          placeholder='ej: maquina 1, maquina 2, maquina 3'
          name='chest'
          onChange={(e) => setEquipementOnChange(e, 'chest')}
        />
        <label>Piernas</label>
        <input
          placeholder='ej: maquina 1, maquina 2, maquina 3'
          name='legs'
          onChange={(e) => setEquipementOnChange(e, 'legs')}
        />
        <label>Mancuernas</label>
        <input
          placeholder='ej: 2kg - 60kg'
          name='dumbells'
          onChange={(e) => setEquipementOnChange(e, 'dumbells')}
        />
      </span>
      <span>
        <label>Que servicios ofrece?</label>
        <input
          placeholder='ej: servicio 1, servicio 2, servicio 3'
          name='legs'
          onChange={(e) => setServices(e)}
        />
      </span>
      <span>
        <label>Agrega imagenes</label>
        <input
          type='file'
          name='images'
          multiple 
          onChange={(e) => setImages(e.target.files)}
        />
      </span>
      <button type='submit'>Aceptar</button>
    </form>
  )
}
