import React from 'react'

export const ConfirmModal = ({message, setConfirm}) => {
  return (
    <div className='w-screen h-screen bg-gray-400'>
      <form onSubmit={(e) => e.preventDefault()}>
        <p>{message}</p>
        <button
          onClick={() => setConfirm(true)}
        >
          SI
        </button>
        <button
          onClick={() => setConfirm(false)}
        >
          NO
        </button>
      </form>
    </div>
  )
}

