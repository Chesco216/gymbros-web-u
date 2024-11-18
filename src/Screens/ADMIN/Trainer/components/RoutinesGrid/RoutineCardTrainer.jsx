import React, { useEffect, useState } from 'react'
import { getUserFromID } from '../../services/getUserFromID'
import { ExerciseCard } from './ExerciseCard'

export const RoutineCardTrainer = ({routine, user_id}) => {

  const [userInfo, setUserInfo] =useState()

  useEffect(() => {
    getUserFromID(user_id).then(user => setUserInfo(user))
  }, [])

  return (
    <div>
      {
        (routine && userInfo) &&
          <>
            <span>
              <p>{userInfo.name}</p>
              <p>{userInfo.age}</p>
              <p>{userInfo.weight}</p>
              <p>{userInfo.height}</p>
            </span>
            {
              routine.map((item) => 
                <>
                  <h3 key={item.day}>{`${item.day} -> ${item.group}`}</h3>
                  {
                      exercises.map((exercise) => 
                      <ExerciseCard
                        key={exercise.set}
                        name={exercise.name}
                        reps={exercise.reps}
                        series={exercise.series}
                      />  
                    )
                  }
                </>  
              )
            }
            <button disabled={(routine.isAproved) ? true : false}>
              Aprobar
            </button>
          </>
      }
    </div>
  )
}

