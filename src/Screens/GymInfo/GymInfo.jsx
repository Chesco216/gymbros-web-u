import { useParams } from 'react-router-dom'
import { Chatbot } from './components/Chatbot/Chatbot';
import { UserLayout } from '../Common/Layouts/UserLayout';
import { GymHeader } from './components/GymHeader';
import { ExtraServices } from './components/ExtraServices/ExtraServices';
import { Location } from './components/Location/Location';
import { useEffect } from 'react';
import { useGym } from '../../store/useGym';

export const GymInfo = () => {
	const params = useParams();

	const gyms = useGym(state => state.gyms)

	const gym = gyms.find((g) => g.uid === params.id);



	useEffect(() => {
		window.scrollTo(0, 0);
	}, [])


	return (
		<UserLayout>
			<div className="w-full">
				<GymHeader {...gym} />
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 px-4 py-14 xl:px-8 gap-5 xl:gap-5 w-full xl:py-10">
				<Chatbot gym_id={params.id} />
				<ExtraServices services={[gym?.equipment?.arms, gym?.equipment?.back, gym?.equipment?.chest, gym?.equipment?.dumbells, gym?.equipment?.legs]} schedule={gym?.schedule} extra_services={gym?.extra_services} />
				<Location coords={gym?.location?.coords} text={gym?.location?.text} />

			</div>
		</UserLayout>

	)
}

