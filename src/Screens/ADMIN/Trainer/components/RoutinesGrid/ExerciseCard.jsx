import React from 'react'

export const ExerciseCard = ({name, series, reps}) => {
  return (
    <div>
      <p>{name}</p>
      <hr/>
      <p>{series} sets</p>
      <p>{reps} reps</p>
    </div>
  )
}

