import { useNavigate } from "react-router-dom"
import './Form.css'
import { useState } from "react";

export const Form = ({ fields, op, handleSubmit }) => {
	const navigate = useNavigate();
	const [err, setErr] = useState({});
	const [isChecked, setIsChecked] = useState(false);

	const goToSignup = (e) => {
		e.preventDefault();
		navigate('/signup');
	}
	const goToLogin = (e) => {
		e.preventDefault();
		navigate('/login');

	}


	return (
		<form onSubmit={(e) => {
			e.preventDefault()
			handleSubmit()
		}} className="flex flex-col gap-2.5 xl:gap-5">
			{
				fields.map((item) =>
				(
					<div key={item.label}>

						<label key={item.label} className="capitalize" htmlFor={item.value} >
							{item.label}
						</label>
						<input className='w-full h-14 px-2 border-primary border '
							id={item.value}
							name={item.label}
							type={item.type}
							value={item.value}
							placeholder={item.placeHolder}
							onChange={(e) => item.set(e.target.value)}
							required
						/>

					</div>

				)

				)
			}
			<div className="flex space-x-2">
				<div className="checkbox-wrapper-58 mt-1.5">
					<label className="switch">
						<input type="checkbox" value={isChecked} required onChange={(e) => setIsChecked(e.target.value)} />
						<span className="slider w-9 sm:w-10 "></span>
					</label>
				</div>
				<label htmlFor="captcha" className="flex items-center gap-2">
					No soy un robot
				</label>

			</div>
			<button type="submit" className='bg-primary py-4 border-black border font-semiboldc'>
				{(op == 'login') ? 'Iniciar Sesion' : 'Registrarse'}
			</button>
			{
				(op == 'login') ? (<p>No tienes una cuenta?, <a href='' className='underline font-semibold' onClick={goToSignup}>Registrate Aqui!</a></p>) :
					(<p>Ya tienes una cuenta?, <a href='' className='underline font-semibold' onClick={goToLogin}>Inicia Sesion Aqui!</a></p>)
			}

		</form >

	)
}





