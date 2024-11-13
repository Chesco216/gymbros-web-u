import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useUser } from "../../store/useUser";
import { ProfileIcon } from "./Icons/ProfileIcon";
import { GymIcon } from "./Icons/GymIcon";
import { LoginIcon } from "./Icons/LoginIcon";
import { GymbrosIcon } from "./Icons/GymbrosIcon";

export const Navbar = () => {
	const [isDropdownVisible, setDropdownVisible] = useState(false);
	const user = useUser((state) => state.user);
	console.log(user.uid);

	let dropDownMenuList = user
		? [
			{
				name: "Mi Perfil",
				url: "/profile",
				icon: (
					<ProfileIcon />
				),
			},
			{
				name: "Gimnasios",
				url: "/",
				icon: (
					<GymIcon />
				),
			}
		]
		: [
			{
				name: "Iniciar Sesión",
				url: "/login",
				icon: (
					<LoginIcon />
				),
			},
		];


	const handleMouseEnter = () => {
		setDropdownVisible(true);
	};

	const handleMouseLeave = () => {
		setDropdownVisible(false);
	};

	return (
		<header className="flex bg-primary px-3 h-16 xl:h-20 2xl:h-24 shadow-md w-full sm:px-10 xl:px-40 items-center justify-center fixed z-10">
			<NavLink
				to="/"
				className="flex gap-2 items-center text-2xl font-bold sm:text-3xl xl:text-4xl hover:text-gray-900 uppercase"
			>
				<GymbrosIcon />

				Gymbros
			</NavLink>

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
					<svg
						className="w-5 h-5"
						viewBox="0 0 512 512"
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg"
					>
						{/* SVG para el icono del botón */}
						<path
							d="M256 256a128 128 0 100-256 128 128 0 000 256zm0 64c-70.7 0-256 35.3-256 106v42h512v-42c0-70.7-185.3-106-256-106z"
							fill="#000"
						/>
					</svg>
					Mi perfil
					<svg
						className="w-2.5 h-2.5 ml-3"
						aria-hidden="true"
						viewBox="0 0 10 6"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M1 1l4 4 4-4"
						/>
					</svg>
				</button>

				{isDropdownVisible && (
					<div
						id="dropdownHover"
						className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-44 xl:w-60 right-0"
					>
						<ul
							className="text-md text-black"
							aria-labelledby="dropdownHoverButton"
						>
							{dropDownMenuList.map((menu) => (
								<li key={menu.name}>
									<NavLink
										to={menu.url}
										className="flex gap-3 px-4 py-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white rounded-lg text-base items-center"
									>
										{menu.icon}
										{menu.name}
									</NavLink>
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</header>
	);
};
