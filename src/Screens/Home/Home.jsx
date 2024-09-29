import { useEffect } from "react";
import { Navbar } from "../Common/Navbar"
import { FilterBy } from "./components/FilterBy"
import { SearchBar } from "./components/SearchBar"
import { GymGrid } from "./components/GymGrid";

export const Home = () => {
	const filterOptions = [
		{ value: 'highest-rated', label: 'Mejor valorado' },
		{ value: 'nearest', label: 'Mas cercano' },
		{ value: 'lowest-price', label: 'Mas barato' }
	];
	const dropDownMenuList = [
		{ name: 'Iniciar Sesion', url: '/login', icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11 20H19C20.1046 20 21 19.1046 21 18V6C21 4.89543 20.1046 4 19 4H11M3 12H14M14 12L11 15M14 12L11 9" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg> },

	];


	const handleFilterChange = (selectedOption) => {
		console.log('Selected Filter:', selectedOption);
	};
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [])
	return (

		<div className="flex flex-col min-h-screen bg-fourth sm:items-center">
			<Navbar dropDownMenuList={dropDownMenuList} />
			<SearchBar />
			<FilterBy options={filterOptions} onSelect={handleFilterChange} />
			<GymGrid />



		</div>
	)
}

