import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../store/useUser'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase/firebasse'
import { UserLayout } from '../Common/Layouts/UserLayout'

export const Payment = () => {

	const user = useUser(state => state.user)
	const [gym, setGym] = useState()

	const navigate = useNavigate()

	useEffect(() => {
		getDoc(doc(db, 'gym', user.id_gym)).then(g => setGym(g.data()))
	}, [])

	const handlePayment = () => {
		console.log('suscribed pipipi')
	}

	return (
		<UserLayout>
			<div>
				<h2>Inscripcion</h2>
				{
					(gym) ?
						<>
							<p>Gym actual: {gym?.name}</p>
							<h3>Plan</h3>
							<select>
								<option>Mensual 300bs</option>
								<option>Semestral 1600bs</option>
								<option>Anual 3000bs</option>
							</select>
							<h3>Numero de tarjeta</h3>
							<input type='number' />
							<h3>Fecha de expiracion</h3>
							<input type='date' />
							<h3>CVV</h3>
							<input type='number' />
						</> :
						<h1>Hello</h1>
				}
				<button onClick={() => navigate('/profile')}>Volver</button>
				<button onClick={() => handlePayment()}>Suscribirse</button>
			</div>
		</UserLayout>
	)
}

