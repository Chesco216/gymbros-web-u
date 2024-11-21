import React from 'react'

export const ConfirmPopUp = ({message, f}) => {
  return (
    <div>
      <h2>{message}</h2>
      <button>Aceptar</button>
      <button>Cancelar</button>
    </div>
  )
}

