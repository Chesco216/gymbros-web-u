import { useParams } from 'react-router-dom'
import styles from './GymInfo.module.css'
import { Navbar } from '../Common/Navbar';
import { Chatbot } from './components/Chatbot/Chatbot';
import { UserLayout } from '../Common/Layouts/UserLayout';
import { GymHeader } from './components/GymHeader';

export const GymInfo = () => {



	const handleFilterChange = (selectedOption) => {
		console.log('Selected Filter:', selectedOption);
	};
	const params = useParams();
	return (
		<UserLayout>
			<div className="">
				<GymHeader gym_name={"Gymshark"} gym_address={"Av 6 de Agosto, Esquina Keivi Veizan"} gym_image={'https://www.oleoshop.com/imagenes/porreferencia?identidad=ddb52563-8f92-4224-b03c-a20e45c0e763&referencia=&ancho=&alto='} gym_price={"220bs"} gym_reviews={20} gym_stars={4.3} />

			</div>
			<div className="px-4 py-10">
				<Chatbot gym_id={params.id} />
			</div>
		</UserLayout>

	)
}

