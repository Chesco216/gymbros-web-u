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
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase/firebasse.js'
import { useNavigate } from 'react-router-dom'

export const Home = () => {

	const navigate = useNavigate()
	const user = useUser(state => state.user)

	const gymsFiltered = useGym(state => state.gyms)
	const setGymsFiltered = useGym(state => state.set_gyms)

	const filterOptions = [
		{ value: 'all', label: 'Todos' },
		{ value: 'highest-rated', label: 'Mejor valorado' },
		{ value: 'lowest-price', label: 'Mas barato' }
	];

	const handleFilterChange = (selectedOption) => {
		let sortedGyms;
		switch (selectedOption) {
			case "highest-rated":
				sortedGyms = [...gyms].sort((a, b) => b.stars - a.stars);
				setGymsFiltered(sortedGyms);
				break;
			case "lowest-price":
				sortedGyms = [...gyms].sort((a, b) => a.suscription_price - b.suscription_price);
				setGymsFiltered(sortedGyms);
				break;
			case "all":
				setGymsFiltered(gyms);
				break;
			default:
				setGymsFiltered(gyms);
				break;
		}
	};

	const handleSubmit = (inputValue) => {
		setGymsFiltered(gyms.filter((g) => g.name.toLowerCase().includes(inputValue.toLowerCase())));
	}

	const set_user = useUser(state => state.set_user)

	useEffect(() => {
		console.log({ user })
		window.scrollTo(0, 0);
		getGymsFb().then(gyms => {
			setGymsFiltered(gyms)
		})
		const lc = localStorage.getItem('user')

		if (lc) {
			const id = lc.replaceAll('"', '');
			getDoc(doc(db, 'user', id)).then(userFb => set_user(userFb.data()))
		}
		if (user) {
			(user.id_rol == 1) ? navigate('/')
				: (user.id_rol == 2) ? navigate('/admin/users')
					: (user.id_rol == 3) ? navigate('/superadmin/gyms')
						: (user.id_rol == 4) ? navigate('/trainer/users')
							: null
		}
	}, [])

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

