import { NavLink } from "react-router-dom"

export const GymCard = ({ gym }) => {
	return (
		<li className="flex bg-white rounded-xl shadow-lg hover:bg-gray-50 h-52 px-2 2xl:pr-[600px] w-full items-center cursor-pointer">
			<NavLink to={`/gyms/${gym.id}`} className="flex w-full items-center gap-2">
				<img src={gym.image_url} alt="" className="w-[30%] rounded-lg object-cover" />
				<div className="flex flex-col gap-1 md:gap-2 lg:gap-3">
					<p className="uppercase text-xl font-bold">{gym.name}</p>
					<div className="flex gap-1">
						<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.2691 4.41115C11.5006 3.89177 11.6164 3.63208 11.7776 3.55211C11.9176 3.48263 12.082 3.48263 12.222 3.55211C12.3832 3.63208 12.499 3.89177 12.7305 4.41115L14.5745 8.54808C14.643 8.70162 14.6772 8.77839 14.7302 8.83718C14.777 8.8892 14.8343 8.93081 14.8982 8.95929C14.9705 8.99149 15.0541 9.00031 15.2213 9.01795L19.7256 9.49336C20.2911 9.55304 20.5738 9.58288 20.6997 9.71147C20.809 9.82316 20.8598 9.97956 20.837 10.1342C20.8108 10.3122 20.5996 10.5025 20.1772 10.8832L16.8125 13.9154C16.6877 14.0279 16.6252 14.0842 16.5857 14.1527C16.5507 14.2134 16.5288 14.2807 16.5215 14.3503C16.5132 14.429 16.5306 14.5112 16.5655 14.6757L17.5053 19.1064C17.6233 19.6627 17.6823 19.9408 17.5989 20.1002C17.5264 20.2388 17.3934 20.3354 17.2393 20.3615C17.0619 20.3915 16.8156 20.2495 16.323 19.9654L12.3995 17.7024C12.2539 17.6184 12.1811 17.5765 12.1037 17.56C12.0352 17.5455 11.9644 17.5455 11.8959 17.56C11.8185 17.5765 11.7457 17.6184 11.6001 17.7024L7.67662 19.9654C7.18404 20.2495 6.93775 20.3915 6.76034 20.3615C6.60623 20.3354 6.47319 20.2388 6.40075 20.1002C6.31736 19.9408 6.37635 19.6627 6.49434 19.1064L7.4341 14.6757C7.46898 14.5112 7.48642 14.429 7.47814 14.3503C7.47081 14.2807 7.44894 14.2134 7.41394 14.1527C7.37439 14.0842 7.31195 14.0279 7.18708 13.9154L3.82246 10.8832C3.40005 10.5025 3.18884 10.3122 3.16258 10.1342C3.13978 9.97956 3.19059 9.82316 3.29993 9.71147C3.42581 9.58288 3.70856 9.55304 4.27406 9.49336L8.77835 9.01795C8.94553 9.00031 9.02911 8.99149 9.10139 8.95929C9.16534 8.93081 9.2226 8.8892 9.26946 8.83718C9.32241 8.77839 9.35663 8.70162 9.42508 8.54808L11.2691 4.41115Z" stroke="#ED7D31" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
						<p className="font-bold">{gym.stars}</p>
						<p>{gym.number_of_reviews} valoraciones</p>


					</div>
					<div className="flex">
						<svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
						<p>{gym.text_address}</p>

					</div>
					<div className="flex flex-wrap gap-1">
						<svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="18.5" cy="4.5" r="2.5" stroke="#0f0f0f" strokeWidth="1.5"></circle> <path d="M9 17L7.99923 18.2009C7.262 19.0856 6.89338 19.5279 6.38945 19.764C5.88552 20 5.30973 20 4.15813 20H3" stroke="#0f0f0f" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M5.80619 9.47232C6.16633 9.2677 6.2924 8.80986 6.08777 8.44972C5.88315 8.08958 5.42531 7.96351 5.06517 8.16814L5.80619 9.47232ZM3.62949 8.98386C3.26935 9.18849 3.14328 9.64632 3.34791 10.0065C3.55253 10.3666 4.01037 10.4927 4.37051 10.288L3.62949 8.98386ZM15.7502 10.125L15.1262 10.541L15.1262 10.541L15.7502 10.125ZM15.8125 10.2185L16.4366 9.80242L16.4366 9.80242L15.8125 10.2185ZM10.9688 6.65329L11.0462 5.90729L10.9688 6.65329ZM10.7398 6.63589L10.7065 7.38516H10.7065L10.7398 6.63589ZM10.1548 6.67319L10.0522 5.93024L10.0522 5.93024L10.1548 6.67319ZM21 12.7496C21.4142 12.7496 21.75 12.4138 21.75 11.9996C21.75 11.5854 21.4142 11.2496 21 11.2496V12.7496ZM8.73808 6.27249C8.34994 6.41715 8.15257 6.84906 8.29722 7.23719C8.44188 7.62533 8.87379 7.8227 9.26192 7.67805L8.73808 6.27249ZM5.06517 8.16814L3.62949 8.98386L4.37051 10.288L5.80619 9.47232L5.06517 8.16814ZM15.1262 10.541L15.1885 10.6345L16.4366 9.80242L16.3742 9.70894L15.1262 10.541ZM11.0462 5.90729C10.9438 5.89666 10.853 5.89018 10.773 5.88663L10.7065 7.38516C10.7559 7.38734 10.8172 7.39158 10.8914 7.39928L11.0462 5.90729ZM19.1407 12.7496H21V11.2496H19.1407V12.7496ZM10.773 5.88663C10.5099 5.87497 10.2617 5.90131 10.0522 5.93024L10.2574 7.41614C10.4355 7.39155 10.5786 7.37949 10.7065 7.38516L10.773 5.88663ZM15.1885 10.6345C16.0695 11.9559 17.5525 12.7496 19.1407 12.7496V11.2496C18.0541 11.2496 17.0393 10.7065 16.4366 9.80242L15.1885 10.6345ZM16.3742 9.70894C15.1968 7.94284 13.4289 6.15461 11.0462 5.90729L10.8914 7.39928C12.5939 7.576 14.0254 8.88987 15.1262 10.541L16.3742 9.70894ZM9.26192 7.67805C9.62279 7.54355 9.94386 7.45943 10.2574 7.41614L10.0522 5.93024C9.61073 5.9912 9.18212 6.107 8.73808 6.27249L9.26192 7.67805Z" fill="#0f0f0f"></path> <path d="M14.0001 8.5L11.7793 11.2756C10.9429 12.321 10.5246 12.8438 10.4579 13.413C10.4204 13.733 10.4608 14.0573 10.5756 14.3584C10.7798 14.8939 11.3134 15.2981 12.3807 16.1066C13.1936 16.7225 13.6 17.0304 13.8755 17.4329C14.0326 17.6625 14.157 17.9129 14.2452 18.1767C14.3997 18.6394 14.3997 19.1493 14.3997 20.1692V21.9998" stroke="#0f0f0f" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>
						{
							gym.extra_services.map((service) => (
								<span key={service} className="capitalize">{service}</span>

							))
						}

					</div>
				</div>

			</NavLink>
		</li>

	)
}
