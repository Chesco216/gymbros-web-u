import React from 'react'
import { ExerciseCardTrainer } from './ExerciseCardTrainer'

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
              routine.exercises.map((e) => 
                <ExerciseCardTrainer
                  key={e.set}
                  set={e.set}
                  series={e.series}
                  reps={e.reps}
                  des={e.description}
                />
              )
            }
          </>
        })
      }
      <button>Aprobar</button>
    </div>
  )
}

