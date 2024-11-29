import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'sonner'
import { getUserFromID } from '../../services/getUserFromID'
import { ExerciseCard } from './ExerciseCard'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../../../../../firebase/firebasse'

export const RoutineCardTrainer = ({routinesChanged, setRoutinesChanged, r_id, routine, user_id}) => {

  const [routineState, setRoutine] = useState(routine)
  const [userInfo, setUserInfo] =useState()

  useEffect(() => {
    getUserFromID(user_id).then(user => setUserInfo(user))
  }, [])

  const handleAproveRoutine = async() => {
    try {
      const res = await getDoc(doc(db, 'routines', r_id))
      const data = res.data()
      await setDoc(doc(db, 'routines', r_id), {
        ...data,
        isAproved: true
      })

      toast.success('Rutina aprobada', {
        duration: 2000,
      })
      setRoutinesChanged(!routinesChanged)
    } catch (error) {
      alert(error.code)
    }
  }

  return (
    <div className='flex flex-col py-[30px] my-[15px] border-4 border-black rounded-[20px] px-[50px]'>
      {
        (routineState && userInfo) &&
          <>
            <span className='flex flex-row justify-between mb-[10px]'>
              <p className='font-bold text-xl'>Nombre</p>
              <p className='font-bold text-xl'>Edad</p>
              <p className='font-bold text-xl'>Peso</p>
              <p className='font-bold text-xl'>Altura</p>
            </span>
            <hr/>
            <span className='flex flex-row justify-between mb-[10px]'>
              <p>{userInfo.name}</p>
              <p>{userInfo.age}</p>
              <p>{userInfo.weight}</p>
              <p>{userInfo.height}</p>
            </span>
            <div className='grid grid-cols-3'>
              <span>
                {
                  routineState.map((item) => {
                    const exercises = item.exercises
                    return (
                      <>
                        <h3 className='font-bold text-2xl' key={item.day}>{`${item.day}:   ${item.group}`}</h3>
                        {
                          (exercises) && 
                            exercises.map((exercise) => 
                            <ExerciseCard
                              key={exercise.set}
                              name={exercise.set}
                              reps={exercise.reps}
                              series={exercise.series}
                            />  
                          )
                        }
                      </>  
                    )
                  })
                }
              </span>
            </div>
            <div className='w-full flex justify-end'>
              <button 
                onClick={() => handleAproveRoutine()}
                className='bg-primary font-bold text-white w-fit py-[8px] px-[20px] rounded-[10px] relative r-0'
                disabled={(routine.isAproved) ? true : false}
              >
                Aprobar
              </button>
            </div>
          </>
      }
      <Toaster/>
    </div>
  )
}

