import { useEffect } from "react";
import { FilterBy } from "./components/FilterBy";
import { SearchBar } from "./components/SearchBar";
import { GymGrid } from "./components/GymGrid";
import { UserLayout } from "../Common/Layouts/UserLayout";
import { Welcome } from "./components/Welcome";
import { AboutUs } from "./components/AboutUs";
import { useGym } from "../../store/useGym";
import { useUser } from "../../store/useUser";
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/firebasse.js';
import { useNavigate } from 'react-router-dom';
import { GymGridSkeleton } from "./components/GymGridSkeleton.jsx";

export const Home = () => {
	const navigate = useNavigate();
	const user = useUser(state => state.user);

	const {
		gyms,
		filteredGyms,
		fetchGyms,
		setFilter,
		setSearchQuery,
		loading,
		error,
	} = useGym();

	console.log(gyms);

	const set_user = useUser(state => state.set_user);

	useEffect(() => {
		console.log({ user });
		window.scrollTo(0, 0);

		if (gyms?.length === 0) {
			fetchGyms();
		}


		const lc = localStorage.getItem('user');
		if (lc) {
			const id = lc.replaceAll('"', '');
			getDoc(doc(db, 'user', id)).then(userFb => {
				if (userFb.exists()) {
					set_user(userFb.data());
				}
			});
		}

		if (user) {
			switch (user.id_rol) {
				case 1:
					navigate('/');
					break;
				case 2:
					navigate('/admin/users');
					break;
				case 3:
					navigate('/superadmin/gyms');
					break;
				case 4:
					navigate('/trainer/users');
					break;
				default:
					break;
			}
		}
	}, [gyms?.length]);

	const filterOptions = [
		{ value: 'all', label: 'Todos' },
		{ value: 'highest-rated', label: 'Mejor valorado' },
		{ value: 'lowest-price', label: 'Más barato' },
	];

	const handleFilterChange = (selectedOption) => {
		setFilter(selectedOption);
	};

	const handleSubmit = (inputValue) => {
		setSearchQuery(inputValue);
	}

	if (user) {
		(user.id_rol == 2) ? navigate('/admin/users')
			: (user.id_rol == 3) ? navigate('/superadmin/gyms')
				: (user.id_rol == 4) ? navigate('/trainer/users')
					: null
	}

	return (
		<UserLayout>
			<Welcome />
			<SearchBar onSubmit={handleSubmit} />
			<FilterBy options={filterOptions} onSelect={handleFilterChange} />

			{loading && (
				<GymGridSkeleton />
			)}

			{error && (
				<section className="px-2 py-4 w-full flex justify-center">
					<p className="text-red-500 text-xl">Error: {error}</p>
				</section>
			)}

			{!loading && !error && (
				<>
					{filteredGyms().length !== 0 ? (
						<GymGrid gyms={filteredGyms()} />
					) : (
						<section className="px-2 py-4 w-full flex justify-center">
							<p className="md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl font-bold text-xl py-10 lg:text-2xl xl:text-3xl">
								No se encontraron resultados para esa búsqueda
							</p>
						</section>
					)}
				</>
			)}

			<AboutUs />
		</UserLayout>
	);
};
