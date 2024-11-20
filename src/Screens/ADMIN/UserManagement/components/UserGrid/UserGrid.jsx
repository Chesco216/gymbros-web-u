import { UserCard } from '../UserCard/UserCard'

export const UserGrid = ({ users, setIsOpen, setMod, setUpdateUser }) => {

	return (
		<div className="overflow-x-auto mt-5">
			<table className="w-full text-left rtl:text-right text-lg">
				<thead className="text-gray-500 font-light ">
					<tr>
						<th scope="col" className="px-6 py-3">Nombre</th>
						<th scope="col" className="px-6 py-3">CI</th>
						<th scope="col" className="px-6 py-3">Estado</th>
						<th scope="col" className="px-6 py-3">Expira</th>
						<th scope="col" className="px-6 py-3">Plan</th>
					</tr>
				</thead>
				<tbody>

					{
						users.map(user => <UserCard
							key={user.uid}
							uid={user.uid}
							name={user.name}
							ci={user.ci}
							isActive={user.is_active}
							expires={user.expires_at}
							plan={user.plan}
							setIsOpen={setIsOpen}
							setMod={setMod}
							setUpdateUser={setUpdateUser}
						/>)
					}
				</tbody>
			</table>
		</div>
	)
}

