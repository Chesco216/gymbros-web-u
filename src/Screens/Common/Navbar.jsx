import { useState } from "react";
import { NavLink } from "react-router-dom";


const dropDownMenuList = [
	{ name: 'Iniciar Sesion', url: '/login', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11 20H19C20.1046 20 21 19.1046 21 18V6C21 4.89543 20.1046 4 19 4H11M3 12H14M14 12L11 15M14 12L11 9" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg> },

];

export const Navbar = () => {
	const [isDropdownVisible, setDropdownVisible] = useState(false);

	const handleMouseEnter = () => {
		setDropdownVisible(true);
	};

	const handleMouseLeave = () => {
		setDropdownVisible(false);
	};

	return (
		<header className="flex bg-primary px-3 py-5 shadow-md w-full sm:px-4 sm:py-5 xl:px-32 xl:py-6 items-center justify-center">
			<h1 className="text-2xl font-bold sm:text-3xl xl:text-4xl">Gymbros</h1>

			<div
				className="relative ml-auto"
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				<button
					id="dropdownHoverButton"
					className="text-black bg-white hover:bg-gray-300/90 focus:ring-4 focus:outline-none focus:ring-primary font-bold rounded-lg text-base px-5 py-2.5 text-center inline-flex items-center gap-1 xl:gap-2 xl:px-10 xl:py-5 border border-gray-200 shadow-lg"
					type="button"
				>
					<svg className="w-5 h-5" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> </style> <g> <path className="st0" d="M458.159,404.216c-18.93-33.65-49.934-71.764-100.409-93.431c-28.868,20.196-63.938,32.087-101.745,32.087 c-37.828,0-72.898-11.89-101.767-32.087c-50.474,21.667-81.479,59.782-100.398,93.431C28.731,448.848,48.417,512,91.842,512 c43.426,0,164.164,0,164.164,0s120.726,0,164.153,0C463.583,512,483.269,448.848,458.159,404.216z"></path> <path className="st0" d="M256.005,300.641c74.144,0,134.231-60.108,134.231-134.242v-32.158C390.236,60.108,330.149,0,256.005,0 c-74.155,0-134.252,60.108-134.252,134.242V166.4C121.753,240.533,181.851,300.641,256.005,300.641z"></path> </g> </g></svg>
					Mi perfil
					<svg
						className="w-2.5 h-2.5 ml-3"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 10 6"
					>
						<path
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="m1 1 4 4 4-4"
						/>
					</svg>
				</button>

				{isDropdownVisible && (
					<div
						id="dropdownHover"
						className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-44 xl:w-60 right-0"
					>
						<ul
							className="text-md text-gray-700"
							aria-labelledby="dropdownHoverButton"
						>
							{
								dropDownMenuList.map(menu => (
									<li key={menu.name}>
										<NavLink
											to={menu.url}
											className="flex gap-3 px-2 py-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white rounded-lg text-base"
										>
											{menu.icon}
											{menu.name}
										</NavLink>
									</li>

								))
							}

						</ul>
					</div>
				)}
			</div>
		</header>
	);
};
