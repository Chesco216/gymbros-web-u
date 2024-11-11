import { useFadeIn } from "../../hooks/useFadeIn";
import { ExerciseRegion } from "../ExerciseRegion/ExerciseRegion";

const services_exercises = [
	{
		id: 1,
		name: 'Brazo',
	},
	{
		id: 2,
		name: 'Espalda',
	},
	{
		id: 3,
		name: 'Pecho',
	},
	{
		id: 4,
		name: 'Mancuernas',
	},
	{
		id: 5,
		name: 'Pierna',
	}
]

export const ExtraServices = ({
	schedule, services, extra_services }) => {

	const { isVisible, sectionRef } = useFadeIn();
	return (
		<section className={`fade-in-section ${isVisible ? 'is-visible' : ''} flex flex-col px-5 py-10 bg-white rounded-xl max-h-[600px] md:max-h-[700px] shadow-lg gap-2 hover:outline hover:outline-primary fade-in-fast`} ref={sectionRef}>
			<p className="text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-2xl dark:text-black">Horario</p>
			<ul className="list-disc flex flex-col px-5 text-gray-600 gap-2">
				{
					schedule.split(',').map((day, index) =>
						<li className="capitalize" key={index}>{day}</li>
					)
				}
			</ul>


			<p className="text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-2xl dark:text-black">Servicios y Maquinas</p>
			{
				services_exercises.map((service_exercise, index) => (
					<ExerciseRegion key={service_exercise.id} region={service_exercise.name} exercises={services[index]} />
				))
			}





			<p className="text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-2xl dark:text-black">Servicios Extras</p>
			<ul className="list-disc flex flex-col px-5 text-gray-600 gap-2">
				{
					extra_services.map((es, index) =>
						<li className="capitalize" key={index}>{es}</li>
					)
				}
			</ul>
		</section>
	)
}
