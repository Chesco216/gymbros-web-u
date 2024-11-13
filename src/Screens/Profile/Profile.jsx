import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../store/useUser'
import { getUserFb } from './services/getUserFb'
import { UpdateForm } from './components/UpdateForm'
import { UserLayout } from '../Common/Layouts/UserLayout'
import { ProfileAttribute } from './components/ProfileAttribute'
import styles from './Profile.module.css'
import { getDownloadURL } from 'firebase/storage'
import { AddImageModal } from './components/AddImageModal'

export const Profile = () => {

	// user
	const user = useUser(state => state.user)

	// toggle update or not
	const [update, setUpdate] = useState(false)
	// navigate
	const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

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
      {
        (isOpen) && <AddImageModal setIsOpen={setIsOpen}/>
      }
			{user && (
				<div className="min-h-screen bg-gradient-to-br from-fourth to-fourth/80 py-12 px-4 sm:px-6 lg:px-8">
					<div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
						<div className="bg-primary p-8 text-black">
							<div className="flex justify-between items-center">
								<h1 className="text-3xl font-bold slide-in">Mi Perfil</h1>
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
											<div className="w-32 h-32 rounded-full object-cover border-4 border-primary bg-gray-300 animate-pulse">
											</div>

									}

									<div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 cursor-pointer hover:bg-blue-600 transition-colors duration-300">
										<svg onClick={() => setIsOpen(true)} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">

											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
										</svg>
									</div>
								</div>
								{
									user.name ?

										<h2 className="mt-4 text-2xl font-semibold text-gray-800">{user.name}</h2>
										:

										<div className="animate-pulse h-7 bg-gray-300 rounded-full w-32 mt-4 mb-3"></div>

								}

								{
									user.email ?

										<p className="text-gray-600">{user.email}</p>
										:
										<div className="animate-pulse h-5 bg-gray-300 rounded-full w-44"></div>

								}
							</div>

							<div className="flex items-center justify-center mb-8">
								<div className="w-full max-w-sm flex flex-col mx-auto text-center">

									<div className="relative w-full rounded-md border h-10 p-1 bg-gray-200">
										<div className="relative w-full h-full flex items-center text-sm">
											<div onClick={() => setUpdate(!update)} className="w-full flex justify-center text-gray-400 cursor-pointer">
												<button className="fade-in">Ver Perfil</button>
											</div>
											<div onClick={() => setUpdate(!update)} className="w-full flex justify-center text-gray-400 cursor-pointer">
												<button className="fade-in">Actualizar Perfil</button>
											</div>
										</div>

										<span
											className={`bg-white shadow text-sm flex items-center justify-center w-1/2 rounded h-[1.88rem] transition-all duration-200 ease-linear top-[4px] absolute ${!update ? 'left-1 text-primary font-semibold' : 'left-1/2 -ml-1 text-primary font-semibold'} fade-in`}
										>
											{!update ? "Viendo perfil" : "Actualizando Perfil"}
										</span>
									</div>
								</div>
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
							)
							}

							{!update && (
								<button
									onClick={() => navigate('/profile/payment')}
									className="flex gap-2 justify-center mt-8 w-full bg-primary text-white py-3 px-4 rounded-lg hover:bg-primary/90 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 slide-in mb-4"
									type="button"
								>
									<svg className="w-6 h-6" version="1.1" id="_ x32_" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve" fill="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css">  </style> <g> <path className="st0" d="M0,47.7v416.6h512V47.7H0z M50.881,413.415V98.585h410.238v314.83H50.881z"></path> <rect x="238.51" y="159.004" className="st0" width="178.086" height="34.985"></rect> <rect x="238.51" y="238.508" className="st0" width="178.086" height="34.985"></rect> <rect x="95.404" y="318.011" className="st0" width="321.192" height="34.984"></rect> <path className="st0" d="M152.646,204.463c19.107,0,34.652-15.548,34.652-34.655s-15.546-34.654-34.652-34.654 c-19.106,0-34.649,15.547-34.649,34.654S133.54,204.463,152.646,204.463z"></path> <path className="st0" d="M191.295,247.926c0-13.222-9.276-29.142-21.118-36.242l-0.376-0.229h-34.307l-0.376,0.229 c-11.842,7.1-21.118,23.02-21.118,36.242Modov25.567h77.296V247.926z"></path> </g> </g></svg>
									Gestionar inscripción y pago
								</button>
							)}


							<button
								type="button"
								className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-md font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 slide-in gap-2"
								onClick={handleLogout}
							>
								<svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12H20M20 12L17 9M20 12L17 15" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M4 12C4 7.58172 7.58172 4 12 4M12 20C9.47362 20 7.22075 18.8289 5.75463 17" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>

								Cerrar sesión
							</button>
						</div>
					</div>
				</div>
			)
			}
		</UserLayout >
	)
}
