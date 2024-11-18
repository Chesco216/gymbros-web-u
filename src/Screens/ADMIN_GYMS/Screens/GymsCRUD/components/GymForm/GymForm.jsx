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

  const titles = 'text-[25px] font-bold my-[20px]'
  const subtitles = 'text-[18px] font-semibold'
  const inputs = 'border border-gray-300 px-4 py-3 rounded-md w-full fade-in my-[15px]'
  // WARN: Perdon trini esto va a estar feito de estilizar
  return (
    <form 
      className='flex flex-col w-[800px]'
      onSubmit={(e) => handleSubmit(e)}>
      <span className='flex flex-col'>
        <label className={titles}>Con que maquinas cuenta?</label>
        <label className={subtitles}>Brazos</label>
        <input
          className={inputs}
          placeholder='ej: maquina 1, maquina 2, maquina 3'
          name='arms'
          onChange={(e) => setEquipementOnChange(e, 'arms')}
        />
        <label className={subtitles}>Espalda</label>
        <input
          className={inputs}
          placeholder='ej: maquina 1, maquina 2, maquina 3'
          name='back'
          onChange={(e) => setEquipementOnChange(e, 'back')}
        />
        <label className={subtitles}>Pecho</label>
        <input
          className={inputs}
          placeholder='ej: maquina 1, maquina 2, maquina 3'
          name='chest'
          onChange={(e) => setEquipementOnChange(e, 'chest')}
        />
        <label className={subtitles}>Piernas</label>
        <input
          className={inputs}
          placeholder='ej: maquina 1, maquina 2, maquina 3'
          name='legs'
          onChange={(e) => setEquipementOnChange(e, 'legs')}
        />
        <label className={subtitles}>Mancuernas</label>
        <input
          className={inputs}
          placeholder='ej: 2kg - 60kg'
          name='dumbells'
          onChange={(e) => setEquipementOnChange(e, 'dumbells')}
        />
      </span>
      <span>
        <label className={titles}>Que servicios ofrece?</label>
        <input
          className={inputs}
          placeholder='ej: servicio 1, servicio 2, servicio 3'
          name='services'
          onChange={(e) => setServices(e.target.value.split(','))}
        />
      </span>
      <span>
        <label className={titles}>Agrega imagenes</label>
        <input 
          className="my-[15px] block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" 
          type="file"
          name='images'
          multiple 
          onChange={(e) => setImages(e.target.files)}
        />
      </span>
      <span>
        <label className={titles}>Agrega la ubicacion</label>
        <input
          className={inputs}
          placeholder='coordenadas'
          name='chords'
          onChange={(e) => setLocation({
            ...location,
            chords: e.target.value
          })}
        />
        <input
          className={inputs}
          placeholder='ubicacion'
          name='locationText'
          onChange={(e) => setLocation({
            ...location,
            text: e.target.value
          })}
        />
      </span>
      <span>
        <label className={titles}>Agrega la informacion basica del gimnasio</label>
        <input
          className={inputs}
          placeholder='Nombre del gimnaiso'
          name='gymName'
          onChange={(e) => setBasicInfo({
            ...basicInfo,
            name: e.target.value
          })}
        />
        <input
          className={inputs}
          placeholder='Numero de telefono'
          name='phone'
          onChange={(e) => setBasicInfo({
            ...basicInfo,
            phone_number: e.target.value
          })}
        />
        <input
          className={inputs}
          placeholder='Horarios'
          name='schedule'
          onChange={(e) => setBasicInfo({
            ...basicInfo,
            schedule: e.target.value
          })}
        />
        <input
          className={inputs}
          placeholder='Calificacion'
          name='stars'
          onChange={(e) => setBasicInfo({
            ...basicInfo,
            stars: e.target.value
          })}
        />
        <input
          className={inputs}
          placeholder='Precio de la suscripcion'
          name='price'
          onChange={(e) => setBasicInfo({
            ...basicInfo,
            suscription_price: e.target.value
          })}
        />
      </span>
      <span>
        <label className={titles}>Agregue la informacion de su entrenador</label>
        <input
          className={inputs}
          placeholder='Nombre'
          name='trainerName'
          onChange={(e) => setTrainers({
            ...trainers,
            name: e.target.value
          })}
        />
        <input
          className={inputs}
          placeholder='Horario'
          name='trainerSchedule'
          onChange={(e) => setTrainers({
            ...trainers,
            schedule: e.target.value
          })}
        />
        <input
          className={inputs}
          placeholder='Actividades'
          name='trainerActivity'
          onChange={(e) => setTrainers({
            ...trainers,
            activity: e.target.value
          })}
        />
      </span>
      <button 
        className='focus:outline-none text-white bg-yellow-400 hover:bg-primary focus:ring-4 focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-primary'
        type='submit'>Aceptar</button>
    </form>
  )
}
