import React, { useEffect, useState } from 'react'
import { getRoutines } from '../../services/getRoutines'
import { RoutineCardTrainer } from './RoutineCardTrainer'

export const RoutinesGrid = () => {

  const [routines, setRoutines] = useState()
  const [routinesChanged, setRoutinesChanged] = useState(true)

  useEffect(() => {
    getRoutines().then(res => setRoutines(res))
  },[routinesChanged])

  return (
    <>
    {
      (routines) &&
        <div className='w-[60%] flex flex-col align-center justify-center'>
          { 
            routines.map((routine) => 
              <RoutineCardTrainer
                routinesChanged={routinesChanged}
                setRoutinesChanged={setRoutinesChanged}
                key={routine.user_id}
                r_id={routine.uid}
                routine={routine.days}
                user_id={routine.user_id}
              />
            )
          }
        </div>
    }
    </>
  )
}
