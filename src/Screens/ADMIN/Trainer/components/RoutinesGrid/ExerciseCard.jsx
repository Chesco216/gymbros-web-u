import React from 'react'

export const ExerciseCard = ({name, sets, reps}) => {
  return (
    <div>
      <p>{name}</p>
      <hr/>
      <p>{sets} sets</p>
      <p>{reps} reps</p>
    </div>
  )
}

