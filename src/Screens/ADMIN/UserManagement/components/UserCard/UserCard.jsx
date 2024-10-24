import styles from './UserCard.module.css'


export const UserCard = ({ name, ci, isActive, expires, plan, setIsOpen, setMod, setUpdateUser }) => {

	// console.log('expires date: ', expires.seconds)
	const dateObj = new Date(expires.seconds * 1000)
	const date = `${dateObj.getDate()} / ${dateObj.getMonth()} / ${dateObj.getFullYear()}`

	const handleUpdate = () => {
		setIsOpen(true)
		setMod('Actualizar')
		setUpdateUser({ name, ci, plan });
	}

	return (
		<tr className="bg-white border-b hover:bg-gray-50 fade-in">
			<th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap capitalize">{name}</th>
			<td className="px-6 py-4">{ci}</td>
			<td className="px-6 py-4">{(isActive) ? 'Activo' : 'Expirado'}</td>
			<td className="px-6 py-4">{date}</td>
			<td className="px-6 py-4 capitalize">{plan}</td>
			<td className="px-6 py-4 text-right">

				<button onClick={() => handleUpdate()} className="text-primary hover:underline"> Editar </button>
			</td>
		</tr>
	)
}
