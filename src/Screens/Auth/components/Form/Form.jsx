import { useNavigate } from "react-router-dom";
import './Form.css';
import { useState } from "react";

export const Form = ({ fields, op, handleSubmit }) => {
	const navigate = useNavigate();
	const [isChecked, setIsChecked] = useState(false);
	const [errors, setErrors] = useState({});

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

		setErrors({});
		handleSubmit();
	};

	return (
		<form onSubmit={handleFormSubmit} className="flex flex-col gap-2.5 xl:gap-5 xl:text-lg">
			{fields.map((item) => (
				<div key={item.label}>
					<label className="capitalize" htmlFor={item.value}>
						{item.label}
					</label>
					<input
						className="w-full h-14 xl:h-16 px-2 border-primary border xl:px-5"
						id={item.value}
						name={item.label}
						type={item.type}
						value={item.value}
						placeholder={item.placeHolder}
						onChange={(e) => item.set(e.target.value)}
						required
					/>
					{
						errors[item.label] && <p className="text-red-500">{errors[item.label]}</p> // Muestra el error si existe
					}
				</div>
			))}

			<div className="flex space-x-2">
				<div className="checkbox-wrapper-58 mt-1.5">
					<label className="switch">
						<input
							type="checkbox"
							checked={isChecked}
							onChange={(e) => setIsChecked(e.target.checked)}
							name="notRobot"
						/>
						<span className="slider w-9 sm:w-10"></span>
					</label>
				</div>
				<label htmlFor="notRobot" className="flex items-center gap-2">
					No soy un robot
				</label>
			</div>
			{
				errors['robot'] && <p className="text-red-500">{errors['robot']}</p> // Muestra el error si el checkbox no está marcado
			}

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
