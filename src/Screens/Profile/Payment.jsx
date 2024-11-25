import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../store/useUser'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { db } from '../../firebase/firebasse'
import { UserLayout } from '../Common/Layouts/UserLayout'

export const Payment = () => {

	const user = useUser(state => state.user)
	const [gym, setGym] = useState()
  const [gymList, setGymList] = useState()
  const [gymSelected, setGymSelected] = useState([])

	const navigate = useNavigate()

	useEffect(() => {
    if(user.id_gym) {
      getDoc(doc(db, 'gym', user.id_gym)).then(g => {
        setGym(g.data())
        setGymSelected(g.data().planes)
      })
    } else {
      getDocs(collection(db, 'gym')).then(gymSnapshot => {
        const gymsArr = []
        gymSnapshot.forEach(g => {
          const data = g.data()
          const info = {
            ...data,
            uid: g.id
          }
          if(data.name) gymsArr.push(info)
        })
        setGymList(gymsArr)
      })
    }
  }, [])


  console.log({user})
	const handlePayment = () => {
    toast.success('Pago realizado', {
      duration: 2500,
    })
    //FIX: doesnt return to profile screen, stays on payment and no user on store
    // setTimeout(() => {
    //   navigate('/profile')
    // }, 3000)
    navigate('/profile')
	}

	return (
		<UserLayout>
			<div className='flex flex-col items-center py-[50px]'>
        <form className='flex flex-col w-[500px] overflow-hidden'>
          <h2 className='my-[30px] w-[100%] text-center font-bold text-[40px]'>Inscripcion</h2>
          {
            (gym) ?
              <>
                <p className='mb-[15px] text-[18px] font-semibold'>Gym actual: {gym?.name}</p>
                <p className='mb-[15px] text-[18px] font-semibold'>Plan</p>
                <select
                  className='block w-full p-2 mb-6 text-md text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                >
                  {gymSelected.map((item) =>
                    <option>{item.name}  {item.price}</option>
                  )}
                </select>
                <p className='text-[18px] font-semibold'>Numero de tarjeta</p>
                <input
                  className='my-[20px] rounded-lg text-[15px] py-[10px] px-[15px]'
                  type='number'
                />
                <div className='grid grid-cols-2'>
                  <span>
                    <p className='text-[18px] font-semibold'>Fecha de expiracion</p>
                    <input
                      className='my-[20px] rounded-lg text-[15px] py-[10px] px-[15px]'
                      type='date' 
                    />
                  </span>
                  <span>
                    <p className='text-[18px] font-semibold'>CVV</p>
                    <input 
                      className='w-[100%] my-[20px] rounded-lg text-[15px] py-[10px] px-[15px]'
                      type='number' />
                  </span>
                </div>
              </> :
              (gymList) && 
              <>
                <p className='mb-[15px] text-[18px] font-semibold'>Selecione el gimnasio:</p>
                <select 
                  className='block w-full p-2 mb-6 text-md text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='Seleciona un gimnasio'
                  onChange={(e) => {
                    const value = e.target.value
                    const selected = gymList.filter((item) => item.uid == value)
                    setGymSelected(selected[0].planes)}
                  }
                >
                    {
                      gymList.map((item) => 
                        <option value={item.uid} key={item.name}>{item.name}</option>
                      )
                    }
                </select>
                <p className='mb-[15px] text-[18px] font-semibold'>Selecione el plan del gimnasio:</p>
                { (gymSelected) &&
                  <select
                    className='block w-full p-2 mb-6 text-md text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='Seleciona un gimnasio'
                    >
                      {
                        gymSelected.map((item) => 
                          <option key={item.name}>{item.name}  {item.price}</option>
                        )
                      }
                  </select>
                }
                <p className='text-[18px] font-semibold'>Numero de tarjeta</p>
                <input 
                  className='my-[20px] rounded-lg text-[15px] py-[10px] px-[15px]'
                  type='number'
                />
                <div className='grid grid-cols-2'>
                  <span>
                    <p className='text-[18px] font-semibold'>Fecha de expiracion</p>
                    <input
                      className='my-[20px] rounded-lg text-[15px] py-[10px] px-[15px]'
                      type='date'
                    />
                  </span>
                  <span>
                    <p className='text-[18px] font-semibold'>CVV</p>
                    <input 
                      className='w-[100%] my-[20px] rounded-lg text-[15px] py-[10px] px-[15px]'
                      type='number' 
                    />
                  </span>
                </div>
              </>
          }
          <button 
            className='my-[20px] bg-primary text-white font-semibold text-[18px] rounded-lg py-[5px]'
            onClick={() => handlePayment()}
          >
            Suscribirse
          </button>
          <button 
            className='border-[2px] border-black font-semibold text-[18px] rounded-lg py-[5px]'
            onClick={() => navigate('/profile')}
          >
            Volver
          </button>
        </form>
			</div>
      <Toaster/>
		</UserLayout>
	)
}

