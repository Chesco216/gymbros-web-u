import React, { useEffect, useState } from 'react'
import { getRoutines } from '../../services/getRoutines'
import { RoutineCard } from './RoutineCard'

export const RoutinesGrid = () => {

  const [routines, setRoutines] = useState()

  useEffect(() => {
    getRoutines().then(res => setRoutines(res))
  })
  return (
    <div>
      {
        routines.map(routine => 
          <RoutineCard 
            key={routine.uid}
            routine={routine}
          />
        )
      }
    </div>
  )
}

