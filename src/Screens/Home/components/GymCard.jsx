import { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'

export const GymCard = ({ gym }) => {
	const [isVisible, setIsVisible] = useState(false)
	const cardRef = useRef(null)

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true)
					observer.unobserve(entry.target)
				}
			},
			{ threshold: 0.1 }
		)

		if (cardRef.current) {
			observer.observe(cardRef.current)
		}

		return () => {
			if (cardRef.current) {
				observer.unobserve(cardRef.current)
			}
		}
	}, [])

	return (
		<div
			ref={cardRef}
			className={`w-full max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 ease-in-out transform hover:scale-[1.02] h-[530px] flex flex-col ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
				}`}
		>
			<div className="relative h-48">
				<img
					src={gym?.main_image}
					alt={gym?.name}
					className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
				/>
				<div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
				<div className="absolute top-2 right-2 bg-primary text-white text-sm md:text-base font-bold px-2 py-1 rounded">
					{gym?.suscription_price} Bs
				</div>
			</div>
			<div className="p-4 flex-grow flex flex-col">
				<h2 className="text-2xl capitalize font-bold mb-2">{gym?.name}</h2>
				<div className="flex items-center mb-2">
					<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
						<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
					</svg>
					<span className="font-semibold ml-1">{gym?.stars}</span>
				</div>
				<div className="flex items-center mb-4">
					<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
						<path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
					</svg>
					<span className="ml-1">{gym.location.text ? gym?.location?.text : 'Av. 6 de Agosto, Edificio Pancakes'}</span>
				</div>
				<div className="flex flex-wrap gap-2 mb-4">
					{gym?.extra_services?.map((feature, index) => (
						<span key={index} className="bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-1 rounded">
							{feature}
						</span>
					))}
				</div>
				<div className="px-4 pb-4 mt-auto">
					<NavLink
						to={`/gyms/${gym?.uid}`}
						className="w-full inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
					>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
							<path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z" clipRule="evenodd" />
						</svg>
						Ver detalles del gimnasio
					</NavLink>
				</div>
			</div>
		</div>
	)
}
