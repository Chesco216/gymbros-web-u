import React from 'react'

export const ConfirmPopUp = ({message, isOpen, setIsOpen}) => {
  return (
    <>
    {
      (isOpen) &&
        <div className='absolute w-screen h-screen bg-gray-400 bg-opacity-80'>
          <form 
            className='absolute top-0 bottom-0 left-0 right-0 m-auto w-fit h-fit bg-white'
            onSubmit={(e) => e.preventDefault()}
          >
            <p>{message}</p>
            <span className='flex flex-row justify-between py-5'>
              <button
                className='py-2.5 px-5 bg-primary rounded-lg text-white font-semibold'
                onClick={() => setIsOpen(false)}
              >
                SI
              </button>
              <button
                className='py-2.5 px-5 bg-red-400 rounded-lg text-white font-semibold'
                onClick={() => setIsOpen(false)}
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

