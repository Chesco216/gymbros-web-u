import { useParams } from 'react-router-dom'
import { Chatbot } from './components/Chatbot/Chatbot';
import { UserLayout } from '../Common/Layouts/UserLayout';
import { GymHeader } from './components/GymHeader';
import { gyms } from '../../../assets/gyms';
import { useEffect, useState } from 'react';

export const GymInfo = () => {
	const params = useParams();

	const [gym, setGym] = useState()

	useEffect(() => {
		setGym({ ...(gyms.filter(g => g.id === params.id)) })

	}, [params.id])

	return (
		<UserLayout>
			<div className="">
				<GymHeader {...gym} />

			</div>
			<div className="px-4 py-10">
				<Chatbot gym_id={params.id} />
			</div>
		</UserLayout>

	)
}

