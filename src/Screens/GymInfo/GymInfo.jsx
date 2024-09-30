import { useParams } from 'react-router-dom'
import styles from './GymInfo.module.css'
import { Navbar } from '../Common/Navbar';
import { Chatbot } from './components/Chatbot/Chatbot';

export const GymInfo = () => {



	const handleFilterChange = (selectedOption) => {
		console.log('Selected Filter:', selectedOption);
	};
	const params = useParams();
	console.log(params);
	return (
		<div className={`${styles.container} flex flex-col min-h-screen bg-fourth sm:items-center  `} >
			<Navbar />
			<section className="px-4 py-10">
				<Chatbot gym_id={params.id} />
			</section>

		</div>
	)
}

