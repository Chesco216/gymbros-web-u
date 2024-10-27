import React from 'react'
import { ExerciseCard } from './ExerciseCard'

export const RoutineCard = ({routine, user}) => {
  return (
    <div>
      <h3>Usuario: </h3>
      <label>{user.name}</label>
      <label>{user.age} años</label>
      <label>Restricciones: {user.restrictions}</label>
      <h3>Rutina de la semana: </h3>
      {
        routine.map((item) => {
          <>
            <label>{item.day}</label>
            {
              routine.exercises.map((ex) => {
                <ExerciseCard
                  key={ex.set}
                  des={ex.des}
                  reps={ex.reps}
                  series={ex.series}
                />
              })
            }
          </>
        })
      }
      <button>Aprobar</button>
    </div>
  )
}

