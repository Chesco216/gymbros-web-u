import { useEffect, useState } from 'react'
import { UserGrid } from './components/UserGrid/UserGrid'
import { AddUserModal } from './components/AddUserModal/AddUserModal'
import { getUsers } from '../services/getUsers'
import { UserLayout } from '../../Common/Layouts/UserLayout'
import { useNavigate } from 'react-router-dom'


// pdf
import jsPDF from 'jspdf';
import 'jspdf-autotable';
//excel
import * as XLSX from 'xlsx';
import { useUser } from '../../../store/useUser'

// icons
import { PdfIcon } from './icons/PdfIcon'
import { ExcelIcon } from './icons/ExcelIcon'


//PERF: no esta del todo bien esto
export const UserManagement = () => {
	const [updateUser, setUpdateUser] = useState();
	const [userCI, setUserCI] = useState();
	const [isOpen, setIsOpen] = useState(false);

	const [mod, setMod] = useState()

	const user = useUser((state) => state.user);


	const navigate = useNavigate();

	const [users, setUsers] = useState([]);
	const [usersFiltered, setUsersFiltered] = useState();


	// refresh
	const [refreshing, setRefreshing] = useState(true);

	useEffect(() => {
		getUsers().then((us) => {
			setUsers(us);
			setUsersFiltered(us);
			setRefreshing(false);

		})
	}, [])

	const generateExcel = () => {
		const worksheet = XLSX.utils.json_to_sheet(
			users.map((user) => ({
				ID: user.uid,
				Nombre: user.name,
				'Carnet de Identidad': user.ci,
				Estado: user.is_active ? 'Activo' : 'Inactivo',
				'Expira en': user.expires_at.toDate().toLocaleString().slice(0, 24),
			}))
		);

		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, 'Usuarios');

		XLSX.writeFile(workbook, 'reporte_de_usuarios.xlsx');
	};

	const generatePDF = () => {
		const doc = new jsPDF();


		doc.addImage('../../../../public/gym.png', 'PNG', 170, 9, 20, 20);
		doc.setFont('helvetica', 'bold');

		doc.setFontSize(18);
		doc.text('GYMBROS', 89, 34);
		doc.text('Reporte de Usuarios', 74, 43);


		doc.setFontSize(12);
		const fecha = new Date().toLocaleString();
		doc.text(`Generado por:`, 14, 51);

		doc.setFont('helvetica', 'normal');
		doc.text(`Nombre: ${user.name}`, 14, 58);
		doc.text(`Email: ${user.email}`, 14, 66);
		doc.text(`Fecha: ${fecha}`, 14, 74);

		const tableColumn = ['ID', 'Nombre', 'Carnet de identidad', 'Estado', 'Expira en'];
		const tableRows = [];

		users.forEach((user) => {
			const userData = [
				user.uid.slice(0, 15),
				user.name,
				user.ci,
				user.is_active ? 'Activo' : 'Inactivo',
				user.expires_at.toDate().toLocaleString().slice(0, 24),
			];
			tableRows.push(userData);
		});

		doc.autoTable({
			head: [tableColumn],
			body: tableRows,
			startY: 79,
		});

		doc.save('reporte_de_usuarios.pdf');
	};
	const handleRefresh = () => {

		setRefreshing(true);
		getUsers().then((us) => {
			setUsers(us);
			setUsersFiltered(us);
			setRefreshing(false);
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
								className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 shadow-black/5 shadow-xl font-semibold slide-in-reverse flex items-center gap-2 text-sm"
							>
								Buscar

								<svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
							</button>

						</form>

						<button className="border-2 border-black py-1 px-2 rounded-xl" onClick={handleRefresh}>
							<svg className={`w-7 h-7 ${refreshing ? 'animate-spin' : ''}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18.6091 5.89092L15.5 9H21.5V3L18.6091 5.89092ZM18.6091 5.89092C16.965 4.1131 14.6125 3 12 3C7.36745 3 3.55237 6.50005 3.05493 11M5.39092 18.1091L2.5 21V15H8.5L5.39092 18.1091ZM5.39092 18.1091C7.03504 19.8869 9.38753 21 12 21C16.6326 21 20.4476 17.5 20.9451 13" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
						</button>


						<button onClick={() => generatePDF()} type="button" className="gap-2 flex items-center text-white bg-gradient-to-br from-red-700/80 to-red-700 hover:bg-red-700/60 font-semibold rounded-lg px-5 py-3 text-center text-sm"><PdfIcon /> Exportar en PDF</button>

						<button onClick={() => generateExcel()} type="button" className="gap-2 flex items-center text-white bg-gradient-to-br from-green-700/80 to-green-700 hover:bg-green-700/60 font-semibold rounded-lg px-5 py-3 text-center text-sm"> <ExcelIcon /> Exportar en Excel</button>
						<button
							onClick={() => {
								setIsOpen(true);
								setMod('Crear');
								setUpdateUser({});
							}}
							className="ml-auto px-5 py-3 bg-black text-white rounded-md font-semibold slide-in-reverse hover:bg-black/[0.85] text-sm"
							data-modal-target="cu-users"
							data-modal-toggle="cu-users"
							type="button"
						>

							Inscribir Usuario
						</button>

					</div>

					{usersFiltered && <UserGrid users={usersFiltered} setIsOpen={setIsOpen} setMod={setMod} setUpdateUser={setUpdateUser} />}
					{isOpen && <AddUserModal isOpen={isOpen} setIsOpen={setIsOpen} mod={mod} userInfo={updateUser} />}
				</section>
			</div>
		</UserLayout>
	)
}

