import { NavLink } from "react-router-dom"

export const GymCard = ({ gym }) => {

	return (
		<li className="flex bg-white rounded-xl shadow-lg hover:bg-gray-50 w-full cursor-pointer transition-all ease-in-out hover:scale-[1.020] h-80 lg:h-auto pb-10 border border-gray-300">
			<NavLink to={`/gyms/${gym.id}`} className="flex flex-col w-full items-start gap-4">
				<img src={gym.image_url} alt="" className="w-full h-1/3 xl:h-2/3 object-cover rounded-t-xl" />
				<div className="flex flex-col w-full h-2/3 xl:h-1/3 gap-1 px-2">
					<p className="p uppercase">{gym.name}</p>

					<div className="flex items-center gap-1">
						<svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path d="M12 .288l2.833 8.718h9.167l-7.417 5.39 2.833 8.718L12 17.711l-7.417 5.39 2.833-8.718L.288 9.006h9.167L12 .288z" />
						</svg>
						<span className="xl:text-lg font-semibold">{gym.stars}</span>

					</div>

					<div className="flex items-center gap-1">
						<svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke="#e73b37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" stroke="#e73b37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
						<p className="text-lg font-semibold">{gym.text_address}</p>
					</div>
					<div className="flex items-center gap-1 ml-auto pr-5 mt-5">
						<p className="text-xl font-semibold border border-gray-300 rounded-md px-3 py-2">{gym.suscription_price} Bs</p>
					</div>

				</div>
			</NavLink>
		</li>
	)
}
