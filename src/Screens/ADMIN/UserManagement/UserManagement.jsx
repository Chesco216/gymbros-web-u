import { useEffect, useState } from 'react'
import { UserGrid } from './components/UserGrid/UserGrid'
import { AddUserModal } from './components/AddUserModal/AddUserModal'
import { useUserList } from '../store/useUserList'
import { getUsers } from '../services/getUsers'
import { UserLayout } from '../../Common/Layouts/UserLayout'
import { useNavigate } from 'react-router-dom'

//PERF: no esta del todo bien esto
export const UserManagement = () => {
	const [updateUser, setUpdateUser] = useState();
	const [userCI, setUserCI] = useState();
	const [isOpen, setIsOpen] = useState(false);

	const [mod, setMod] = useState()

	// const users = useUserList(state => state.userList)
	// const setUsers = useUserList(state => state.set_user_list)

	const navigate = useNavigate();

	const [users, setUsers] = useState([]);
	const [usersFiltered, setUsersFiltered] = useState();

	useEffect(() => {
		getUsers().then((us) => {
			setUsers(us);
			setUsersFiltered(us);
		})
	}, [])

	const handleRefresh = () => {
		getUsers().then((us) => {
			setUsers(us);
			setUsersFiltered(us);
		})
	}


	const handleSubmit = (e) => {
		e.preventDefault();
		if (userCI.trim().length === 0) {
			setUsersFiltered(users);
		}

		setUsersFiltered(users.filter((u) => u.ci.toLowerCase().includes(userCI.toLowerCase())));

	}


	return (

		<UserLayout>
			<div className={`w-full flex justify-center py-10 fade-in`}>
				<section className="flex flex-col 2xl:w-[1300px] bg-white rounded-xl p-16 shadow-md">
					<h1 className="text-4xl font-bold mb-5 slide-in">Gestion de Clientes</h1>


					<div className="flex w-full gap-4 mb-5">
						<form onSubmit={handleSubmit} className="flex gap-4" action="">
							<input
								name='user_ci'
								value={userCI}
								type='number'
								placeholder='Buscar clientes por CI'
								onChange={(e) => setUserCI(e.target.value)}
								className="border border-gray-300 px-4 py-2 rounded-md w-full slide-in-reverse"
							/>
							<button
								type='submit'
								className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 shadow-black/5 shadow-xl font-semibold slide-in-reverse"
							>
								Buscar
							</button>

						</form>

		<button className="border-2 border-black py-1 px-2 rounded-xl " onClick={handleRefresh}>
							<svg className="w-7 h-7 hover:animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18.6091 5.89092L15.5 9H21.5V3L18.6091 5.89092ZM18.6091 5.89092C16.965 4.1131 14.6125 3 12 3C7.36745 3 3.55237 6.50005 3.05493 11M5.39092 18.1091L2.5 21V15H8.5L5.39092 18.1091ZM5.39092 18.1091C7.03504 19.8869 9.38753 21 12 21C16.6326 21 20.4476 17.5 20.9451 13" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
						</button>
						<button
							onClick={() => {
								setIsOpen(true);
								setMod('Crear');
								setUpdateUser({});
							}}
							className="ml-auto px-5 py-3 bg-black text-white rounded-md font-semibold slide-in-reverse"
							data-modal-target="cu-users"
							data-modal-toggle="cu-users"
							type="button"
						>

							Crear Usuario
						</button>
					</div>

					{usersFiltered && <UserGrid users={usersFiltered} setIsOpen={setIsOpen} setMod={setMod} setUpdateUser={setUpdateUser} />}
					{isOpen && <AddUserModal isOpen={isOpen} setIsOpen={setIsOpen} mod={mod} userInfo={updateUser} />}
				</section>
			</div>
		</UserLayout>
	)
}

