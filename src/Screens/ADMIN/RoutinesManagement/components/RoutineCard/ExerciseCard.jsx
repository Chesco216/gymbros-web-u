import React from 'react'

export const ExerciseCard = ({des, reps, series, set}) => {
  return (
    <section>
      <label>{set}</label>
      <label>{des}</label>
      <label>{reps} repeticiones</label>
      <label>{series} series</label>
    </section>
  )
}

