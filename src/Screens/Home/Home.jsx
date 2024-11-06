import { useEffect, useState } from "react";
import { FilterBy } from "./components/FilterBy"
import { SearchBar } from "./components/SearchBar"
import { GymGrid } from "./components/GymGrid";
import { UserLayout } from "../Common/Layouts/UserLayout";
import { gyms } from "../../../assets/gyms"
import { Welcome } from "./components/Welcome";
import { AboutUs } from "./components/AboutUs";
import { getGymsFb } from "./services/getGymsFb";
import { useGym } from "../../store/useGym";
import { getUserFb } from "../Profile/services/getUserFb";
import { useUser } from "../../store/useUser";

export const Home = () => {

	const gymsFiltered = useGym(state => state.gyms)
	const setGymsFiltered = useGym(state => state.set_gyms)
	const filterOptions = [
		{ value: 'all', label: 'Todos' },
		{ value: 'highest-rated', label: 'Mejor valorado' },
		{ value: 'lowest-price', label: 'Mas barato' }
	];

	const handleFilterChange = (selectedOption) => {
		switch (selectedOption) {
			case "highest-rated":
				setGymsFiltered(gyms.filter((g) => g.stars >= 3.5));
				break;
			case "lowest-price":
				setGymsFiltered(gyms.filter((g) => g.suscription_price <= 300));
				break;
			case "all":
				setGymsFiltered(gyms);
				break;
		}
	};

	const handleSubmit = (inputValue) => {
		setGymsFiltered(gyms.filter((g) => g.name.toLowerCase().includes(inputValue.toLowerCase())));
	}

	useEffect(() => {
		window.scrollTo(0, 0);
		getGymsFb().then(gyms => setGymsFiltered(gyms))
	}, [])

	return (
		<UserLayout>

			<Welcome />

			<SearchBar onSubmit={handleSubmit} />
			<FilterBy options={filterOptions} onSelect={handleFilterChange} />
			{
				gymsFiltered.length !== 0 ?
					<GymGrid gyms={gymsFiltered} /> :
					<section className="px-2 py-4 w-full flex justify-center">
						<p className="md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl font-bold text-xl py-10 lg:text-2xl xl:text-3xl">No se encontraron resultados para esa busqueda</p>
					</section>

			}
			<AboutUs />
		</UserLayout>
	)
}

