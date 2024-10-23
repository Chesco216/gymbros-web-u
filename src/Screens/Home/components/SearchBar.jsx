import { useState } from "react";

export const SearchBar = ({ onSubmit }) => {
	const [gymSearch, setGymSearch] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(gymSearch);
	};

	return (
		<section className="w-full flex justify-center">
			<form onSubmit={handleSubmit} className="px-2 py-4 flex gap-3 w-full md:max-w-3xl lg:max-w-4xl xl:max-w-7xl">
				<input
					className="w-full h-14 xl:h-16 px-5 border border-primary xl:px-4"
					placeholder="Nombre del gimnasio"
					type="text"
					value={gymSearch}
					onChange={(e) => setGymSearch(e.target.value)}
				/>
				<button className="bg-primary px-3 xl:px-5 hover:bg-primary/90 rounded-md" type="submit">
					<svg
						className="w-8 h-8"
						fill="#000000"
						viewBox="0 0 32 32"
						xmlns="http://www.w3.org/2000/svg"
						transform="matrix(-1, 0, 0, 1, 0, 0)"
					>
						<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
						<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
						<g id="SVGRepo_iconCarrier">
							<path
								d="M27 24.57l-5.647-5.648a8.895 8.895 0 0 0 1.522-4.984C22.875 9.01 18.867 5 13.938 5 9.01 5 5 9.01 5 13.938c0 4.929 4.01 8.938 8.938 8.938a8.887 8.887 0 0 0 4.984-1.522L24.568 27 27 24.57zm-13.062-4.445a6.194 6.194 0 0 1-6.188-6.188 6.195 6.195 0 0 1 6.188-6.188 6.195 6.195 0 0 1 6.188 6.188 6.195 6.195 0 0 1-6.188 6.188z"
							></path>
						</g>
					</svg>
				</button>
			</form>
		</section>
	);
};
