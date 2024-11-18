import React, { useEffect, useState } from 'react'
import { getRoutines } from '../../services/getRoutines'
import { RoutineCardTrainer } from './RoutineCardTrainer'

export const RoutinesGrid = () => {

  const [routines, setRoutines] = useState()

  useEffect(() => {
    getRoutines().then(res => setRoutines(res))
  },[])

  return (
    <>
    {
      (routines) &&
        <div>
          { 
            routines.map((routine) => 
              <RoutineCardTrainer
                key={routine.user_id}
                routine={routine.days}
                user_id={routine.user_id}
              />
            )
          }
            pipipi
        </div>
    }
    </>
  )
}

