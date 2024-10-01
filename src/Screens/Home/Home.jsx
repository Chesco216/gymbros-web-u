import { useEffect } from "react";
import { Navbar } from "../Common/Navbar"
import { FilterBy } from "./components/FilterBy"
import { SearchBar } from "./components/SearchBar"
import { GymGrid } from "./components/GymGrid";
import { UserLayout } from "../Common/Layouts/UserLayout";

export const Home = () => {
	const filterOptions = [
		{ value: 'highest-rated', label: 'Mejor valorado' },
		{ value: 'nearest', label: 'Mas cercano' },
		{ value: 'lowest-price', label: 'Mas barato' }
	];


	const handleFilterChange = (selectedOption) => {
		console.log('Selected Filter:', selectedOption);
	};
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [])
	return (
		<UserLayout>
			<SearchBar />
			<FilterBy options={filterOptions} onSelect={handleFilterChange} />
			<GymGrid />
		</UserLayout>
	)
}

