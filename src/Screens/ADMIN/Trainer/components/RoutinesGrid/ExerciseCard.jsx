import React from 'react'
import { Dumbbell, Hash } from 'lucide-react'

export const ExerciseCard = ({name, series, reps}) => {
  return (
    <div className='flex flex-col'>
      <p className='font-semibold text-lg'>{name}</p>
      <span className='flex flex-row my-[10px] gap-[20px]'>
        <span className='flex flex-row gap-[10px] items-center justify-center'>
          <Dumbbell className="h-4 w-4 text-muted-foreground"/>
          <p>{series} sets</p>
        </span>
        <span className='flex flex-row gap-[10px] items-center justify-center'>
          <Hash className="h-4 w-4 text-muted-foreground"/>
          <p>{series} sets</p>
        </span>
      </span>
    </div>
  )
}

