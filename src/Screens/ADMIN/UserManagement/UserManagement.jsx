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

