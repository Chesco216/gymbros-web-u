import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db, store } from '../../../../firebase/firebasse.js'
import { addDoc, collection, setDoc } from 'firebase/firestore'
import { Toaster, toast } from 'sonner'
import { BackIcon } from '../BackIcon/BackIcon.jsx'
import { useUser } from '../../../../store/useUser.js'

export const AdminForm = ({email, name}) => {

  const navigate = useNavigate()
  const user = useUser(state => state.user)

  const [equipement, setEquipement] = useState({
    arms: '',
    back: '',
    chest: '',
    dumbells: '',
    legs: ''
  })
  const [servicesList, setServicesList] = useState([])
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
  const [trainerList, setTrainerList] = useState([])
  const [planes, setPlanes] = useState([])


  const setEquipementOnChange = (e, cat) => {
    const value = e.target.value
    // const value = valueRaw.split(',');
    switch (cat) {
      case 'arms':
        setEquipement({
          ...equipement,
          arms: value,
        })
        break;
      case 'back':
        setEquipement({
          ...equipement,
          back: value,
        })
        break;
      case 'chest':
        setEquipement({
          ...equipement,
          chest: value,
        })
        break;
      case 'dumbells':
        setEquipement({
          ...equipement,
          dumbells: value,
        })
        break;
      case 'legs':
        setEquipement({
          ...equipement,
          legs: value
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
    setImages(imagesToUpload)
  }
  
  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log('submited')
    await uploadImages()
    console.log({images})
    const equipementFormated = {
      arms: equipement.arms.split(','),
      legs: equipement.legs.split(','),
      back: equipement.back.split(','),
      chest: equipement.chest.split(','),
      dumbells: equipement.dumbells
    }
    console.log({equipementFormated})
    const gymToUpload = {
      equipementFormated,
      servicesList,
      planes,
      images,
      location,
      ...basicInfo,
      trainerList,
      extra_services: ['Calistenia', 'Spining']
    }
    try {
      const gymDoc = await addDoc(collection(db, 'gym'), gymToUpload)
      console.log({message: 'gym added', gym: gymDoc})
      const res = await addDoc(collection(db, 'user'), {
        email: email,
        name: name,
        id_rol: 2,
        id_gym: gymDoc.id,
        profle_photo: '',
        uid: user.uid,
        age: '',
        ci: '',
        height: '',
        phone: '',
        weight: ''

      })
      toast.success('Gimnasio subido correctamente', {
        duration: 2500,
      })
      navigate('/')
    } catch (error) {
      alert(error.code)
      console.error(error)
    }
  }

  // const handleSubmitTest = (e) => {
  //   e.preventDefault()
  //   console.log('test submited')
  //   console.log({servicesList})
  //   console.log({planes})
  //   console.log({trainerList})
  // }

  const titles = 'text-[25px] font-bold my-[20px]'
  const subtitles = 'text-[18px] font-semibold'
  const inputs = 'border border-gray-300 px-4 py-3 rounded-md w-full fade-in my-[15px]'

  return (
    <>
      <BackIcon w={60} h={60} c='#F6F1EE' />
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
        <span className='flex flex-col'>
          <label className={titles}>Que servicios ofrece?</label>
          
          {
            servicesList.map((item, index) => 
              <div className='flex flex-row items-center'>
                <span>
                  <input
                    onChange={(e) => {
                      servicesList[index] = {...servicesList[index], name: e.target.value}
                    }}
                    type='text'
                    className={inputs} 
                    placeholder='servicio'
                  />
                  <input 
                    onChange={(e) => {
                      servicesList[index] = {...servicesList[index], schedule: e.target.value}
                    }}    
                    type='text'
                    className={inputs} 
                    placeholder='horario'
                  />
                </span>
                <button
                  onClick={() => {
                    setServicesList([...servicesList.slice(0, index), ...servicesList.slice(index + 1)])
                  }}
                  className='bg-red-500 h-fit w-fit ml-[20px] text-white py-1.5 px-3 font-semibold rounded-lg'
                >
                  Quitar
                </button>
              </div>
            )
          }
          <label
            className='h-fit w-fit bg-primary py-1.5 px-3 font font-semibold rounded-lg text-white mb-[20px]'
            onClick={() => setServicesList([...servicesList, {name: '', schedule: ''}])}
          >
            Agregar servicio
          </label>
        </span>
        <span className='flex flex-col'>
          <label className={titles}>Que planes tiene?</label>
          
          {
            planes.map((item, index) => 
              <div className='flex flex-row items-center'>
                <span>
                  <input
                    onChange={(e) => {
                      planes[index] = {...planes[index], name: e.target.value}
                    }}
                    type='text'
                    className={inputs} 
                    placeholder='servicio'
                  />
                  <input 
                    onChange={(e) => {
                      planes[index] = {...planes[index], price: e.target.value}
                    }}    
                    type='number'
                    className={inputs} 
                    placeholder='precio'
                  />
                </span>
                <button
                  onClick={() => {
                    setPlanes([...planes.slice(0, index), ...planes.slice(index + 1)])
                  }}
                  className='bg-red-500 h-fit w-fit ml-[20px] text-white py-1.5 px-3 font-semibold rounded-lg'
                >
                  Quitar
                </button>
              </div>
            )
          }
          <label 
            className='h-fit w-fit bg-primary py-1.5 px-3 font font-semibold rounded-lg text-white mb-[20px]'
            onClick={() => setPlanes([...planes, {name: '', price: 0}])}
          >
            Agregar plan
          </label>
        </span>
        <span>
          <label className={titles}>Agrega imagenes</label>
          <input 
            className='my-[20px] block w-full text-lg text-primary border rounded-lg cursor-pointer bg-fourth dark:text-white focus:outline-none dark:bg-primary dark:placeholder-white'
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
        <span className='flex flex-col'>
          <label className={titles}>Entrenadores</label>
          
          {
            trainerList.map((item, index) => 
              <div className='flex flex-row items-center'>
                <span>
                  <input
                    onChange={(e) => {
                      trainerList[index] = {...trainerList[index], name: e.target.value}
                    }}
                    type='text'
                    className={inputs} 
                    placeholder='nombre del entrenador'
                  />
                  <input 
                    onChange={(e) => {
                      trainerList[index] = {...trainerList[index], schedule: e.target.value}
                    }}    
                    type='text'
                    className={inputs} 
                    placeholder='horario'
                  />
                  <input 
                    onChange={(e) => {
                      trainerList[index] = {...trainerList[index], activity: e.target.value}
                    }}    
                    type='text'
                    className={inputs} 
                    placeholder='actividad'
                  />
                </span>
                <button
                  onClick={() => {
                    setTrainerList([...trainerList.slice(0, index), ...trainerList.slice(index + 1)])
                  }}
                  className='bg-red-500 h-fit w-fit ml-[20px] text-white py-1.5 px-3 font-semibold rounded-lg'
                >
                  Quitar
                </button>
              </div>
            )
          }
          <label 
            className='h-fit w-fit bg-primary py-1.5 px-3 font font-semibold rounded-lg text-white mb-[20px]'
            onClick={() => setTrainerList([...trainerList, {name: '', schedule: '', activity: ''}])}
          >
            Agregar entrenador
          </label>
        </span>
        <button 
          className='mt-[20px] mb-[40px] bg-primary font-semibold text-white text-[20px] py-[10px] rounded-lg'
          type='submit'>Aceptar</button>
      </form>
      <Toaster/>
    </>
  )
}
