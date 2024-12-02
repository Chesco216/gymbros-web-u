import React from 'react'
import { usePopUp } from '../store/usePopUp'

export const ConfirmPopUp = () => {

  const isOpen = usePopUp(state => state.props.isOpen)
  const message = usePopUp(state => state.props.message)
  const setIsOpen = usePopUp(state => state.setIsOpen)
  const setConfirmed = usePopUp(state => state.setConfirmed)

  return (
    <>
    {
      (isOpen) &&
        <div className='absolute w-screen h-screen bg-gray-400 bg-opacity-80'>
          <form 
            className='absolute top-0 bottom-0 left-0 right-0 m-auto w-fit h-fit bg-white py-5 px-8 max-w-md rounded-lg'
            onSubmit={(e) => e.preventDefault()}
          >
            <p className='font-semibold text-xl'>{message}</p>
            <span className='flex flex-row justify-between mt-10'>
              <button
                className='py-2.5 px-10 bg-primary rounded-lg text-xl text-white font-semibold'
                onClick={() => {
                  setConfirmed(true)
                  setIsOpen(false)
                }}
              >
                SI
              </button>
              <button
                className='py-2.5 px-10 bg-red-400 rounded-lg text-xl text-white font-semibold'
                onClick={() => {
                  setConfirmed(false)
                  setIsOpen(false)
                  }}
              >
                NO
              </button>
            </span>
          </form>
        </div>
    }
    </>
  )
}

