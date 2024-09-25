
export const Form = ({fields, op, handleSubmit}) => {

  return (
    <form onSubmit={(e) =>
      {
        e.preventDefault()
        handleSubmit()
      }
    }>
      {
        fields.map((item) => 
          <input 
            key={item.label}
            name={item.label}
            type={item.type}
            value={item.value}
            placeholder={item.placeholder}
            onChange={(e) => item.set(e.target.value)}
            required
          />
       )
      }
      <label>
        <input type="checkbox" required/>
        No soy un robot
      </label>
      <button type="submit">
        {(op == 'login') ? 'Iniciar Sesion' : 'Registrarse'}
      </button>
    </form>
  )
}

