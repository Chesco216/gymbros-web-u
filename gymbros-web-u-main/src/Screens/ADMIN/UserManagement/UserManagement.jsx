import { useEffect, useState } from 'react'
import { UserGrid } from './components/UserGrid/UserGrid'
import { AddUserModal } from './components/AddUserModal/AddUserModal'
import { useUserList } from '../store/useUserList'
import { getUsers } from '../services/getUsers'
import { UserLayout } from '../../Common/Layouts/UserLayout'

//PERF: no esta del todo bien esto
export const UserManagement = () => {
	const [updateUser, setUpdateUser] = useState();
	const [userCI, setUserCI] = useState();
	const [isOpen, setIsOpen] = useState(false);

	const [mod, setMod] = useState()

	// const users = useUserList(state => state.userList)
	// const setUsers = useUserList(state => state.set_user_list)

	const [users, setUsers] = useState();

	useEffect(() => {
		getUsers().then((us) => setUsers(us))
	}, [])

	const handleUsers = () => {
		setUsers(userCI)
	}

	return (

		<UserLayout>
			<div className={`w-full flex justify-center py-10 fade-in`}>
				<section className="flex flex-col 2xl:w-[1300px] bg-white rounded-xl p-16 shadow-md">
					<h1 className="text-4xl font-bold mb-5 slide-in">Gestion de Usuarios</h1>
					<div className="flex gap-4 mb-5">
						<input
							name='user_ci'
							value={userCI}
							type='text'
							placeholder='Search users...'
							onChange={(e) => setUserCI(e.target.value)}
							className="border border-gray-300 px-4 py-2 rounded-md w-1/2 slide-in-reverse"
						/>
						<button
							onClick={handleUsers}
							className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 shadow-black/5 shadow-xl font-semibold slide-in-reverse"
						>
							Buscar
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

					{users && <UserGrid users={users} setIsOpen={setIsOpen} setMod={setMod} setUpdateUser={setUpdateUser} />}
					{isOpen && <AddUserModal isOpen={isOpen} setIsOpen={setIsOpen} mod={mod} userInfo={updateUser} />}
				</section>
			</div>
		</UserLayout>
	)
}

