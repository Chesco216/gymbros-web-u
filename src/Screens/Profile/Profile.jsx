import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../store/useUser'
import { getUserFb } from './services/getUserFb'
import { UpdateForm } from './components/UpdateForm'
import { UserLayout } from '../Common/Layouts/UserLayout'
import { ProfileAttribute } from './components/ProfileAttribute'

export const Profile = () => {

	const user = useUser(state => state.user)
	const [update, setUpdate] = useState(false)

	const navigate = useNavigate()

	//TODO: add a function to set a new profile_photo

	const set_user = useUser(state => state.set_user)
	useEffect(() => {
		const lc = localStorage.getItem('user')
		const id = (lc) ? lc.replaceAll('"', '') : null
		console.log({ id })
		if (id) getUserFb(id).then(user => set_user(user))
	}, [])

	return (
		<UserLayout>
			{
				(user) &&

				<div className="w-full flex flex-col justify-center">
					<section className="px-2 py-4 flex flex-col justify-center items-center gap-3 w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-7xl">
						<h1 className="h1">Mi Perfil</h1>
						<img src={user.profile_photo} style={{ width: 50 }} />

						<ProfileAttribute label="Nombre" attribute={user.name} />
						<ProfileAttribute label="Email" attribute={user.email} />

						<input
							className="w-5 h-5"
							type='checkbox'
							onChange={() => setUpdate(!update)}
						/>
						{
							(!update) &&
							<div className="">
								<ProfileAttribute label="Numero de carnet de identidad" attribute={user.ci} />
								<ProfileAttribute label="Altura" attribute={user.height} />

								<ProfileAttribute label="Peso" attribute={user.weight} />

								<ProfileAttribute label="Numero de celular" attribute={user.phone} />
								<button onClick={() => navigate('/profile/payment')}>Gestionar incripcion y pago</button>
							</div>
						}
						{
							(update) &&
							<UpdateForm />
						}
					</section>
				</div>
			}
		</UserLayout>
	)
}

