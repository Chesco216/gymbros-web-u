import { UserCard } from '../UserCard/UserCard'

export const UserGrid = ({ users, setIsOpen, setMod, setUpdateUser, setCurrentPage, currentPage, totalPages }) => {

	return (
		<div className="overflow-x-auto mt-5">
			<table className="w-full text-left rtl:text-right text-lg">
				<thead className="text-gray-500 font-light ">
					<tr>
						<th scope="col" className="px-6 py-3">Nombre</th>
						<th scope="col" className="px-6 py-3">Numero de documento</th>
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
			<div className="mt-10 flex justify-center items-center -space-x-px h-10 text-sm">
				<button
					onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
					disabled={currentPage === 1}
					className="flex items-center justify-center px-3 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 disabled:bg-red-100"
				>
					<svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
						<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
					</svg>
				</button>
				{Array.from({ length: totalPages }, (_, index) => (
					<button
						key={index + 1}
						onClick={() => setCurrentPage(index + 1)}
						className={`flex items-center justify-center px-3 h-10 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${currentPage === index + 1
							? 'bg-gray-100 text-gray-700'
							: 'bg-white text-gray-500'
							}`}
					>
						{index + 1}
					</button>
				))}
				<button
					onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
					disabled={currentPage === totalPages}
					className="flex items-center justify-center px-3 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 cursor-pointer disabled:bg-red-100"
				>
					<svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
						<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
					</svg>
				</button>
			</div>
		</div>
	)
}

