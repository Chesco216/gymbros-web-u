import ReCaptcha from 'react-google-recaptcha'
import { useNavigate } from "react-router-dom";
import './Form.css';
import { useState } from "react";
import { useUser } from "../../../../store/useUser";

export const Form = ({ fields, op, handleSubmit }) => {

	const navigate = useNavigate();

	const [isChecked, setIsChecked] = useState(false);
	const [errors, setErrors] = useState({});
	const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña

  const set_user = useUser(state => state.set_user)

	const goToSignup = (e) => {
		e.preventDefault();
		navigate('/signup');
	};

	const goToLogin = (e) => {
		e.preventDefault();
		navigate('/login');
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();

		let formIsValid = true;
		const newErrors = {};

		fields.forEach((item) => {
			if (!item.value || item.value.trim() === '') {
				newErrors[item.label] = `El campo ${item.label} es obligatorio`;
				formIsValid = false;
			}
		});

		// Validar el checkbox
		if (!isChecked) {
			newErrors['robot'] = 'Debes marcar el checkbox "No soy un robot"';
			formIsValid = false;
		}

		if (!formIsValid) {
			setErrors(newErrors);
			return;
		}
    
    set_user({
      name: fields[0].value
    })
    setErrors({});
		handleSubmit();
	};

  const handleCaptcha = (e) => {
    (e) ? setIsChecked(true) : setIsChecked(false)
  }

	return (
		<form onSubmit={handleFormSubmit} className="flex flex-col gap-2.5 xl:gap-5 xl:text-lg">
			{fields.map((item) => (
				<div key={item.label}>
					<label className="capitalize" htmlFor={item.value}>
						{item.label}
					</label>
					<div className="relative w-full">
						<input
							className="w-full h-14 xl:h-16 px-2 border-primary border xl:px-5"
							id={item.value}
							name={item.label}
							type={item.type === 'password' && showPassword ? 'text' : item.type} // Alterna entre 'password' y 'text'
							value={item.value}
							placeholder={item.placeHolder}
							onChange={(e) => item.set(e.target.value)}
							required
						/>
						{item.type === 'password' && (
							<button
								type="button"
								className="absolute inset-y-0 right-0 px-3 flex items-center"
								onClick={() => setShowPassword(!showPassword)}
							>
								{!showPassword ? <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.60997 9.60714C8.05503 10.4549 7 12.1043 7 14C7 16.7614 9.23858 19 12 19C13.8966 19 15.5466 17.944 16.3941 16.3878M21 14C21 9.02944 16.9706 5 12 5C11.5582 5 11.1238 5.03184 10.699 5.09334M3 14C3 11.0069 4.46104 8.35513 6.70883 6.71886M3 3L21 21" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg> : <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 14C3 9.02944 7.02944 5 12 5C16.9706 5 21 9.02944 21 14M17 14C17 16.7614 14.7614 19 12 19C9.23858 19 7 16.7614 7 14C7 11.2386 9.23858 9 12 9C14.7614 9 17 11.2386 17 14Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>} {/* Iconos de ejemplo, puedes usar íconos personalizados */}
							</button>
						)}
					</div>
					{errors[item.label] && <p className="text-red-500">{errors[item.label]}</p>} {/* Muestra el error si existe */}
				</div>
			))}
      {

			// <div className="flex space-x-2">
			// 	<div className="checkbox-wrapper-58 mt-1.5">
			// 		<label className="switch">
   //          <div class="g-recaptcha" data-sitekey="6LdrrXsqAAAAAMwen3x79eOoBgMEWCPhMGvueRL2" data-action="LOGIN"></div>
   //          {
			// 			// <input
			// 			// 	type="checkbox"
			// 			// 	checked={isChecked}
			// 			// 	onChange={(e) => setIsChecked(e.target.checked)}
			// 			// 	name="notRobot"
			// 			// />
			// 			// <span className="slider w-9 sm:w-10"></span>
   //          }
			// 		</label>
			// 	</div>
			// 	<label htmlFor="notRobot" className="flex items-center gap-2">
			// 		No soy un robot
			// 	</label>
			// </div>
      }
			{errors['robot'] && <p className="text-red-500">{errors['robot']}</p>} {/* Muestra el error si el checkbox no está marcado */}

      <ReCaptcha
        sitekey='6LdrrXsqAAAAAMwen3x79eOoBgMEWCPhMGvueRL2'
        onChange={(e) => handleCaptcha(e)}
      />
			<button type="submit" className="bg-primary py-4 border-black border font-semibold hover:bg-primary/90 shadow-md">
				{op === 'login' ? 'Iniciar Sesion' : 'Registrarse'}
			</button>

			{op === 'login' ? (
				<p>No tienes una cuenta?, <a href="" className="underline font-semibold" onClick={goToSignup}>Registrate Aqui!</a></p>
			) : (
				<p>Ya tienes una cuenta?, <a href="" className="underline font-semibold" onClick={goToLogin}>Inicia Sesion Aqui!</a></p>
			)}
		</form>
	);
};
