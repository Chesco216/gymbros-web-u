import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import React, { useState } from 'react'
import { db, store } from '../../../../../../firebase/firebasse'
import { addDoc, collection, setDoc } from 'firebase/firestore'

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
  const [location, setLocation] = useState({
    chords: '',
    text: ''
  })
  const [basicInfo, setBasicInfo] = useState({
    name: '',
    phone_number: '',
    reviews: 0,
    schedule: '',
    stars: 0,
    suscription_price: 0
  })
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
    console.log({location})
    const gymToUpload = {
      equipement,
      services,
      images,
      location,
      ...basicInfo,
      trainers
    }
    try {
      const gymDoc = await addDoc(collection(db, 'gym'), gymToUpload)
      console.log({message: 'gym added', gym: gymDoc})
    } catch (error) {
      alert(error.code)
    }
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
          name='services'
          onChange={(e) => setServices(e.target.value.split(','))}
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
      <span>
        <label>Agrega la ubicacion</label>
        <input
          placeholder='coordenadas'
          name='chords'
          onChange={(e) => setLocation({
            ...location,
            chords: e.target.value
          })}
        />
        <input
          placeholder='ubicacion'
          name='locationText'
          onChange={(e) => setLocation({
            ...location,
            text: e.target.value
          })}
        />
      </span>
      <span>
        <label>Agrega la informacion basica del gimnasio</label>
        <input
          placeholder='Nombre del gimnaiso'
          name='gymName'
          onChange={(e) => setBasicInfo({
            ...basicInfo,
            name: e.target.value
          })}
        />
        <input
          placeholder='Numero de telefono'
          name='phone'
          onChange={(e) => setBasicInfo({
            ...basicInfo,
            phone_number: e.target.value
          })}
        />
        <input
          placeholder='Horarios'
          name='schedule'
          onChange={(e) => setBasicInfo({
            ...basicInfo,
            schedule: e.target.value
          })}
        />
        <input
          placeholder='Calificacion'
          name='stars'
          onChange={(e) => setBasicInfo({
            ...basicInfo,
            stars: e.target.value
          })}
        />
        <input
          placeholder='Precio de la suscripcion'
          name='price'
          onChange={(e) => setBasicInfo({
            ...basicInfo,
            suscription_price: e.target.value
          })}
        />
      </span>
      <span>
        <label>Agregue la informacion de su entrenador</label>
        <input
          placeholder='Nombre'
          name='trainerName'
          onChange={(e) => setTrainers({
            ...trainers,
            name: e.target.value
          })}
        />
        <input
          placeholder='Horario'
          name='trainerSchedule'
          onChange={(e) => setTrainers({
            ...trainers,
            schedule: e.target.value
          })}
        />
        <input
          placeholder='Actividades'
          name='trainerActivity'
          onChange={(e) => setTrainers({
            ...trainers,
            activity: e.target.value
          })}
        />
      </span>
      <button type='submit'>Aceptar</button>
    </form>
  )
}
