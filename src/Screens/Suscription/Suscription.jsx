import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'sonner'
import { UserLayout } from "../Common/Layouts/UserLayout"
import { useParams } from 'react-router-dom'
import { useUser } from "../../store/useUser"
import { doc, setDoc } from "firebase/firestore"
import { db } from "../../firebase/firebasse"

export const Suscription = () => {

	const params = useParams()
	const user = useUser(state => state.user)
	const navigate = useNavigate()



	const [cardNumber, setCardNumber] = useState('');
	const [expDate, setExpDate] = useState('');
	const [cvv, setCvv] = useState('');
	const [cardName, setCardName] = useState('');

	const [cardNumberError, setCardNumberError] = useState('');
	const [expDateError, setExpDateError] = useState('');


	const formatCardNumber = (value) => {
		const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
		const matches = v.match(/\d{4,16}/g)
		const match = (matches && matches[0]) || ''
		const parts = []

		for (let i = 0, len = match.length; i < len; i += 4) {
			parts.push(match.substring(i, i + 4))
		}

		if (parts.length) {
			return parts.join(' ')
		} else {
			return value
		}
	}

	const handleCardNumberChange = (e) => {
		const formattedValue = formatCardNumber(e.target.value)
		setCardNumber(formattedValue);
		setCardNumberError('');
	}

	const handleExpDateChange = (e) => {
		let value = e.target.value.replace(/[^\d]/g, '');
		if (value.length > 4) {
			value = value.slice(0, 4);
		}
		if (value.length >= 3) {
			value = value.slice(0, 2) + ' / ' + value.slice(2);
		}
		setExpDate(value);
		setExpDateError(''); // Limpiar el error al cambiar el valor
	};

	const handleCvvChange = (e) => {
		const value = e.target.value.replace(/[^\d]/g, '').slice(0, 4);
		setCvv(value);
	};

	const handleCardNameChange = (e) => {
		setCardName(e.target.value);
	};

	const luhnCheck = (num) => {
		let arr = (num + '')
			.split('')
			.reverse()
			.map((x) => parseInt(x));
		let lastDigit = arr.splice(0, 1)[0];
		let sum = arr.reduce(
			(acc, val, idx) =>
				idx % 2 !== 0
					? acc + val
					: acc + ((val *= 2) > 9 ? val - 9 : val),
			0
		);
		sum += lastDigit;
		return sum % 10 === 0;
	};

	const isValidCardNumber = (number) => {
		const noSpaces = number.replace(/\s+/g, '');
		if (!/^\d{16}$/.test(noSpaces)) {
			return false;
		}
		return luhnCheck(noSpaces);
	};
	const isValidExpDate = (date) => {
		if (!/^\d{2} \/ \d{2}$/.test(date)) {
			return false;
		}
		const [month, year] = date.split(' / ').map(Number);
		if (month < 1 || month > 12) {
			return false;
		}
		const currentYear = parseInt(new Date().getFullYear().toString().slice(-2));
		const currentMonth = new Date().getMonth() + 1;
		if (year < currentYear || (year === currentYear && month < currentMonth)) {
			return false;
		}
		return true;
	};

	const handlePayment = async (e) => {
		e.preventDefault();

		if (!isValidCardNumber(cardNumber)) {
			setCardNumberError('Número de tarjeta inválido');
			return;
		}

		if (!isValidExpDate(expDate)) {
			setExpDateError('Fecha de expiración inválida');
			return;
		}


		try {
			const usr = await setDoc(doc(db, 'user', user.uid), {
				...user,
				id_gym: params.id,
			});
			toast.success('Inscrito correctamente', {
				duration: 2500,
			});
			navigate('/profile');
			console.log({ usr });
		} catch (error) {
			alert(error.code);
		}
	};

	useEffect(() => {
		if (!user) {
			navigate("/login");
		}
	}, [])

	return (
		<UserLayout>
			<div className="min-h-screen bg-fourth flex items-center justify-center p-4">
				<div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden">
					<div className="flex flex-col md:flex-row">
						<div className="md:w-1/2 bg-gradient-to-br from-orange-600 to-orange-400 p-12 text-white">
							<h2 className="text-4xl font-bold mb-6">Complete su informacion de pago para finalizar la compra</h2>
							<p className="text-lg mb-8">Complete su compra llenando los campos con su informacion personal</p>
							<div className="space-y-4">
								<div className="flex items-center">
									<svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
									<span>Transacciones 100% Seguras</span>
								</div>
								<div className="flex items-center">
									<svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
									<span>Solo tarjeta de debito</span>
								</div>
								<div className="flex items-center">
									<svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
									<span>Proceso Rápido y Sencillo</span>
								</div>
							</div>
						</div>
						<div className="md:w-1/2 p-12">
							<h3 className="text-2xl font-semibold text-gray-800 mb-6">Detalles de Pago</h3>
							<form onSubmit={(e) => handlePayment(e)} className="space-y-6"  >

								<div>
									<label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
										Número de Tarjeta
									</label>
									<div className="relative">
										<input
											required
											type="text"
											id="cardNumber"
											className={`w-full px-4 py-3 border ${cardNumberError ? 'border-red-500' : 'border-gray-300'
												} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
											placeholder="1234 5678 9012 3456"
											value={cardNumber}
											onChange={handleCardNumberChange}
											maxLength={19}
										/>
										{/* SVG del ícono de tarjeta */}
									</div>
									{cardNumberError && <p className="text-red-500 text-sm mt-1">{cardNumberError}</p>}
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div>
										<label htmlFor="expDate" className="block text-sm font-medium text-gray-700 mb-1">
											Fecha de Expiración
										</label>
										<input
											required
											type="text"
											id="expDate"
											className={`w-full px-4 py-3 border ${expDateError ? 'border-red-500' : 'border-gray-300'
												} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
											placeholder="MM / AA"
											value={expDate}
											onChange={handleExpDateChange}
										/>
										{expDateError && <p className="text-red-500 text-sm mt-1">{expDateError}</p>}
									</div>

									<div>
										<label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
											CVV
										</label>
										<input
											required
											type="text"
											id="cvv"
											className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
											placeholder="123"
											maxLength={4}
										/>
									</div>
								</div>
								<div>
									<label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
										Nombre en la Tarjeta
									</label>
									<input
										required
										type="text"
										id="cardName"
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
										placeholder="Juan Pérez"
									/>
								</div>
								<button
									type="submit"
									className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:from-orange-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-300 ease-in-out transform hover:scale-105"
								>
									Pagar Ahora
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
			<Toaster />
		</UserLayout>
	)
}
