import React from 'react'

export const ExerciseCardTrainer = ({des, reps, set, series}) => {
  return (
    <span>
      <p>{set}</p>
      <p>{des}</p>
      <p>{series} series</p>
      <p>{reps} repeticiones</p>
    </span>
  )
}

