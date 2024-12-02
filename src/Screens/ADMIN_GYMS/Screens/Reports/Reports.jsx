// export const Reports = () => {
// 	return (
// 		<div>
//       
//     </div>
// 	)
// }

import { UserLayout } from '../../../Common/Layouts/UserLayout.jsx'
import React, { useState } from 'react'
import { Bar, Line } from 'react-chartjs-2'
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	PointElement
} from 'chart.js'
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select"
import { useGym } from '../../../../store/useGym.js'

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	PointElement
)

import * as XLSX from 'xlsx';
import { ExcelIcon } from '../../../ADMIN/UserManagement/icons/ExcelIcon.jsx'


export const Reports = () => {
	const [selectedGym, setSelectedGym] = useState('all')

  const {gyms}= useGym()
  console.log({gyms})

	const barChartData = {
		labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
		datasets: [
			{
				label: 'Nuevos Miembros',
				data: [65, 59, 80, 81, 56, 55],
				backgroundColor: 'rgba(75, 192, 192, 0.6)',
			},
		],
	}

	const lineChartData = {
		labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
		datasets: [
			{
				label: 'Ingresos Mensuales',
				data: [12000, 19000, 15000, 25000, 22000, 30000],
				borderColor: 'rgb(75, 192, 192)',
				tension: 0.1,
			},
		],
	}

	const generateExcel = () => {
		const worksheet = XLSX.utils.json_to_sheet(
			gyms.map((gym) => ({
				ID: gym.uid,
				Nombre: gym.name,
				'Usuarios activos': gym.active_users,
				'Usuarios permitidos': gym.active_users,
				Estado: gym.isActive ? 'Activo' : 'Inactivo',
				'Expira en': gym.expires_at.toDate().toLocaleString().slice(0, 24),
			}))
		);

		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, 'Usuarios');

		XLSX.writeFile(workbook, 'reporte_de_usuarios.xlsx');
	};

	return (
		<UserLayout>
			<div className="container mx-auto px-4 py-8">
				<h1 className="text-3xl font-bold mb-6">Reportes de Gimnasios</h1>

				<div className="mb-6">
					<Select onValueChange={setSelectedGym} defaultValue={selectedGym}>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Seleccionar Gimnasio" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">Todos los Gimnasios</SelectItem>
              {
                gyms.map((item) =>
                  <SelectItem value={item.name}>{item.name}</SelectItem>
                )
              }
						</SelectContent>
					</Select>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
					<Card>
						<CardHeader>
							<CardTitle>Nuevos Miembros</CardTitle>
						</CardHeader>
						<CardContent>
							<Bar data={barChartData} />
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Ingresos Mensuales</CardTitle>
						</CardHeader>
						<CardContent>
							<Line data={lineChartData} />
						</CardContent>
					</Card>
				</div>

				<Card>
					<CardHeader>
						<CardTitle>Resumen de Actividad</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="overflow-x-auto">
							<table className="w-full text-sm text-left text-gray-500">
								<thead className="text-xs text-gray-700 uppercase bg-gray-50">
									<tr>
										<th className="px-6 py-3">Gimnasio</th>
										<th className="px-6 py-3">Total Miembros</th>
										<th className="px-6 py-3">Maximos miembros permitidos</th>
										<th className="px-6 py-3">Ingresos Totales /mes</th>
									</tr>
								</thead>
								<tbody>
                  {
                    gyms.map((item) => {
                      const incomes = item.active_users * 17
                      return (
                        <tr className="bg-white border-b">
                          <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.name}</td>
                          <td className="px-6 py-4 text-center">{item.active_users}</td>
                          <td className="px-6 py-4 text-center">{item.max_users}</td>
                          <td className="px-6 py-4 text-center">{incomes}</td>
                        </tr>
                      )
                    })
                  }
								</tbody>
							</table>
              <button onClick={() => generateExcel()} type="button" className="mt-[30px] gap-2 flex items-center text-white bg-gradient-to-br from-green-700/80 to-green-700 hover:bg-green-700/60 font-semibold rounded-lg px-5 py-3 text-center text-sm"> <ExcelIcon /> Exportar en Excel</button>
						</div>
					</CardContent>
				</Card>
			</div>
		</UserLayout>
	)
}
