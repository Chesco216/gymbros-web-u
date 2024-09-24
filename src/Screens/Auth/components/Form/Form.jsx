import { lazy } from "react"

export const Form = ({fields, op}) => {

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('logged')
    
    if(op == 'login') {
      console.log('login')
    }
    
    if(op == 'signup') {
      console.log('signup')
    }

  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      {
        fields.map((item) => 
          <input 
            key={item.label}
            name={item.label}
            type={item.type}
            value={item.name}
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

