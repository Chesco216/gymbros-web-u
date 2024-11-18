// export const Reports = () => {
// 	return (
// 		<div>
//       
//     </div>
// 	)
// }
'use client'

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

export const Reports = () => {
  const [selectedGym, setSelectedGym] = useState('all')

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
            <SelectItem value="gym1">Gimnasio 1</SelectItem>
            <SelectItem value="gym2">Gimnasio 2</SelectItem>
            <SelectItem value="gym3">Gimnasio 3</SelectItem>
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
                  <th className="px-6 py-3">Clases Ofrecidas</th>
                  <th className="px-6 py-3">Ingresos Totales</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">Gimnasio 1</td>
                  <td className="px-6 py-4">500</td>
                  <td className="px-6 py-4">25</td>
                  <td className="px-6 py-4">$50,000</td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">Gimnasio 2</td>
                  <td className="px-6 py-4">350</td>
                  <td className="px-6 py-4">20</td>
                  <td className="px-6 py-4">$35,000</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">Gimnasio 3</td>
                  <td className="px-6 py-4">420</td>
                  <td className="px-6 py-4">22</td>
                  <td className="px-6 py-4">$42,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
    </UserLayout>
  )
}
