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

	useEffect(() => {
		const lc = localStorage.getItem('user')
		const id = (lc) ? lc.replaceAll('"', '') : null
		console.log({ id })
		if (id) getUserFb(id).then(user => set_user(user))
	}, [])
  
  //TODO: add a function to set a new profile_photo

  const set_user = useUser(state => state.set_user)
  const clear_user = useUser(state => state.clear_user)
  useEffect(() => {
    const lc = localStorage.getItem('user')
    const id = (lc) ? lc.replaceAll('"', '') : null
    console.log({id})
    if(id) getUserFb(id).then(user => set_user(user))
  },[])

	const handleLogout = () => {
		console.log('Logging out...')
		localStorage.removeItem('user')
    clear_user()
		navigate('/login')
	}

	return (
		<UserLayout>
			{user && (
				<div className="min-h-screen bg-gradient-to-br from-fourth to-fourth/80 py-12 px-4 sm:px-6 lg:px-8">
					<div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
						<div className="bg-primary p-8 text-black">
							<div className="flex justify-between items-center">
								<h1 className="text-3xl font-bold">Mi Perfil</h1>
							</div>
						</div>
						<div className="p-8">
							<div className="flex flex-col items-center mb-8">
								<div className="relative">
									{
										user.profile_photo ?

											<img
												src={user.profile_photo}
												alt="Profile"
												className="w-32 h-32 rounded-full object-cover border-4 border-primary"
											/> :
											<div className="w-32 h-32 rounded-full object-cover border-4 border-primary">
												<svg className="w-5 h-5 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
													<path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
												</svg>
											</div>

									}
									<div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 cursor-pointer hover:bg-blue-600 transition-colors duration-300">
										<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
										</svg>
									</div>
								</div>
								<h2 className="mt-4 text-2xl font-semibold text-gray-800">{user.name}</h2>
								<p className="text-gray-600">{user.email}</p>
							</div>

							<div className="flex items-center justify-center mb-8">
								<label className="inline-flex items-center cursor-pointer">
									<input
										type="checkbox"
										checked={update}
										onChange={() => setUpdate(!update)}
										className="sr-only peer"
									/>
									<div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
									<span className="ml-3 text-sm font-medium text-gray-700">
										{update ? 'Modo de actualización' : 'Modo de visualización'}
									</span>
								</label>
							</div>

							{!update ? (
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<ProfileAttribute label="Número de carnet de identidad" attribute={user.ci} />
									<ProfileAttribute label="Altura" attribute={user.height} metric="cm" />
									<ProfileAttribute label="Peso" attribute={user.weight} metric="kg" />
									<ProfileAttribute label="Número de celular" attribute={user.phone} />
								</div>
							) : (
								<UpdateForm />
							)}

							{!update && (
								<button
									onClick={() => navigate('/profile/payment')}
									className="mt-8 mb-4 w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary/90 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 fade-in"
									type="button"
								>
									Gestionar inscripción y pago
								</button>
							)}


							<button
								type="button"
								className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-md font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 fade-in gap-2"
								onClick={handleLogout}
							>
								<svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12H20M20 12L17 9M20 12L17 15" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M4 12C4 7.58172 7.58172 4 12 4M12 20C9.47362 20 7.22075 18.8289 5.75463 17" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>

								Cerrar sesión
							</button>
						</div>
					</div>
				</div>
			)}
		</UserLayout>
	)
}
