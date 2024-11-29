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
  const [loadingBtn, setLoadingBtn] = useState(false)

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

    setLoadingBtn(true)
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
					<label className="capitalize fade-in" htmlFor={item.value}>
						{item.label}
					</label>
					<div className="relative w-full">
						<input
							className="w-full h-14 xl:h-16 px-2 border-primary border xl:px-5 fade-in"
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
								{!showPassword ? <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.60997 9.60714C8.05503 10.4549 7 12.1043 7 14C7 16.7614 9.23858 19 12 19C13.8966 19 15.5466 17.944 16.3941 16.3878M21 14C21 9.02944 16.9706 5 12 5C11.5582 5 11.1238 5.03184 10.699 5.09334M3 14C3 11.0069 4.46104 8.35513 6.70883 6.71886M3 3L21 21" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg> : <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 14C3 9.02944 7.02944 5 12 5C16.9706 5 21 9.02944 21 14M17 14C17 16.7614 14.7614 19 12 19C9.23858 19 7 16.7614 7 14C7 11.2386 9.23858 9 12 9C14.7614 9 17 11.2386 17 14Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>}
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
			<button type="submit" className="flex flex-row gap-3 justify-center items-center bg-primary py-4 border-black border font-semibold hover:bg-primary/90 shadow-md fade-in">
        {
          (loadingBtn) &&
            <>
              <svg aria-hidden="true" width='35px' height='35px' class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill='#000000'/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill='#ffffff'/>
    </svg>
              Cargando ...
            </>
        }
        {
          (!loadingBtn) && <>{op === 'login' ? 'Iniciar Sesion' : 'Registrarse'}</>
        }
							</button>

			{op === 'login' ? (
				<p>No tienes una cuenta?, <a href="" className="underline font-semibold" onClick={goToSignup}>Registrate Aqui!</a></p>
			) : (
				<p>Ya tienes una cuenta?, <a href="" className="underline font-semibold" onClick={goToLogin}>Inicia Sesion Aqui!</a></p>
			)}
		</form>
	);
};
