import { NavLink } from "react-router-dom"

export const GymHeader = ({ uid, name, stars, number_of_reviews, main_image, location, suscription_price }) => {

	console.log(location)

	return (
		<section className='flex flex-col gap-3 w-full bg-white pb-6 shadow-xl shadow-black/5'>
			<img src={main_image} alt="" className="w-full h-[200px] md:h-[250px] 2xl:h-[300px] object-cover xl:blur-[6px] lg:blur-[3px] sm:blur-[3px] shadow-lg xl:shadow-2xl fade-in" />

			<div className={`flex flex-col gap-3 px-4 xl:px-8 py-2 xl:py-5 xl:gap-4 slide-in`} >
				<div className='flex flex-col pt-7'>
					<h1 className='text-3xl uppercase font-extrabold sm:text-4xl xl:text-5xl'>{name}</h1>
					<p className='flex mt-4 items-center text-lg font-md sm:text-xl xl:text-2xl '>

						<svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke="#e73b37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" stroke="#e73b37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
						{location.text}
					</p>
				</div>

				<p className="flex font-bold text-lg sm:text-xl xl:text-2xl items-center gap-2">
					<svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.2691 4.41115C11.5006 3.89177 11.6164 3.63208 11.7776 3.55211C11.9176 3.48263 12.082 3.48263 12.222 3.55211C12.3832 3.63208 12.499 3.89177 12.7305 4.41115L14.5745 8.54808C14.643 8.70162 14.6772 8.77839 14.7302 8.83718C14.777 8.8892 14.8343 8.93081 14.8982 8.95929C14.9705 8.99149 15.0541 9.00031 15.2213 9.01795L19.7256 9.49336C20.2911 9.55304 20.5738 9.58288 20.6997 9.71147C20.809 9.82316 20.8598 9.97956 20.837 10.1342C20.8108 10.3122 20.5996 10.5025 20.1772 10.8832L16.8125 13.9154C16.6877 14.0279 16.6252 14.0842 16.5857 14.1527C16.5507 14.2134 16.5288 14.2807 16.5215 14.3503C16.5132 14.429 16.5306 14.5112 16.5655 14.6757L17.5053 19.1064C17.6233 19.6627 17.6823 19.9408 17.5989 20.1002C17.5264 20.2388 17.3934 20.3354 17.2393 20.3615C17.0619 20.3915 16.8156 20.2495 16.323 19.9654L12.3995 17.7024C12.2539 17.6184 12.1811 17.5765 12.1037 17.56C12.0352 17.5455 11.9644 17.5455 11.8959 17.56C11.8185 17.5765 11.7457 17.6184 11.6001 17.7024L7.67662 19.9654C7.18404 20.2495 6.93775 20.3915 6.76034 20.3615C6.60623 20.3354 6.47319 20.2388 6.40075 20.1002C6.31736 19.9408 6.37635 19.6627 6.49434 19.1064L7.4341 14.6757C7.46898 14.5112 7.48642 14.429 7.47814 14.3503C7.47081 14.2807 7.44894 14.2134 7.41394 14.1527C7.37439 14.0842 7.31195 14.0279 7.18708 13.9154L3.82246 10.8832C3.40005 10.5025 3.18884 10.3122 3.16258 10.1342C3.13978 9.97956 3.19059 9.82316 3.29993 9.71147C3.42581 9.58288 3.70856 9.55304 4.27406 9.49336L8.77835 9.01795C8.94553 9.00031 9.02911 8.99149 9.10139 8.95929C9.16534 8.93081 9.2226 8.8892 9.26946 8.83718C9.32241 8.77839 9.35663 8.70162 9.42508 8.54808L11.2691 4.41115Z" stroke="#ED7D31" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
					{stars} ({number_of_reviews} valoraciones)
				</p>

				<NavLink className="group/button flex items-center justify-center gap-3 rounded-md bg-primary px-7 py-4 font-bold text-white transition duration-200 motion-reduce:transition-none self-start shadow-lg xl:text-xl border border-black hover:bg-primary/90" to={`/gyms/${uid}/suscript`}>
					<span>
						{suscription_price} Bs  |  Inscribirse
					</span>

					<div className="ml-2 transition duration-300 group-hover/button:translate-x-1.5 motion-reduce:transition-none motion-reduce:group-hover/button:transform-none">
						<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M4 12.992h2.5m13.5 0-6-6m6 6-6 6m6-6H9.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
						</svg>
					</div>


				</NavLink>
			</div>
		</section>

	)
}

