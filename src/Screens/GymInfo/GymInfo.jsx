import { useParams } from 'react-router-dom'
import { Chatbot } from './components/Chatbot/Chatbot';
import { UserLayout } from '../Common/Layouts/UserLayout';
import { GymHeader } from './components/GymHeader';
import { gyms } from '../../../assets/gyms';
import { ExtraServices } from './components/ExtraServices/ExtraServices';
import { Location } from './components/Location/Location';
import { useEffect } from 'react';

export const GymInfo = () => {
	const params = useParams();
	const gym = gyms.find((g) => g.id === params.id);


	useEffect(() => {
		window.scrollTo(0, 0);
	}, [])


	return (
		<UserLayout>
			<div className="w-full">
				<GymHeader {...gym} />
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 px-4 py-14 xl:px-8 gap-5 xl:gap-5 w-full xl:py-32">
				<Chatbot gym_id={params.id} />
				<ExtraServices extra_services={gym.extra_services} />
				<Location coords_addresss={gym.coords_address} />

			</div>
		</UserLayout>

	)
}

